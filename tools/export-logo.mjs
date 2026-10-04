// Writes vector reconstructions of the Derek wordmark and k symbol to brand/.
// Same geometry as film/index.html (GEO, ARM_U, ARM_L) — measured from the master artwork.
import { mkdirSync, writeFileSync } from "node:fs";

const PAPER = "#F6F5EF", INK = "#171917";
const G = { asc: 250, base: 491, stemW: 31, R: 76, W: 30, barW: 25, barY: 403.5 };
const ARM_U = [[1079, 393], [1107.5, 393], [1217, 314.5], [1168.75, 314.5], [1079, 378.7]];
const ARM_L = [[1079, 401.25], [1106, 401.25], [1216.5, 491], [1170, 491], [1079, 417.1]];

const arm = p => {
  const tip = p[4], prev = p[3], next = p[0], r = 9;
  const toward = q => { const dx = q[0] - tip[0], dy = q[1] - tip[1], L = Math.hypot(dx, dy); return [tip[0] + dx / L * r, tip[1] + dy / L * r]; };
  const a = toward(prev), b = toward(next);
  const f = ([x, y]) => `${+x.toFixed(2)} ${+y.toFixed(2)}`;
  return `M ${f(p[0])} L ${f(p[1])} L ${f(p[2])} L ${f(p[3])} L ${f(a)} Q ${f(tip)} ${f(b)} Z`;
};
const stem = (x, top) => `<line x1="${x}" y1="${G.base}" x2="${x}" y2="${top}" stroke-width="${G.stemW}"/>`;
const e = (cx, id) => {
  const a = 20 * Math.PI / 180, ex = (cx + G.R * Math.cos(a)).toFixed(2), ey = (404 + G.R * Math.sin(a)).toFixed(2);
  return `<mask id="${id}" maskUnits="userSpaceOnUse" x="0" y="0" width="2000" height="1000"><rect width="2000" height="1000" fill="#fff"/><rect x="${cx + 20}" y="416" width="90" height="28" fill="#000"/></mask>
    <path mask="url(#${id})" stroke-width="${G.W}" d="M ${cx + G.R} 404 A ${G.R} ${G.R} 0 1 0 ${ex} ${ey}"/>
    <line x1="${cx - 70}" y1="${G.barY}" x2="${cx + 90.5}" y2="${G.barY}" stroke-width="${G.barW}"/>`;
};
const k = () => `${stem(1054, G.asc)}
    <path d="${arm(ARM_U)}" fill="currentColor" stroke-width="2" stroke-linejoin="round"/>
    <path d="${arm(ARM_L)}" fill="currentColor" stroke-width="2" stroke-linejoin="round"/>`;
const word = () => `
    <path stroke-width="${G.W}" d="M 494 404 A 76 76 0 1 0 342 404 A 76 76 0 1 0 494 404"/>
    ${stem(498, G.asc)}
    ${e(622, "e1")}
    ${stem(753, 380)}
    <path stroke-width="${G.stemW}" d="M 753 420 L 753 378 A 50 50 0 0 1 803 328 L 833 328"/>
    ${e(925.5, "e2")}
    ${k()}`;
const svg = (vb, color, body, bg = "") => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" role="img" aria-label="derek">
  ${bg}<g fill="none" stroke="currentColor" style="color:${color}" color="${color}">${body}
  </g>
</svg>
`;

mkdirSync("brand", { recursive: true });
const files = {
  "derek-wordmark.svg": svg("306 235 926 271", INK, word()),
  "derek-wordmark-inverse.svg": svg("246 175 1046 391", PAPER, word(), `<rect x="246" y="175" width="1046" height="391" fill="${INK}"/>\n  `),
  "derek-k.svg": svg("1028 240 199 261", INK, k()),
  "derek-k-icon.svg": svg("933 176 389 389", PAPER, k(), `<rect x="933" y="176" width="389" height="389" rx="72" fill="${INK}"/>\n  `),
};
for (const [name, body] of Object.entries(files)) writeFileSync(`brand/${name}`, body);
console.log(Object.keys(files).map(f => `brand/${f}`).join("\n"));
