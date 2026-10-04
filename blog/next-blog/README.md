# Anshuman's blog

The active blog is a statically exported Next.js app served by Cloudflare Pages.
The older Gatsby app in `../src` is retained for reference.

## Local development

```sh
cd blog/next-blog
npm ci
node scripts/fetch-content.mjs
npm run dev
```

The fetch reads the published `content.json` and `notes.json` feeds from
`anshumankmr.github.io/generated`. Before the new notes feed is deployed, a 404
is treated as an empty notes collection. Other content-fetch failures stop the
build. To preview the content repo's local generated data:

```sh
BLOG_CONTENT_DIR=/Users/anshumankmr/Documents/anshumankmr.github.io/generated node scripts/fetch-content.mjs
```

Generated posts, notes, and activity snapshots in `content/` are ignored by Git.
`content/now.json` is authored and committed: update its date and entries whenever
you update the Now page. The initial entries use existing facts from About.

## Design and pages

The visual system comes from **Anshuman's Blog Design System**: IBM Plex Serif,
Sans, Mono, and Sans Devanagari; one blue accent; a 720px column; hairlines; light
and dark mode. The header reads **अंशुमन कुमार**, with the accessible name
“Anshuman Kumar”. Fonts use `next/font` and are self-hosted. The homepage title is
“Anshuman Kumar | Software Engineer in Bangalore”; other pages include his name
and primary handle, `@anshuman_kmr`. `--font-size-meta` replaces the
source system's duplicate size token so it cannot overwrite the meta color.

- `/blogs/`: long-form posts grouped by year. A frontmatter `description` takes
  priority over a Markdown-free excerpt ending at a sentence or word boundary.
- `/notes/`: untitled short Markdown posts in a compact feed with an author
  portrait, name, handle, and hairline dividers. Timestamps show Asia/Kolkata
  time and link to stable `/notes/{slug}/` addresses. Permalink and share actions
  work without an account; sharing copies the link when native sharing is
  unavailable. The two latest notes appear on the homepage. No sample notes
  are published.
- `/now/`: dated updates, the supplied Strava latest-rides iframe, recently
  watched films from `jabwemetguy` on Letterboxd, books from `anshuman_kmr` on
  Goodreads, and verified calorie totals.
- `/rss.xml`: posts and notes, newest first, with stable permalink GUIDs. The
  footer and alternate-feed metadata link to it.
- `/resume.pdf`: the supplied **Anshuman Kumar CV September 2026.pdf**.
- `/sitemap.xml`: the homepage, public sections, and every published article and
  note, generated from the same content as their routes. Excludes the empty-note
  sentinel, 404s, and the noindex Keystone policy. Includes the portrait for image
  discovery. No invented modification dates are added.
- `/robots.txt`: allows crawling and points to the canonical non-www sitemap.

Article and note previews have their own title, description, canonical URL, and
PNG image. `next/og` renders the images during export with local Plex fonts in
`assets/fonts/` (OFL license included). Markdown is parsed and sanitized on the
server; Shiki's `github-dark` highlighting runs during the build. Neither the
Markdown renderer nor Shiki ships in browser JavaScript. Article footers link to
the original source file's GitHub editor.

## Identity and discovery

`lib/identity.ts` holds the public name, primary handle (`anshuman_kmr`), role,
employer, city, portrait, and profile URLs. GitHub and Hacker News retain
`anshumankmr`, and LinkedIn retains `anshumankumarcs`; `sameAs` in the server-rendered
Person JSON-LD connects them to the canonical domain. The homepage, About,
Contact, footer, and article bylines display the primary handle. Profile links
use `rel="me"`. Update the identity file when public work details change.

The current GitHub portrait is checked into `public/images/anshuman-kumar.jpg`.
The homepage, article bylines, Person data, image sitemap, and default social
preview all use this local asset. Replace it here when updating the portrait.

After deployment, submit `https://anshumankumar.net/sitemap.xml` in Google Search
Console and inspect the homepage and portrait URLs. Profile edits outside this
repo remain separate work: use “Anshuman Kumar (@anshuman_kmr)”, the same work
description, and `https://anshumankumar.net/` in profile bios/website fields.

Third-party recognition needs actual published work and links: document a
current project with a working demo, highlight maintained contributions, and
publish an original article under the same byline on a relevant external site
with a link back. This repo cannot create independent coverage or guarantee
search rankings.

## Writing notes

The content store and MCP server also need these changes deployed:

