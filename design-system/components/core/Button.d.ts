import React from 'react';

/**
 * @startingPoint section="Core" subtitle="Primary / secondary / ghost CTA" viewport="700x140"
 */
export interface ButtonProps {
  children: React.ReactNode;
  /** Visual style. Default "primary". */
  variant?: 'primary' | 'secondary' | 'ghost';
  /** Padding/size preset. Default "md". */
  size?: 'sm' | 'md' | 'lg';
  /** Render as a link to this URL instead of a <button>. */
  href?: string;
  /** Font Awesome class string, e.g. "fa-solid fa-envelope". */
  icon?: string;
  /** Place the icon after the label instead of before. */
  iconRight?: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}

export function Button(props: ButtonProps): JSX.Element;
