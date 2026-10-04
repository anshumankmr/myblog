import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  /** Default "soft" (accent tint). */
  variant?: 'soft' | 'solid' | 'outline' | 'neutral';
  style?: React.CSSProperties;
}

export function Badge(props: BadgeProps): JSX.Element;
