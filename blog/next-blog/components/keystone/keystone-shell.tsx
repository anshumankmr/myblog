import type { ReactNode } from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { CWS_URL, TIP_URL, hasTipLink } from '@/lib/keystone';
import { PERSON, SITE_URL } from '@/lib/identity';

/** Keystone's own header and footer, so its pages read as Keystone's site rather than blog pages. */
export function KeystoneShell({ children }: { children: ReactNode }) {
  return (
    <div className="keystone-site flex flex-1 flex-col">
      <header className="border-b border-border-hairline">
        <nav className="page-container !py-4 flex items-center justify-between gap-4" aria-label="Keystone">
          <Link href="/keystone/support/" className="flex items-center gap-2 no-underline" style={{ color: 'var(--text-heading)' }}>
            {/* eslint-disable-next-line @next/next/no-img-element -- static export, tiny fixed-size icon */}
            <img src="/keystone/icon128.png" alt="" width={28} height={28} className="rounded-md" />
            <span className="text-lg font-semibold" style={{ fontFamily: 'var(--font-display)' }}>Keystone</span>
          </Link>
          <div className="flex items-center gap-5">
            <Link href="/keystone/support/" className="meta">Support</Link>
            <Link href="/privacy/keystone/" className="meta">Privacy</Link>
            <ThemeToggle />
          </div>
        </nav>
      </header>
      <div className="flex-1">{children}</div>
      <footer className="mt-12 border-t border-border-hairline">
        <div className="page-container !py-6 flex items-center justify-between gap-4 flex-wrap">
          <p className="meta">
            Keystone is a free Chrome extension made by <a href={SITE_URL}>{PERSON.name}</a>.
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            {CWS_URL ? <a href={CWS_URL} className="meta" target="_blank" rel="noopener noreferrer">Chrome Web Store</a> : null}
            {hasTipLink ? <a href={TIP_URL} className="meta" target="_blank" rel="noopener noreferrer">Buy me a coffee</a> : null}
          </div>
        </div>
      </footer>
    </div>
  );
}
