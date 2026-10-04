// Offline renderer for the deterministic film pages (any page exposing window.__film).
//   node tools/render.mjs stills out/stills 2 6.5 12 ...        → one PNG per time (seconds)
//   node tools/render.mjs video  out/derek.mp4 [fps]              → frame-accurate H.264 via ffmpeg
// Options (anywhere in argv):
//   --page <path>   page to render (default film/index.html)
//   --sub <n>       motion blur: n sub-frames per frame across a 180° shutter, averaged by ffmpeg
import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const argv = process.argv.slice(2);
const opt = (name, dflt) => {
  const i = argv.indexOf(`--${name}`);
  if (i < 0) return dflt;
  const v = argv[i + 1]; argv.splice(i, 2); return v;
};
const pagePath = opt("page", "film/index.html");
const sub = Math.max(1, Number(opt("sub", 1)));
const [mode = "stills", out = "out/stills", ...rest] = argv;
const url = pathToFileURL(resolve(pagePath)).href + "?render=1";

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await page.goto(url, { waitUntil: "networkidle" });
await page.evaluate(async () => {
  await Promise.all([...document.fonts].map(f => f.load().catch(() => {})));
  await document.fonts.ready;
});
const duration = await page.evaluate(() => window.__film.duration);
const seek = t => page.evaluate(s => window.__film.seek(s), t);

if (mode === "stills") {
  mkdirSync(out, { recursive: true });
  const times = rest.length ? rest.map(Number) : [1, 4, 8, 11, 15, 19, 23, 27, 31, 33.8, 37, 40, 42, 46];
  for (const t of times) {
    await seek(t);
    await page.screenshot({ path: `${out}/t${t.toFixed(2).padStart(5, "0")}.png` });
  }
  console.log(`${times.length} stills → ${out}`);
} else if (mode === "video") {
  const fps = Number(rest[0]) || 30;
  mkdirSync(dirname(out), { recursive: true });
  const blur = sub > 1 ? ["-vf", `tmix=frames=${sub},select=eq(mod(n\\,${sub})\\,${sub - 1}),setpts=N/${fps}/TB`] : [];
  const ff = spawn("ffmpeg", [
    "-loglevel", "error", "-y", "-f", "image2pipe", "-framerate", String(fps * sub), "-i", "-",
    ...blur, "-r", String(fps),
    "-c:v", "libx264", "-preset", "slow", "-crf", "15", "-pix_fmt", "yuv420p", "-movflags", "+faststart", out,
  ], { stdio: ["pipe", "inherit", "inherit"] });
  const frames = Math.round(duration * fps);
  for (let i = 0; i <= frames; i++) {
    for (let s = 0; s < sub; s++) {
      // sub-frames spread over half a frame (180° shutter), ending on the frame time
      const t = Math.min(duration, Math.max(0, (i - 0.5 * (sub - 1 - s) / Math.max(1, sub - 1)) / fps));
      await seek(sub > 1 ? t : i / fps);
      const buf = await page.screenshot({ type: "jpeg", quality: 95 });
      if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once("drain", r));
    }
    if (i % fps === 0) process.stdout.write(`\r${(i / fps).toFixed(0)}s / ${duration}s`);
  }
  ff.stdin.end();
  await new Promise(r => ff.on("close", r));
  console.log(`\n→ ${out}`);
}
await browser.close();
