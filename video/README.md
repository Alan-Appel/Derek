# Derek — “Todo empieza en un punto”

Pieza principal vertical de 1080 × 1920, a 30 fps y de unos 51 s. La propuesta completa (concepto, guion, reparto,
metáfora, storyboard, tiempos, transiciones, movimiento, plan de Fish Audio e implementación) está en
[`docs/derek-film-v2.md`](../docs/derek-film-v2.md).

## Estado

| Parte | Estado |
|---|---|
| Guion v2 y reparto Alan / Adrián | Listo (`script.json`) |
| Motor visual (canvas con cámara 3D) y escenas | Listo y revisado fotograma a fotograma |
| Tomas de voz en Fish Audio | **11 tomas generadas con voces temporales** (`audio/takes.json`) |
| Descarga y análisis de las tomas | **Bloqueado:** la red del entorno no permite `platform.r2.fish.audio` |
| Voces clonadas de Alan Appel y Adrián Aguilera | **No existen.** Faltan muestras y autorización |
| Previsualización MP4 | Sin sonido, con tiempos estimados y la marca “VOZ TEMPORAL” |

## Pipeline: la voz manda

```sh
npm run derek:audio    # descarga las tomas, analiza la voz (pausas, palabras, énfasis), rehace tiempos y subtítulos, mezcla a -16 LUFS
npm run derek:final    # renderiza las dos versiones (con y sin subtítulos) con la voz incorporada
```

Cada animación se ancla a palabras de la locución (`W("04","crm")`, `W("07","construimos")`…).
Si una toma cambia de duración, todo el video se reacomoda solo.

### Cuando existan las voces de los fundadores

1. Clonar las voces en Fish Audio (ver “Muestras” en la propuesta) y anotar sus ids.
2. Regenerar las 11 tomas con esas voces (unos 640 créditos) y actualizar `audio/takes.json`.
   También se puede usar `tools/vo-generate.mjs` con `FISH_API_KEY`, `FISH_VOICE_ID_ALAN` y `FISH_VOICE_ID_ADRIAN`.
3. `npm run derek:audio && npm run derek:final`.
4. Renderizar con `--query final=1` para quitar la marca de voz temporal.

## Cómo verlo

Abrí `video/index.html` en un navegador. La barra espaciadora reproduce o pausa y **CC** muestra los subtítulos.
Con `audio/voiceover.wav` presente, la vista previa suena sincronizada.

## Decisiones

- **Motor propio en canvas con proyección 3D**: órbita, inclinación, profundidad, niebla y paralaje. Es determinista y
  renderiza con Playwright y FFmpeg. No se usaron Three.js ni WebGL: el render sin pantalla sería más lento y frágil, y la proyección propia alcanza.
- **Sin cortes:** cada escena nace de un objeto de la anterior (punto → islas → red → circuito → interfaz → teléfono → ecosistema → horizonte → grilla → punto → derek).
- **Las voces temporales** son genéricas. Se descartaron las que imitan a personas reales (futbolistas, actores de doblaje, divulgadores).
- **No se inventan productos ni resultados:** la visión habla de buscar, experimentar y construir, y la estructura que crece es abstracta y sin nombre.
- **La fe** está en los valores dichos (integridad, disciplina, respeto), no como argumento de venta.
- **El logo** aparece completo y la k no se destaca.

## Costos (Fish Audio, plan gratuito)

| Uso | Créditos |
|---|---|
| Pruebas de voz y transcripción (para comprobar si la transcripción da marcas de tiempo; no las da) | 177 |
| 11 tomas del guion v2 con voces temporales | 714 |
| **Saldo** | **11.109 de 12.000** |
