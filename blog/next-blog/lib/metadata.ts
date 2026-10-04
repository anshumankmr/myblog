import type { Metadata } from 'next';
import { PERSON } from './identity';

export { SITE_URL } from './identity';
export const SITE_TITLE = `${PERSON.name} (@${PERSON.handle})`;
export const HOME_TITLE = `${PERSON.name} | ${PERSON.jobTitle} in ${PERSON.city}`;
export const SITE_DESCRIPTION = `${PERSON.name} (@${PERSON.handle}) is a ${PERSON.jobTitle.toLowerCase()} at ${PERSON.employer} in ${PERSON.city}, working on FinOps AI. Writing about software, AI, and life.`;

export function pageMetadata(title: string, description: string, pathname: string, image = '/opengraph-image'): Metadata {
  return {
    title, description,
    alternates: { canonical: pathname, types: { 'application/rss+xml': [{ url: '/rss.xml', title: SITE_TITLE }] } },
    openGraph: {
      title, description, url: pathname, siteName: SITE_TITLE, type: 'website', locale: 'en_IN',
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: 'summary_large_image', creator: '@anshuman_kmr', title, description, images: [image] },
  };
}
