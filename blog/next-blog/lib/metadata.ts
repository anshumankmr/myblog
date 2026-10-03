import type { Metadata } from 'next';

export const SITE_URL = 'https://anshumankumar.net';
export const SITE_TITLE = "Les Pensées d'Anshuman";
export const SITE_DESCRIPTION = 'Writing by Anshuman Kumar about software, AI, running, cycling, and films.';

export function pageMetadata(title: string, description: string, pathname: string, image = '/opengraph-image'): Metadata {
  return {
    title, description,
    alternates: { canonical: pathname, types: { 'application/rss+xml': [{ url: '/rss.xml', title: SITE_TITLE }] } },
    openGraph: {
      title, description, url: pathname, siteName: SITE_TITLE, type: 'website',
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  };
}
