# Anshuman's Blog — Design System

A design system for **anshumankumar.net**, the personal blog of Anshuman Kumar.
The site title is still "Les Pensées d'Anshuman" (browser tab and link previews);
the header shows his name.

**Who he is (as stated on the live site, Oct 2026):** a software engineer at
**Flexera** in Bangalore, working on **FinOps AI**: cloud-cost anomaly detection
and the agents that explain it. Joined Flexera in December 2025. Away from work:
running and cycling (back at it since February 2026), board games, cooking,
coffee, films (especially horror and thrillers), memes and pop culture. He has an
orange cat called Billu.

**How the site is built:** posts are markdown files fetched from a JSON file on
GitHub, built by GitHub Actions, served free from Cloudflare Pages. No CMS, no
database. (It used to be Strapi on GCP, then AWS. The post about leaving AWS is
the reason why.)

## Sources

- **Live site:** https://anshumankumar.net (source of truth for copy and facts)
- **Repo:** [`anshumankmr/myblog`](https://github.com/anshumankmr/myblog) (branch `master`)
  — `blog/next-blog/` is the Next.js + Tailwind front end.

Do not take facts about the author from older material (old About pages, old
Medium bios, the old `.dev` domain). Anything about "AI consultant", chat or
voice bots, Deloitte, Quantiphi, Gatsby, Scully or Strapi-in-production is out of
date.

---

## Index / Manifest

**Root**
- `styles.css` — entry point (imports only).
- `readme.md` — this guide. `SKILL.md` — Agent Skills front matter.
- `USING-WITH-CLAUDE-CODE.md` — paste-in prompt for Claude Code.

**`tokens/`** — `fonts.css` (IBM Plex Serif/Sans/Mono + Plex Sans Devanagari),
`colors.css` (neutrals, one blue accent, code syntax, dark theme),
`typography.css`, `spacing.css`.

**`guidelines/`** — specimen cards: colours, type, spacing, wordmarks, code.

**`components/`** — reusable React primitives
- `core/` — `Button`, `Card`, `Badge`, `Avatar`, `ThemeToggle`
- `blog/` — `PostListItem`, `Note` (short untitled post), `Bio`
- `activity/` — `RecentRides` (Strava API), `CalorieLog` (MyFitnessPal diary), `RecentFilms` (Letterboxd RSS)

**`ui_kits/blog/`** — interactive recreation: Home · Posts · Notes · Now · Article · About · Contact, with dark mode.

**`assets/`** — `profile-pic.jpg`, `favicon.ico`

---

## Content Fundamentals

First person, dry, specific. An engineer writing for himself and a few peers.

- **Person:** "I", addressing the reader as "you" rarely. Contractions throughout.
- **Tone:** deadpan and self-deprecating. Real lines from the site:
  > "This was not a considered architectural decision. It was spite."
  > "connect with me on Twitter (never calling it X)"
  > "Ran this one completely untrained."
  > "A long-distance cycling event with checkpoints and a time limit. Did it for the heck of it."
- **Specifics over claims.** Real numbers and names: ₹7,000, 21.30 km in
  2:46:48, a De'Longhi EC685, Flexera. Never "at scale", never "passionate".
- **Casing:** sentence case everywhere, including nav and buttons ("Read the
  blog", "More about me →", "All posts →", "← All posts", "Get in touch").
- **Post titles** say what happened, sometimes with a joke: *"I Ran a Personal
  Blog on AWS. I Deserve What Happened."*, *"Step-by-Step: Building My Blog with
  JAMStack and Google Cloud"*. Title Case in titles only.
- **Emoji:** none. The current site uses no emoji in copy or UI.
- **Vibe:** someone who over-engineered his blog, admitted it in public, and
  would rather go for a ride.

### Believability rules

1. **Use his real posts and facts** (`ui_kits/blog/data.js`, sourced from the live site). Do not invent replacements.
2. **No neat aphorisms** in sample copy.
3. **Let the archive be lumpy:** a 2018 Blade Runner post sits next to a 2026 MCP post. Don't tidy it into a theme.
4. **Samples are marked as samples.** Notes, rides, calories and films in the kit are placeholders until wired to real data.

---

## Visual Foundations

**Overall feel** — quiet, bookish, and text-first. This reads like a blog a working
engineer built for himself and then fussed over the typography a bit: one column,
one type superfamily, near-black on white, blue links, a dark-mode toggle. It is
sleek because it is restrained, and it has a voice because of exactly one decision
(IBM Plex) rather than a dozen.

**Believability is a design goal here.** If a choice would make a visitor think
"a designer was hired for this", it is wrong. The test is not "is this plain" —
plain and characterless are different things, and an earlier pass of this system
failed by having no voice at all. The test is: **could one person have made this
choice, once, and applied it consistently?** Picking IBM Plex passes. Commissioning
a display serif, a grotesque, and a text face for three separate roles does not.

- **Color** — Neutral cool greys and exactly one accent.
  - Accent `#1F6FEB` (blue) for links, focus rings, and the single primary button;
    `#1A5FCC` on hover. That is the only colour in the system.
  - The page is plain `#FFFFFF`; `#F6F7F8` is the one "sunken" tint (code, bio
    strip, hover fills).
  - Text is a cool near-black: heading `#16191D`, body `#24282E`, meta `#555C66`,
    muted `#6B7280`. Never pure black.
  - **No gradients anywhere.** No second accent, no warm/cool pairing, no purple.
- **Theming** — Light/dark via a `.dark` class on `<html>`. Dark is a plain cool
  near-black: page `#0F1115`, cards `#14171C`, sunken `#171B21`, links lighten to
  `#63A2FF`. Not warm, not "midnight paper", not pure black.
- **Type** — **IBM Plex**, one superfamily in three cuts. The entire type system
  is a single decision.
  - **IBM Plex Serif** — headings, page titles, post titles, the hero, pull-quotes,
    the wordmark, and the `dt` terms on About. This is what gives the blog its
    voice: contemplative and slightly bookish, but shipped by a tech company.
    Weights 500/600. **Never italic.**
  - **IBM Plex Sans** — nav, body prose, article text, small caps labels. The
    neutral workhorse. Weights 400/500/600.
  - **IBM Plex Mono** — dates, code blocks, the footer domain, small technical
    meta. Weights 400/500.
  - Headings are 500/600 with tracking around `-0.01em`/`-0.02em`; prose is 17px
    at 1.7 leading. **Nothing in the product is larger than 48px** (the home
    heading; page titles are 36px). Hierarchy comes from family and weight as
    much as size.
  - No italic display setting, no drop caps, no fourth family, no font outside
    the Plex superfamily.
- **Backgrounds** — Flat, solid, and empty. No photographic hero, no texture, no
  paper grain, no repeating pattern, no gradient.
- **Imagery** — Barely any. The author avatar is a small full-colour photo in a
  circle (44px in the article byline). No grayscale filter, no duotone, no grain,
  no large portrait blocks.
- **Cards** — Essentially none. Content is separated by `1px` hairline rules, not
  boxes. Where a surface is needed it is a flat `#F6F7F8` fill with a 6px radius
  and no shadow.
- **Borders** — Hairline `1px` `#E4E8EC` (`#232830` dark) doing almost all the
  structural work: post-row dividers, the header underline, definition lists,
  the footer rule.
- **Radii** — 6px for buttons, inputs, code blocks and the theme toggle; `full`
  for the avatar. Nothing else is rounded.
- **Shadows** — **None.** There is no shadow token in use anywhere. Depth is
  communicated with hairlines and the sunken tint.
- **Buttons** — One primary (solid accent fill, white text, 6px radius, darkens
  to `#1A5FCC` on hover), one secondary (hairline border, sunken fill on hover),
  one ghost (bare accent text). Sentence case, never uppercase, never tracked.
- **Hover states** — Colour shifts only. Post titles and nav links go grey →
  accent blue; buttons darken. Nothing moves, scales, or lifts.
- **Press / focus** — Standard. Focus uses the accent blue. No shrink-on-press.
- **Animation** — Almost none: a `120ms ease` colour transition on links and
  buttons, `150ms` on the theme swap, and smooth scroll. No parallax, no entrance
  animations, no bounces, no skeleton shimmer, no infinite loops.
- **Transparency / blur** — One use only: the sticky header is `rgba` at 85% with
  a `blur(8px)` backdrop so content scrolls under it. Everything else is opaque.
  No glassmorphism.
- **Layout** — A single centred column, **720px**, with 24px gutters, used by
  every screen — home, list, article, about, contact alike. No sidebars, no
  asymmetric label columns, no multi-column grids. The header is the one sticky
  element: 56px tall, `z-50`, hairline bottom border. The home page is the one
  screen with an image: a 96px round avatar beside the hero.

---

## Iconography

The blog uses **Font Awesome 6** throughout — in code via `react-icons/fa`
(`FaLinkedin`, `FaGithub`, `FaSun`, `FaMoon`, `FaEnvelope`, `FaTwitter`,
`FaBars`, `FaTimes`). There is **no custom icon set, no SVG sprite, and no icon
font of their own.**

- **In this system** we load Font Awesome 6 from CDN
  (`cdnjs.cloudflare.com/.../font-awesome/6.5.2`) and reference icons by class
  string, e.g. `<i className="fa-solid fa-envelope" />` or
  `fa-brands fa-github`. Components that take an icon (`Button`, `ThemeToggle`)
  expect a Font Awesome class string.
  > **Substitution flag:** `react-icons/fa` is Font Awesome under the hood, so the
  > CDN icons match the originals. The brand icons (LinkedIn, GitHub, Twitter)
  > live under `fa-brands`; UI icons (sun, moon, envelope, bars) under `fa-solid`.
- **Usage** — Icons are small, monochrome, and almost always **accent blue** (or
  `gray-300` on the dark header). They appear as: social links in the header,
  the sun/moon theme toggle, round accent-tint chips on Contact cards, and small
  section markers on the About page (replacing the original emoji headers).
- **Emoji** — Two distinct roles, do not conflate them. As **UI icons**: not used.
  The production About page used 💻 🎯 🏆 as section headers; this system
  standardises on Font Awesome equivalents (`fa-laptop-code`, `fa-bullseye`,
  `fa-trophy`). As a **voice device in personal prose**: yes, sparingly — one
  trailing emoji closing a sentence about himself (😊 🎬 📚 🚴). See Content
  Fundamentals. Never in nav, buttons, labels, or technical copy.
- **Unicode** — Arrows are plain Unicode glyphs in copy: "→" (Read more),
  "←" (Back / Previous). Keep these as text, not icons.
- **Favicon** — `assets/favicon.ico` (imported from the repo).

## Content types

- **Posts** — long-form, titled, in `/blogs/`. Grouped by year on the Posts page (mono year label, hairline list under it).
- **Notes** — short, untitled, one to three sentences, in `/notes/`. Rendered with `Note`: flat sunken block, mono timestamp as permalink. No tags, no titles. If it needs a title, it's a post. Latest two show on the home page under recent posts.
- **Now** — `/now/`, a short dated list (Work / Training / This site), then "Keeping myself in check" with `RecentRides` (Strava) and `CalorieLog` (MyFitnessPal), then `RecentFilms` (Letterboxd). All fetched at build time; no iframes, no loading states. Replaces the About page's activity widgets.
- **Home** — hero, then a hairline section guide (Posts · Notes · Now · About · Résumé), then three recent posts. Nothing else.
- **Articles** end with an "Edit on GitHub →" link (posts are markdown on GitHub) above the author byline.
- **RSS** — `/rss.xml` covers posts and notes; linked from the footer (`fa-rss`) and via `<link rel="alternate">`.

## Wordmark

The header wordmark is **अंशुमन कुमार** in IBM Plex Sans Devanagari 600 (`--font-devanagari`), `lang="hi"`, with `aria-label`/`title` "Anshuman Kumar". Plex has no Devanagari serif, so the mark is the one place a Plex Sans cut carries the brand. Page titles, meta, and OG tags stay in Latin script. Candidates are in `guidelines/brand-devanagari.card.html`.

## Code blocks

Highlighted at build time with Shiki using the `github-dark` theme; the matching `--code-*` tokens exist for anything rendered outside Shiki. Syntax colours appear only inside code blocks.
