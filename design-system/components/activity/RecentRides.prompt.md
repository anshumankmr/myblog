On-brand replacement for the Strava "latest rides" iframe: a hairline list with mono date, Plex Serif ride name, and mono stats. Use it on About or Home instead of embedding Strava's widget.

```jsx
<RecentRides
  profileHref="https://www.strava.com/athletes/34639203"
  rides={[
    { name: 'Nandi Hills loop', date: '2026-09-28', distanceKm: 72.4, movingTimeSec: 11040, elevationM: 1180, href: 'https://www.strava.com/activities/…' },
  ]}
/>
```

- Data comes from Strava's API (`GET /athlete/activities`, filter `type === 'Ride'`), fetched at build time or in a cached server route. Convert metres → km and keep `moving_time` in seconds.
- Keep the "via Strava →" attribution link; Strava's API terms require it.
- No orange, no route maps, no card. It sits in the 720px column like any other list.
