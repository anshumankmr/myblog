import React from 'react';

/**
 * Avatar — round profile image, as used in the Bio strip.
 * Falls back to author initials when `src` is omitted.
 */
export function Avatar({ src, alt = '', initials, size = 72, style, ...rest }) {
  const base = {
    width: size,
    height: size,
    borderRadius: 'var(--radius-full)',
    flex: 'none',
    objectFit: 'cover',
    display: 'block',
    ...style,
  };

  if (src) {
    return <img src={src} alt={alt} style={base} {...rest} />;
  }

  return (
    <div
      style={{
        ...base,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--surface-sunken)',
        color: 'var(--text-muted)',
        fontFamily: 'var(--font-ui)',
        fontWeight: 600,
        fontSize: size * 0.4,
      }}
      aria-label={alt}
      {...rest}
    >
      {initials}
    </div>
  );
}
