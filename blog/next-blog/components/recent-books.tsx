import Image from 'next/image';
import { FaBook } from 'react-icons/fa';
import type { Book } from '@/lib/activity';
import { PERSON } from '@/lib/identity';

export default function RecentBooks({ books }: { books: Book[] }) {
  if (!books.length) return null;
  return (
    <section className="section" aria-labelledby="books-heading">
      <h2 id="books-heading" className="activity-heading">Books read</h2>
      <ul className="activity-list">
        {books.map(book => (
          <li key={book.href}>
            <a href={book.href} target="_blank" rel="noopener noreferrer" className="book-row">
              {book.cover ? (
                <Image src={book.cover} alt="" width={40} height={60} className="book-cover" unoptimized />
              ) : (
                <span className="book-cover book-cover-placeholder" aria-hidden="true"><FaBook size={16} /></span>
              )}
              <span className="book-details">
                <span className="activity-name">{book.title}</span>
                {book.author && <span className="book-author">{book.author}</span>}
                {book.date && <span className="meta book-read-date">Read <time dateTime={book.date}>{book.date}</time></span>}
              </span>
              {book.rating !== null && <span className="meta book-rating" aria-label={`${book.rating} out of 5 stars`}>{'★'.repeat(book.rating)}</span>}
            </a>
          </li>
        ))}
      </ul>
      <a className="meta inline-block mt-3" href={PERSON.profiles.goodreads} target="_blank" rel="me noopener noreferrer">via Goodreads →</a>
    </section>
  );
}
