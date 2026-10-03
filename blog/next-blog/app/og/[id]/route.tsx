import { getAllPosts, getAllNotes } from '@/lib/content';
import { getExcerpt } from '@/lib/markdown';
import { ogImage } from '@/lib/og';
import { formatNoteTimestamp } from '@/lib/utils';

export const dynamic = 'force-static';
export function generateStaticParams() {
  return [...getAllPosts().map(post => ({ id: post.articleId })), ...getAllNotes().map(note => ({ id: note.noteId }))];
}
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = getAllPosts().find(post => post.articleId === id);
  if (post) return ogImage(post.title, post.date);
  const note = getAllNotes().find(note => note.noteId === id);
  if (note) return ogImage(getExcerpt(note.content, 200), formatNoteTimestamp(note.publishedAt));
  return new Response('Not found', { status: 404 });
}
