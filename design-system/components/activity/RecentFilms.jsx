import React from 'react';

/**
 * RecentFilms — recent Letterboxd watches as a hairline list.
 * Same row pattern as RecentRides: mono date, Plex Serif title with a
 * mono year, mono star rating on the right. "via Letterboxd →" credit.
 */
function stars(r) {
  if (r == null) return '';
  const full = Math.floor(r);
  return '★'.repeat(full) + (r - full >= 0.5 ? '½' : '');
}

export function RecentFilms({ films = [], profileHref = 'https://letterboxd.com/', limit = 5, title = 'Recently watched' }) {
  const list = films.slice(0, limit);
  const mono = { fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)', whiteSpace: 'nowrap' };
  return (
    <section>
      <h2 style={{ margin: 0, fontFamily: 'var(--font-ui)', fontSize: 'var(--text-eyebrow)', fontWeight: 600, letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
        {title}
      </h2>
      <ul style={{ margin: '12px 0 0', padding: 0, listStyle: 'none', borderTop: '1px solid var(--border-hairline)' }}>
        {list.map((f, i) => (
          <li key={f.href || i} style={{ borderBottom: '1px solid var(--border-hairline)' }}>
            <a href={f.href || profileHref} target="_blank" rel="noopener noreferrer"
              style={{ display: 'grid', gridTemplateColumns: '84px minmax(0,1fr) auto', gap: '16px', alignItems: 'baseline', padding: '12px 0', textDecoration: 'none' }}
              onMouseEnter={(e) => { e.currentTarget.querySelector('[data-name]').style.color = 'var(--link)'; }}
              onMouseLeave={(e) => { e.currentTarget.querySelector('[data-name]').style.color = 'var(--text-heading)'; }}>
              <time style={mono}>{f.date}</time>
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                <span data-name="" style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'var(--text-lg)', color: 'var(--text-heading)', transition: 'color 120ms ease' }}>{f.title}</span>
                <span style={{ ...mono, marginLeft: '8px' }}>{f.year}{f.rewatch ? ' · rewatch' : ''}</span>
              </span>
              <span style={{ ...mono, color: 'var(--text-body)' }} aria-label={f.rating != null ? `${f.rating} out of 5` : undefined}>{stars(f.rating)}</span>
            </a>
          </li>
        ))}
      </ul>
      <a href={profileHref} target="_blank" rel="noopener noreferrer"
        style={{ display: 'inline-block', marginTop: '10px', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)', textDecoration: 'none' }}>
        via Letterboxd →
      </a>
    </section>
  );
}
