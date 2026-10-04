import React from 'react';

/**
 * RecentRides — replaces the Strava "latest rides" iframe widget.
 * Hairline rows: mono date, Plex Serif ride name, mono stats on the right.
 * No orange, no map thumbnails, no card. Strava attribution is a small
 * mono link at the foot (required by Strava's API brand guidelines).
 */
function fmtTime(sec) {
  const h = Math.floor(sec / 3600);
  const m = Math.round((sec % 3600) / 60);
  return h ? `${h}h ${String(m).padStart(2, '0')}m` : `${m}m`;
}

export function RecentRides({ rides = [], profileHref = 'https://www.strava.com/athletes/34639203', limit = 5, title = 'Recent rides' }) {
  const list = rides.slice(0, limit);
  const total = list.reduce((s, r) => s + (r.distanceKm || 0), 0);
  const mono = { fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)', whiteSpace: 'nowrap' };
  return (
    <section>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '16px' }}>
        <h2 style={{ margin: 0, fontFamily: 'var(--font-ui)', fontSize: 'var(--text-eyebrow)', fontWeight: 600, letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
          {title}
        </h2>
        <span style={mono}>{total.toFixed(1)} km across {list.length}</span>
      </div>
      <ul style={{ margin: '12px 0 0', padding: 0, listStyle: 'none', borderTop: '1px solid var(--border-hairline)' }}>
        {list.map((r, i) => (
          <li key={r.href || i} style={{ borderBottom: '1px solid var(--border-hairline)' }}>
            <a href={r.href || profileHref} target="_blank" rel="noopener noreferrer"
              style={{ display: 'grid', gridTemplateColumns: '84px minmax(0,1fr) auto', gap: '16px', alignItems: 'baseline', padding: '12px 0', textDecoration: 'none' }}
              onMouseEnter={(e) => { e.currentTarget.querySelector('[data-name]').style.color = 'var(--link)'; }}
              onMouseLeave={(e) => { e.currentTarget.querySelector('[data-name]').style.color = 'var(--text-heading)'; }}>
              <time style={mono}>{r.date}</time>
              <span data-name="" style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'var(--text-lg)', color: 'var(--text-heading)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', transition: 'color 120ms ease' }}>
                {r.name}
              </span>
              <span style={mono}>
                {r.distanceKm.toFixed(1)} km · {fmtTime(r.movingTimeSec)}{r.elevationM != null ? ` · ${Math.round(r.elevationM)} m↑` : ''}
              </span>
            </a>
          </li>
        ))}
      </ul>
      <a href={profileHref} target="_blank" rel="noopener noreferrer"
        style={{ display: 'inline-block', marginTop: '10px', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)', textDecoration: 'none' }}>
        via Strava →
      </a>
    </section>
  );
}
