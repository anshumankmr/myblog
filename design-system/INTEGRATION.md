# Design system in this repository

This folder is a reference copy of **Anshuman's Blog Design System** from the
Desktop. Start with [readme.md](readme.md) and [SKILL.md](SKILL.md) for the visual
rules, tokens, component examples, and interactive UI kit. The source files are
preserved; macOS `.DS_Store` files are excluded.

The production app lives in `blog/next-blog/`. Its adapted tokens are in
`app/design-system/`, with self-hosted fonts and existing Next.js components.
This reference folder is outside the app's imports, TypeScript compilation,
and Tailwind content paths.

The deployment workflow ignores pushes that change only `design-system/**`.
Pushes that also change application files still deploy. Manual runs and
`content-updated` events still rebuild normally.

## Notes feed

The production notes component follows the requested Twitter-style layout:
a small author portrait, name and handle, a timestamp permalink, a text-first
body, and functional link/share actions. Hairline dividers replace the original
sunken note blocks. This extends the reference `Note` example while retaining
the one-column layout, Plex type, theme tokens, six-pixel media corners, and
absence of shadows.

Markdown images, standalone video links, and standalone audio links fit within
the note body. See `blog/next-blog/README.md` for the publishing format.
