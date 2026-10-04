import React from 'react';

/**
 * Button — the blog's call-to-action.
 *
 *   primary   → solid blue accent fill, darkens on hover
 *   secondary → hairline border, sunken fill on hover
 *   ghost     → plain accent text link, no box
 *
 * Sentence case, 6px radius, no shadows, no uppercase tracking.
 * Renders an <a> when `href` is set, otherwise a <button>.
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  icon,
  iconRight = false,
  disabled = false,
  onClick,
  style,
  ...rest
}) {
  const sizes = {
    sm: { padding: '6px 12px',  fontSize: '13px' },
    md: { padding: '8px 16px',  fontSize: '14px' },
    lg: { padding: '11px 20px', fontSize: '15px' },
  };

  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontFamily: 'var(--font-ui)',
    fontWeight: 500,
    borderRadius: '6px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    textDecoration: 'none',
    lineHeight: 1.2,
    transition: 'background-color 120ms ease, color 120ms ease, border-color 120ms ease',
    ...sizes[size],
  };

  const variants = {
    primary: {
      backgroundColor: 'var(--accent)',
      color: 'var(--text-on-accent)',
      border: '1px solid var(--accent)',
    },
    secondary: {
      backgroundColor: 'transparent',
      color: 'var(--text-heading)',
      border: '1px solid var(--border-subtle)',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: 'var(--link)',
      border: '1px solid transparent',
      padding: '4px 0',
    },
  };

  const hoverIn = (e) => {
    if (disabled) return;
    if (variant === 'primary') {
      e.currentTarget.style.backgroundColor = 'var(--accent-strong)';
      e.currentTarget.style.borderColor = 'var(--accent-strong)';
    }
    if (variant === 'secondary') {
      e.currentTarget.style.backgroundColor = 'var(--surface-sunken)';
    }
    if (variant === 'ghost') e.currentTarget.style.color = 'var(--link-hover)';
  };
  const hoverOut = (e) => {
    if (disabled) return;
    e.currentTarget.style.backgroundColor = variants[variant].backgroundColor;
    e.currentTarget.style.color = variants[variant].color;
    e.currentTarget.style.borderColor = variants[variant].border.split(' ').pop();
  };

  const iconEl = icon ? <i className={icon} aria-hidden="true" /> : null;
  const content = (
    <React.Fragment>
      {!iconRight && iconEl}
      {children}
      {iconRight && iconEl}
    </React.Fragment>
  );

  const props = {
    onClick: disabled ? undefined : onClick,
    onMouseEnter: hoverIn,
    onMouseLeave: hoverOut,
    style: { ...base, ...variants[variant], ...style },
    ...rest,
  };

  if (href && !disabled) {
    return <a href={href} {...props}>{content}</a>;
  }
  return <button type="button" disabled={disabled} {...props}>{content}</button>;
}
