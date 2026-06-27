import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        accent:          'var(--accent)',
        'accent-strong': 'var(--accent-strong)',
        'accent-soft':   'var(--accent-soft)',
        'surface-page':  'var(--surface-page)',
        'surface-card':  'var(--surface-card)',
        'surface-sunken':'var(--surface-sunken)',
        'text-display':  'var(--text-display)',
        'text-heading':  'var(--text-heading)',
        'text-body':     'var(--text-body)',
        'text-meta':     'var(--text-meta)',
        'text-muted':    'var(--text-muted)',
        'border-hairline':'var(--border-hairline)',
        'border-subtle': 'var(--border-subtle)',
        'border-strong': 'var(--border-strong)',
        'ink-900':        'var(--ink-900)',
        'ink-400':        'var(--ink-400)',
        'paper-200':      'var(--paper-200)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        ui:      ['var(--font-ui)', 'sans-serif'],
        body:    ['var(--font-body)', 'serif'],
        mono:    ['var(--font-mono)', 'monospace'],
        heading: ['var(--font-ui)', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'var(--text-body)',
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-lg)',
            lineHeight: 'var(--leading-relaxed)',
            a: {
              color: 'var(--accent)',
              '&:hover': { color: 'var(--accent-strong)' },
            },
            h1: { fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: '400', color: 'var(--text-display)' },
            h2: { fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: '400', color: 'var(--text-heading)' },
            h3: { fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: '400', color: 'var(--text-heading)' },
            code: {
              backgroundColor: 'var(--code-inline-bg)',
              padding: '0.2em 0.4em',
              borderRadius: '3px',
              fontWeight: '400',
              fontFamily: 'var(--font-mono)',
            },
            'code::before': { content: '""' },
            'code::after':  { content: '""' },
            pre: { backgroundColor: 'var(--code-bg)' },
            blockquote: {
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              color: 'var(--text-display)',
              borderLeftColor: 'var(--accent)',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
