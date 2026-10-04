Recent Letterboxd watches as a hairline list: mono date, Plex Serif title with mono year, star rating on the right. Pairs with RecentRides on the Now page.

```jsx
<RecentFilms
  profileHref="https://letterboxd.com/USERNAME/"
  films={[{ title: 'Sinners', year: 2025, rating: 4.5, date: '2026-09-20', href: 'https://letterboxd.com/…' }]}
/>
```

- Data: every Letterboxd profile has an RSS feed at `https://letterboxd.com/USERNAME/rss/`. Items carry `letterboxd:filmTitle`, `letterboxd:filmYear`, `letterboxd:memberRating`, `letterboxd:watchedDate` and `letterboxd:rewatch`. Parse at build time; no API key needed.
- Stars are plain Unicode (★ and ½), matching Letterboxd's own notation.
