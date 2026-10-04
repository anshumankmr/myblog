export interface Ride {
  /** Ride name as set on Strava. */
  name: string;
  /** Pre-formatted date, e.g. "2026-09-28". */
  date: string;
  distanceKm: number;
  movingTimeSec: number;
  elevationM?: number;
  /** Link to the activity on Strava. */
  href?: string;
}

/**
 * Hairline list of recent Strava rides — on-brand replacement for the Strava iframe widget.
 * @startingPoint section="Blog" subtitle="Recent Strava rides as a hairline list" viewport="700x320"
 */
export interface RecentRidesProps {
  rides: Ride[];
  /** Strava athlete profile URL, used for attribution. */
  profileHref?: string;
  /** Max rows shown. Default 5. */
  limit?: number;
  /** Section label. Default "Recent rides". */
  title?: string;
}

export function RecentRides(props: RecentRidesProps): JSX.Element;
