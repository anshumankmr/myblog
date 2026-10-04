---
name: anshuman-blog-design
description: Use this skill to generate well-branded interfaces and assets for Anshuman Kumar's blog (anshumankumar.net), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick reference
- **Brand:** anshumankumar.net, the personal blog of Anshuman Kumar, software engineer at Flexera (FinOps AI) in Bangalore. Writes about software, AI, running, cycling, films. Voice is first-person, dry, specific; no emoji. Facts come from the live site only.
- **Tokens:** link `styles.css`, then use CSS custom properties (`--accent`, `--link`, `--text-heading`, `--text-body`, `--surface-page`, `--surface-sunken`, `--border-hairline`, `--font-display`, `--font-ui`, `--font-mono`). Light/dark via a `.dark` class on `<html>`.
- **Type:** IBM Plex, one superfamily in three cuts — Plex Serif for headings/post titles, Plex Sans for nav and body prose, Plex Mono for dates and code. Nothing larger than 48px. See `tokens/typography.css`.
- **Color:** neutral cool greys, near-black text, one blue accent (`#1F6FEB`) for links and the single primary button. No gradients, no second colour.
- **Components:** `components/` holds React primitives — `Button`, `Card`, `Badge`, `Avatar`, `ThemeToggle`, `PostListItem`, `Bio`. Read each `*.prompt.md` for usage.
- **UI kit:** `ui_kits/blog/` is a full interactive recreation (Home, Blogs, Article, About, Contact + dark mode). Start here for full-screen mockups.
- **Icons:** Font Awesome 6 via CDN (`fa-solid` / `fa-brands`). No custom icon set.
- **Assets:** `assets/profile-pic.jpg`, `assets/favicon.ico`.

Content types: long-form Posts (grouped by year), short untitled Notes (`Note` component), and a Now page with `RecentRides` / `RecentFilms`. The header wordmark is अंशुमन कुमार in IBM Plex Sans Devanagari (`--font-devanagari`).
