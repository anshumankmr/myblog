import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), 'content/blogs');

export interface Post {
  title: string;
  date: string;
  articleId: string;
  slug: string;
  content: string;
}

export function getAllPosts(): Post[] {
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
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPost(date: string, slug: string): Post | null {
  return getAllPosts().find(p => p.date === date && p.slug === slug) ?? null;
}
