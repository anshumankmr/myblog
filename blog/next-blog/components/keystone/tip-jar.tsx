import { TIP_URL, hasTipLink } from '@/lib/keystone';

/**
 * A one-time "Buy me a coffee" tip. Uses the official button from Buy Me a
 * Coffee's brand kit, unmodified, as their guidelines ask. Renders nothing
 * until TIP_URL is set.
 */
export function TipJar() {
  if (!hasTipLink) return null;
  return (
    <section id="tip" className="section" aria-labelledby="tip-heading">
      <h2 id="tip-heading" className="section-title">Enjoying Keystone?</h2>
      <p>
        Keystone is free and stays free. If it has helped you focus, you can buy me a coffee. It’s a
        one-time tip, it doesn’t unlock anything, and it helps me keep working on it.
      </p>
      <a
        href={TIP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-block rounded-lg transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- static export, fixed-size brand asset */}
        <img src="/keystone/bmc-button.svg" alt="Buy me a coffee" width={218} height={61} loading="lazy" decoding="async" />
      </a>
      <p className="meta mt-3">One-time payment through Buy Me a Coffee. No subscription.</p>
    </section>
  );
}
