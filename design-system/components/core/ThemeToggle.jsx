import React from 'react';

/**
 * ThemeToggle — sun/moon button that flips light/dark, exactly like
 * next-blog/components/theme-toggle.tsx. Uncontrolled by default: it
 * toggles the `dark` class on <html> (matching next-themes' strategy)
 * and reports via onChange. Pass `theme` + `onChange` to control it.
 *
 * Icons are Font Awesome (fa-solid fa-sun / fa-moon) — the host page
 * must load Font Awesome.
 */
export function ThemeToggle({ theme: controlled, onChange, onChrome = true, style, ...rest }) {
  const [internal, setInternal] = React.useState('light');
  const [hover, setHover] = React.useState(false);
  const theme = controlled ?? internal;

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    if (controlled === undefined) {
      setInternal(next);
      if (typeof document !== 'undefined') {
        document.documentElement.classList.toggle('dark', next === 'dark');
      }
    }
    onChange?.(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '2.25rem',
        height: '2.25rem',
        padding: 0,
        background: 'transparent',
        border: 'none',
        borderRadius: 'var(--radius-lg)',
        cursor: 'pointer',
        fontSize: 'var(--text-lg)',
        color: hover ? 'var(--blue-accent)' : (onChrome ? 'var(--gray-300)' : 'var(--ink-text-light)'),
        transition: `color var(--dur-normal) var(--ease-standard)`,
        ...style,
      }}
      {...rest}
    >
      <i className={theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon'} aria-hidden="true" />
    </button>
  );
}
