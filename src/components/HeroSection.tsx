import type { FC } from 'react';
    import { Button } from './ui/button';

    export const HeroSection: FC = () => {
      return (
        <section
          id="hero"
          data-tb-section="hero"
          className="relative min-h-screen flex items-center justify-center text-center py-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gray-900"
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Cozy bookstore interior with shelves of books"
              className="w-full h-full object-cover opacity-60"
              data-tb-anchor="hero.image"
              data-tb-kind="image"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto text-white space-y-8 animate-fade-in-up">
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight"
              data-tb-anchor="hero.headline"
              data-tb-kind="text"
            >
              Discover Your Next Great Read at{' '}
              <span className="bg-gradient-to-r from-accent-lime to-green-400 bg-clip-text text-transparent">
                Chapter 1
              </span>
            </h1>
            <p
              className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto"
              data-tb-anchor="hero.subtitle"
              data-tb-kind="text"
            >
              Your local haven for stories, knowledge, and community. Explore our curated collection and find your escape.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                asChild
                className="px-8 py-6 text-lg font-semibold rounded-full shadow-lg hover:shadow-accent-lime/30 transition-all duration-300
                           bg-gradient-to-r from-accent-lime to-green-500 hover:from-accent-lime/90 hover:to-green-400 text-accent-text"
                data-tb-anchor="hero.cta.browse"
                data-tb-kind="cta"
              >
                <a href="#featured-books">Browse Featured Books</a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="px-8 py-6 text-lg font-semibold rounded-full border-2 border-accent-lime text-accent-lime hover:bg-accent-lime/10
                           hover:text-accent-lime shadow-md hover:shadow-accent-lime/20 transition-all duration-300"
                data-tb-anchor="hero.cta.contact"
                data-tb-kind="cta"
              >
                <a href="#store-info">Visit Us</a>
              </Button>
            </div>
          </div>
        </section>
      );
    };