import now from '@/content/now.json';
import { getActivity } from '@/lib/activity';
import { pageMetadata } from '@/lib/metadata';
import RecentFilms from '@/components/recent-films';
import RecentBooks from '@/components/recent-books';
import RecentRides from '@/components/recent-rides';

export const metadata = pageMetadata('Now', 'What Anshuman Kumar is working on, training for, reading, and watching.', '/now/');

export default function NowPage() {
  const activity = getActivity();
  return (
    <div className="page-container">
      <h1>Now</h1>
      <p className="meta mt-3">Updated <time dateTime={now.updated}>{now.updated}</time> · <a href="https://nownownow.com/about" target="_blank" rel="noopener noreferrer">what is this?</a></p>
      <dl className="definition-list border-t border-border-hairline mt-8">
        {now.items.map(item => <div key={item.label}><dt>{item.label}</dt><dd>{item.text}</dd></div>)}
      </dl>
      <RecentRides />
      {activity.nutrition && (
        <section className="section" aria-labelledby="calories-heading">
          <h2 id="calories-heading" className="activity-heading">Logged calories</h2>
          <p className="meta mt-3"><time dateTime={activity.nutrition.date}>{activity.nutrition.date}</time> · {activity.nutrition.calories.toLocaleString('en-IN')} kcal</p>
          <a className="meta inline-block mt-3" href={activity.nutrition.sourceUrl} target="_blank" rel="noopener noreferrer">via MyFitnessPal →</a>
        </section>
      )}
      <RecentFilms films={activity.films} />
      <RecentBooks books={activity.books} />
      {activity.fetchedAt && (activity.films.length > 0 || activity.books.length > 0 || activity.nutrition) && <p className="meta mt-8">Last checked <time dateTime={activity.fetchedAt}>{new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(activity.fetchedAt))}</time>.</p>}
    </div>
  );
}
