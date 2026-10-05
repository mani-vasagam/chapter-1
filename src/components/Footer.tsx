import type { FC } from 'react';
    import { BookText } from 'lucide-react';

    export const Footer: FC = () => {
      return (
        <footer
          data-tb-section="footer"
          className="bg-ink text-gray-300 py-12 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <a href="#" className="flex items-center gap-2 text-white mb-4" data-tb-anchor="footer.logo" data-tb-kind="nav">
                <BookText className="h-8 w-8 text-accent-lime" />
                <span className="text-3xl font-bold tracking-tight">Chapter 1</span>
              </a>
              <p className="text-gray-400 max-w-sm" data-tb-anchor="footer.description" data-tb-kind="text">
                Your local independent bookstore, dedicated to fostering a love for reading and community.
              </p>
            </div>

            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <h4 className="text-xl font-semibold text-white mb-4" data-tb-anchor="footer.links.headline" data-tb-kind="text">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#hero" className="text-gray-400 hover:text-accent-lime transition-colors" data-tb-anchor="footer.links.home" data-tb-kind="nav">Home</a></li>
                <li><a href="#featured-books" className="text-gray-400 hover:text-accent-lime transition-colors" data-tb-anchor="footer.links.books" data-tb-kind="nav">Featured Books</a></li>
                <li><a href="#store-info" className="text-gray-400 hover:text-accent-lime transition-colors" data-tb-anchor="footer.links.contact" data-tb-kind="nav">Contact Us</a></li>
              </ul>
            </div>

            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <h4 className="text-xl font-semibold text-white mb-4" data-tb-anchor="footer.contact.headline" data-tb-kind="text">Contact Info</h4>
              <p className="text-gray-400 mb-2" data-tb-anchor="footer.contact.email" data-tb-kind="text">Email: <a href="mailto:info@chapter1books.com" className="hover:text-accent-lime transition-colors">info@chapter1books.com</a></p>
              <p className="text-gray-400" data-tb-anchor="footer.contact.phone" data-tb-kind="text">Phone: <a href="tel:+15551234567" className="hover:text-accent-lime transition-colors">(555) 123-4567</a></p>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-500 text-sm">
            <p data-tb-anchor="footer.copyright" data-tb-kind="text">&copy; {new Date().getFullYear()} Chapter 1. All rights reserved.</p>
            <p className="mt-2" data-tb-anchor="footer.credits" data-tb-kind="text">
              Image credits: <a href="https://unsplash.com/@anniespratt" target="_blank" rel="noopener noreferrer" className="hover:text-accent-lime transition-colors">Annie Spratt</a>, <a href="https://unsplash.com/@thoughtcatalog" target="_blank" rel="noopener noreferrer" className="hover:text-accent-lime transition-colors">Thought Catalog</a>, <a href="https://unsplash.com/@jareddc" target="_blank" rel="noopener noreferrer" className="hover:text-accent-lime transition-colors">Jared C.</a> on Unsplash.
            </p>
          </div>
        </footer>
      );
    };