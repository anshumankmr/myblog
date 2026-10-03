import test from "node:test";
import assert from "node:assert/strict";
import {
  caloriesFromReport,
  caloriesFromHtml,
  diaryDate,
  validDiaryDate,
  readNutrition,
} from "../server/myfitnesspal.mjs";
import { onRequest } from "../functions/api/nutrition.js";

const date = "2026-10-03";
const entry = (value, unit = "calories") => ({
  nutritional_contents: { energy: { value, unit } },
});
const report = (entries) => ({
  reports: [
    {
      date,
      food_entries: entries,
      exercise_entries: [{ energy: { value: 900 } }],
    },
  ],
});

test("uses India calendar date around UTC midnight and validates dates", () => {
  assert.equal(diaryDate(new Date("2026-10-02T20:00:00Z")), date);
  assert.equal(validDiaryDate("2024-02-29", date), true);
  for (const invalid of [
    "2026-02-29",
    "2026-10-04",
    "2026-13-01",
    "1999-01-01",
    "../foo",
    "2026-2-03",
  ]) {
    assert.equal(validDiaryDate(invalid, date), false);
  }
});
test("sums food entries as the printable page does and excludes exercise", () => {
  assert.deepEqual(
    caloriesFromReport(
      report([entry(150.4), { ...entry(499.6), servings: 3 }]),
      date
    ),
    { status: "ok", calories: 650 }
  );
});
test("converts kilojoules and allows verified zero-calorie food", () => {
  assert.equal(
    caloriesFromReport(report([entry(418.4, "kilojoules")]), date).calories,
    100
  );
  assert.equal(caloriesFromReport(report([entry(0)]), date).calories, 0);
});
test("missing entries remain empty, never a fabricated zero", () => {
  assert.deepEqual(caloriesFromReport(report([]), date), {
    status: "empty",
    calories: null,
  });
  assert.equal(caloriesFromReport({ reports: [] }, date).status, "empty");
});
test("rejects wrong dates, changed response shapes, malformed values and units", () => {
  for (const response of [
    {},
    { reports: [{ date: "2026-10-02", food_entries: [entry(50)] }] },
    report([entry("200")]),
    report([entry(-1)]),
    report([entry(NaN)]),
    report([entry(10, "unknown")]),
    report([{}]),
  ]) {
    assert.deepEqual(caloriesFromReport(response, date), {
      status: "unavailable",
      calories: null,
    });
  }
});
test("legacy parser identifies calories by header, ignores goals and exercise", () => {
  const html = `<table id="exercise"><tfoot><tr><td>Total</td><td>900</td></tr></tfoot></table>
    <table id="food"><thead><tr><td>Foods</td><td>Protein</td><td>Calories</td></tr></thead>
    <tfoot><tr><td>Goal</td><td>200</td><td>2500</td></tr><tr><td>TOTALS</td><td>120</td><td><b>1,932</b></td></tr></tfoot></table>`;
  assert.deepEqual(caloriesFromHtml(html), { status: "ok", calories: 1932 });
  assert.equal(caloriesFromHtml(html.replace("Calories", "Kilojoules")), null);
  assert.equal(caloriesFromHtml(html.replace("1,932", "--")), null);
  assert.equal(
    caloriesFromHtml("<html>Cloudflare challenge. Calories 2500.</html>"),
    null
  );
});
test("current public report request requests food only and returns a verified total", async () => {
  const calls = [];
  const fetchMock = async (url, options) => {
    calls.push({ url, options });
    return calls.length === 1
      ? new Response("<html>Client-rendered diary</html>")
      : Response.json(report([entry(1950)]));
  };
  const data = await readNutrition(
    date,
    fetchMock,
    new Date("2026-10-03T10:00:00Z")
  );
  assert.equal(data.status, "ok");
  assert.equal(data.calories, 1950);
  const body = JSON.parse(calls[1].options.body);
  assert.equal(body.username, "anshuman_kmr");
  assert.equal(body.key, "");
  assert.equal(body.show_exercise_diary, 0);
  assert.equal(body.show_food_notes, 0);
  assert.equal("food_entries" in data, false);
});
test("private diary stops without requesting a report", async () => {
  let calls = 0;
  const data = await readNutrition(date, async () => {
    calls++;
    return new Response(
      '<script id="__NEXT_DATA__">{"props":{"pageProps":{"isAllowedToSeeDiary":false}}}</script>'
    );
  });
  assert.equal(data.status, "private");
  assert.equal(data.calories, null);
  assert.equal(calls, 1);
});
test("challenge pages, malformed JSON, and transport failures do not produce totals", async () => {
  const blocked = await readNutrition(
    date,
    async () => new Response("Challenge", { status: 403 })
  );
  assert.equal(blocked.status, "blocked");
  assert.equal(blocked.calories, null);
  const offline = await readNutrition(date, async () => {
    throw new Error("timeout");
  });
  assert.equal(offline.status, "unavailable");
  assert.equal(offline.calories, null);
  let calls = 0;
  const malformed = await readNutrition(date, async () =>
    ++calls === 1
      ? new Response("Diary")
      : new Response("invalid-json", {
          headers: { "content-type": "application/json" },
        })
  );
  assert.equal(malformed.status, "unavailable");
  assert.equal(malformed.calories, null);
});
test("Pages endpoint validates methods and dates before making network requests", async () => {
  const response = await onRequest({
    request: new Request("https://blog.test/api/nutrition?date=2026-02-29"),
  });
  assert.equal(response.status, 400);
  const method = await onRequest({
    request: new Request("https://blog.test/api/nutrition", { method: "POST" }),
  });
  assert.equal(method.status, 405);
});
test("Pages endpoint caches the canonical date and exposes totals only", async () => {
  const previousFetch = globalThis.fetch;
  const previousCaches = globalThis.caches;
  const cacheEntries = new Map();
  const pending = [];
  let calls = 0;
  globalThis.caches = {
    default: {
      match: async (key) => cacheEntries.get(key.url)?.clone(),
      put: async (key, response) => {
        cacheEntries.set(key.url, response);
      },
    },
  };
  globalThis.fetch = async () =>
    ++calls % 2 === 1
      ? new Response("Client-rendered diary")
      : Response.json(report([entry(1775)]));
  try {
    const requestDate = diaryDate();
    globalThis.fetch = async () =>
      ++calls % 2 === 1
        ? new Response("Client-rendered diary")
        : Response.json({
            reports: [{ date: requestDate, food_entries: [entry(1775)] }],
          });
    const context = (query) => ({
      request: new Request(
        `https://blog.test/api/nutrition?date=${requestDate}&${query}`
      ),
      waitUntil: (promise) => pending.push(promise),
    });
    const response = await onRequest(context("unused=1"));
    await Promise.all(pending);
    assert.equal((await response.json()).calories, 1775);
    assert.equal(response.headers.get("cache-control"), "public, max-age=900");
    const cached = await onRequest(context("unused=2"));
    assert.equal((await cached.json()).calories, 1775);
    assert.equal(calls, 2);
    assert.equal(cacheEntries.size, 1);
  } finally {
    globalThis.fetch = previousFetch;
    globalThis.caches = previousCaches;
  }
});
