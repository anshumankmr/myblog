import React from 'react';

/**
 * Short untitled post — flat sunken block with a mono timestamp permalink.
 * @startingPoint section="Blog" subtitle="Short note, tweet-length, no title" viewport="700x160"
 */
export interface NoteProps {
  /** Note body. Plain text or inline links. Takes precedence over `text`. */
  children?: React.ReactNode;
  /** Note body as a plain string. */
  text?: string;
  /** ISO date, e.g. "2026-09-27". */
  date?: string;
  /** 24h time, e.g. "11:48". Optional. */
  time?: string;
  /** Permalink for the note. */
  href?: string;
}

export function Note(props: NoteProps): JSX.Element;
