import React from 'react';

export interface AvatarProps {
  /** Image URL. If omitted, renders `initials` on an accent tint. */
  src?: string;
  alt?: string;
  /** Fallback initials when no src. */
  initials?: string;
  /** Pixel diameter. Default 72. */
  size?: number;
  style?: React.CSSProperties;
}

export function Avatar(props: AvatarProps): JSX.Element;
