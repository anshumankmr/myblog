import type { Metadata } from 'next';
import { Instrument_Serif, Inter_Tight, Source_Serif_4 } from 'next/font/google';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-ui',
  display: 'swap',
});

const sourceSerif4 = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "Notes by Anshuman",
    template: "%s | Notes by Anshuman",
  },
  description:
    'Personal blog by Anshuman Kumar. Writing about tech, life, and everything in between.',
  authors: [{ name: 'Anshuman Kumar' }],
  openGraph: {
    title: "Notes by Anshuman",
    description:
      'Personal blog by Anshuman Kumar. Writing about tech, life, and everything in between.',
    url: 'https://www.anshumankumar.dev',
    siteName: "Notes by Anshuman",
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@anshuman_kmr',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${interTight.variable} ${sourceSerif4.variable}`}
      suppressHydrationWarning
    >
      <body
        className="min-h-screen flex flex-col transition-colors"
        style={{ backgroundColor: 'var(--surface-page)', color: 'var(--text-body)' }}
      >
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
