import { XMLParser, XMLValidator } from 'fast-xml-parser';

export const LETTERBOXD_USERNAME = 'jabwemetguy';
export const STRAVA_PROFILE = 'https://www.strava.com/athletes/34639203';
// The public "latest rides" widget the Now page used to embed. Strava renders it as
// plain HTML, so it can be read at build time without an API app or OAuth.
export const STRAVA_WIDGET_URL = `${STRAVA_PROFILE}/latest-rides/55aab79d3b61cb1174268222ef82b6037a7f2268`;
// Public account ID from the supplied Goodreads widget.
export const GOODREADS_USER_ID = '53014278';
export const GOODREADS_RSS_URL = `https://www.goodreads.com/review/list_rss/${GOODREADS_USER_ID}?shelf=read&sort=date_added&order=d`;

// Each Letterboxd entry carries its poster, hosted on Letterboxd's own CDN, in the description.
function filmPoster(description) {
  const src = typeof description === 'string' ? /<img[^>]*\ssrc=["']([^"']+)["']/i.exec(description)?.[1] : undefined;
  try {
    const url = new URL(src ?? '');
    return url.protocol === 'https:' && (url.hostname === 'ltrbxd.com' || url.hostname.endsWith('.ltrbxd.com')) &&
      !url.username && !url.password ? url.href : null;
  } catch { return null; }
}

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
      rewatch: item['letterboxd:rewatch'] === 'Yes', poster: filmPoster(item.description) }];
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

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };
function decodeEntities(value) {
  return value.replace(/&(?:#(\d+)|#x([\da-f]+)|([a-z]+));/gi, (match, dec, hex, name) => {
    if (name) return ENTITIES[name.toLowerCase()] ?? match;
    const code = dec ? Number(dec) : parseInt(hex, 16);
    return Number.isInteger(code) && code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : match;
  });
}
const text = html => decodeEntities(html.replace(/<[^>]*>/g, '')).replace(/\s+/g, ' ').trim();
// Strava's own widget leads titles with a weather emoji and prefixes Zwift rides.
const cleanTitle = title => title.replace(/^[\p{Extended_Pictographic}\uFE0F\u200D\s]+/u, '').trim();

function durationSeconds(value) {
  const parts = value.split(':');
  if (parts.length < 2 || parts.length > 3 || !parts.every(part => /^\d{1,2}$/.test(part))) return null;
  return parts.reduce((total, part) => total * 60 + Number(part), 0);
}

/**
 * Reads rides out of Strava's latest-rides widget HTML. The markup is not a public
 * API, so anything unexpected drops that ride, and an empty result tells the page
 * to fall back to the embed. Times are elapsed time, as the widget shows them.
 */
export function parseRides(html, limit = 5) {
  const list = /<ul class=['"]activities['"]>([\s\S]*)<\/ul>\s*<\/div>/.exec(html)?.[1] ?? '';
  const rides = [];
  // Each ride opens with its map thumbnail; the stats list holds <li>s of its own.
  for (const block of list.split(/<li>\s*(?=<a class=['"]map-thumb['"])/).slice(1)) {
    const id = /href=["']https:\/\/www\.strava\.com\/activities\/(\d+)/.exec(block)?.[1];
    const heading = /<h3>([\s\S]*?)<\/h3>/.exec(block)?.[1];
    const stats = [.../<ul class=['"]stats['"]>([\s\S]*?)<\/ul>/.exec(block)?.[1].matchAll(/<li>([\s\S]*?)<\/li>/g) ?? []].map(match => text(match[1]));
    const stamp = /<p class=['"]timestamp['"]>([\s\S]*?)<\/p>/.exec(block)?.[1];
    if (!id || !heading || stats.length !== 3 || !stamp) continue;
    const distance = /^([\d,]+(?:\.\d+)?) km$/.exec(stats[0]);
    const elapsed = durationSeconds(stats[1]);
    const climb = /^([\d,]+) m$/.exec(stats[2]);
    const day = new Date(`${text(stamp).replace(/^[A-Za-z]+, /, '')} UTC`);
    if (!distance || elapsed === null || !climb || Number.isNaN(day.getTime())) continue;
    const full = text(heading);
    const zwift = /^zwift\s*[-–—:]\s*/i.test(cleanTitle(full));
    rides.push({
      id, href: `https://www.strava.com/activities/${id}`,
      title: cleanTitle(full).replace(/^zwift\s*[-–—:]\s*/i, '') || 'Ride',
      date: day.toISOString().slice(0, 10), virtual: zwift,
      distanceKm: Number(distance[1].replace(/,/g, '')), elapsedSeconds: elapsed, climbMeters: Number(climb[1].replace(/,/g, '')),
    });
  }
  // Newest first, whatever order the widget used; a stable sort keeps same-day order.
  return rides.sort((a, b) => b.date.localeCompare(a.date)).slice(0, limit);
}

export async function fetchRides(fetchImpl = fetch) {
  try {
    const response = await fetchImpl(STRAVA_WIDGET_URL, { signal: AbortSignal.timeout(10000), headers: { Accept: 'text/html' } });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const rides = parseRides(await response.text());
    if (!rides.length) throw new Error('no rides found');
    return rides;
  } catch {
    console.warn('Strava widget unavailable or changed; the Now page will use the embed.');
    return [];
  }
}
