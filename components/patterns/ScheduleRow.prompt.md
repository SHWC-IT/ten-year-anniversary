A clickable event row — gold date block, title + venue, gold time pill; stack them under a hairline-topped list for a schedule.

```jsx
<ScheduleRow dow="Fri" day="09" month="Oct"
  title="Prayer & Thanksgiving"
  description="A sacred gathering of prayer and thanksgiving."
  venue="Shepherd's House Church · 521 Allegheny Ave"
  venueHref="https://maps.google.com/..."
  time="9:00 PM ET" />
```

The venue link stops row-click propagation. Times shown in ET.
