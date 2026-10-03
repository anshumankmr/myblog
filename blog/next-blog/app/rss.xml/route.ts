import { getAllPosts, getAllNotes } from '@/lib/content';
import { getExcerpt } from '@/lib/markdown';
import { SITE_URL, SITE_TITLE, SITE_DESCRIPTION } from '@/lib/metadata';

export const dynamic = 'force-static';
const xml = (text: string) => text.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' }[char]!));

export function GET() {
  const entries = [
    ...getAllPosts().map(post => ({ title: post.title, description: post.description, date: `${post.date}T00:00:00+05:30`, url: `${SITE_URL}/article/${post.date}/${post.slug}/` })),
    ...getAllNotes().map(note => ({ title: getExcerpt(note.content, 80), description: getExcerpt(note.content, 400), date: note.publishedAt, url: `${SITE_URL}/notes/${note.slug}/` })),
  ].sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
  const items = entries.map(entry => `<item><title>${xml(entry.title)}</title><link>${xml(entry.url)}</link><guid isPermaLink="true">${xml(entry.url)}</guid><pubDate>${new Date(entry.date).toUTCString()}</pubDate><description>${xml(entry.description)}</description></item>`).join('\n');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel>
<title>${xml(SITE_TITLE)}</title><link>${SITE_URL}/</link><description>${xml(SITE_DESCRIPTION)}</description><language>en</language>
<atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
${items}</channel></rss>`, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
