A single post row for the post list — title that turns accent blue on hover, mono date on the right, one line of muted excerpt underneath, hairline rule between rows.

```jsx
<PostListItem
  title="Step-by-Step: Building My Blog with JAMStack and Google Cloud"
  date="2023-08-09"
  excerpt="The details of setting up the very site you are currently reading…"
  href="/article/2023-08-09/building-my-blog-with-jamstack"
/>
```

Stack them directly inside the 680px column with a `1px solid var(--border-hairline)` top border on the container; each row draws its own bottom rule. Set `last` on the final one to drop its divider. No numbering, no card, no "Read more" link — the whole row is the link.
