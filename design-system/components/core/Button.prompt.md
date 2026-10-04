Solid/outline/text button for calls-to-action — use for "Read the Blog", "Email Me", "Back to All Posts" and inline "Read more →" links.

```jsx
<Button variant="primary" href="/blogs">Read the Blog</Button>
<Button variant="secondary" href="/about">More About Me</Button>
<Button variant="primary" icon="fa-solid fa-envelope" href="mailto:hi@example.com">Email Me</Button>
<Button variant="ghost" iconRight icon="fa-solid fa-arrow-right">Read more</Button>
```

- `variant`: `primary` (solid accent → hover deepens to primary blue), `secondary` (accent outline → hover fills), `ghost` (bare accent text for inline links).
- `size`: `sm` | `md` | `lg`.
- Renders an `<a>` when `href` is given, else a `<button>`.
- `icon` takes a Font Awesome 6 class — the consuming page must load Font Awesome.
