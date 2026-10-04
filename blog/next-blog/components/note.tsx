import Link from 'next/link';
import { FaLink } from 'react-icons/fa';
import type { Note as NoteData } from '@/lib/content';
import { PERSON } from '@/lib/identity';
import { renderNoteMarkdown } from '@/lib/note-markdown';
import { formatNoteTimestamp } from '@/lib/utils';
import { Avatar } from '@/components/ui/Avatar';
import NoteShare from '@/components/note-share';

export default async function Note({ note }: { note: NoteData }) {
  const html = await renderNoteMarkdown(note.content);
  const path = `/notes/${note.slug}/`;
  const timestamp = formatNoteTimestamp(note.publishedAt);
  return (
    <article className="note">
      <Link href="/about/" className="note-avatar" aria-label={`About ${PERSON.name}`}>
        <Avatar src={PERSON.image} alt="" size={40} />
      </Link>
      <div className="note-content">
        <header className="note-header">
          <Link href="/about/" className="note-author">
            <span className="note-author-name">{PERSON.name}</span>
            <span className="note-author-handle">@{PERSON.handle}</span>
          </Link>
          <Link href={path} className="note-timestamp" aria-label={`Note from ${timestamp}`}>
            <time dateTime={note.publishedAt}>{timestamp}</time>
          </Link>
        </header>
        <div className="prose note-body" dangerouslySetInnerHTML={{ __html: html }} />
        <footer className="note-actions">
          <Link href={path} className="note-action" aria-label={`Permalink to note from ${timestamp}`}>
            <FaLink aria-hidden="true" size={13} />
            <span>Permalink</span>
          </Link>
          <NoteShare path={path} title={`Note by ${PERSON.name}`} />
        </footer>
      </div>
    </article>
  );
}
