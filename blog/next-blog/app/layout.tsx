import type { Metadata } from 'next';
import { Montserrat, Merriweather } from 'next/font/google';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-merriweather',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "Anshuman's Blog",
    template: "%s | Anshuman's Blog",
  },
  description:
    'Personal blog by Anshuman Kumar. Writing about tech, life, and everything in between.',
  authors: [{ name: 'Anshuman Kumar' }],
  openGraph: {
    title: "Anshuman's Blog",
    description:
      'Personal blog by Anshuman Kumar. Writing about tech, life, and everything in between.',
    url: 'https://www.anshumankumar.dev',
    siteName: "Anshuman's Blog",
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
    <html lang="en" className={`${montserrat.variable} ${merriweather.variable}`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors">
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
