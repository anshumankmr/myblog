import type { CSSProperties } from 'react';
import now from '@/content/now.json';
import { getActivity } from '@/lib/activity';
import { pageMetadata } from '@/lib/metadata';
import RecentFilms from '@/components/recent-films';
import RecentBooks from '@/components/recent-books';
import RecentRides from '@/components/recent-rides';

export const metadata = pageMetadata('Now', 'What Anshuman Kumar is working on, training for, reading, and watching.', '/now/');

const span = (columns: number, rows = 1) => ({ '--c': columns, '--r': rows }) as CSSProperties;

export default function NowPage() {
  const activity = getActivity();
  // Books and calories sit beside the Strava tile, which spans as many rows as
  // that column has so the grid never leaves a hole. With neither, This site and
  // Footprint take a full-width row each.
  const optional = Number(activity.books.length > 0) + Number(Boolean(activity.nutrition));
  const rows = Math.max(2, optional + 1);
  const small = optional === 0 ? 2 : 1;
  return (
    <div className="page-container page-wide">
      <div className="flex items-baseline justify-between flex-wrap gap-3 mb-7">
        <h1 className="page-title">Now</h1>
        <p className="meta">Updated <time dateTime={now.updated}>{now.updated}</time> · <a href="https://nownownow.com/about" target="_blank" rel="noopener noreferrer">what is this?</a></p>
      </div>
      <div className="bento">
        <section className="tile" style={span(2)} aria-labelledby="work-heading">
          <h2 id="work-heading" className="tile-label">Work</h2>
          <p className="tile-title">{now.work.title}</p>
          <p>{now.work.text}</p>
        </section>
        <section className="tile" style={span(2)} aria-labelledby="training-heading">
          <h2 id="training-heading" className="tile-label">{now.training.label}</h2>
          <div className="tile-stats">
            {now.training.stats.map(stat => (
              <div key={stat.caption}>
                <p className="tile-big">{stat.value}{'unit' in stat && <span className="meta"> {stat.unit}</span>}</p>
                <p className="tile-note">{stat.caption}</p>
              </div>
            ))}
          </div>
        </section>
        <RecentRides rides={activity.rides} style={span(2, rows)} />
        <RecentBooks books={activity.books} style={span(2)} />
        {activity.nutrition && (
          <section className="tile" style={span(2)} aria-labelledby="calories-heading">
            <h2 id="calories-heading" className="tile-label">Logged calories</h2>
            <p className="tile-big">{activity.nutrition.calories.toLocaleString('en-IN')}<span className="meta"> kcal</span></p>
            <p className="tile-note"><time dateTime={activity.nutrition.date}>{activity.nutrition.date}</time> · <a href={activity.nutrition.sourceUrl} target="_blank" rel="noopener noreferrer">via MyFitnessPal →</a></p>
          </section>
        )}
        <section className="tile" style={span(small)} aria-labelledby="site-heading">
          <h2 id="site-heading" className="tile-label">This site</h2>
          <div className="chips">{now.site.chips.map(chip => <span key={chip} className="chip">{chip}</span>)}</div>
          <p className="tile-note">{now.site.text}</p>
        </section>
        <section className="tile" style={{ ...span(small), justifyContent: 'space-between' }} aria-labelledby="footprint-heading">
          <h2 id="footprint-heading" className="tile-label">Footprint</h2>
          <p className="tile-big">{now.footprint.grade}</p>
          <p className="tile-note">{now.footprint.text} · <a href={now.footprint.href} target="_blank" rel="noopener noreferrer">{now.footprint.linkText}</a></p>
        </section>
        <RecentFilms films={activity.films} style={span(4)} />
      </div>
      {activity.fetchedAt && (activity.films.length > 0 || activity.books.length > 0 || activity.nutrition) && <p className="meta mt-8">Last checked <time dateTime={activity.fetchedAt}>{new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(activity.fetchedAt))}</time>.</p>}
    </div>
  );
}
