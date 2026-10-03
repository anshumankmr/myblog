import { XMLParser } from 'fast-xml-parser';

export const LETTERBOXD_USERNAME = 'jabwemetguy';
export const STRAVA_PROFILE = 'https://www.strava.com/athletes/34639203';

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

