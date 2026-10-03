import Link from "next/link"
import Script from "next/script"
import { FaGithub, FaLinkedin, FaTwitter, FaRss } from "react-icons/fa"

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-border-hairline">
      <div className="page-container !py-6 flex items-center justify-between gap-4 flex-wrap">
        <p className="meta">© {new Date().getFullYear()} Anshuman Kumar</p>
        <div className="flex items-center gap-4">
          <Link href="/contact" className="meta">Contact</Link>
          <a href="https://anshumankumar.net" className="meta">
            anshumankumar.net
          </a>
          <a href="/rss.xml" aria-label="RSS feed" title="RSS feed"><FaRss aria-hidden="true" /></a>
          <a
            href="https://github.com/anshumankmr"
            aria-label="GitHub"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub aria-hidden="true" />
          </a>
          <a
            href="https://www.linkedin.com/in/anshumankumarcs/"
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin aria-hidden="true" />
          </a>
          <a
            href="https://twitter.com/anshuman_kmr"
            aria-label="Twitter"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter aria-hidden="true" />
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
