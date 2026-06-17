# Hero background video

The homepage hero (`src/components/hero.tsx`) renders a muted, autoplaying,
looping, full-bleed background `<video>`.

| File          | Required | Notes                                                       |
| ------------- | -------- | ----------------------------------------------------------- |
| `hero.mp4`    | yes      | H.264, 16:9, ~1920×1080, ~8–12s, seamless loop (in place)   |
| `hero.webm`   | optional | VP9 — smaller; served first when supported                  |

## Notes
- The hero currently uses **no `poster`** — the dark ink background covers
  first-paint cleanly. To add one, export the video's first frame as
  `hero-poster.jpg` and add `poster="/hero/hero-poster.jpg"` to the `<video>`.
- Keep it small (ideally < 5 MB). To re-compress with ffmpeg:
  `ffmpeg -i in.mp4 -vf scale=1920:-2 -c:v libx264 -crf 24 -pix_fmt yuv420p -an -movflags +faststart hero.mp4`
- No audio track — the hero is always muted.
- Calm, slow motion with dark negative space on the left keeps the headline,
  search, and chips legible (the hero overlays also dim the video).
- Make the first and last frames match so the loop is invisible.

If `hero.mp4` is absent, the hero still renders correctly using the ink
background + overlays (no broken layout).
