// Downloads the Fish Audio takes listed in video/audio/takes.json into video/audio/vo/.
//   node tools/vo-fetch.mjs
// Needs network access to platform.r2.fish.audio. Existing files are kept.
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
const M = JSON.parse(readFileSync("video/audio/takes.json", "utf8"));
mkdirSync("video/audio/vo", { recursive: true });
let ok = 0;
for (const k of M.takes) {
  const out = `video/audio/vo/${k.file}`;
  if (existsSync(out)) { ok++; continue; }
  try {
    const res = await fetch(k.url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    writeFileSync(out, Buffer.from(await res.arrayBuffer()));
    ok++; console.log(`✓ ${k.file}`);
  } catch (e) { console.log(`✗ ${k.file}: ${e.message}`); }
}
console.log(`${ok}/${M.takes.length} takes present. Next: node tools/vo-build.mjs`);
