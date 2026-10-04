import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  /** Adds accent-border highlight on hover (Contact-card behaviour). */
  interactive?: boolean;
  /** No effect — kept for API compatibility. This system has no shadows. */
  hoverLift?: boolean;
  /** CSS padding value. Default var(--space-6). */
  padding?: string;
  style?: React.CSSProperties;
}

export function Card(props: CardProps): JSX.Element;
