import Link from 'next/link';
import type { Note as NoteData } from '@/lib/content';
import { renderMarkdown } from '@/lib/markdown';
import { formatNoteTimestamp } from '@/lib/utils';

export default async function Note({ note }: { note: NoteData }) {
  const html = await renderMarkdown(note.content);
  return (
    <article className="note">
      <div className="prose note-body" dangerouslySetInnerHTML={{ __html: html }} />
      <Link href={`/notes/${note.slug}/`} className="note-timestamp" aria-label={`Note from ${formatNoteTimestamp(note.publishedAt)}`}>
        <time dateTime={note.publishedAt}>{formatNoteTimestamp(note.publishedAt)}</time>
      </Link>
    </article>
  );
}
