import type { Metadata } from 'next';
import { FaEnvelope, FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Anshuman Kumar.',
};

const eyebrow: React.CSSProperties = {
  fontFamily: 'var(--font-ui)',
  fontSize: 'var(--text-eyebrow)',
  fontWeight: 500,
  letterSpacing: 'var(--tracking-caps)',
  textTransform: 'uppercase',
  color: 'var(--text-meta)',
};

const contacts = [
  {
    name: 'Email',
    href: 'mailto:anshumankumar.mail@gmail.com',
    icon: FaEnvelope,
    description: 'anshumankumar.mail@gmail.com',
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/anshuman-kumar-work/',
    icon: FaLinkedin,
    description: 'Connect on LinkedIn',
  },
  {
    name: 'GitHub',
    href: 'https://github.com/anshumankmr',
    icon: FaGithub,
    description: 'Check out my code',
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/anshuman_kmr',
    icon: FaTwitter,
    description: '@anshuman_kmr',
  },
];

function ContactRow({ n, contact, last }: { n: number; contact: typeof contacts[0]; last: boolean }) {
  const Icon = contact.icon;
  return (
    <li>
      <a
        href={contact.href}
        target={contact.href.startsWith('mailto') ? undefined : '_blank'}
        rel={contact.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
        style={{
          display: 'grid',
          gridTemplateColumns: '56px 32px 1fr auto 24px',
          alignItems: 'center',
          gap: 'var(--space-6)',
          padding: 'var(--space-6) var(--space-3)',
          marginLeft: 'calc(var(--space-3) * -1)',
          marginRight: 'calc(var(--space-3) * -1)',
          borderBottom: last ? 'none' : '1px solid var(--border-hairline)',
          textDecoration: 'none',
          transition: 'background var(--dur-normal) var(--ease-standard)',
        }}
        className="group hover:bg-[var(--accent-soft)]"
      >
        <span style={{ ...eyebrow, fontVariantNumeric: 'tabular-nums' }}>
          № {String(n).padStart(2, '0')}
        </span>
        <Icon style={{
          fontSize: '18px',
          color: 'var(--text-meta)',
          transition: 'color var(--dur-normal) var(--ease-standard)',
        }} className="group-hover:text-[var(--accent)]" />
        <span style={{
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontWeight: 400,
          fontSize: 'var(--text-2xl)',
          lineHeight: 1.1,
          color: 'var(--text-heading)',
          transition: 'color var(--dur-normal) var(--ease-standard)',
        }} className="group-hover:text-[var(--accent)]">
          {contact.name}
        </span>
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-base)',
          color: 'var(--text-muted)',
          maxWidth: '20rem',
        }}>
          {contact.description}
        </span>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontSize: '22px',
          color: 'var(--text-meta)',
          transition: 'color var(--dur-normal) var(--ease-standard), transform var(--dur-normal) var(--ease-standard)',
          justifySelf: 'end',
        }} className="group-hover:text-[var(--accent)] group-hover:translate-x-1">
          →
        </span>
      </a>
    </li>
  );
}

export default function ContactPage() {
  return (
    <div style={{ maxWidth: 'var(--container-text)', margin: '0 auto', padding: 'var(--space-16) var(--space-8) var(--space-24)' }}>

      {/* Eyebrow */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-8)' }}>
        <span style={{ width: '40px', height: '1px', background: 'var(--ink-400)', display: 'inline-block' }} />
        <span style={eyebrow}>Correspondence</span>
      </div>

      <h1 style={{
        margin: 0,
        fontFamily: 'var(--font-display)',
        fontStyle: 'italic',
        fontWeight: 400,
        fontSize: 'clamp(56px, 9vw, 128px)',
        lineHeight: 'var(--leading-display)',
        letterSpacing: '-0.02em',
        color: 'var(--text-display)',
      }}>
        Say hello.
      </h1>

      <p style={{
        margin: 'var(--space-8) 0 0',
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-xl)',
        lineHeight: 'var(--leading-snug)',
        color: 'var(--text-body)',
        maxWidth: '38rem',
      }}>
        I read every message. The fastest reply is on email; the most interesting conversations tend to start on LinkedIn or in the open. Take your pick.
      </p>

      <ol style={{
        margin: 'var(--space-16) 0 0',
        padding: 0,
        listStyle: 'none',
        borderTop: '1px solid var(--ink-900)',
      }}>
        {contacts.map((c, i) => (
          <ContactRow key={c.name} n={i + 1} contact={c} last={i === contacts.length - 1} />
        ))}
      </ol>
    </div>
  );
}
