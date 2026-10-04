import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { getExcerpt, renderMarkdown } from '../lib/markdown';
import { getAllNotes, getAllPosts, getNote } from '../lib/content';
import { formatNoteTimestamp, formatDate } from '../lib/utils';
import { GET as rss } from '../app/rss.xml/route';
import { renderToStaticMarkup } from 'react-dom/server';
import Note from '../components/note';
import { generateStaticParams, generateMetadata } from '../app/notes/[slug]/page';
import sitemap from '../app/sitemap';
import robots from '../app/robots';

test('excerpts remove Markdown images, keep inline code, and end at sentences or words', () => {
  assert.equal(getExcerpt('![](https://example.com/image.png)\n\nA **real** paragraph with [a link](https://example.com).'), 'A real paragraph with a link.');
  assert.equal(getExcerpt('Use `npm run build` to build it.'), 'Use npm run build to build it.');
  assert.equal(getExcerpt('First sentence. A second sentence that exceeds the limit.', 22), 'First sentence.');
  assert.equal(getExcerpt('A sentence without punctuation that is rather long', 23), 'A sentence without…');
});

test('Markdown highlights code into HTML and removes dangerous links and raw HTML', async () => {
  const html = await renderMarkdown('```python\ndef hello():\n    return "world"\n```\n\n[bad](javascript:alert%281%29)\n\n<script>alert(1)</script>');
  assert.match(html, /class="shiki github-dark"/);
  assert.match(html, /style="color:/);
  assert(!html.includes('href="javascript:'));
  assert(!html.includes('<script>'));
});

test('timestamps consistently use India time and article dates retain their ISO day', () => {
  assert.equal(formatNoteTimestamp('2026-10-03T23:00:00Z'), '2026-10-04 · 04:30 IST');
  assert.equal(formatDate('2026-06-27'), '2026-06-27');
});

test('notes have stable permalinks, exclude drafts, and share an escaped RSS feed with posts', async () => {
  const root = mkdtempSync(join(tmpdir(), 'anshuman-blog-content-test-'));
  const previous = process.cwd();
  try {
    for (const folder of ['blogs', 'notes', 'draft_notes']) mkdirSync(join(root, 'content', folder), { recursive: true });
    writeFileSync(join(root, 'content/blogs/post.md'), '---\ntitle: "A & B"\ndate: "2026-10-03"\narticleId: post-id\nslug: a-b\ndescription: "Custom summary."\nsourcePath: content/post.md\n---\nOriginal article.');
    writeFileSync(join(root, 'content/notes/note.md'), '---\nnoteId: note-id\nslug: permanent-note-address\npublishedAt: "2026-10-03T23:00:00Z"\n---\nA **short** thought & a [link](https://example.com).');
    writeFileSync(join(root, 'content/draft_notes/draft.md'), '---\nnoteId: draft-id\n---\nPrivate draft.');
    process.chdir(root);
    assert.equal(getAllPosts()[0].description, 'Custom summary.');
    assert.equal(getAllNotes().length, 1);
    const entries = sitemap();
    assert.equal(entries.length, 8);
    assert.deepEqual(entries.map(entry => entry.url).sort(), [
      'https://anshumankumar.net/',
      'https://anshumankumar.net/about/',
      'https://anshumankumar.net/blogs/',
      'https://anshumankumar.net/notes/',
      'https://anshumankumar.net/now/',
      'https://anshumankumar.net/contact/',
      'https://anshumankumar.net/article/2026-10-03/a-b/',
      'https://anshumankumar.net/notes/permanent-note-address/',
    ].sort());
    assert.deepEqual(entries[0].images, ['https://anshumankumar.net/images/anshuman-kumar.jpg']);
    assert.equal(robots().sitemap, 'https://anshumankumar.net/sitemap.xml');
    assert.equal(getNote('permanent-note-address')?.noteId, 'note-id');
    assert.equal(getNote('missing'), null);
    assert.deepEqual(generateStaticParams(), [{ slug: 'permanent-note-address' }]);
    const metadata = await generateMetadata({ params: Promise.resolve({ slug: 'permanent-note-address' }) });
    assert.equal(metadata.alternates?.canonical, '/notes/permanent-note-address/');
    assert.match(JSON.stringify(metadata.openGraph?.images), /\/og\/note-id/);
    const markup = renderToStaticMarkup(await Note({ note: getAllNotes()[0] }));
    assert.match(markup, /class="note"/);
    assert.match(markup, /<strong>short<\/strong>/);
    assert.match(markup, /2026-10-04 · 04:30 IST/);
    const response = rss();
    assert.equal(response.headers.get('Content-Type'), 'application/rss+xml; charset=utf-8');
    const xml = await response.text();
    assert.match(xml, /<title>A &amp; B<\/title>/);
    assert.match(xml, /https:\/\/anshumankumar.net\/notes\/permanent-note-address\//);
    assert.match(xml, /A short thought &amp; a link\./);
    assert(!xml.includes('Private draft'));
    assert.equal((xml.match(/<item>/g) || []).length, 2);
    assert(xml.indexOf('/notes/') < xml.indexOf('/article/'));
  } finally { process.chdir(previous); rmSync(root, { recursive: true }); }
});

test('an empty content store produces only public section URLs, without placeholder notes', () => {
  const root = mkdtempSync(join(tmpdir(), 'anshuman-blog-empty-test-'));
  const previous = process.cwd();
  try {
    process.chdir(root);
    assert.equal(sitemap().length, 6);
    assert(!JSON.stringify(sitemap()).includes('_empty'));
  } finally { process.chdir(previous); rmSync(root, { recursive: true }); }
});
