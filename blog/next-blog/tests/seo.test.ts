import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { renderToStaticMarkup } from 'react-dom/server';
import { personJsonLd, serializeJsonLd } from '../lib/structured-data';
import { pageMetadata } from '../lib/metadata';
import ContactPage from '../app/contact/page';

test('Person data connects the primary handle to real profiles and a locally hosted portrait', () => {
  assert.equal(personJsonLd['@type'], 'Person');
  assert.equal(personJsonLd.name, 'Anshuman Kumar');
  assert.equal(personJsonLd.alternateName, 'anshuman_kmr');
  assert.equal(personJsonLd.url, 'https://anshumankumar.net/');
  const contact = renderToStaticMarkup(ContactPage());
  for (const url of personJsonLd.sameAs) assert(contact.includes(url.replace(/&/g, '&amp;')));
  assert.equal(personJsonLd.image, 'https://anshumankumar.net/images/anshuman-kumar.jpg');
  const portrait = readFileSync(join(process.cwd(), 'public/images/anshuman-kumar.jpg'));
  assert.equal(portrait.subarray(0, 3).toString('hex'), 'ffd8ff');
});

test('structured data cannot terminate its script element', () => {
  const data = { name: '</script><script>alert("x")</script>', bio: 'A & B' };
  const serialized = serializeJsonLd(data);
  assert(!serialized.includes('<'));
  assert.deepEqual(JSON.parse(serialized), data);
});

test('article metadata keeps its own canonical and preview image while retaining the creator', () => {
  const metadata = pageMetadata('A project', 'A project description.', '/article/2026-10-04/project/', '/og/project-id');
  assert.equal(metadata.alternates?.canonical, '/article/2026-10-04/project/');
  assert.equal(metadata.twitter?.creator, '@anshuman_kmr');
  assert.match(JSON.stringify(metadata.openGraph?.images), /\/og\/project-id/);
  assert(!JSON.stringify(metadata.openGraph?.images).includes('/opengraph-image'));
});
