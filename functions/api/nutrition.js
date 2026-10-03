import {
  diaryDate,
  validDiaryDate,
  readNutrition,
} from "../../server/myfitnesspal.mjs";

export async function onRequest({ request, waitUntil }) {
  if (request.method !== "GET") {
    return new Response("Method not allowed", {
      status: 405,
      headers: { Allow: "GET" },
    });
  }
  const url = new URL(request.url);
  const date = url.searchParams.get("date") ?? diaryDate();
  if (!validDiaryDate(date)) {
    return Response.json(
      {
        error:
          "Choose a valid diary date from 2000 through today (Asia/Kolkata).",
      },
      { status: 400 }
    );
  }
  // Normalize the key, so arbitrary query strings cannot bypass the cache.
  const cacheUrl = new URL("/api/nutrition", url.origin);
  cacheUrl.searchParams.set("date", date);
  const key = new Request(cacheUrl);
  const cache = globalThis.caches?.default;
  const cached = await cache?.match(key);
  if (cached) return cached;

  const nutrition = await readNutrition(date);
  const ttl =
    nutrition.status === "ok" || nutrition.status === "empty" ? 900 : 120;
  const response = Response.json(nutrition, {
    headers: {
      "Cache-Control": `public, max-age=${ttl}`,
      "X-Content-Type-Options": "nosniff",
    },
  });
  if (cache) waitUntil(cache.put(key, response.clone()));
  return response;
}
