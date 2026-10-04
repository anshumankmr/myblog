import React from 'react';

/**
 * PostListItem — one row in the post list.
 * Title on the left, mono date on the right, one line of excerpt
 * underneath, hairline rule between rows. The title turns accent
 * blue on hover; the whole row is the link. No numbering, no card,
 * no arrow.
 */
export function PostListItem({ title, date, excerpt, href = '#', onClick, last = false }) {
  const [hover, setHover] = React.useState(false);

  return (
    <li style={{ listStyle: 'none' }}>
      <a
        href={href}
        onClick={(e) => { if (onClick) { e.preventDefault(); onClick(e); } }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          display: 'block',
          padding: '20px 0',
          borderBottom: last ? 'none' : '1px solid var(--border-hairline)',
          textDecoration: 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '16px' }}>
          <h3 style={{
            margin: 0,
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: 'var(--text-2xl)',
            lineHeight: 'var(--leading-snug)',
            letterSpacing: 'var(--tracking-tight)',
            color: hover ? 'var(--link)' : 'var(--text-heading)',
            transition: 'color 120ms ease',
          }}>
            {title}
          </h3>
          {date && (
            <time style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              color: 'var(--text-muted)',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}>
              {date}
            </time>
          )}
        </div>
        {excerpt && (
          <p style={{
            margin: '6px 0 0',
            fontFamily: 'var(--font-ui)',
            fontSize: 'var(--text-base)',
            lineHeight: 'var(--leading-normal)',
            color: 'var(--text-muted)',
            textWrap: 'pretty',
          }}>
            {excerpt}
          </p>
        )}
      </a>
    </li>
  );
}
