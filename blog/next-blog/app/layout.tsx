import type { Metadata } from "next"
import { IBM_Plex_Serif, IBM_Plex_Sans, IBM_Plex_Mono, IBM_Plex_Sans_Devanagari } from "next/font/google"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"
import { SITE_DESCRIPTION, SITE_TITLE } from "@/lib/metadata"

const plexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-serif",
  display: "swap",
})
const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
  display: "swap",
})
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
})
const plexDevanagari = IBM_Plex_Sans_Devanagari({
  subsets: ["devanagari"], weight: "600", variable: "--font-plex-devanagari", display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://anshumankumar.net"),
  title: {
    default: "Les Pensées d'Anshuman",
    template: "%s | Les Pensées d'Anshuman",
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": [{ url: "/rss.xml", title: SITE_TITLE }] },
  },
  authors: [{ name: "Anshuman Kumar" }],
  openGraph: {
    title: "Les Pensées d'Anshuman",
    description:
      "Personal blog by Anshuman Kumar. Writing about tech, life, and everything in between.",
    url: "https://anshumankumar.net",
    siteName: "Les Pensées d'Anshuman",
    locale: "en_US",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Anshuman Kumar" }],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@anshuman_kmr",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${plexSerif.variable} ${plexSans.variable} ${plexMono.variable} ${plexDevanagari.variable}`}
      suppressHydrationWarning
    >
      <body
        className="min-h-screen flex flex-col transition-colors"
        style={{
          backgroundColor: "var(--surface-page)",
          color: "var(--text-body)",
        }}
      >
        <ThemeProvider>
          <a href="#main-content" className="skip-link">
            Skip to content
          </a>
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
