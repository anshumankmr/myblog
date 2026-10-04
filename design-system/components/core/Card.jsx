import React from 'react';

/**
 * Card — a flat content surface.
 *
 * There are no shadows in this design system. A card is the sunken
 * tint with a 1px hairline border and a 6px radius; `interactive`
 * swaps the border to the accent on hover. Used for Contact rows and
 * any boxed content.
 */
export function Card({
  children,
  interactive = false,
  hoverLift = false,
  padding = 'var(--space-6)',
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);

  const base = {
    backgroundColor: 'var(--surface-card)',
    borderRadius: '6px',
    border: '1px solid',
    borderColor: interactive && hover ? 'var(--accent)' : 'var(--border-hairline)',
    padding,
    transition: 'border-color 120ms ease, background-color 120ms ease',
    ...style,
  };

  return (
    <div
      style={base}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...rest}
    >
      {children}
    </div>
  );
}
