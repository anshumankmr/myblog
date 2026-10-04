export interface CalorieDay {
  /** ISO date, e.g. "2026-10-02". */
  date: string;
  /** Calories logged. */
  eaten: number;
  /** Daily goal. */
  goal: number;
}

/**
 * Hairline list of recent MyFitnessPal diary totals.
 */
export interface CalorieLogProps {
  days: CalorieDay[];
  /** Public diary URL, used for attribution. */
  diaryHref?: string;
  /** Max rows. Default 5. */
  limit?: number;
  /** Section label. Default "Calories". */
  title?: string;
}

export function CalorieLog(props: CalorieLogProps): JSX.Element | null;
