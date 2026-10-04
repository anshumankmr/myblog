import test from 'node:test';
import assert from 'node:assert/strict';
import { parseBooks, fetchBooks, GOODREADS_RSS_URL } from '../activity.mjs';

const item = ({ id = '1', rating = '4', date = '', cover = 'https://i.gr-assets.com/cover.jpg', link = `https://www.goodreads.com/review/show/${id}?utm_source=rss` } = {}) => `<item>
  <title>A &amp; B</title><author_name>Some Author</author_name><link><![CDATA[${link}]]></link>
  <book_medium_image_url>${cover}</book_medium_image_url><user_rating>${rating}</user_rating>
  <user_read_at>${date}</user_read_at><user_date_added>Sun, 04 Oct 2026 00:00:00 +0000</user_date_added>
  <description><![CDATA[<script>alert(1)</script>]]></description>
</item>`;
const feed = (...items) => `<rss><channel>${items.join('')}</channel></rss>`;

test('Goodreads decodes titles, reads personal ratings, and keeps undated read books in shelf order', () => {
  assert.deepEqual(parseBooks(feed(item(), item({ id: '2', date: 'Sun, 1 Jan 2012 00:00:00 +0000', rating: '5' }))), [
    { title: 'A & B', author: 'Some Author', href: 'https://www.goodreads.com/review/show/1', cover: 'https://i.gr-assets.com/cover.jpg', date: null, rating: 4 },
    { title: 'A & B', author: 'Some Author', href: 'https://www.goodreads.com/review/show/2', cover: 'https://i.gr-assets.com/cover.jpg', date: '2012-01-01', rating: 5 },
  ]);
  assert.equal(parseBooks(feed(item())).length, 1);
  assert.equal(parseBooks(feed(...Array.from({ length: 8 }, (_, index) => item({ id: String(index + 1) })))).length, 4);
});

test('Goodreads zero, missing, and invalid ratings stay unrated, without using average ratings', () => {
  const ratings = ['0', '', 'bad', '6', '-1', '3.5', '5'];
  const xml = feed(...ratings.map((rating, index) => item({ id: String(index + 1), rating }))).replaceAll('</item>', '<average_rating>4.8</average_rating></item>');
  assert.deepEqual(parseBooks(xml, 10).map(book => book.rating), [null, null, null, null, null, null, 5]);
  assert.equal(parseBooks(feed(item({ date: 'invalid date' })))[0].date, null);
});

test('Goodreads ignores malformed or non-feed responses, unsafe links, and duplicate reviews', () => {
  for (const xml of ['', '<rss><channel>', '<html><body>Sign in</body></html>', '<rss><channel/></rss>']) assert.deepEqual(parseBooks(xml), []);
  for (const link of ['javascript:alert(1)', 'https://www.goodreads.com.evil.example/review/show/1', 'https://name@www.goodreads.com/review/show/1', 'https://www.goodreads.com/user/show/1']) assert.deepEqual(parseBooks(feed(item({ link }))), []);
  assert.equal(parseBooks(feed(item(), item({ link: 'https://www.goodreads.com/review/show/1?utm_source=widget' }))).length, 1);
  const withoutCover = parseBooks(feed(item({ cover: 'https://i.gr-assets.com.evil.example/cover.jpg' })))[0];
  assert.equal(withoutCover.cover, null);
  assert(!JSON.stringify(withoutCover).includes('<script>'));
  const fallback = feed(item({ cover: '' })).replace('</item>', '<book_image_url>https://i.gr-assets.com/small.jpg</book_image_url></item>');
  assert.equal(parseBooks(fallback)[0].cover, 'https://i.gr-assets.com/small.jpg');
});

test('Goodreads fetches the supplied public read shelf and failures do not break a build', async () => {
  const books = await fetchBooks(async (url, options) => {
    assert.equal(url, GOODREADS_RSS_URL);
    assert(url.includes('/53014278?shelf=read'));
    assert(options.signal instanceof AbortSignal);
    return new Response(feed(item()));
  });
  assert.equal(books.length, 1);
  assert.deepEqual(await fetchBooks(async () => new Response('', { status: 503 })), []);
  assert.deepEqual(await fetchBooks(async () => { throw new Error('Network unavailable'); }), []);
  assert.deepEqual(await fetchBooks(async () => new Response('<html>Sign in</html>')), []);
});
