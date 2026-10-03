import { ogImage } from '@/lib/og';
import { SITE_TITLE } from '@/lib/metadata';

export const alt = 'Anshuman Kumar’s blog';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const dynamic = 'force-static';
export default function Image() { return ogImage(SITE_TITLE); }
