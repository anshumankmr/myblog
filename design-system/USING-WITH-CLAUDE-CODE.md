# Use the Anshuman's Blog design system (prompt for Claude Code)

Paste the block below to Claude Code at the start of any session where you want it
to build or edit UI against this brand. It assumes the design system lives in
`./design-system/` — change that path if you put it elsewhere.

---

You have a design system in `./design-system/`. Treat it as the single source of
truth for all visual decisions on this project. Before writing ANY UI, do this:

## 1. Load context (do this first, every time)
- Read `design-system/readme.md` end to end — it has the Content Fundamentals,
  Visual Foundations, and Iconography sections that define the brand.
- Read `design-system/SKILL.md` for the quick reference.
- Skim `design-system/tokens/*.css` so you know the exact custom-property names.
- For any component you'll use, read its `design-system/components/**/<Name>.prompt.md`.

## 2. Hard rules — do not deviate
- **Tokens only.** Every color, font, space, radius, and shadow must come from a
  CSS custom property defined in the tokens (`--accent`, `--link`,
  `--text-heading`, `--text-body`, `--surface-page`, `--surface-sunken`,
  `--border-hairline`, `--space-*`, etc.). Never hardcode a hex or a shadow.
  `--shadow-md` / `--shadow-lg` both resolve to `none` on purpose — do not
  reintroduce elevation.
- **One superfamily: IBM Plex.** `--font-display` (Plex Serif) for headings,
  page titles, post titles and the wordmark — never italic. `--font-ui` (Plex
  Sans) for nav, body and prose. `--font-mono` (Plex Mono) for dates and code.
  The header wordmark is अंशुमन कुमार in `--font-devanagari` (IBM Plex Sans
  Devanagari 600, `lang="hi"`, `aria-label="Anshuman Kumar"`).
  Do NOT introduce any font outside the Plex superfamily.
- **Nothing larger than 48px.** `--text-5xl` (48px) is the ceiling, used once on
  the home heading; page titles are `--text-4xl` (36px). Hierarchy comes from
  family and weight as much as size.
- **Color:** neutral cool greys plus exactly one accent, `#1F6FEB` blue, for
  links / focus / the one primary button. Page is white, sunken tint is
  `#F6F7F8`, text is cool near-black (`#16191D` heading, `#24282E` body). **No
  gradients at all** — not even blue-to-blue.
- **Forbidden:** purple, multi-hue gradients, glassmorphism/backdrop-blur,
  colored left-border accent cards, drop shadows with color,
  entrance bounces / scale-on-hover / parallax / infinite loops.
- **No cards and no shadows.** Separate content with 1px hairline rules
  (`--border-hairline`), not boxes. There is no shadow anywhere in this system.
  Radius is 6px on buttons/inputs/code and `full` on the avatar; nothing else.
- **Hover = color shift, not movement.** Post titles and links go grey → accent;
  buttons darken. Transition is ~120ms ease. Nothing moves, scales, or lifts.
- **Icons:** Font Awesome 6 (`fa-solid` / `fa-brands`) via CDN. No custom icons,
  no hand-drawn SVG. Icons are small, monochrome, usually accent blue.
- **Emoji:** allowed ONLY as a single trailing emoji ending a personal sentence in
  bio/hobby prose (😊 🎬 📚 🚴) — this is the author's real voice. Never in nav,
  buttons, labels, headings, or technical copy. Never as an icon system.
- **Theming:** support light/dark via a `.dark` class on `<html>`. Chrome stays
  near-black in both themes.
- **Layout:** ONE centred column, 720px, 24px gutters, on every screen. No
  sidebars, no asymmetric label columns, no multi-column grids. The header is the
  one sticky element (56px, z-50, hairline bottom border).
- **Believability is a requirement.** This should look like a blog one engineer
  built for himself — understated, plainly typeset, sleek through restraint. If a
  choice would make a visitor think a designer was hired, it is wrong. No eyebrow
  labels, no № numbering, no drop caps, no grayscale portraits, no paper grain.
  But do not overcorrect into blandness either — the Plex Serif headings ARE the
  brand's voice; keep them.

## 3. Voice (when you write copy)
First person, dry, specific, self-deprecating. Real numbers and names over
claims. Sentence case everywhere outside post titles. No emoji. CTAs: "Read the
blog", "More about me →", "All posts →", "Get in touch".

Facts about the author come from https://anshumankumar.net ONLY: software
engineer at Flexera in Bangalore, working on FinOps AI. Do NOT use "AI
consultant", chat/voice bots, Deloitte, Quantiphi, Gatsby, Scully, or the old
.dev domain — all out of date.

## 3b. Content types
- Posts: long-form, titled, grouped by year on /blogs.
- Notes: short and untitled, rendered with `Note`. No titles, no tags.
- Home: hero, section guide (Posts · Notes · Now · About · Résumé), three recent posts.
- Now: dated list, then `RecentRides` + `CalorieLog`, then `RecentFilms`. Build-time data only.
- RSS at /rss.xml (posts + notes). Articles end with "Edit on GitHub →".
- Code: Shiki at build time, theme `github-dark`.

## 4. Reuse, don't reinvent
- Compose the existing React primitives in `design-system/components/`
  (`Button`, `Card`, `Badge`, `Avatar`, `ThemeToggle`, `PostListItem`, `Bio`)
  rather than building new ones. Match their prop contracts (the `.d.ts` files).
- `design-system/ui_kits/blog/` is a full working recreation (Home, Blogs,
  Article, About, Contact + dark mode). Use it as the reference for how screens
  are assembled, spacing rhythm, and how components sit together.

## 5. When in doubt
The real production source is `anshumankmr/myblog` (branch `master`) —
`blog/next-blog/` (Next.js 14 + Tailwind) is the source of truth, with
`blog/next-blog/components` and `tailwind.config.ts` worth cross-checking for
exact values. The live site is https://anshumankumar.net.

If a request would break a rule above, flag it and propose the on-brand
alternative instead of silently deviating.
