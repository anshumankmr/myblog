import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllNotes, getNote } from '@/lib/content';
import { getExcerpt } from '@/lib/markdown';
import { pageMetadata } from '@/lib/metadata';
import { formatNoteTimestamp } from '@/lib/utils';
import Note from '@/components/note';

type Params = { slug: string };
export function generateStaticParams(): Params[] {
  // Next's static exporter needs a concrete param even before the first note.
  // The sentinel renders a 404 and is never linked or included in RSS.
  const notes = getAllNotes();
  return notes.length ? notes.map(note => ({ slug: note.slug })) : [{ slug: '_empty' }];
}
export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) return { title: 'Note not found', robots: { index: false } };
  const description = getExcerpt(note.content);
  return {
    ...pageMetadata(`Note · ${formatNoteTimestamp(note.publishedAt)}`, description, `/notes/${slug}/`, `/og/${note.noteId}`),
    openGraph: {
      ...pageMetadata('Note', description, `/notes/${slug}/`, `/og/${note.noteId}`).openGraph,
      type: 'article', publishedTime: note.publishedAt,
    },
  };
}
export default async function NotePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) notFound();
  return (
    <div className="page-container">
      <Link href="/notes" className="text-sm">← All notes</Link>
      <h1 className="sr-only">Note from {formatNoteTimestamp(note.publishedAt)}</h1>
      <div className="mt-6"><Note note={note} /></div>
    </div>
  );
}
