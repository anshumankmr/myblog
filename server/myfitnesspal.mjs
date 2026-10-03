// Public diary reader. No account credentials, browser cookies, or meal details
// are stored or returned. The current printable page uses the anonymous report
// endpoint; legacy HTML is supported as a fallback to the original mfp approach.
export const USERNAME = "anshuman_kmr";
export const TIME_ZONE = "Asia/Kolkata";
const BASE = "https://www.myfitnesspal.com";

export function diaryDate(now = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

export function validDiaryDate(date, today = diaryDate()) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || date < "2000-01-01" || date > today)
    return false;
  const parsed = new Date(`${date}T00:00:00Z`);
  return (
    !Number.isNaN(parsed.getTime()) &&
    parsed.toISOString().slice(0, 10) === date
  );
}

export function caloriesFromReport(report, date) {
  const days = Array.isArray(report) ? report : report?.reports;
  if (!Array.isArray(days)) return { status: "unavailable", calories: null };
  if (!days.length) return { status: "empty", calories: null };
  const day = days.find((day) => day.date === date);
  if (!day || !Array.isArray(day.food_entries))
    return { status: "unavailable", calories: null };
  if (!day.food_entries.length) return { status: "empty", calories: null };
  let calories = 0;
  for (const entry of day.food_entries) {
    const energy = entry.nutritional_contents?.energy;
    if (
      !energy ||
      typeof energy.value !== "number" ||
      !Number.isFinite(energy.value) ||
      energy.value < 0
    ) {
      return { status: "unavailable", calories: null };
    }
    const unit = energy.unit?.toLowerCase();
    if (["kilojoules", "kj"].includes(unit))
      calories += Math.round(energy.value / 4.184);
    else if (["calories", "kcal", "kilocalories"].includes(unit))
      calories += Math.round(energy.value);
    else return { status: "unavailable", calories: null };
  }
  return { status: "ok", calories };
}

function textContent(html) {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}
function cells(row) {
  return [...row.matchAll(/<t[dh]\b[^>]*>([\s\S]*?)<\/t[dh]>/gi)].map((match) =>
    textContent(match[1])
  );
}

export function caloriesFromHtml(html) {
  // Scope strictly to food, never exercise, goals, or calories remaining.
  const food = html.match(
    /<table\b[^>]*\bid=["']food["'][^>]*>([\s\S]*?)<\/table>/i
  )?.[1];
  if (!food) return null;
  const header = food.match(/<thead\b[^>]*>([\s\S]*?)<\/thead>/i)?.[1];
  const footer = food.match(/<tfoot\b[^>]*>([\s\S]*?)<\/tfoot>/i)?.[1];
  if (!header || !footer) return null;
  const headerRow = header.match(/<tr\b[^>]*>([\s\S]*?)<\/tr>/i)?.[1];
  const totalRow = [...footer.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)]
    .map((match) => cells(match[1]))
    .find((row) => /^totals?$/i.test(row[0]));
  if (!headerRow || !totalRow) return null;
  const column = cells(headerRow).findIndex((label) =>
    /^(calories|kcal)$/i.test(label)
  );
  const value = totalRow[column]?.replace(/,/g, "");
  if (column < 0 || !value || !/^\d+$/.test(value)) return null;
  return { status: "ok", calories: Number(value) };
}

export function diaryPrivacy(html) {
  const json = html.match(
    /<script\b[^>]*\bid=["']__NEXT_DATA__["'][^>]*>([\s\S]*?)<\/script>/i
  )?.[1];
  if (!json) return null;
  try {
    const props = JSON.parse(json).props?.pageProps;
    return props?.isAllowedToSeeDiary === false ? "private" : null;
  } catch {
    return null;
  }
}

export async function readNutrition(date, fetchImpl = fetch, now = new Date()) {
  const base = {
    username: USERNAME,
    date,
    timeZone: TIME_ZONE,
    sourceUrl: `${BASE}/food/diary/${USERNAME}?date=${date}`,
  };
  const result = (data) => ({ ...base, ...data, checkedAt: now.toISOString() });
  const printableUrl = `${BASE}/reports/printable-diary/${USERNAME}?from=${date}&to=${date}`;
  let blocked = false;
  try {
    const page = await fetchImpl(printableUrl, {
      headers: { Accept: "text/html", "Accept-Language": "en-US,en;q=0.9" },
      signal: AbortSignal.timeout(6000),
    });
    blocked = page.status === 403 || page.status === 429;
    if (page.ok) {
      const html = await page.text();
      if (diaryPrivacy(html) === "private")
        return result({ status: "private", calories: null });
      const legacy = caloriesFromHtml(html);
      if (legacy) return result(legacy);
    }
    // This is the same read-only report request the current public printable
    // diary makes when no account is signed in; an empty key means public access.
    const response = await fetchImpl(
      `${BASE}/api/services/authenticate_diary_key?username=${USERNAME}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Origin: BASE,
          Referer: printableUrl,
        },
        body: JSON.stringify({
          key: "",
          username: USERNAME,
          from: date,
          to: date,
          show_food_diary: 1,
          show_exercise_diary: 0,
          show_food_notes: 0,
          show_exercise_notes: 0,
        }),
        signal: AbortSignal.timeout(6000),
      }
    );
    if (
      response.ok &&
      response.headers.get("content-type")?.includes("application/json")
    ) {
      return result(caloriesFromReport(await response.json(), date));
    }
    blocked ||= response.status === 403 || response.status === 429;
  } catch {
    /* Upstream errors must never become a zero-calorie total. */
  }
  return result({
    status: blocked ? "blocked" : "unavailable",
    calories: null,
  });
}
