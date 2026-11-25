import fs from 'node:fs';
import path from 'node:path';

export interface Film {
  title: string; date: string; href: string; year: string; rating: number | null; rewatch: boolean;
  // Absent in snapshots written before posters were read.
  poster?: string | null;
}
export interface Book {
  title: string; author: string; href: string; cover: string | null; date: string | null; rating: number | null;
}
export interface Ride {
  id: string; href: string; title: string; date: string; virtual: boolean;
  distanceKm: number; elapsedSeconds: number; climbMeters: number;
}
export interface Activity {
  fetchedAt: string;
  films: Film[];
  books: Book[];
  rides: Ride[];
  nutrition: { date: string; calories: number; sourceUrl: string; checkedAt: string } | null;
}
export function getActivity(): Activity {
  const file = path.join(process.cwd(), 'content/activity.json');
  if (!fs.existsSync(file)) return { fetchedAt: '', films: [], books: [], rides: [], nutrition: null };
  const activity = JSON.parse(fs.readFileSync(file, 'utf8'));
  return { ...activity, books: activity.books ?? [], rides: activity.rides ?? [] };
}
