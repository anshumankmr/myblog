import type { CSSProperties } from 'react';
import Image from 'next/image';
import { FaBook } from 'react-icons/fa';
import type { Book } from '@/lib/activity';
import { PERSON } from '@/lib/identity';

export default function RecentBooks({ books, style }: { books: Book[]; style?: CSSProperties }) {
  if (!books.length) return null;
  return (
    <section className="tile" style={style} aria-labelledby="books-heading">
      <div className="tile-head">
        <h2 id="books-heading" className="tile-label">Books read</h2>
        <a href={PERSON.profiles.goodreads} target="_blank" rel="me noopener noreferrer">Goodreads →</a>
      </div>
      <ul className="activity-list book-list">
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
    </section>
  );
}
