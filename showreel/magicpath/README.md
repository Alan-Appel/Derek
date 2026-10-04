# MagicPath — 15 s spec spot

An unofficial spec piece / showreel reel about [MagicPath](https://www.magicpath.ai), the AI design canvas.
It is not affiliated with MagicPath. The mark and tagline are invented for the piece; nothing comes from their brand assets.

Open `index.html` in a browser (Space plays or pauses, the bar scrubs, `?t=9.1` jumps to a time).
Every frame is a pure function of time, so the render is frame-exact.

```sh
npm run reel:stills   # key frames → out/reel/
npm run reel          # out/magicpath-spec-spot.mp4 — 1080p60, 3-sample motion blur
```

## Beats

| Time | Beat | Craft on show |
|---|---|---|
| 0.0–2.0 | A point whips into a glowing gradient path; **"Every *great* product"** | Bezier path draw with a particle trail, word masks with spring physics |
| 2.0–3.9 | The path's head morphs into a prompt bar: **"starts with a *prompt.*"** Human-rhythm typing, Enter | Match cut, rotating conic border, shockwave rings, particle burst, camera shake |
| 3.9–7.8 | Whip-zoom out to an infinite canvas. Skeletons shimmer, then resolve into a live dashboard, then a dark variant and an iOS variant. **"Real components. *Not pictures of them.*"** | Log-space camera, staggered skeleton → content resolves, count-ups, spring bar charts |
| 7.8–10.0 | Cursors for You, Claude Code and Codex edit together. A comment, a marquee select and recolour, a card drag-and-swap, a toggle. **"Humans *+ agents,* one canvas."** | Arced cursor paths, lift and drop with shadows, spring reflow |
| 10.0–11.6 | The board tilts in 3D; a code panel flies in. Glowing links tie components to the lines that build them. **"Straight to *production code.*"** | Perspective, line-by-line code reveal, live DOM-measured connector paths |
| 11.6–15.0 | Everything implodes, then a flash. Seven paths converge into a burst, the mark springs in, then the letters. **"From prompt to *product.*"** | Implosion, converging paths, letter springs, tagline that calls back the opening |

Fonts: Inter Tight, Instrument Serif, JetBrains Mono (SIL OFL, see `fonts/`).
