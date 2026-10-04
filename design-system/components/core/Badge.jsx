import React from 'react';

/**
 * Badge — small label for a post's tag or category.
 *
 * Sentence case, 4px radius, 12px. Not uppercase and not a pill —
 * a tag on this blog reads as a word, not as a UI chip. `solid`
 * fills with the accent; `outline` is an accent hairline.
 */
export function Badge({ children, variant = 'soft', style, ...rest }) {
  const variants = {
    soft: {
      backgroundColor: 'var(--accent-soft)',
      color: 'var(--link)',
      border: '1px solid transparent',
    },
    solid: {
      backgroundColor: 'var(--accent)',
      color: 'var(--text-on-accent)',
      border: '1px solid transparent',
    },
    outline: {
      backgroundColor: 'transparent',
      color: 'var(--link)',
      border: '1px solid var(--border-subtle)',
    },
    neutral: {
      backgroundColor: 'var(--surface-sunken)',
      color: 'var(--text-muted)',
      border: '1px solid transparent',
    },
  };

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--space-1)',
        fontFamily: 'var(--font-ui)',
        fontWeight: 500,
        fontSize: '12px',
        padding: '2px 8px',
        borderRadius: '4px',
        lineHeight: 1.5,
        ...variants[variant],
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
