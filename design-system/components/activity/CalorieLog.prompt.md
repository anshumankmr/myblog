Recent MyFitnessPal diary totals as a hairline list (date, eaten / goal, under or over). Replaces the live client-side calorie checker; sits under RecentRides on the Now page.

```jsx
<CalorieLog days={[{ date: '2026-10-02', eaten: 1840, goal: 2100 }]} />
```

- Fetch at build time from the public diary page (MyFitnessPal has no public API). If the fetch fails, keep the last good data or render nothing. Never show "Checking…" or "temporarily unavailable" on the page.
- No date picker. Show the last few days.
