import type { FC } from 'react';
    import { useState, useEffect } from 'react';
    import { Navbar } from './components/Navbar';
    import { HeroSection } from './components/HeroSection';
    import { FeaturedBooksSection } from './components/FeaturedBooksSection';
    import { StoreInfoSection } from './components/StoreInfoSection';
    import { Footer } from './components/Footer';
    import { ChatbotWidget } from './components/ChatbotWidget';
    import { AIBanner } from './components/AIBanner';
    import { callAI } from './lib/ai';

    const App: FC = () => {
      const [showAIBanner, setShowAIBanner] = useState(false);

      useEffect(() => {
        const checkAIStatus = async () => {
          try {
            // Attempt a dummy AI call to check configuration
            await callAI('hello', 'You are a helpful assistant.');
            setShowAIBanner(false);
          } catch (error) {
            if (error instanceof Error && error.message.includes('ANTHROPIC_API_KEY not set')) {
              setShowAIBanner(true);
            } else {
              setShowAIBanner(false); // Other errors might not require the banner
            }
          }
        };
        checkAIStatus();
      }, []);

      return (
        <div className="min-h-screen bg-background text-foreground font-sans antialiased">
          <Navbar />
          {showAIBanner && <AIBanner />}
          <main>
            <HeroSection />
            <FeaturedBooksSection />
            <StoreInfoSection />
          </main>
          <ChatbotWidget />
          <Footer />
        </div>
      );
    };

    export default App;