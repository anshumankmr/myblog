import { getAllNotes } from '@/lib/content';
import { pageMetadata } from '@/lib/metadata';
import Note from '@/components/note';

export const metadata = pageMetadata('Notes', 'Short things that don’t need a whole post.', '/notes/');

export default function NotesPage() {
  const notes = getAllNotes();
  return (
    <div className="page-container">
      <h1>Notes</h1>
      <p className="page-intro">Short things that don&apos;t need a whole post.</p>
      <div className="notes-list mt-8">
        {notes.length ? notes.map(note => <Note key={note.noteId} note={note} />) : <p className="text-text-meta">No notes yet.</p>}
      </div>
    </div>
  );
}
