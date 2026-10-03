import { readFileSync, writeFileSync, mkdirSync, readdirSync, unlinkSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import { fetchFilms } from './activity.mjs';
import { diaryDate, readNutrition } from '../../../server/myfitnesspal.mjs';

const API_BASE = 'https://anshumankmr.github.io/generated';
const CONTENT_DIR = fileURLToPath(new URL('../content/', import.meta.url));

async function getFeed(name, optional = false) {
  if (process.env.BLOG_CONTENT_DIR) return JSON.parse(readFileSync(join(process.env.BLOG_CONTENT_DIR, name), 'utf8'));
  const response = await fetch(`${API_BASE}/${name}`, { signal: AbortSignal.timeout(20000) });
  // Support deploying the frontend before the notes feed is first published.
  if (optional && response.status === 404) return { data: [] };
  if (!response.ok) throw new Error(`Failed to fetch ${name}: ${response.status}`);
  return response.json();
}
function writeEntries(directory, entries) {
  const location = join(CONTENT_DIR, directory);
  mkdirSync(location, { recursive: true });
  for (const file of readdirSync(location)) if (file.endsWith('.md')) unlinkSync(join(location, file));
  for (const entry of entries) writeFileSync(join(location, entry.filename), matter.stringify(entry.content, entry.frontmatter), 'utf8');
}

async function main() {
  const [postsFeed, notesFeed, films, nutrition] = await Promise.all([
    getFeed('content.json'), getFeed('notes.json', true), fetchFilms(), readNutrition(diaryDate()),
  ]);
  const posts = postsFeed.data.map(({ attributes: attrs }) => {
    const slug = attrs.Title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
    const date = String(attrs.date).slice(0, 10);
    return {
      filename: `${date}-${slug}.md`, content: attrs.Content,
      frontmatter: { title: attrs.Title, date, articleId: attrs.articleId, slug,
        sourcePath: attrs.sourcePath || `content/${date}-${attrs.slug || slug}.md`,
        ...(attrs.description ? { description: attrs.description } : {}) },
    };
  });
  const notes = notesFeed.data.map(note => {
    if (!/^[a-zA-Z0-9-]+$/.test(note.slug) || !note.noteId || !note.content?.trim() || !/(?:Z|[+-]\d{2}:\d{2})$/.test(note.publishedAt) || Number.isNaN(Date.parse(note.publishedAt))) throw new Error('Invalid note in notes.json');
    return { filename: `${note.slug}.md`, content: note.content,
      frontmatter: { noteId: note.noteId, slug: note.slug, publishedAt: note.publishedAt } };
  });
  writeEntries('blogs', posts);
  writeEntries('notes', notes);
  writeFileSync(join(CONTENT_DIR, 'activity.json'), JSON.stringify({
    fetchedAt: new Date().toISOString(), films,
    nutrition: nutrition.status === 'ok' ? nutrition : null,
  }, null, 2));
  console.log(`Fetched ${posts.length} posts, ${notes.length} notes, ${films.length} films.`);
}
main().catch(error => { console.error(error.message); process.exit(1); });
