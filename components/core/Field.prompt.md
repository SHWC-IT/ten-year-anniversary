A labelled input or select with gold focus ring and inline error state; the form primitive used on the Giving page.

```jsx
<Field label="Full name" placeholder="Jane Doe" required />
<Field label="Designation" options={["Prayer Tabernacle", "Global Missions"]} />
<Field label="Email" type="email" error="Enter a valid email" />
```

Pass `options` to render a `<select>`. Set `error` to show the red invalid state.
