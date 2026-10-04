# Derek — Motion System: *Punto de convergencia*

Working document for the brand film and its motion language. Reasoning is in English; everything
the audience sees or hears is in Spanish, written natively rather than translated.

- Playable prototype: [`film/index.html`](../film/index.html) (48 s, 1920×1080, frame-accurate scrubbing)
- Vector reconstructions of the identity: [`brand/`](../brand)
- Renderer: `npm run video` → `out/derek-punto-de-convergencia.mp4`

---

## 1. What the logo is really saying

I measured the master artwork rather than describing it from memory. The motion system is built on
these facts, not on a generic "lines and shapes" mood.

| Observation | Measurement (master px) | Why it matters |
|---|---|---|
| The **k** is three strokes that never touch | Arms stop 9 px short of the stem; an 8 px horizontal gap separates the two arms | Nothing in the identity connects by accident. The space is deliberate. |
| **The outer edges of both arms, extended, meet exactly on the stem's centre line** | Intersection at x = 1054 (stem centre 1054), y ≈ 397 | The arms are not branching *out* of the stem. Read right to left, they **point into it**, at a spot that is never drawn. This is the film's central idea. |
| That hidden point sits between x-height and baseline, next to the **e** crossbars | K0 y ≈ 397; crossbars 391–416 | It works as a horizon for the whole word. The film uses it as its main horizontal axis. |
| The arms are asymmetric | Upper 35.6° (reaches the x-height); lower 39.1° (reaches the baseline) | Two related directions, not mirror images. They give the motion its only two diagonals. |
| Every terminal is cut on the grid | Arm ends, the **e** terminal and the **r** terminal are horizontal or vertical | Lines always end in a decision, never in a taper or a flourish. |
| A single stroke weight throughout | Stems 31, bowls 30, crossbars 25 | Weight carries meaning in motion: see "Weight is commitment" below. |

I call the hidden intersection **K0** (*el punto*). The film starts there, and the k ends up pointing back to it.

## 2. The concept

**The k as convergence, not as branching.**

The obvious reading of a k is a fork in the road: one stem, two options. That is literal, it reads
as a flowchart, and it leaves the brand in a state of indecision. The geometry says something more
precise. Both arms aim at the same invisible point inside the stem and stop short of touching it.

That gives three ideas in one mark, each anchored in a measurement:

1. **Origen.** Everything starts from a point (K0), and that point lives inside the structure.
2. **Criterio.** The gaps say that judgement sits between direction and foundation. Touching would be easy. Stopping short is a choice.
3. **Convergencia.** Many possible paths reduce to two directions, and both point to the same place.

The film shows this in order: a point, the many paths that leave it, the discipline of discarding
most of them, construction, and finally the two remaining lines arriving at the stem as the k.
Only then do the curves close the word. The audience realises late that they have been watching
the k all along. The first frame (a dot) and the last construction frame (the arms pointing at that
dot) are the same idea.

## 3. Motion grammar

Rules, not suggestions. Any new piece of motion (social, product UI, transitions) follows them.

**Directions.** Only four: vertical (stem), horizontal (crossbars and guides), +35.6° and −39.1° (the arms).
Curves appear only in the final act, as the word's human part. Nothing rotates. The camera never tilts.

**Weight is commitment.** A hairline (≈1.15 px on screen, ink at 42 %) is a *possibility*. A full
stroke (31 units) is a *decision*. Lines gain weight only when they become part of the mark. This is
the only way the system signals importance: no colour, no glow, no scale pop.

**Lines are drawn, never conjured.** Elements appear by growing along their own direction and leave
by retracting along it. Nothing fades in from nowhere, apart from copy.

**Nothing touches the k stem.** The 9 px gap is sacred in every frame, at every scale.

**Order is spatial.** Staggers are linear by distance from K0 (outward to open, inward to close).
No randomness and no jitter. Precision reads as calm.

**Two curves only.**

| Token | Curve | Use |
|---|---|---|
| `travel` | `cubic-bezier(0.65, 0, 0.35, 1)` | Movement between two known positions: lines extending, the camera, wipes |
| `arrive` | `cubic-bezier(0.16, 1, 0.3, 1)` | Decisive arrivals: a stroke gaining weight, the arms landing, copy reveals |

No overshoot, bounce, elastic, motion blur, 3D, particles or gradients.

**Camera.** Scale and translate only, slow and continuous. It begins 2.6× on K0 and ends at 1.12×
on the full word, with a 2.5 % push over the closing seconds so the frame never feels frozen.

## 4. Tokens

| Token | Value |
|---|---|
| `--paper` | `#F6F5EF` (sampled from the master) |
| `--ink` | `#171917` (sampled from the master) |
| Hairline | 1.15 px non-scaling, ink @ 42 % (paths) / 90 % (the chosen pair) / 22 % (construction guides) |
| Stroke | 31 u stems · 30 u bowls · 25 u crossbars |
| Copy type | Manrope 500, 40 px, −1.2 % tracking, sentence case, left-aligned at x = 160 |
| Tagline type | Manrope 400, 34 px, aligned to the wordmark's left edge |
| Copy reveal | Left-to-right clip, 0.9 s `arrive`; exit 0.5 s opacity |
| Line draw | 1.4–1.7 s `travel`; stagger 0.19 s per lattice step |
| Inversion wipe | Edge at the lower-arm angle (−39.1°), bottom-left → top-right, 1.7 s `travel` |

