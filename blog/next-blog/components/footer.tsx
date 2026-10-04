import Link from "next/link"
import Script from "next/script"
import { FaGithub, FaLinkedin, FaTwitter, FaRss, FaHackerNews, FaSpotify, FaSteam, FaPlaystation, FaGoodreadsG } from "react-icons/fa"
import { PERSON, SITE_URL } from "@/lib/identity"

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-border-hairline">
      <div className="page-container !py-6 flex items-center justify-between gap-4 flex-wrap">
        <p className="meta">© {new Date().getFullYear()} {PERSON.name} · @{PERSON.handle}</p>
        <div className="flex items-center gap-4 flex-wrap">
          <Link href="/contact" className="meta">Contact</Link>
          <a href={SITE_URL} className="meta">
            anshumankumar.net
          </a>
          <a href="/rss.xml" aria-label="RSS feed" title="RSS feed"><FaRss aria-hidden="true" /></a>
          <a
            href={PERSON.profiles.github}
            aria-label="GitHub"
            target="_blank"
            rel="me noopener noreferrer"
          >
            <FaGithub aria-hidden="true" />
          </a>
          <a
            href={PERSON.profiles.linkedin}
            aria-label="LinkedIn"
            target="_blank"
            rel="me noopener noreferrer"
          >
            <FaLinkedin aria-hidden="true" />
          </a>
          <a
            href={PERSON.profiles.twitter}
            aria-label="Twitter"
            target="_blank"
            rel="me noopener noreferrer"
          >
            <FaTwitter aria-hidden="true" />
          </a>
          <a
            href={PERSON.profiles.hackerNews}
            aria-label="Hacker News"
            target="_blank"
            rel="me noopener noreferrer"
          >
            <FaHackerNews aria-hidden="true" />
          </a>
          <a
            href={PERSON.profiles.spotify}
            aria-label="Spotify"
            target="_blank"
            rel="me noopener noreferrer"
          >
            <FaSpotify aria-hidden="true" />
          </a>
          <a
            href={PERSON.profiles.steam}
            aria-label="Steam"
            target="_blank"
            rel="me noopener noreferrer"
          >
            <FaSteam aria-hidden="true" />
          </a>
          <a
            href={PERSON.profiles.playstation}
            aria-label="PlayStation"
            target="_blank"
            rel="me noopener noreferrer"
          >
            <FaPlaystation aria-hidden="true" />
          </a>
          <a
            href={PERSON.profiles.goodreads}
            aria-label="Goodreads"
            target="_blank"
            rel="me noopener noreferrer"
          >
            <FaGoodreadsG aria-hidden="true" />
          </a>
        </div>
      </div>
      <div id="wcb" className="carbonbadge wcb-d pb-6" />
      <Script
        src="https://unpkg.com/website-carbon-badges@1.1.3/b.min.js"
        strategy="lazyOnload"
      />
    </footer>
  )
}
