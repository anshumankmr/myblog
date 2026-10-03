import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa"

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-border-hairline">
      <div className="page-container !py-6 flex items-center justify-between gap-4 flex-wrap">
        <p className="meta">© {new Date().getFullYear()} Anshuman Kumar</p>
        <div className="flex items-center gap-4">
          <a href="https://anshumankumar.net" className="meta">
            anshumankumar.net
          </a>
          <a
            href="https://github.com/anshumankmr"
            aria-label="GitHub"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/anshumankumarcs/"
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://twitter.com/anshuman_kmr"
            aria-label="Twitter"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter />
          </a>
        </div>
      </div>
    </footer>
  )
}
