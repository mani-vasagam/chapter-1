/**
 * Calls the backend API to get a response from the AI coach.
 * This is a client-side function that communicates with a Next.js API route.
 * @param prompt The user's prompt.
 * @param systemPrompt An optional system prompt to guide the AI.
 * @returns A promise that resolves to the AI's response string.
 */
export async function callAI(prompt: string, systemPrompt?: string): Promise<string> {
  const response = await fetch('/api/coach/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt, systemPrompt }),
  });

  if (!response.ok) {
    // The API route is responsible for handling errors, including misconfiguration,
    // and returning a user-friendly error message. We'll surface that message.
    const errorData = await response.json().catch(() => ({
      error: 'An unexpected error occurred with the AI coach.',
    }));
    throw new Error(
      errorData.error || 'Failed to get a response from the AI coach. Please try again later.'
    );
  }

  const data = await response.json();

  // The API route is expected to abstract the AI provider and return a simple
  // JSON object with a 'reply' property containing the AI's response.
  return data.reply ?? '';
}