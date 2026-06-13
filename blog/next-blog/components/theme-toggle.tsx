'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) {
    return (
      <button
        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: 'var(--text-meta)' }}
        aria-label="Toggle theme"
      >
        <FaSun size={14} />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '4px',
        color: hovered ? 'var(--accent)' : 'var(--text-meta)',
        transition: 'color var(--dur-normal) var(--ease-standard)',
      }}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? <FaSun size={14} /> : <FaMoon size={14} />}
    </button>
  );
}
