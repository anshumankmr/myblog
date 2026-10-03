import fs from 'node:fs';
import path from 'node:path';

export interface Film {
  title: string; date: string; href: string; year: string; rating: number | null; rewatch: boolean;
}
export interface Activity {
  fetchedAt: string;
  films: Film[];
  nutrition: { date: string; calories: number; sourceUrl: string; checkedAt: string } | null;
}
export function getActivity(): Activity {
  const file = path.join(process.cwd(), 'content/activity.json');
  if (!fs.existsSync(file)) return { fetchedAt: '', films: [], nutrition: null };
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}
