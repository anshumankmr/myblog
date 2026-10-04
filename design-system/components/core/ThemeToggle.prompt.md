Sun/moon icon button that flips light/dark mode — lives in the header, mirrors next-themes behaviour.

```jsx
{/* Uncontrolled: toggles `.dark` on <html> automatically */}
<ThemeToggle />

{/* Controlled */}
<ThemeToggle theme={theme} onChange={setTheme} />
```

- `onChrome` (default true) styles it for the dark header (gray-300 → accent on hover); set false on light surfaces.
- Uses Font Awesome icons — load Font Awesome on the page.
