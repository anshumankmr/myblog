# design-system-2 in this repository

The current design reference for **anshumankumar.net**. It supersedes
[`design-system/`](../design-system/), which is deprecated. This folder is an
export of the canvas, so it is reference material: nothing in `blog/next-blog/`
imports it, and the deployment workflow ignores pushes that only change it.

To view a layout, run `python3 -m http.server` here and open an artboard's
`.dc.html` file.

## What it covers

| Artboard | Production page | Layout |
| --- | --- | --- |
| `Main.dc.html` | `/now/` | Four-column bento of tiles |
| `About.dc.html` | `/about/` | Prose beside a highlights timeline, then a grid of cells |
| `Socials.dc.html` | `/contact/` | Four-column grid of profile tiles |

The home page, posts and notes have no artboard yet and keep the original column
and tokens from `design-system/`.

## How it maps to production

- **Tokens:** the artboards hard-code dark-theme hex values. Production reads the
  existing theme variables (`--surface-card`, `--border-hairline`, `--text-meta`,
  `--link`, ...) so light and dark both work. Strava orange is `--strava`.
- **Styles:** `.tile`, `.bento`, `.cells`, `.socials` and friends sit at the end of
  `blog/next-blog/app/globals.css`.
- **Width:** these pages use a 1040px column (1120px for About); the header and
  footer widen to match with `:has()`.
- **Data:** Now's tiles read `content/now.json`; About's highlights and cells are
  in `app/about/page.tsx`; profiles are in `lib/identity.ts`.

## Where production differs from the artboards

- Recent rides keeps the Strava embed. The artboard's native ride list and totals
  need Strava API data the site does not fetch.
- The Goodreads tile is titled "Books read". The feed is the finished-books shelf,
  so it has no current book or progress bar.
- Films show title, year and rating as text cards: the Letterboxd feed supplies no
  posters.
- Tiles for books and calories appear only when their data exists.
- About links to the Billu photo instead of embedding it.
