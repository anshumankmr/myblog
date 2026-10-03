import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { getExcerpt } from './markdown';

export interface Post {
  title: string;
  date: string;
  articleId: string;
  slug: string;
  content: string;
  description: string;
  sourcePath?: string;
}

export function getAllPosts(): Post[] {
  const CONTENT_DIR = path.join(process.cwd(), 'content/blogs');
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.md'));
  return files
    .map(f => {
      const { data, content } = matter(fs.readFileSync(path.join(CONTENT_DIR, f), 'utf8'));
      return {
        title: data.title as string,
        date: data.date as string,
        articleId: data.articleId as string,
        slug: data.slug as string,
        content,
        description: data.description || getExcerpt(content),
        sourcePath: data.sourcePath,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export interface Note {
  noteId: string;
  slug: string;
  publishedAt: string;
  content: string;
}

export function getAllNotes(): Note[] {
  const directory = path.join(process.cwd(), 'content/notes');
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory).filter(file => file.endsWith('.md')).map(file => {
    const { data, content } = matter(fs.readFileSync(path.join(directory, file), 'utf8'));
    return { noteId: data.noteId, slug: data.slug, publishedAt: data.publishedAt, content };
  }).sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
}

export function getNote(slug: string): Note | null {
  return getAllNotes().find(note => note.slug === slug) ?? null;
}

export function getPost(date: string, slug: string): Post | null {
  return getAllPosts().find(p => p.date === date && p.slug === slug) ?? null;
}
