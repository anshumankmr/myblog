import { ogImage } from '@/lib/og';
import { PERSON } from '@/lib/identity';

export const alt = `${PERSON.name} (@${PERSON.handle}), software engineer at ${PERSON.employer} in ${PERSON.city}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const dynamic = 'force-static';
export default function Image() { return ogImage(PERSON.name, undefined, true); }
