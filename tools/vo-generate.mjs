// Generates the voice-over takes with Fish Audio, one request per line.
//   FISH_API_KEY=… FISH_VOICE_ID_ALAN=… FISH_VOICE_ID_ADRIAN=… node tools/vo-generate.mjs [line-id …] [--dry]
// Keep the key and voice ids out of Git (use a private .env loaded by your shell).
// Cost: 1 credit per UTF-8 byte of text. --dry prints the cost and sends nothing.
// Existing takes are never overwritten; delete a file to regenerate that line.
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";

const args = process.argv.slice(2);
const dry = args.includes("--dry");
const only = args.filter(a => !a.startsWith("--"));
const S = JSON.parse(readFileSync("video/script.json", "utf8"));
const VOICE = { alan: process.env.FISH_VOICE_ID_ALAN, adrian: process.env.FISH_VOICE_ID_ADRIAN };
const MODEL = process.env.FISH_MODEL || "s2-pro";

const todo = S.lines.filter(l => (!only.length || only.includes(l.id)) && !existsSync(`video/audio/vo/${l.id}.mp3`));
const bytes = todo.reduce((a, l) => a + Buffer.byteLength(l.text), 0);
console.log(`${todo.length} line(s), ${bytes} bytes ≈ ${bytes} credits (model ${MODEL})`);
if (dry || !todo.length) process.exit(0);

if (!process.env.FISH_API_KEY) throw new Error("FISH_API_KEY is not set");
for (const sp of new Set(todo.map(l => l.speaker))) if (!VOICE[sp]) throw new Error(`FISH_VOICE_ID_${sp.toUpperCase()} is not set`);

mkdirSync("video/audio/vo", { recursive: true });
for (const l of todo) {
  const res = await fetch("https://api.fish.audio/v1/tts", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.FISH_API_KEY}`, "Content-Type": "application/json", model: MODEL },
    body: JSON.stringify({ text: l.text, reference_id: VOICE[l.speaker], format: "mp3", mp3_bitrate: 192, normalize: true }),
  });
  if (!res.ok) throw new Error(`${l.id}: HTTP ${res.status} ${await res.text()}`);
  writeFileSync(`video/audio/vo/${l.id}.mp3`, Buffer.from(await res.arrayBuffer()));
  console.log(`✓ ${l.id} (${l.speaker})`);
}
console.log("Next: node tools/vo-build.mjs");
