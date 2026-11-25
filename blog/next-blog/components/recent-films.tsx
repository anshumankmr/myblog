import type { CSSProperties } from 'react';
import Image from 'next/image';
import type { Film } from '@/lib/activity';
import { PERSON } from '@/lib/identity';

export default function RecentFilms({ films, style }: { films: Film[]; style?: CSSProperties }) {
  if (!films.length) return null;
  return (
    <section className="tile" style={style} aria-labelledby="films-heading">
      <div className="tile-head">
        <h2 id="films-heading" className="tile-label">Recently watched</h2>
        <a href={PERSON.profiles.letterboxd} target="_blank" rel="me noopener noreferrer">Letterboxd →</a>
      </div>
      <ul className="film-grid">
        {films.map(film => (
          <li key={film.href} className="flex">
            <a href={film.href} target="_blank" rel="noopener noreferrer" className="film-card w-full">
              {film.poster ? (
                <Image src={film.poster} alt="" width={200} height={300} className="film-poster" unoptimized />
              ) : (
                <span className="film-poster film-poster-empty" aria-hidden="true" />
              )}
              <span className="film-title">{film.title}</span>
              <span className="meta" aria-label={film.rating !== null ? `${film.rating} out of 5 stars` : undefined}>
                {film.year}
                {film.rating !== null && <> · {'★'.repeat(Math.floor(film.rating))}{film.rating % 1 >= 0.5 ? '½' : ''}</>}
                {film.rewatch ? ' · rewatch' : ''}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
