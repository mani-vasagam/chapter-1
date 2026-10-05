import type { FC } from 'react';

/**
 * Renders a banner indicating that the AI assistant feature is currently unavailable.
 * This is displayed when the necessary backend configuration (e.g., API keys) is missing,
 * providing a user-friendly message instead of exposing internal setup details.
 */
export const AIBanner: FC = () => {
  return (
    <div
      data-tb-section="ai-banner"
      className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 sticky top-0 z-50 shadow-md"
      role="alert"
    >
      <p className="font-bold" data-tb-anchor="ai-banner.headline" data-tb-kind="text">
        AI Assistant Unavailable
      </p>
      <p data-tb-anchor="ai-banner.subtitle" data-tb-kind="text">
        Our AI-powered chat assistant is currently offline. Please check back later or contact us for assistance.
      </p>
    </div>
  );
};