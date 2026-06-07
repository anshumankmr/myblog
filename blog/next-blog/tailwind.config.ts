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
        primary: '#005b99',
        accent: '#3291ff',
        dark: '#1a1a1a',
        'dark-light': '#2a2a2a',
        text: '#2e353f',
        'text-light': '#4f5969',
        heading: '#1a202c',
      },
      fontFamily: {
        heading: ['var(--font-montserrat)', 'sans-serif'],
        body: ['var(--font-merriweather)', 'serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#2e353f',
            a: {
              color: '#005b99',
              '&:hover': {
                color: '#3291ff',
              },
            },
            h1: {
              color: '#1a202c',
              fontFamily: 'var(--font-montserrat)',
            },
            h2: {
              color: '#1a202c',
              fontFamily: 'var(--font-montserrat)',
            },
            h3: {
              color: '#1a202c',
              fontFamily: 'var(--font-montserrat)',
            },
            code: {
              backgroundColor: '#f3f4f6',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem',
              fontWeight: '400',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: '#1e1e1e',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
