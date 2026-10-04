import React from 'react';

export interface BioProps {
  name?: string;
  role?: string;
  /** Avatar image URL; falls back to initials. */
  avatar?: string;
  handle?: string;
  handleHref?: string;
}

export function Bio(props: BioProps): JSX.Element;
