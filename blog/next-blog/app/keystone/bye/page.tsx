import type { Metadata } from 'next';
import { GoogleFormEmbed } from '@/components/keystone/google-form-embed';
import { pageMetadata } from '@/lib/metadata';
import { UNINSTALL_FORM } from '@/lib/keystone';

// Chrome opens this page when someone removes Keystone. It's only useful to
// people arriving from an uninstall, so it stays out of search results.
export const metadata: Metadata = {
  ...pageMetadata('Sorry to see you go', 'Tell us why you removed Keystone.', '/keystone/bye/'),
  robots: { index: false, follow: false },
};

export default function KeystoneByePage() {
  return (
    <div className="page-container">
      <h1 className="mt-3">Sorry to see you go</h1>
      <p className="page-intro">
        Keystone has been removed, and everything it stored was removed with it. If you have 30 seconds, telling me why is the most useful thing you can do. It’s anonymous.
      </p>
      <GoogleFormEmbed
        form={UNINSTALL_FORM}
        title="Why did you remove Keystone?"
        fallback={<p className="mt-8">Thanks for trying Keystone.</p>}
      />
    </div>
  );
}
