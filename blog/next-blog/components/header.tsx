"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { FaLinkedin, FaGithub, FaBars, FaTimes } from "react-icons/fa"
import { ThemeToggle } from "./theme-toggle"

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/blogs", label: "Posts" },
  { href: "/contact", label: "Contact" },
]
const externalLinks = [
  {
    href: "https://www.linkedin.com/in/anshumankumarcs/",
    label: "LinkedIn",
    icon: FaLinkedin,
  },
  { href: "https://github.com/anshumankmr", label: "GitHub", icon: FaGithub },
]
const resumeLink =
  "https://drive.google.com/file/d/1NqI9eAmIsQxXPN__C8vZnRq5hw-5U63q/view?usp=drive_link"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const links = navLinks.map(({ href, label }) => (
    <Link
      key={href}
      href={href}
      className="nav-link"
      aria-current={
        pathname.startsWith(href) ||
        (href === "/blogs" && pathname.startsWith("/article"))
          ? "page"
          : undefined
      }
      onClick={() => setIsMenuOpen(false)}
    >
      {label}
    </Link>
  ))
  const socials = externalLinks.map(({ href, label, icon: Icon }) => (
    <a
      key={href}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="nav-link"
    >
      <Icon aria-hidden="true" />
    </a>
  ))

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link
          href="/"
          className="wordmark"
          onClick={() => setIsMenuOpen(false)}
        >
          Anshuman Kumar
        </Link>
        <nav
          aria-label="Main navigation"
          className="hidden md:flex items-center gap-4"
        >
          {links}
          {socials}
          <a
            href={resumeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
          >
            Résumé
          </a>
          <ThemeToggle />
        </nav>
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            className="icon-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMenuOpen ? (
              <FaTimes aria-hidden="true" />
            ) : (
              <FaBars aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="mobile-nav md:hidden flex flex-col gap-4"
        >
          {links}
          <a
            href={resumeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
          >
            Résumé
          </a>
          <div className="flex gap-4">{socials}</div>
        </nav>
      )}
    </header>
  )
}
