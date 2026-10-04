export interface Film {
  title: string;
  year: number;
  /** 0.5–5 in half steps. Omit if unrated. */
  rating?: number;
  /** Watched date, ISO. */
  date: string;
  rewatch?: boolean;
  /** Link to the Letterboxd diary entry. */
  href?: string;
}

/**
 * Hairline list of recent Letterboxd watches.
 * @startingPoint section="Blog" subtitle="Recently watched films from Letterboxd" viewport="700x300"
 */
export interface RecentFilmsProps {
  films: Film[];
  /** Letterboxd profile URL, used for attribution. */
  profileHref?: string;
  /** Max rows. Default 5. */
  limit?: number;
  /** Section label. Default "Recently watched". */
  title?: string;
}

export function RecentFilms(props: RecentFilmsProps): JSX.Element;
