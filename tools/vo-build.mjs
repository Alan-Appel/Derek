// Builds the edit timeline from the voice-over. VOICE DRIVES TIMING.
//   node tools/vo-build.mjs
// For each line in video/script.json it looks for video/audio/vo/<id>.(mp3|wav|m4a)
// (a "both" line uses <id>.alan.* and <id>.adrian.*, mixed in unison).
// With real takes it decodes the audio, measures speech start/end, finds the internal pauses,
// anchors them to the punctuation of the script, spreads words between anchors by syllables and
// marks emphasis (words whose energy stands out). Without takes it estimates the same structure.
// Outputs:
//   video/timeline.js          window.TIMELINE: lines + words with times + emphasis
//   video/subs/derek.srt|.vtt  captions (and subs/cues.js for burned-in captions)
//   video/audio/voiceover.wav  the assembled VO bed, -16 LUFS (only when every take exists)
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { execFileSync } from "node:child_process";

const S = JSON.parse(readFileSync("video/script.json", "utf8"));
const EXT = ["mp3", "wav", "m4a"];
const find = base => EXT.map(e => `video/audio/vo/${base}.${e}`).find(existsSync);
const takesOf = l => l.speaker === "both"
  ? [find(`${l.id}.alan`), find(`${l.id}.adrian`)]
  : [find(l.id)];

// ---------- audio analysis (16 kHz mono, 10 ms RMS frames) ----------
function envelope(file) {
  const pcm = execFileSync("ffmpeg", ["-loglevel", "error", "-i", file, "-ac", "1", "-ar", "16000", "-f", "s16le", "-"], { maxBuffer: 1 << 28 });
  const n = pcm.length >> 1, hop = 160, frames = Math.floor(n / hop), env = new Float32Array(frames);
  for (let f = 0; f < frames; f++) { let s = 0; for (let i = 0; i < hop; i++) { const v = pcm.readInt16LE((f * hop + i) * 2) / 32768; s += v * v; } env[f] = Math.sqrt(s / hop); }
  return { env, dur: n / 16000 };
}
function analyse(file) {
  const { env, dur } = envelope(file);
  const peak = env.reduce((a, b) => Math.max(a, b), 0) || 1;
  const thr = peak * 0.06, minSil = 0.14;                       // ~ -24 dB under the peak
  const voiced = [...env].map(v => v > thr);
  let a = voiced.indexOf(true), b = voiced.lastIndexOf(true);
  if (a < 0) { a = 0; b = env.length - 1; }
  const sil = []; let run = -1;
  for (let f = a; f <= b; f++) {
    if (!voiced[f] && run < 0) run = f;
    if (voiced[f] && run >= 0) { if ((f - run) / 100 >= minSil) sil.push({ a: run / 100, b: f / 100 }); run = -1; }
  }
  return { dur, start: a / 100, end: (b + 1) / 100, sil, env, peak };
}

// ---------- word timing ----------
const syl = w => Math.max(1, (w.toLowerCase().match(/[aeiouáéíóúü]+/g) || []).length);
function tokens(text) {
  return text.split(/\s+/).filter(Boolean).map(raw => ({ w: raw.replace(/[.,;:¿?¡!]/g, ""), raw, stop: /[.;:?!]$/.test(raw) ? 2 : /,$/.test(raw) ? 1 : 0 }));
}
// spread words over [t0,t1] by syllables, leaving room for punctuation pauses
function spread(toks, t0, t1, pauseUnit) {
  const weight = toks.reduce((a, k, i) => a + syl(k.w) + (i < toks.length - 1 ? k.stop * pauseUnit : 0), 0);
  const u = (t1 - t0) / weight; let t = t0;
  return toks.map((k, i) => { const d = syl(k.w) * u, o = { ...k, t0: t, t1: t + d }; t += d + (i < toks.length - 1 ? k.stop * pauseUnit * u : 0); return o; });
}
function wordsFor(line, A) {
  const toks = tokens(line.text);
  if (!A) return spread(toks, 0, line.dur, 1.6);
  // anchor punctuation boundaries to the longest internal silences, in order
  const bounds = toks.map((k, i) => (k.stop && i < toks.length - 1 ? i : -1)).filter(i => i >= 0);
  const sil = [...A.sil].sort((x, y) => (y.b - y.a) - (x.b - x.a)).slice(0, bounds.length).sort((x, y) => x.a - y.a);
  const chunks = []; let from = 0, t = A.start;
  bounds.forEach((bi, j) => {
    const s = sil[j];
    if (!s) return;
    chunks.push({ toks: toks.slice(from, bi + 1), t0: t, t1: s.a }); from = bi + 1; t = s.b;
  });
  chunks.push({ toks: toks.slice(from), t0: t, t1: A.end });
  const out = chunks.flatMap(c => spread(c.toks, c.t0, c.t1, 0));
  // emphasis: mean energy per word relative to the line
  const e = out.map(k => { let s = 0, n = 0; for (let f = Math.floor(k.t0 * 100); f < Math.ceil(k.t1 * 100) && f < A.env.length; f++) { s += A.env[f]; n++; } return n ? s / n : 0; });
  const mean = e.reduce((a, b) => a + b, 0) / (e.length || 1);
  return out.map((k, i) => ({ ...k, emph: e[i] > mean * 1.25 }));
}

