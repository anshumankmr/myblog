import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { KeystoneShell } from '@/components/keystone/keystone-shell';
import { PERSON } from '@/lib/identity';

export const metadata: Metadata = {
  // The blog's SEO check requires the author's name in every indexed title.
  title: { default: `Keystone by ${PERSON.name}`, template: `%s · Keystone by ${PERSON.name}` },
  icons: { icon: '/keystone/icon128-v2.png' },
};

export default function KeystoneLayout({ children }: { children: ReactNode }) {
  return <KeystoneShell>{children}</KeystoneShell>;
}
