// Offline renderer for film/index.html.
//   node tools/render.mjs stills out/stills 2 6.5 12 ...   → one PNG per time (seconds)
//   node tools/render.mjs video  out/derek.mp4 [fps]        → frame-accurate H.264 via ffmpeg
import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const [mode = "stills", out = "out/stills", ...rest] = process.argv.slice(2);
const url = pathToFileURL(resolve("film/index.html")).href + "?render=1";

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || undefined,
});
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await page.goto(url, { waitUntil: "networkidle" });
await page.evaluate(async () => { await document.fonts.load("500 40px Manrope"); await document.fonts.load("400 34px Manrope"); await document.fonts.ready; });
const duration = await page.evaluate(() => window.__film.duration);
const seek = t => page.evaluate(s => window.__film.seek(s), t);

if (mode === "stills") {
  mkdirSync(out, { recursive: true });
  const times = rest.length ? rest.map(Number) : [1, 4, 8, 11, 15, 19, 23, 27, 31, 33.8, 37, 40, 42, 46];
  for (const t of times) {
    await seek(t);
    await page.screenshot({ path: `${out}/t${t.toFixed(1).padStart(4, "0")}.png` });
  }
  console.log(`${times.length} stills → ${out}`);
} else if (mode === "video") {
  const fps = Number(rest[0]) || 30;
  mkdirSync(dirname(out), { recursive: true });
  const ff = spawn("ffmpeg", [
    "-loglevel", "error", "-y", "-f", "image2pipe", "-framerate", String(fps), "-i", "-",
    "-c:v", "libx264", "-preset", "slow", "-crf", "16", "-pix_fmt", "yuv420p", "-movflags", "+faststart", out,
  ], { stdio: ["pipe", "inherit", "inherit"] });
  const frames = Math.round(duration * fps);
  for (let i = 0; i <= frames; i++) {
    await seek(i / fps);
    const buf = await page.screenshot({ type: "png" });
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once("drain", r));
    if (i % fps === 0) process.stdout.write(`\r${(i / fps).toFixed(0)}s / ${duration}s`);
  }
  ff.stdin.end();
  await new Promise(r => ff.on("close", r));
  console.log(`\n→ ${out}`);
}
await browser.close();
