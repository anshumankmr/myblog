import type { Metadata } from 'next';
import Link from 'next/link';

// There's no Keystone landing page. Older builds of the extension link here
// ("Help center"), so forward to support instead of showing a 404. In
// production, public/_redirects does this with a 301 before this page loads.
export const metadata: Metadata = {
  title: 'Keystone support',
  robots: { index: false, follow: true },
  alternates: { canonical: '/keystone/support/' },
};

export default function KeystoneForward() {
  return (
    <div className="page-container">
      <meta httpEquiv="refresh" content="0; url=/keystone/support/" />
      <p className="page-intro">
        Looking for Keystone help? <Link href="/keystone/support/">Go to support</Link>.
      </p>
    </div>
  );
}
