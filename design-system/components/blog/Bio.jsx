import React from 'react';

/**
 * Bio — author byline shown at the foot of an article.
 * Small round avatar, name in the UI font at 600, role in muted body
 * text on one line. No card, no eyebrow label, no portrait block.
 */
export function Bio({
  name = 'Anshuman Kumar',
  role = 'Building FinOps AI at Flexera. Into running, cycling, board games, coffee, cooking when I can, and films.',
  avatar,
  handle = '@anshuman_kmr',
  handleHref = 'https://twitter.com/anshuman_kmr',
}) {
  return (
    <div
      style={{
        display: 'flex',
        gap: '14px',
        alignItems: 'flex-start',
        paddingTop: 'var(--space-6)',
        borderTop: '1px solid var(--border-hairline)',
      }}
    >
      {avatar ? (
        <img
          src={avatar}
          alt={name}
          style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
        />
      ) : (
        <div style={{
          width: 44, height: 44, borderRadius: '50%',
          background: 'var(--surface-sunken)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-ui)', fontWeight: 600,
          fontSize: '15px', color: 'var(--text-muted)', flexShrink: 0,
        }}>
          {name.split(' ').map((w) => w[0]).join('').slice(0, 2)}
        </div>
      )}
      <p style={{
        margin: 0,
        fontFamily: 'var(--font-ui)',
        fontSize: 'var(--text-base)',
        lineHeight: 'var(--leading-normal)',
        color: 'var(--text-muted)',
        textWrap: 'pretty',
      }}>
        <strong style={{ color: 'var(--text-heading)', fontWeight: 600 }}>{name}</strong>
        {' — '}{role}
        {handle && (
          <React.Fragment>
            {' '}
            <a
              href={handleHref}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--link)', textDecoration: 'none' }}
            >
              {handle}
            </a>
          </React.Fragment>
        )}
      </p>
    </div>
  );
}
