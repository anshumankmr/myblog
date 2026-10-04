import React from 'react';

/**
 * CalorieLog — recent MyFitnessPal diary totals as a hairline list.
 * Mono date, eaten / goal in mono, "under" or "over" in muted text.
 * Data is fetched at build time, so there is no loading or error state
 * on the page; if there is no data, render nothing.
 */
export function CalorieLog({ days = [], diaryHref = 'https://www.myfitnesspal.com/food/diary/anshuman_kmr', limit = 5, title = 'Calories' }) {
  const list = days.slice(0, limit);
  if (!list.length) return null;
  const fmt = (n) => n.toLocaleString('en-IN');
  const mono = { fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)', whiteSpace: 'nowrap' };
  return (
    <section>
      <h2 style={{ margin: 0, fontFamily: 'var(--font-ui)', fontSize: 'var(--text-eyebrow)', fontWeight: 600, letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{title}</h2>
      <ul style={{ margin: '12px 0 0', padding: 0, listStyle: 'none', borderTop: '1px solid var(--border-hairline)' }}>
        {list.map((d) => {
          const diff = d.goal - d.eaten;
          return (
            <li key={d.date} style={{ display: 'grid', gridTemplateColumns: '84px minmax(0,1fr) auto', gap: '16px', alignItems: 'baseline', padding: '12px 0', borderBottom: '1px solid var(--border-hairline)' }}>
              <time style={mono}>{d.date}</time>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--text-heading)' }}>
                {fmt(d.eaten)} <span style={{ color: 'var(--text-muted)' }}>/ {fmt(d.goal)} kcal</span>
              </span>
              <span style={mono}>{diff >= 0 ? `${fmt(diff)} under` : `${fmt(-diff)} over`}</span>
            </li>
          );
        })}
      </ul>
      <a href={diaryHref} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginTop: '10px', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)', textDecoration: 'none' }}>
        via MyFitnessPal →
      </a>
    </section>
  );
}
