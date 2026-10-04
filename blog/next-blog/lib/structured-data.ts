import { PERSON, SITE_URL } from './identity';
import { SITE_DESCRIPTION } from './metadata';

export const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: PERSON.name,
  alternateName: PERSON.handle,
  url: `${SITE_URL}/`,
  image: `${SITE_URL}${PERSON.image}`,
  description: SITE_DESCRIPTION,
  jobTitle: PERSON.jobTitle,
  worksFor: { '@type': 'Organization', name: PERSON.employer },
  homeLocation: {
    '@type': 'Place',
    name: PERSON.city,
    address: { '@type': 'PostalAddress', addressLocality: PERSON.city, addressCountry: 'IN' },
  },
  sameAs: Object.values(PERSON.profiles),
};

export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