1. `anshumankmr.github.io`: generates `generated/notes.json` from `notes/*.md`.
   `draft_notes/` is excluded. Its workflow rebuilds when published notes change.
2. `strapi-cms-app`: adds `create_note`, `list_notes`, `get_note`, `update_note`,
   `publish_note`, `unpublish_note`, and `delete_note`, with the existing
   owner-only OAuth policy.
3. `myblog`: fetches and renders the generated notes during its deployment build.

`create_note(content="A short thought.")` creates a draft. `publish_note(note_id)`
publishes it. For a direct published note, use `create_note(content=..., draft=false)`.
Then wait for the content workflow and call `rebuild_blog`. Updating a note's body
or timestamp keeps its slug unchanged. The MCP server defaults timestamps to
Asia/Kolkata; an explicit timestamp must include its timezone. Multiple notes in
the same minute get distinct addresses. The content repo's `notes/README.md`
documents the Markdown format if you prefer writing files directly.

### Images and other media in notes

Keep writing ordinary Markdown; no extra feed fields are required:

```md
A photo from the ride.

![Describe the photo for someone who cannot see it](https://example.com/ride.jpg)
```

One image keeps its proportions and fits the note. Adjacent images form a
two-column gallery (blank lines between them are fine). Gallery thumbnails open
the original images; descriptive alt text is preserved. Images load lazily and
can use any browser-supported format, including animated GIFs. Use absolute
URLs for content hosted elsewhere, or `/images/filename.jpg` for assets in this
app's `public/images/` directory. Relative paths resolve against the page URL.

Standalone links to `.mp4`, `.webm`, `.ogv`, or `.mov` files become native video
players; `.mp3`, `.m4a`, `.ogg`, `.oga`, `.wav`, `.aac`, and `.flac` links become
audio players. Playback depends on the browser's codec support. For a URL
without an extension, use a Markdown title: `[Watch](https://example.com/media "video")`
or `[Listen](https://example.com/media "audio")`. Links within sentences remain
ordinary links. Players have controls and do not autoplay or preload files.
Raw HTML remains excluded by the Markdown sanitizer.

## Design-system reference

The original Desktop design system is preserved in the repository's root
`design-system/` folder. See its `INTEGRATION.md` for how it maps to production.
Changes only to this reference folder do not trigger the deployment workflow;
application changes, manual runs, and content updates still rebuild normally.

## Activity

The Strava iframe uses the supplied `/latest-rides/` URL, is 300×454px, lazy-loaded,
and fits the page on mobile. It updates independently of blog builds and needs
no API credentials. The profile link remains usable if the embed fails. Its
cross-origin content cannot inherit our theme, so dark mode uses the existing CSS
filter; this also shifts Strava's rendered brand colours slightly.

Letterboxd RSS, Goodreads RSS, and MyFitnessPal are fetched during the content
step. Their data refreshes on the next blog rebuild, not on a visitor's request. Unavailable
feeds/diary data are omitted without loading or error placeholders. The Now
page shows when the snapshot was checked. Letterboxd uses only dated watches;
list entries are excluded, and half-star ratings are supported.

Goodreads uses public account `53014278` from the supplied widget and the `read`
shelf RSS feed. The four displayed books follow the shelf feed's order, with
small covers, authors, and the user's own ratings. Zero means unrated and is
omitted. Finish dates appear only when `user_read_at` is present; shelf-added
dates are never presented as finish dates. Empty or unavailable feeds omit the
section, while Goodreads profile links remain in Contact and the footer. The
profile also joins the existing Person `sameAs` data. No Goodreads widget script
or API key is required.

The existing public diary reader in `server/myfitnesspal.mjs` returns verified
food calories only. Empty, private, malformed, or blocked responses never become
zero totals. MyFitnessPal returned a security challenge during local verification
on 2026-10-03, so calories are currently omitted. The existing Pages Function
`functions/api/nutrition.js` remains available for previous consumers; the blog's
new pages do not request it from the browser.

## Checks

```sh
# Repository root
node --test tests/myfitnesspal.test.mjs

# Active app
cd blog/next-blog
npm test
npx tsc --noEmit
npm run build
npm run check:seo
```

The deployment workflow runs the diary and app tests before building, then checks
the exported HTML, canonicals, Person data, images, sitemap coverage, and robots
before deploying. The content
repo has a generator test, and the MCP repo covers note lifecycle and OAuth
rejection before any GitHub requests. Preview the static export with any static
server, or preview the existing nutrition Function from the repository root:

```sh
npx wrangler pages dev blog/next-blog/out
```
