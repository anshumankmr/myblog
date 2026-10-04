import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { renderToStaticMarkup } from 'react-dom/server';
import RecentBooks from '../components/recent-books';
import { getActivity, type Book } from '../lib/activity';
import { PERSON } from '../lib/identity';

test('books render accessible ratings, covers, authors, and known read dates without a widget script', () => {
  const book: Book = { title: 'A & B', author: 'Some Author', href: 'https://www.goodreads.com/review/show/1',
    cover: 'https://i.gr-assets.com/cover.jpg', date: '2012-01-01', rating: 4 };
  const html = renderToStaticMarkup(RecentBooks({ books: [book] }));
  assert.match(html, /Books read/);
  assert.match(html, /A &amp; B/);
  assert.match(html, /Some Author/);
  assert.match(html, /src="https:\/\/i.gr-assets.com\/cover.jpg"/);
  assert.match(html, /loading="lazy"/);
  assert.match(html, /aria-label="4 out of 5 stars"/);
  assert.match(html, /<time dateTime="2012-01-01">2012-01-01<\/time>/);
  assert(html.includes(PERSON.profiles.goodreads));
  assert(!html.includes('<script'));
  const undated = renderToStaticMarkup(RecentBooks({ books: [{ ...book, date: null, rating: null, cover: null }] }));
  assert(!undated.includes('<time'));
  assert(!undated.includes('out of 5 stars'));
  assert.match(undated, /book-cover-placeholder/);
  assert.equal(renderToStaticMarkup(RecentBooks({ books: [] })), '');
});

test('activity snapshots without books remain compatible and missing snapshots stay empty', () => {
  const root = mkdtempSync(join(tmpdir(), 'anshuman-books-test-'));
  const previous = process.cwd();
  try {
    process.chdir(root);
    assert.deepEqual(getActivity(), { fetchedAt: '', films: [], books: [], nutrition: null });
    mkdirSync(join(root, 'content'));
    const legacy = { fetchedAt: '2026-10-03T12:00:00Z', films: [], nutrition: null };
    writeFileSync(join(root, 'content/activity.json'), JSON.stringify(legacy));
    assert.deepEqual(getActivity(), { ...legacy, books: [] });
  } finally { process.chdir(previous); rmSync(root, { recursive: true }); }
});
