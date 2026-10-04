Flat content surface — sunken fill, 1px hairline border, 6px radius, no shadow. Use for Contact rows and any boxed content.

```jsx
<Card>
  <h2>Technical Skills</h2>
  <p>Generative AI, Prompt Engineering, Machine Learning…</p>
</Card>

<Card interactive>Clickable row that gets an accent border on hover</Card>
```

- `interactive`: adds the accent-border highlight on hover (used by Contact link cards).
- `hoverLift`: retained for API compatibility; no effect (this system has no shadows).
- `padding`: override the default `var(--space-6)`.
