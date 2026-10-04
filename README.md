# Derek — sistema de movimiento

Motion language and brand film built from the geometry of the Derek wordmark.

| Path | What it is |
|---|---|
| `docs/motion-system.md` | Concept, measured logo geometry, motion rules, tokens, storyboard, Spanish copy and VO |
| `film/index.html` | Playable 48 s film prototype. Open it in a browser. Space plays or pauses; the bar scrubs. |
| `brand/*.svg` | Vector reconstructions of the wordmark and the k symbol (light, inverse, icon) |
| `tools/render.mjs` | Frame-accurate renderer: Playwright frames piped to ffmpeg |
| `tools/export-logo.mjs` | Regenerates `brand/` from the shared geometry |

```sh
npm run stills   # key frames → out/stills/
npm run video    # out/derek-punto-de-convergencia.mp4 (requires playwright + ffmpeg)
npm run logo     # brand/*.svg
```

`film/index.html?t=31` opens the film at a given second.
