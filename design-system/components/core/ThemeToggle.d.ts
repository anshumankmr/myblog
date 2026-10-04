import React from 'react';

export interface ThemeToggleProps {
  /** Controlled theme. Omit for uncontrolled (toggles `.dark` on <html>). */
  theme?: 'light' | 'dark';
  onChange?: (next: 'light' | 'dark') => void;
  /** Style for placement on the dark header (gray-300 rest). Default true. */
  onChrome?: boolean;
  style?: React.CSSProperties;
}

export function ThemeToggle(props: ThemeToggleProps): JSX.Element;
