# Anshuman's blog

The active blog is a statically exported Next.js app deployed to Cloudflare Pages.
The older Gatsby app in `../src` is retained for reference.

## Local development

```sh
cd blog/next-blog
npm ci
node scripts/fetch-content.mjs
npm run dev
```

The visual system comes from **Anshuman's Blog Design System**: IBM Plex Serif,
Sans, and Mono; one blue accent; a 720px column; simple hairlines; light and dark
mode. The imported tokens are in `app/design-system/`. Fonts use `next/font` and
are self-hosted in the build. `--font-size-meta` deliberately replaces the source
system's duplicate `--text-meta` size token so it cannot overwrite the meta color.

## Activity and calories

About (`/about/`) embeds the supplied Strava activity summary and a MyFitnessPal
calorie widget for `anshuman_kmr`. Dates follow **Asia/Kolkata**, regardless of a
visitor's timezone. Visitors can select a diary date and recheck its totals.

The Strava widget stays an iframe and needs no API credentials. Its light
appearance is unchanged. In dark mode, a CSS filter on `.dark .strava-widget`
darkens the rendered embed and shifts its text to light colors. The iframe is
cross-origin, so its internal CSS cannot inherit the blog theme; filtering also
changes its rendered brand colors slightly. The profile link remains available.

The root-level `functions/api/nutrition.js` is a Cloudflare Pages Function, backed
by `server/myfitnesspal.mjs`. It reads only the public diary and exposes the total
food calories, date, source link, and check timestamp. It does not expose meals,
exercise entries, diary notes, or account credentials. Successful results cache
for 15 minutes; unavailable results cache for 2 minutes. “Check again” revalidates
the widget against that cache. Empty days are shown as empty; a verified zero is
only shown when logged entries actually total zero.

### How the public diary is read

The original [`fitnessforlife/mfp`](https://github.com/fitnessforlife/mfp) scrapes
`#food` and its `tfoot` from the printable diary. The current MyFitnessPal page is
client-rendered and its HTML alone contains no food totals. This integration uses
its anonymous printable-report request (`authenticate_diary_key` with an empty
key and food-only flags), plus the older food-table parser when available. Totals
come from food-entry nutritional energy, rounded per entry to match the printable
page; kilojoules are converted to kcal.

**Live verification limitation (October 3, 2026):** the printable page confirms
this diary is public, but MyFitnessPal's report endpoint returned a security
challenge (HTTP 403) from the development machine. No live calorie total could be
verified. The widget displays an unavailable message with a direct diary link
when this happens. The endpoint is ready for an ordinary public response, but
live reliability depends on MyFitnessPal accepting requests from Cloudflare.
No credentials or challenge-bypass mechanism are used. If this remains blocked
in production, a supported export or owner-provided data feed will be needed.

### Preview with the Pages Function

`npm run dev` previews Next.js only; the live calorie endpoint runs in Cloudflare
Pages. To preview both locally, build first, then run Wrangler **from the repo
root**, where the `functions/` directory and `wrangler.jsonc` live:

```sh
cd blog/next-blog
npm run build
cd ../..
npx wrangler pages dev blog/next-blog/out
```

The checked-in `_routes.json` routes only `/api/nutrition` through the Function;
all pages and assets stay static. The existing GitHub deploy workflow runs from
the root and includes the Function automatically. No additional secrets are
required. The change has not been deployed.

## Verification

```sh
# From the repository root
node --test tests/myfitnesspal.test.mjs

cd blog/next-blog
npx tsc --noEmit
npm run build
```
