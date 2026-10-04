import React from 'react';

/**
 * Note — a short, untitled post. The "sticky note": a flat sunken block,
 * body text in Plex Sans, a mono timestamp that doubles as the permalink.
 * No title, no tags, no shadow, no tilt, no yellow.
 */
export function Note({ children, text, date, time, href = '#' }) {
  const [hover, setHover] = React.useState(false);
  return (
    <article style={{ background: 'var(--surface-sunken)', borderRadius: '6px', padding: '16px 18px' }}>
      <div style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-lg)', lineHeight: 1.6, color: 'var(--text-body)', textWrap: 'pretty' }}>
        {children ?? text}
      </div>
      {date && (
        <a href={href} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
          style={{ display: 'inline-block', marginTop: '10px', fontFamily: 'var(--font-mono)', fontSize: '12px', color: hover ? 'var(--link)' : 'var(--text-muted)', textDecoration: 'none', transition: 'color 120ms ease' }}>
          <time dateTime={time ? `${date}T${time}` : date}>{date}{time ? ` · ${time}` : ''}</time>
        </a>
      )}
    </article>
  );
}