// ---------- timeline ----------
let t = S.lead_in;
const lines = S.lines.map((l, i) => {
  const files = takesOf(l), real = files.every(Boolean);
  const A = real ? files.map(analyse).sort((x, y) => y.dur - x.dur)[0] : null;
  const dur = A ? A.dur : l.est;
  const line = { ...l, files: real ? files : [], pending: !real, start: +t.toFixed(3), dur: +dur.toFixed(3), end: +(t + dur).toFixed(3) };
  line.words = wordsFor(line, A).map(k => ({ w: k.w, raw: k.raw, t0: +(t + k.t0).toFixed(3), t1: +(t + k.t1).toFixed(3), emph: !!k.emph }));
  if (A) { line.speech = [+(t + A.start).toFixed(3), +(t + A.end).toFixed(3)]; }
  t += dur + (i < S.lines.length - 1 ? (l.pause_after ?? S.gap) : 0);
  return line;
});
const duration = +(t + S.tail).toFixed(3);
const pending = lines.filter(l => l.pending).map(l => l.id);
writeFileSync("video/timeline.js", `// generated by tools/vo-build.mjs — do not edit\nwindow.TIMELINE = ${JSON.stringify({ duration, pending, lines })};\n`);

// ---------- captions: sentence chunks timed by their words ----------
const cues = [];
for (const l of lines) {
  let cur = [];
  const flush = () => { if (cur.length) cues.push({ a: cur[0].t0, b: cur[cur.length - 1].t1 + 0.15, text: cur.map(k => k.raw).join(" ") }); cur = []; };
  for (const k of l.words) { cur.push(k); if (/[.?!]$/.test(k.raw) || cur.map(x => x.raw).join(" ").length > 52) flush(); }
  flush();
}
const ts = (x, sep) => { const ms = Math.round(x * 1000), h = Math.floor(ms / 3600000), m = Math.floor(ms / 60000) % 60, sec = Math.floor(ms / 1000) % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}${sep}${String(ms % 1000).padStart(3, "0")}`; };
mkdirSync("video/subs", { recursive: true });
writeFileSync("video/subs/derek.srt", cues.map((c, i) => `${i + 1}\n${ts(c.a, ",")} --> ${ts(c.b, ",")}\n${c.text}\n`).join("\n"));
writeFileSync("video/subs/derek.vtt", "WEBVTT\n\n" + cues.map(c => `${ts(c.a, ".")} --> ${ts(c.b, ".")}\n${c.text}\n`).join("\n"));
writeFileSync("video/subs/cues.js", `// generated by tools/vo-build.mjs\nwindow.CUES = ${JSON.stringify(cues.map(c => ({ a: +c.a.toFixed(3), b: +c.b.toFixed(3), text: c.text })))};\n`);

// ---------- VO bed ----------
if (!pending.length) {
  const inputs = [], parts = [];
  for (const l of lines) for (const f of l.files) { parts.push({ f, at: l.start, gain: l.speaker === "both" ? 0.8 : 1 }); inputs.push("-i", f); }
  const chains = parts.map((p, i) => `[${i}:a]aresample=48000,pan=mono|c0=c0,volume=${p.gain},adelay=${Math.round(p.at * 1000)}[a${i}]`).join(";");
  const mix = `${chains};${parts.map((_, i) => `[a${i}]`).join("")}amix=inputs=${parts.length}:normalize=0,apad=whole_dur=${duration},loudnorm=I=-16:TP=-1.5:LRA=11[out]`;
  execFileSync("ffmpeg", ["-loglevel", "error", "-y", ...inputs, "-filter_complex", mix, "-map", "[out]", "-ar", "48000", "-t", String(duration), "video/audio/voiceover.wav"]);
}
console.log(`duration ${duration}s · ${lines.length - pending.length}/${lines.length} lines with real audio${pending.length ? ` · estimated: ${pending.join(", ")}` : " · voiceover.wav written"}`);
