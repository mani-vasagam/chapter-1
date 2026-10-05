import type { FC } from 'react';
    import { Mail, Clock } from 'lucide-react';

    export const StoreInfoSection: FC = () => {
      return (
        <section
          id="store-info"
          data-tb-section="store-info"
          className="py-16 sm:py-24 bg-background"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2
              className="text-3xl sm:text-4xl font-bold tracking-tight text-ink mb-4"
              data-tb-anchor="store-info.headline"
              data-tb-kind="text"
            >
              Visit <span className="text-accent-lime">Chapter 1</span>
            </h2>
            <p
              className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12"
              data-tb-anchor="store-info.subtitle"
              data-tb-kind="text"
            >
              We'd love to see you! Find our hours and contact information below.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {/* Store Hours */}
              <div
                className="bg-card p-8 rounded-xl shadow-lg border border-border-lime/30 flex flex-col items-center text-center"
                data-tb-anchor="store-info.hours.container"
                data-tb-kind="container"
              >
                <Clock className="h-10 w-10 text-accent-lime mb-4" />
                <h3
                  className="text-2xl font-semibold text-ink mb-3"
                  data-tb-anchor="store-info.hours.headline"
                  data-tb-kind="text"
                >
                  Store Hours
                </h3>
                <ul className="text-ink text-lg space-y-2">
                  <li data-tb-anchor="store-info.hours.mon-fri" data-tb-kind="text">Monday - Friday: 10:00 AM - 7:00 PM</li>
                  <li data-tb-anchor="store-info.hours.saturday" data-tb-kind="text">Saturday: 10:00 AM - 6:00 PM</li>
                  <li data-tb-anchor="store-info.hours.sunday" data-tb-kind="text">Sunday: 12:00 PM - 5:00 PM</li>
                </ul>
              </div>

              {/* Contact Email */}
              <div
                className="bg-card p-8 rounded-xl shadow-lg border border-border-lime/30 flex flex-col items-center text-center"
                data-tb-anchor="store-info.contact.container"
                data-tb-kind="container"
              >
                <Mail className="h-10 w-10 text-accent-lime mb-4" />
                <h3
                  className="text-2xl font-semibold text-ink mb-3"
                  data-tb-anchor="store-info.contact.headline"
                  data-tb-kind="text"
                >
                  Get in Touch
                </h3>
                <p
                  className="text-ink text-lg"
                  data-tb-anchor="store-info.contact.email"
                  data-tb-kind="text"
                >
                  Email us at: <a href="mailto:info@chapter1books.com" className="text-accent-lime hover:underline">info@chapter1books.com</a>
                </p>
                <p
                  className="text-ink text-lg mt-2"
                  data-tb-anchor="store-info.contact.phone"
                  data-tb-kind="text"
                >
                  Phone: <a href="tel:+15551234567" className="text-accent-lime hover:underline">(555) 123-4567</a>
                </p>
              </div>
            </div>
          </div>
        </section>
      );
    };