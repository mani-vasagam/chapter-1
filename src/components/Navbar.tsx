import type { FC } from 'react';
    import { BookText } from 'lucide-react';

    export const Navbar: FC = () => {
      return (
        <nav
          data-tb-section="nav"
          className="sticky top-0 z-40 w-full bg-background/90 backdrop-blur-sm border-b border-border/50 py-4 shadow-sm"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <a href="#" className="flex items-center gap-2 text-ink hover:text-accent-lime transition-colors" data-tb-anchor="nav.logo" data-tb-kind="nav">
              <BookText className="h-7 w-7 text-accent-lime" />
              <span className="text-2xl font-bold tracking-tight">Chapter 1</span>
            </a>
            <div className="hidden md:flex items-center gap-6">
              <a href="#hero" className="text-ink hover:text-accent-lime transition-colors font-medium" data-tb-anchor="nav.home" data-tb-kind="nav">Home</a>
              <a href="#featured-books" className="text-ink hover:text-accent-lime transition-colors font-medium" data-tb-anchor="nav.books" data-tb-kind="nav">Books</a>
              <a href="#store-info" className="text-ink hover:text-accent-lime transition-colors font-medium" data-tb-anchor="nav.contact" data-tb-kind="nav">Contact</a>
            </div>
            {/* Mobile navigation could be added here if needed, e.g., using a Sheet component */}
          </div>
        </nav>
      );
    };