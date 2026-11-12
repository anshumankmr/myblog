import { SUPPORT_TIERS, hasSupportLinks } from '@/lib/keystone';

/** One-time contribution links. Renders nothing until a payment page is configured. */
export function SupportTiers() {
  if (!hasSupportLinks) return null;
  const tiers = SUPPORT_TIERS.filter(tier => tier.url);
  return (
    <section className="section" aria-labelledby="support-heading">
      <h2 id="support-heading" className="section-title">Enjoying Keystone? Support its development.</h2>
      <p>A one-time contribution helps fund continued development and maintenance. It doesn’t unlock anything: everything is already free.</p>
      <ul className="mt-6 grid grid-cols-3 gap-3" role="list">
        {tiers.map(tier => (
          <li key={tier.amount}>
            <a
              href={tier.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-md text-center no-underline transition-colors hover:bg-surface-sunken"
              style={{
                padding: '20px 8px',
                border: `${tier.featured ? 2 : 1}px solid ${tier.featured ? 'var(--accent)' : 'var(--border-subtle)'}`,
              }}
            >
              <span className="block text-2xl font-semibold" style={{ fontFamily: 'var(--font-display)', color: tier.featured ? 'var(--accent)' : 'var(--text-heading)' }}>
                {tier.amount}
              </span>
              <span className="meta mt-1 block">{tier.label}</span>
            </a>
          </li>
        ))}
      </ul>
      <p className="meta mt-3">One-time payment. No recurring billing.</p>
    </section>
  );
}
