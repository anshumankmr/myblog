import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { XMLParser } from 'fast-xml-parser';

const output = join(process.cwd(), 'out');
const origin = 'https://anshumankumar.net';
const read = pathname => readFileSync(join(output, pathname), 'utf8');
const tags = (html, tag) => [...html.matchAll(new RegExp(`<${tag}\\b[^>]*>`, 'g'))].map(match =>
  Object.fromEntries([...match[0].matchAll(/([\w:-]+)="([^"]*)"/g)].map(attribute => [attribute[1], attribute[2]])),
);
const persons = html => [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(match => JSON.parse(match[1]));
const robots = html => tags(html, 'meta').filter(tag => tag.name === 'robots');

const sitemap = new XMLParser().parse(read('sitemap.xml'));
const entries = [].concat(sitemap.urlset.url);
const urls = entries.map(entry => entry.loc);
assert.equal(new Set(urls).size, urls.length, 'Sitemap URLs must be unique');

for (const url of urls) {
  const parsed = new URL(url);
  assert.equal(parsed.origin, origin, `Noncanonical sitemap host: ${url}`);
  const html = read(join(parsed.pathname, 'index.html'));
  assert.deepEqual(tags(html, 'link').filter(tag => tag.rel === 'canonical').map(tag => tag.href), [url], `Canonical mismatch: ${url}`);
  assert(html.match(/<title>(.*?)<\/title>/)?.[1].includes('Anshuman Kumar'), `Missing name in title: ${url}`);
  assert(!robots(html).some(tag => tag.content.includes('noindex')), `Noindex page in sitemap: ${url}`);
  assert.equal(persons(html).length, 1, `Expected one Person: ${url}`);
  assert.equal(persons(html)[0].alternateName, 'anshuman_kmr', `Incorrect primary handle: ${url}`);
  const meta = tags(html, 'meta');
  assert.equal(meta.find(tag => tag.name === 'twitter:creator')?.content, '@anshuman_kmr', `Missing creator: ${url}`);
  for (const key of ['og:image', 'twitter:image']) {
    const image = new URL(meta.find(tag => (tag.property || tag.name) === key)?.content);
    assert.equal(image.origin, origin, `Nonlocal preview: ${url}`);
    assert.equal(readFileSync(join(output, image.pathname)).subarray(0, 8).toString('hex'), '89504e470d0a1a0a', `Missing PNG preview: ${url}`);
  }
}

// Ensure every indexable page in the export is discoverable, including new routes.
for (const file of readdirSync(output, { recursive: true }).filter(file => file.endsWith('index.html'))) {
  const html = read(file);
  const url = `${origin}/${file.slice(0, -'index.html'.length)}`;
  if (robots(html).some(tag => tag.content.includes('noindex'))) assert(!urls.includes(url), `Noindex page listed: ${file}`);
  else assert(urls.includes(url), `Indexable page missing from sitemap: ${file}`);
}

const home = read('index.html');
assert.equal(home.match(/<title>(.*?)<\/title>/)?.[1], 'Anshuman Kumar | Software Engineer in Bangalore');
assert(home.match(/<h1[^>]*>(.*?)<\/h1>/)?.[1].includes('Anshuman Kumar'), 'Homepage H1 must include surname');
const person = persons(home)[0];
assert.equal(person['@type'], 'Person');
assert.equal(person.url, `${origin}/`);
assert.equal(person.worksFor.name, 'Flexera');
assert.equal(person.homeLocation.name, 'Bangalore');
const portrait = tags(home, 'img').find(tag => tag.src === '/images/anshuman-kumar.jpg');
assert(portrait?.alt.includes(person.name), 'Missing descriptive portrait');
assert.equal(person.image, `${origin}${portrait.src}`);
assert.equal(entries[0]['image:image']['image:loc'], person.image, 'Portrait missing from image sitemap');
assert.equal(readFileSync(join(output, portrait.src)).subarray(0, 3).toString('hex'), 'ffd8ff', 'Portrait must be a real JPEG');
const contact = read('contact/index.html');
for (const profile of person.sameAs) assert(tags(contact, 'a').some(tag => tag.href === profile && tag.rel?.split(' ').includes('me')), `Unlinked profile: ${profile}`);
assert(read('robots.txt').includes(`Sitemap: ${origin}/sitemap.xml`));
assert(robots(read('404.html')).some(tag => tag.content.includes('noindex')), '404 must remain noindex');
assert(!robots(read('404.html')).some(tag => tag.content.split(/[, ]+/).includes('index')), '404 must not inherit index metadata');

console.log(`Verified SEO for ${urls.length} exported pages, including canonicals, Person data, profile links, preview images, sitemap coverage, and robots.`);
