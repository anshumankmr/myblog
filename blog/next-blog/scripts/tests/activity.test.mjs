import test from 'node:test';
import assert from 'node:assert/strict';
import { parseFilms, fetchFilms } from '../activity.mjs';

const xml = `<rss><channel>
<item><letterboxd:filmTitle>A &amp; B</letterboxd:filmTitle><letterboxd:filmYear>2026</letterboxd:filmYear><letterboxd:watchedDate>2026-10-03</letterboxd:watchedDate><letterboxd:memberRating>0.5</letterboxd:memberRating><letterboxd:rewatch>Yes</letterboxd:rewatch><link>https://letterboxd.com/owner/film/a/</link></item>
<item><title>A list, not a watch</title><link>https://letterboxd.com/owner/list/a/</link></item>
</channel></rss>`;
test('Letterboxd handles one watch, XML entities, half stars, and ignores lists', () => {
  assert.deepEqual(parseFilms(xml), [{ title: 'A & B', year: '2026', date: '2026-10-03', rating: 0.5, rewatch: true, href: 'https://letterboxd.com/owner/film/a/' }]);
  assert.deepEqual(parseFilms('<rss><channel/></rss>'), []);
  assert.deepEqual(parseFilms(xml.replace('0.5', '')), [{ title: 'A & B', year: '2026', date: '2026-10-03', rating: null, rewatch: true, href: 'https://letterboxd.com/owner/film/a/' }]);
});
test('Letterboxd failures omit the section', async () => {
  assert.deepEqual(await fetchFilms(async () => new Response('', { status: 503 })), []);
});
