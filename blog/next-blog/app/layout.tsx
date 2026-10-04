import type { Metadata } from "next"
import { IBM_Plex_Serif, IBM_Plex_Sans, IBM_Plex_Mono, IBM_Plex_Sans_Devanagari } from "next/font/google"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"
import { HOME_TITLE, SITE_DESCRIPTION, SITE_TITLE, SITE_URL, pageMetadata } from "@/lib/metadata"
import { PERSON } from "@/lib/identity"
import { personJsonLd, serializeJsonLd } from "@/lib/structured-data"

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
  ...pageMetadata(HOME_TITLE, SITE_DESCRIPTION, "/"),
  metadataBase: new URL(SITE_URL),
  title: {
    default: HOME_TITLE,
    template: `%s | ${SITE_TITLE}`,
  },
  authors: [{ name: PERSON.name, url: SITE_URL }],
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(personJsonLd) }} />
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
