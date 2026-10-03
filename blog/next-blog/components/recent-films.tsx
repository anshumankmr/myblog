import type { Film } from '@/lib/activity';

export default function RecentFilms({ films }: { films: Film[] }) {
  if (!films.length) return null;
  return (
    <section className="section" aria-labelledby="films-heading">
      <h2 id="films-heading" className="activity-heading">Recently watched</h2>
      <ul className="activity-list">
        {films.map(film => (
          <li key={film.href}>
            <a href={film.href} target="_blank" rel="noopener noreferrer" className="activity-row">
              <time className="meta" dateTime={film.date}>{film.date}</time>
              <span className="activity-name">{film.title} <span className="meta">{film.year}{film.rewatch ? ' · rewatch' : ''}</span></span>
              {film.rating !== null && <span className="meta" aria-label={`${film.rating} out of 5 stars`}>{'★'.repeat(Math.floor(film.rating))}{film.rating % 1 >= 0.5 ? '½' : ''}</span>}
            </a>
          </li>
        ))}
      </ul>
      <a className="meta inline-block mt-3" href="https://letterboxd.com/jabwemetguy/" target="_blank" rel="noopener noreferrer">via Letterboxd →</a>
    </section>
  );
}
