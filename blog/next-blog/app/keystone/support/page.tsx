import Link from 'next/link';
import { GoogleFormEmbed } from '@/components/keystone/google-form-embed';
import { pageMetadata } from '@/lib/metadata';
import { FEEDBACK_FORM } from '@/lib/keystone';
import { TipJar } from '@/components/keystone/tip-jar';

export const metadata = pageMetadata(
  'Keystone support and feedback',
  'Report a bug, flag a wrong nudge, or suggest an idea for the Keystone Chrome extension.',
  '/keystone/support/',
);

export default function KeystoneSupportPage() {
  return (
    <div className="page-container">
      <p className="meta">Keystone · <Link href="/privacy/keystone/">Privacy policy</Link></p>
      <h1 className="mt-3">Support and feedback</h1>
      <p className="page-intro">
        Report a bug, tell me about a nudge that got it wrong, or suggest an idea. You don’t need to leave your email unless you want a reply.
      </p>
      <p className="mt-4 meta">
        Tip: if a nudge was wrong, include the kind of page and what you were working on, not the full address.
      </p>
      <GoogleFormEmbed
        form={FEEDBACK_FORM}
        title="Keystone feedback form"
        fallback={<p className="mt-8">The feedback form is being set up. Please check back in a day or two.</p>}
      />
      <TipJar />
    </div>
  );
}
