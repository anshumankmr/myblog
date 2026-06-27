'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaLinkedin, FaGithub, FaBars, FaTimes } from 'react-icons/fa';
import { ThemeToggle } from './theme-toggle';

const navLinks = [
  { href: '/blogs',   label: 'Essays' },
  { href: '/about',   label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const externalLinks = [
  { href: 'https://www.linkedin.com/in/anshumankumarcs/', label: 'LinkedIn', icon: FaLinkedin },
  { href: 'https://github.com/anshumankmr',              label: 'GitHub',   icon: FaGithub  },
];

const resumeLink = 'https://drive.google.com/file/d/1ioGDUrQ6299VEw7-2QaC4kcNxIuaGGai/view?usp=drive_link';

const eyebrowBase: React.CSSProperties = {
  fontFamily: 'var(--font-ui)',
  fontSize: 'var(--text-eyebrow)',
  fontWeight: 500,
  letterSpacing: 'var(--tracking-caps)',
  textTransform: 'uppercase',
  textDecoration: 'none',
  transition: 'color var(--dur-normal) var(--ease-standard)',
};

function NavLink({ href, label }: { href: string; label: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={href}
      style={{
        ...eyebrowBase,
        color: hovered ? 'var(--text-heading)' : 'var(--text-meta)',
        paddingBottom: '4px',
        borderBottom: hovered ? '1px solid var(--border-subtle)' : '1px solid transparent',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
    </Link>
  );
}

function IconLink({ href, label, Icon }: { href: string; label: string; Icon: React.ComponentType }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      style={{
        color: hovered ? 'var(--accent)' : 'var(--text-meta)',
        fontSize: '15px',
        transition: 'color var(--dur-normal) var(--ease-standard)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Icon />
    </a>
  );
}

function ResumeLink() {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={resumeLink}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        ...eyebrowBase,
        color: hovered ? 'var(--accent-strong)' : 'var(--accent)',
        borderBottom: '1px solid currentColor',
        paddingBottom: '2px',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      Résumé
    </a>
  );
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header style={{
      background: 'var(--surface-page)',
      borderBottom: '1px solid var(--border-hairline)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backdropFilter: 'saturate(180%) blur(6px)',
      WebkitBackdropFilter: 'saturate(180%) blur(6px)',
    }}>
      <div style={{ maxWidth: 'var(--container-wide)', margin: '0 auto', padding: '0 var(--space-8)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>

          {/* Wordmark */}
          <Link href="/" style={{ textDecoration: 'none' }}>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: '26px',
              lineHeight: 1,
              letterSpacing: '-0.01em',
              color: 'var(--text-display)',
            }}>
              Notes by Anshuman
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center" style={{ gap: 'var(--space-8)' }}>
            {navLinks.map((link) => (
              <NavLink key={link.href} href={link.href} label={link.label} />
            ))}

            <span style={{ width: '1px', height: '14px', background: 'var(--border-subtle)', display: 'inline-block' }} />

            {externalLinks.map((link) => (
              <IconLink key={link.href} href={link.href} label={link.label} Icon={link.icon} />
            ))}

            <ResumeLink />
            <ThemeToggle />
          </nav>

          {/* Mobile: toggle + burger */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              style={{ color: 'var(--text-meta)', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {isMenuOpen && (
          <nav className="md:hidden py-6 flex flex-col gap-5" style={{ borderTop: '1px solid var(--border-hairline)' }}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{ ...eyebrowBase, color: 'var(--text-meta)' }}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-5 pt-2">
              {externalLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  style={{ color: 'var(--text-meta)', fontSize: '16px' }}
                >
                  <link.icon />
                </a>
              ))}
            </div>
            <a
              href={resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                ...eyebrowBase,
                color: 'var(--accent)',
                borderBottom: '1px solid var(--accent)',
                paddingBottom: '2px',
                display: 'inline-block',
                alignSelf: 'flex-start',
              }}
            >
              Résumé
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
