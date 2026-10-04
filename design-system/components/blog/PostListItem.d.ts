import React from 'react';

/**
 * @startingPoint section="Blog" subtitle="Hairline post row — title, date, excerpt" viewport="700x150"
 */
export interface PostListItemProps {
  title: string;
  /** Pre-formatted date, usually ISO-ish: "2023-08-09". */
  date?: string;
  excerpt?: string;
  href?: string;
  /** Click handler — preferred over href for SPA navigation. */
  onClick?: (e: React.MouseEvent) => void;
  /** Drop the bottom hairline on the last item. */
  last?: boolean;
}

export function PostListItem(props: PostListItemProps): JSX.Element;
