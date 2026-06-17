# Hero background video

The homepage hero (`src/components/hero.tsx`) renders a muted, autoplaying,
looping background `<video>`. Drop the exported files here:

| File              | Required | Notes                                                        |
| ----------------- | -------- | ------------------------------------------------------------ |
| `hero.mp4`        | yes      | H.264/AAC, 16:9, 1920×1080, ~8–12s, **seamless loop**        |
| `hero.webm`       | optional | VP9 — smaller; served first when supported                   |
| `hero-poster.jpg` | yes      | First frame; shown before/while the video loads (and as fallback) |

## Recommendations
- **Keep it under ~4–6 MB.** It's a background loop, not a film — compress hard
  (e.g. `ffmpeg -i in.mov -vf scale=1920:-2 -c:v libx264 -crf 24 -pix_fmt yuv420p -an -movflags +faststart hero.mp4`).
- **No audio track** (`-an`) — the hero is always muted.
- **Calm, slow motion** with dark negative space in the upper-left so the
  headline and CTA stay legible. Overlays in the hero already dim the video.
- Make the **first and last frames match** so the loop is invisible.

If these files are absent, the hero still renders correctly using the
ink background + grid + cobalt glow (no broken layout).

See the chat/PR for the Midjourney + Veo/Runway prompt used to generate this.
