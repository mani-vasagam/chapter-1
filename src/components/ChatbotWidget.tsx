import type { FC } from 'react';
import { useState, useRef, useEffect, FormEvent } from 'react';
import { MessageSquare, Send, X, Loader2 } from 'lucide-react';
import { createClient, type User } from '@supabase/supabase-js';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from './ui/sheet';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';

// Define the shape of a message for UI display
interface DisplayMessage {
  id: number | string;
  text: string;
  sender: 'user' | 'ai';
}

// Supabase client setup using Vite environment variables as per review feedback.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if Supabase is configured.
// If not, the chat will render in a read-only, unavailable state with seed data.
const isSupabaseConfigured = supabaseUrl && supabaseAnonKey;
const supabase = isSupabaseConfigured ? createClient(supabaseUrl, supabaseAnonKey) : null;

export const ChatbotWidget: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<DisplayMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatUnavailable = !supabase;

  // Seed data for when the chat is unavailable due to missing configuration.
  const seedMessages: DisplayMessage[] = [
    { id: 1, text: "Hello! I'm the Chapter 1 chatbot. How can I help you today?", sender: 'ai' },
    { id: 2, text: "You can ask me about our featured books, store hours, or contact information.", sender: 'ai' }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Effect to handle anonymous user authentication with Supabase.
  useEffect(() => {
    if (chatUnavailable) return;

    const setupAnonymousSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
      } else {
        const { data, error: signInError } = await supabase.auth.signInAnonymously();
        if (signInError) {
          console.error('Error signing in anonymously:', signInError);
          setError("Could not start a chat session. Please try again later.");
        } else if (data.user) {
          setUser(data.user);
        }
      }
    };

    setupAnonymousSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [chatUnavailable]);

  // Effect to fetch message history from Supabase when the chat widget is opened.
  useEffect(() => {
    if (isOpen && !chatUnavailable && user) {
      const fetchMessages = async () => {
        setIsLoading(true);
        setError(null);
        setMessages([]); // Clear previous messages before fetching

        const { data, error: fetchError } = await supabase
          .from('messages')
          .select('id, text, sender')
          .eq('session_id', user.id) // Using user.id to identify the anonymous session
          .order('created_at', { ascending: true });

        if (fetchError) {
          console.error('Error fetching messages:', fetchError);
          setError('Failed to load message history.');
          setMessages([{ id: 'error-load', text: 'Sorry, I couldn\'t load our previous conversation.', sender: 'ai' }]);
        } else if (data) {
          setMessages(data);
        }
        setIsLoading(false);
      };
      fetchMessages();
    }
  }, [isOpen, chatUnavailable, user]);

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (input.trim() === '' || isLoading || chatUnavailable || !user) return;

    const userMessage: DisplayMessage = { id: crypto.randomUUID(), text: input, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      // 1. Persist user message to Supabase
      const { error: insertUserError } = await supabase.from('messages').insert({
        text: currentInput,
        sender: 'user',
        session_id: user.id,
      });

      if (insertUserError) throw new Error(`Failed to save your message: ${insertUserError.message}`);

      // 2. Call the backend API route to get an AI response
      const response = await fetch('/api/coach/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: currentInput, session_id: user.id }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'The AI failed to respond.');
      }

      const { reply } = await response.json();
      const aiMessage: DisplayMessage = { id: crypto.randomUUID(), text: reply, sender: 'ai' };
      setMessages((prev) => [...prev, aiMessage]);

      // 3. Persist AI response to Supabase
      const { error: insertAiError } = await supabase.from('messages').insert({
        text: reply,
        sender: 'ai',
        session_id: user.id,
      });

      if (insertAiError) {
        // This is a non-critical error, as the user has seen the response.
        // We can log it without disrupting the user flow.
        console.error('Error saving AI message:', insertAiError);
      }
    } catch (err) {
      console.error('Chat submission failed:', err);
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(errorMessage);
      
      const aiErrorMessage: DisplayMessage = {
        id: 'error-send',
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'ai',
      };
      setMessages((prev) => [...prev, aiErrorMessage]);

      // Rollback the optimistic user message if it failed to save
      if (err instanceof Error && err.message.includes('Failed to save')) {
        setMessages((prev) => prev.filter((msg) => msg.id !== userMessage.id));
        setInput(currentInput);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const displayMessages = chatUnavailable ? seedMessages : messages;
  const isFormDisabled = isLoading || chatUnavailable || !user;
  const placeholderText = chatUnavailable
    ? "Chat is currently unavailable"
    : !user
    ? "Connecting to chat..."
    : "Ask a question...";

  return (
    <div data-tb-section="chatbot-widget">
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-4 rounded-full shadow-lg bg-accent-lime hover:bg-green-500 text-accent-text transition-all duration-300 z-50"
        data-tb-anchor="chatbot.open-button"
        data-tb-kind="cta"
      >
        <MessageSquare className="h-6 w-6" />
        <span className="sr-only">Open Chatbot</span>
      </Button>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="w-full sm:max-w-md flex flex-col bg-card text-foreground" data-tb-anchor="chatbot.sheet" data-tb-kind="container">
          <SheetHeader className="pb-4">
            <SheetTitle className="flex items-center gap-2 text-ink" data-tb-anchor="chatbot.title" data-tb-kind="text">
              <MessageSquare className="h-5 w-5 text-accent-lime" /> Chapter 1 Chatbot
            </SheetTitle>
            <SheetDescription className="text-muted-foreground" data-tb-anchor="chatbot.description" data-tb-kind="text">
              {chatUnavailable
                ? "Our chatbot is temporarily unavailable."
                : "Ask me anything about Chapter 1 bookstore!"}
            </SheetDescription>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary"
              onClick={() => setIsOpen(false)}
              data-tb-anchor="chatbot.close-button"
              data-tb-kind="cta"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </SheetHeader>

          <Separator className="mb-4" />

          <ScrollArea className="flex-1 p-4 border rounded-lg bg-background mb-4">
            <div className="flex flex-col space-y-4">
              {displayMessages.length === 0 && !isLoading && (
                <div className="text-center text-muted-foreground italic" data-tb-anchor="chatbot.empty-state" data-tb-kind="text">
                  Start by asking a question! E.g., "What are your hours?"
                </div>
              )}
              {displayMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  data-tb-anchor={`chatbot.message.${message.id}`}
                  data-tb-kind="text"
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-lg shadow-sm ${
                      message.sender === 'user'
                        ? 'bg-accent-lime text-accent-text'
                        : 'bg-gray-200 text-ink'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              {isLoading && messages.length > 0 && (
                <div className="flex justify-start">
                  <div className="max-w-[70%] p-3 rounded-lg shadow-sm bg-gray-200 text-ink flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" /> Thinking...
                  </div>
                </div>
              )}
              {error && (
                <div className="text-red-600 text-sm mt-2 p-2 bg-red-50 rounded-md" data-tb-anchor="chatbot.error" data-tb-kind="text">
                  {error}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={placeholderText}
              className="flex-1 bg-background border-border-lime focus-visible:ring-accent-lime"
              disabled={isFormDisabled}
              data-tb-anchor="chatbot.input"
              data-tb-kind="form"
            />
            <Button type="submit" disabled={isFormDisabled || input.trim() === ''} className="bg-accent-lime hover:bg-green-500 text-accent-text" data-tb-anchor="chatbot.send-button" data-tb-kind="cta">
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              <span className="sr-only">Send message</span>
            </Button>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};