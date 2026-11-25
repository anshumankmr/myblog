import type { CSSProperties } from 'react';
import type { Ride } from '@/lib/activity';
import { PERSON } from '@/lib/identity';
import { formatDuration, formatHoursMinutes, formatRideDate } from '@/lib/utils';

const sum = (rides: Ride[], pick: (ride: Ride) => number) => rides.reduce((total, ride) => total + pick(ride), 0);

export default function RecentRides({ rides = [], style }: { rides?: Ride[]; style?: CSSProperties }) {
  const strava = (
    <a className="btn-strava" href={PERSON.profiles.strava} target="_blank" rel="me noopener noreferrer">View on Strava →</a>
  );
  if (!rides.length) {
    // Strava's own widget is the fallback when the build could not read the rides.
    return (
      <section className="tile tile-strava" style={style} aria-labelledby="rides-heading">
        <div className="tile-head">
          <h2 id="rides-heading" className="tile-label">Recent rides</h2>
          <span className="meta">Powered by Strava</span>
        </div>
        <iframe
          title="Anshuman Kumar’s latest rides on Strava"
          src="https://www.strava.com/athletes/34639203/latest-rides/55aab79d3b61cb1174268222ef82b6037a7f2268"
          width={300}
          height={454}
          scrolling="no"
          loading="lazy"
          className="strava-widget strava-rides"
        />
        {strava}
      </section>
    );
  }
  return (
    <section className="tile tile-strava" style={style} aria-labelledby="rides-heading">
      <div className="tile-head">
        <h2 id="rides-heading" className="tile-label">Recent rides</h2>
        <span className="meta">Powered by Strava</span>
      </div>
      <dl className="ride-totals">
        <div><dt>km</dt><dd>{sum(rides, ride => ride.distanceKm).toFixed(1)}</dd></div>
        <div><dt>hours</dt><dd>{formatHoursMinutes(sum(rides, ride => ride.elapsedSeconds))}</dd></div>
        <div><dt>m climbed</dt><dd>{sum(rides, ride => ride.climbMeters).toLocaleString('en-IN')}</dd></div>
      </dl>
      <p className="tile-note">Last {rides.length} rides</p>
      <ul className="ride-list">
        {rides.map(ride => (
          <li key={ride.id}>
            <a href={ride.href} target="_blank" rel="noopener noreferrer" className="ride-row">
              <span className="min-w-0">
                <span className="ride-title">{ride.title}</span>
                <span className="tile-note block">
                  <time dateTime={ride.date}>{formatRideDate(ride.date)}</time> · {ride.virtual ? 'Zwift' : 'outdoor'}
                </span>
              </span>
              <span className="ride-stats">{ride.distanceKm.toFixed(1)} km<span className="meta block">{formatDuration(ride.elapsedSeconds)}</span></span>
            </a>
          </li>
        ))}
      </ul>
      {strava}
    </section>
  );
}
