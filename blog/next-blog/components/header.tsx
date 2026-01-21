'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaLinkedin, FaGithub, FaBars, FaTimes } from 'react-icons/fa';
import { ThemeToggle } from './theme-toggle';

const navLinks = [
  { href: '/blogs', label: 'Blogs' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const externalLinks = [
  {
    href: 'https://www.linkedin.com/in/anshumankumarcs/',
    label: 'LinkedIn',
    icon: FaLinkedin,
  },
  {
    href: 'https://github.com/anshumankmr',
    label: 'GitHub',
    icon: FaGithub,
  },
];

const resumeLink =
  'https://drive.google.com/file/d/1ioGDUrQ6299VEw7-2QaC4kcNxIuaGGai/view?usp=drive_link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-dark sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="text-white font-heading text-lg sm:text-xl font-bold hover:text-accent transition-colors"
          >
            Les Pensées d&apos;Anshuman
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-accent transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
            {externalLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-accent transition-colors"
                aria-label={link.label}
              >
                <link.icon className="w-5 h-5" />
              </a>
            ))}
            <a
              href={resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent border border-accent px-3 py-1 rounded hover:bg-accent hover:text-white transition-colors font-medium"
            >
              Resume
            </a>
            <ThemeToggle />
          </nav>

          {/* Theme toggle + Mobile menu button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              className="text-gray-300 hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <FaTimes className="w-6 h-6" />
              ) : (
                <FaBars className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-800">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-300 hover:text-accent transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-4 pt-2">
                {externalLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-accent transition-colors"
                    aria-label={link.label}
                  >
                    <link.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
              <a
                href={resumeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent border border-accent px-3 py-2 rounded text-center hover:bg-accent hover:text-white transition-colors font-medium"
              >
                Resume
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
