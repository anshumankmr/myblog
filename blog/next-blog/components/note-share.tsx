'use client';

import { useEffect, useState } from 'react';
import { FaShareAlt } from 'react-icons/fa';

export default function NoteShare({ path, title }: { path: string; title: string }) {
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (!status) return;
    const timer = window.setTimeout(() => setStatus(''), 4000);
    return () => window.clearTimeout(timer);
  }, [status]);

  async function share() {
    const url = new URL(path, window.location.origin).href;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
      } else {
        await navigator.clipboard.writeText(url);
        setStatus('Link copied');
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') return;
      setStatus('Use the permalink to share this note.');
    }
  }

  return (
    <div className="note-share">
      <button type="button" className="note-action" onClick={share} aria-label="Share note or copy its link">
        <FaShareAlt aria-hidden="true" size={13} />
        <span>Share</span>
      </button>
      <span className="note-share-status" role="status">{status}</span>
    </div>
  );
}
