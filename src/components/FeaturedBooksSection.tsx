import type { FC } from 'react';
    import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

    interface Book {
      id: string;
      title: string;
      author: string;
      description: string;
      imageUrl: string;
      imageAlt: string;
    }

    const featuredBooks: Book[] = [
      {
        id: '1',
        title: 'The Silent Patient',
        author: 'Alex Michaelides',
        description: 'A shocking psychological thriller about a famous painter who shoots her husband and a psychotherapist determined to unravel her motive.',
        imageUrl: 'https://images.unsplash.com/photo-1598075765620-3b1d7d0d0f7f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        imageAlt: 'Book cover for The Silent Patient',
      },
      {
        id: '2',
        title: 'Project Hail Mary',
        author: 'Andy Weir',
        description: 'An astronaut wakes up on a spaceship with no memory of who he is or how he got there, tasked with saving humanity from an extinction-level event.',
        imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd87?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        imageAlt: 'Book cover for Project Hail Mary',
      },
      {
        id: '3',
        title: 'Where the Crawdads Sing',
        author: 'Delia Owens',
        description: 'A haunting coming-of-age story about a young girl who raises herself in the marshes of North Carolina and becomes a suspect in a murder.',
        imageUrl: 'https://images.unsplash.com/photo-1532012197247-fee6a2b12ad9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        imageAlt: 'Book cover for Where the Crawdads Sing',
      },
    ];

    export const FeaturedBooksSection: FC = () => {
      return (
        <section
          id="featured-books"
          data-tb-section="featured-books"
          className="py-16 sm:py-24 bg-surface"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2
                className="text-3xl sm:text-4xl font-bold tracking-tight text-ink mb-4"
                data-tb-anchor="featured-books.headline"
                data-tb-kind="text"
              >
                Our <span className="text-accent-lime">Featured</span> Books
              </h2>
              <p
                className="text-lg text-muted-foreground max-w-2xl mx-auto"
                data-tb-anchor="featured-books.subtitle"
                data-tb-kind="text"
              >
                Hand-picked titles we think you'll love, spanning various genres and captivating stories.
              </p>
            </div>

            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              data-tb-kind="container"
            >
              {featuredBooks.map((book) => (
                <Card
                  key={book.id}
                  className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300
                             border border-border-lime/30 bg-card"
                  data-tb-anchor={`featured-books.book.${book.id}`}
                  data-tb-kind="card"
                >
                  <div className="relative w-full h-64">
                    <img
                      src={book.imageUrl}
                      alt={book.imageAlt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      data-tb-anchor={`featured-books.book.${book.id}.image`}
                      data-tb-kind="image"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                  <CardHeader className="p-6">
                    <CardTitle
                      className="text-2xl font-semibold text-ink"
                      data-tb-anchor={`featured-books.book.${book.id}.title`}
                      data-tb-kind="text"
                    >
                      {book.title}
                    </CardTitle>
                    <CardDescription
                      className="text-muted-foreground text-base"
                      data-tb-anchor={`featured-books.book.${book.id}.author`}
                      data-tb-kind="text"
                    >
                      by {book.author}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <p
                      className="text-ink leading-relaxed"
                      data-tb-anchor={`featured-books.book.${book.id}.description`}
                      data-tb-kind="text"
                    >
                      {book.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      );
    };