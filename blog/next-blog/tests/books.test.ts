import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { renderToStaticMarkup } from 'react-dom/server';
import RecentBooks from '../components/recent-books';
import RecentRides from '../components/recent-rides';
import RecentFilms from '../components/recent-films';
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
    assert.deepEqual(getActivity(), { fetchedAt: '', films: [], books: [], rides: [], nutrition: null });
    mkdirSync(join(root, 'content'));
    const legacy = { fetchedAt: '2026-10-03T12:00:00Z', films: [], nutrition: null };
    writeFileSync(join(root, 'content/activity.json'), JSON.stringify(legacy));
    assert.deepEqual(getActivity(), { ...legacy, books: [], rides: [] });
  } finally { process.chdir(previous); rmSync(root, { recursive: true }); }
});

test('rides render as a native tile with totals, and fall back to the Strava embed without data', () => {
  const rides = [
    { id: '1', href: 'https://www.strava.com/activities/1', title: 'Sunday Morning Ride', date: '2026-11-22', virtual: false, distanceKm: 41.3, elapsedSeconds: 13272, climbMeters: 282 },
    { id: '2', href: 'https://www.strava.com/activities/2', title: 'Coast to Coast in Watopia', date: '2026-11-13', virtual: true, distanceKm: 24.3, elapsedSeconds: 3194, climbMeters: 154 },
  ];
  const html = renderToStaticMarkup(RecentRides({ rides }));
  assert(!html.includes('<iframe'));
  assert.match(html, /<dd>65\.6<\/dd>/);
  assert.match(html, /<dd>4:34<\/dd>/);
  assert.match(html, /<dd>436<\/dd>/);
  assert.match(html, /3:41:12/);
  assert.match(html, /53:14/);
  assert.match(html, /Zwift/);
  assert.match(html, /Powered by Strava/);
  assert(html.includes(PERSON.profiles.strava));
  assert(!html.includes('<script'));
  const fallback = renderToStaticMarkup(RecentRides({ rides: [] }));
  assert.match(fallback, /<iframe/);
  assert.match(fallback, /latest-rides/);
});

test('films show their Letterboxd poster, with a plain placeholder when there is none', () => {
  const film = { title: 'A & B', date: '2026-10-03', href: 'https://letterboxd.com/owner/film/a/', year: '2026', rating: 4.5, rewatch: false, poster: 'https://a.ltrbxd.com/resized/film-poster/1/a-0-600-0-900-crop.jpg?v=abc' };
  const withPoster = renderToStaticMarkup(RecentFilms({ films: [film] }));
  assert.match(withPoster, /<img alt="" loading="lazy"[^>]*src="https:\/\/a\.ltrbxd\.com\//);
  assert.match(withPoster, /A &amp; B/);
  assert.match(withPoster, /aria-label="4.5 out of 5 stars"/);
  const without = renderToStaticMarkup(RecentFilms({ films: [{ ...film, poster: null }, { ...film, href: 'https://letterboxd.com/owner/film/b/', poster: undefined }] }));
  assert(!without.includes('<img'));
  assert.equal((without.match(/film-poster-empty/g) ?? []).length, 2);
  assert.equal(renderToStaticMarkup(RecentFilms({ films: [] })), '');
});
