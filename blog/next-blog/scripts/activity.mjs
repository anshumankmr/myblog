import { XMLParser, XMLValidator } from 'fast-xml-parser';

export const LETTERBOXD_USERNAME = 'jabwemetguy';
export const STRAVA_PROFILE = 'https://www.strava.com/athletes/34639203';
// Public account ID from the supplied Goodreads widget.
export const GOODREADS_USER_ID = '53014278';
export const GOODREADS_RSS_URL = `https://www.goodreads.com/review/list_rss/${GOODREADS_USER_ID}?shelf=read&sort=date_added&order=d`;

export function parseFilms(xml, limit = 4) {
  const feed = new XMLParser({ parseTagValue: false, processEntities: true }).parse(xml);
  const items = feed?.rss?.channel?.item;
  if (!items) return [];
  return (Array.isArray(items) ? items : [items]).flatMap(item => {
    const date = item['letterboxd:watchedDate'];
    const title = item['letterboxd:filmTitle'];
    const href = item.link;
    if (!title || !/^\d{4}-\d{2}-\d{2}$/.test(date || '') || !String(href).startsWith('https://letterboxd.com/')) return [];
    const rating = item['letterboxd:memberRating'];
    return [{ title, date, href, year: item['letterboxd:filmYear'],
      rating: rating === undefined || rating === '' ? null : Number(rating),
      rewatch: item['letterboxd:rewatch'] === 'Yes' }];
  }).sort((a, b) => b.date.localeCompare(a.date)).slice(0, limit);
}

export async function fetchFilms(fetchImpl = fetch) {
  try {
    const response = await fetchImpl(`https://letterboxd.com/${LETTERBOXD_USERNAME}/rss/`, { signal: AbortSignal.timeout(10000) });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return parseFilms(await response.text());
  } catch {
    console.warn('Letterboxd unavailable; omitting recent films from this build.');
    return [];
  }
}

function goodreadsLink(value) {
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' || !['goodreads.com', 'www.goodreads.com'].includes(url.hostname) ||
      url.username || url.password || !/^\/(book|review)\/show\/\d+/.test(url.pathname)) return null;
    url.search = '';
    url.hash = '';
    return url.href;
  } catch { return null; }
}

function bookCover(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && (url.hostname === 'gr-assets.com' || url.hostname.endsWith('.gr-assets.com')) &&
      !url.username && !url.password ? url.href : null;
  } catch { return null; }
}

export function parseBooks(xml, limit = 4) {
  if (XMLValidator.validate(xml) !== true) return [];
  const feed = new XMLParser({ parseTagValue: false, processEntities: true }).parse(xml);
  const items = feed?.rss?.channel?.item;
  if (!items) return [];
  const seen = new Set();
  return (Array.isArray(items) ? items : [items]).flatMap(item => {
    const title = typeof item.title === 'string' ? item.title.trim() : '';
    const href = goodreadsLink(item.link);
    if (!title || !href || seen.has(href)) return [];
    seen.add(href);
    const rating = Number(item.user_rating);
    const readAt = item.user_read_at ? Date.parse(item.user_read_at) : NaN;
    return [{ title, href, author: typeof item.author_name === 'string' ? item.author_name.trim() : '',
      cover: bookCover(item.book_medium_image_url) || bookCover(item.book_image_url),
      date: Number.isFinite(readAt) ? new Date(readAt).toISOString().slice(0, 10) : null,
      rating: Number.isInteger(rating) && rating >= 1 && rating <= 5 ? rating : null }];
  }).slice(0, limit);
}

export async function fetchBooks(fetchImpl = fetch) {
  try {
    const response = await fetchImpl(GOODREADS_RSS_URL, { signal: AbortSignal.timeout(10000) });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return parseBooks(await response.text());
  } catch {
    console.warn('Goodreads unavailable; omitting books from this build.');
    return [];
  }
}
