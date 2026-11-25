import test from 'node:test';
import assert from 'node:assert/strict';
import { parseFilms, fetchFilms } from '../activity.mjs';

const xml = `<rss><channel>
<item><letterboxd:filmTitle>A &amp; B</letterboxd:filmTitle><letterboxd:filmYear>2026</letterboxd:filmYear><letterboxd:watchedDate>2026-10-03</letterboxd:watchedDate><letterboxd:memberRating>0.5</letterboxd:memberRating><letterboxd:rewatch>Yes</letterboxd:rewatch><link>https://letterboxd.com/owner/film/a/</link><description><![CDATA[ <p><img src="https://a.ltrbxd.com/resized/film-poster/1/a-0-600-0-900-crop.jpg?v=abc"/></p><p>Watched on Saturday.</p> ]]></description></item>
<item><title>A list, not a watch</title><link>https://letterboxd.com/owner/list/a/</link></item>
</channel></rss>`;
test('Letterboxd handles one watch, XML entities, half stars, and ignores lists', () => {
  assert.deepEqual(parseFilms(xml), [{ title: 'A & B', year: '2026', date: '2026-10-03', rating: 0.5, rewatch: true, href: 'https://letterboxd.com/owner/film/a/', poster: 'https://a.ltrbxd.com/resized/film-poster/1/a-0-600-0-900-crop.jpg?v=abc' }]);
  assert.deepEqual(parseFilms('<rss><channel/></rss>'), []);
  assert.deepEqual(parseFilms(xml.replace('0.5', '')), [{ title: 'A & B', year: '2026', date: '2026-10-03', rating: null, rewatch: true, href: 'https://letterboxd.com/owner/film/a/', poster: 'https://a.ltrbxd.com/resized/film-poster/1/a-0-600-0-900-crop.jpg?v=abc' }]);
});
test('Letterboxd posters must be https images on Letterboxd’s own CDN, otherwise the film has none', () => {
  const poster = value => parseFilms(xml.replace(/<img src="[^"]*"/, `<img src="${value}"`))[0].poster;
  for (const unsafe of ['http://a.ltrbxd.com/p.jpg', 'https://evil.example/p.jpg', 'https://a.ltrbxd.com.evil.example/p.jpg', 'https://user:pw@a.ltrbxd.com/p.jpg', 'javascript:alert(1)', '']) assert.equal(poster(unsafe), null);
  assert.equal(parseFilms(xml.replace(/<description>.*<\/description>/s, ''))[0].poster, null);
});
test('Letterboxd failures omit the section', async () => {
  assert.deepEqual(await fetchFilms(async () => new Response('', { status: 503 })), []);
});