Manrope (SIL OFL) is a placeholder for copy typography. It is neutral and geometric without
competing with the wordmark. Swap it for the brand's text face if there is one.

## 5. The film — *Punto de convergencia* (0:48)

| Time | Act | What we see | On screen |
|---|---|---|---|
| 0:00–0:06 | I · Origen | Paper. A single point appears. A vertical hairline grows through it to both frame edges. | **Todo empieza en un punto.** |
| 0:06–0:13 | II · Posibilidades | From the vertical, hairlines at the two arm angles radiate outward, step by step, into a fine diamond lattice. The camera widens. | **Desde ahí, los caminos se multiplican.** |
| 0:13–0:21 | III · Criterio | The lattice withdraws from the outside in until only two lines remain, crossing at the point. A short silence. | **Elegir es saber renunciar.** → **Y tener claro por qué.** |
| 0:21–0:29 | IV · Construcción | The camera reframes. Type guides draw (ascender, x-height, the axis, baseline). The vertical gains weight and becomes a stem. Two more stems rise from the baseline, and two crossbars run along the axis. | **Después, construir. Con medida, sin atajos.** |
| 0:29–0:35 | V · Convergencia | The two remaining lines withdraw into the point. Along their paths, two solid arms travel inward and stop just short of the stem: the k. The point flashes once, in paper, *inside* the stem where the arms aim, then disappears. | **Hasta que todo apunta en la misma dirección.** |
| 0:35–0:41 | VI · Forma | The curves draw last: the d bowl, both e, the r shoulder. The guides fade. **derek**. | — |
| 0:41–0:48 | VII · Firma | An ink field sweeps across at the lower-arm angle and inverts the identity. | **Cada línea, con intención.** |

### How the reveal is earned
- The **point** in frame one is K0, the exact spot the finished k aims at.
- The **vertical** in Act I is the k stem; it is never replaced, only given weight.
- The **two lattice families** are the two arm angles. The pair that survives Act III is the pair of arm edges.
- The **horizontal axis** in Act IV passes through K0 and carries the e crossbars.
- The **inversion wipe** runs at the lower-arm angle.
- The **tagline** names the method the audience just watched.

## 6. Voice-over (optional)

Recommended: no voice-over. Copy on screen, a sparse soundtrack. If the film needs a voice, use this
script. It follows the on-screen copy so the two never compete.

> Todo empieza en un punto.
> Desde ahí, los caminos se multiplican.
> Elegir es saber renunciar… y tener claro por qué.
> Después, construir. Con medida, sin atajos.
> Hasta que todo apunta en la misma dirección.
> Derek. Cada línea, con intención.

**Voice direction:** close mic, low and unhurried, no "announcer" lift at the end. One voice and one
take feel, with pauses longer than the lines. Choose the Spanish variety (peninsular or neutral
Latin American) to match the primary market. The copy uses no regional forms either way.

**Sound:** dry, tactile, almost architectural: a fine pen or pencil on paper as the hairlines draw,
a single low tone as strokes gain weight, silence at 0:19–0:21. The only accent falls on the arms
landing at ~0:32.6. No riser, no drop and no logo "sting".

### Copy notes
- *Todo empieza en un punto.* Literal and calm. It names exactly what the screen shows.
- *Elegir es saber renunciar.* Native and aphoristic; avoids the calque "elegir es descartar".
- *Con medida, sin atajos.* Precision and discipline without sounding technical.
- *Hasta que todo apunta en la misma dirección.* Describes the convergence without naming the k.
- *Cada línea, con intención.* A tagline candidate. Alternatives with the same tone: *Nada al azar.* · *Con criterio.*

## 7. Extending the system

- **6 s cutdown:** Act V only. The two lines converge on the stem and form the k, then hard cut to the wordmark.
- **Loader / waiting state:** the two arms slide inward along their angles and stop short of the stem, then loop by retracting.
- **Section transitions:** the inversion wipe at −39.1°, never a crossfade.
- **Data or diagrams:** connectors only at 0°, 90°, +35.6° and −39.1°; hairline for proposed, full weight for confirmed.
- **What to avoid:** k-shaped confetti, arms as arrows or chevrons in UI, or any use of the arms that touches the stem.

## 8. Assumptions and open questions

The brief I received covered the identity but not the business. These need confirming:

1. **What Derek does and who it is for.** The copy is deliberately product-agnostic (direction, judgement, construction). With the actual proposition, Acts II–IV can carry one specific line each.
2. **Market and Spanish variety** for VO and final copy.
3. **Length and formats.** The prototype is 16:9 at 48 s. The system supports 9:16 and 1:1, because the k sits at the frame centre for the first half.
4. **Tagline approval.** *Cada línea, con intención.* is a proposal, not an existing brand line.
5. **Master artwork.** The `brand/` SVGs are reconstructions measured from a raster reference. Replace them with the original vector files before production; the film reads all geometry from one table (`GEO` in `film/index.html`).
