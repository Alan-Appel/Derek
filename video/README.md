# Derek — video de presentación

Pieza vertical de 1080 × 1920, a 30 fps y de unos 42 s según el habla estimada. Está armada según el brief
`Derek_video_brief_y_prompt.md`. La duración final la fija la locución real, porque los tiempos de cada escena
salen de la duración de cada toma.

## Estado (4 de octubre de 2026)

| Parte | Estado |
|---|---|
| Guion y reparto Alan / Adrián | Listo (`script.json`). Se quitó la línea de Paraguay y valores (pedido del 4/10) |
| Dinámica tipo MagicPath | Lienzo infinito con cámara que viaja, un camino que conecta todo, texto cinético, resortes, cursor “Vos” y motion blur |
| Escenas y animación | Listo para revisar (`index.html`) |
| Subtítulos SRT/VTT | Listos con tiempos estimados; se regeneran con la voz real |
| Previsualización MP4, con y sin subtítulos | Sin voz y con tiempos estimados |
| **Voces clonadas de Alan y Adrián** | **Pendiente: faltan las muestras de voz y la autorización escrita de Adrián** |
| Música | Pendiente: no se agregó ninguna pista sin licencia confirmada |
| Contacto del cierre | Pendiente: el video muestra “Contacto · pendiente de confirmar” |
| Versión horizontal 1920 × 1080 | Se prepara después de aprobar la vertical, como pide el brief |
| Versión de 15 s | Se prepara después de cerrar la principal |

## Cómo verlo

Abrí `video/index.html` en un navegador. La barra espaciadora reproduce o pausa, la barra de tiempo permite moverse y **CC** activa los subtítulos.
Si existe `audio/voiceover.wav`, la vista previa se reproduce con la voz sincronizada.

## Voces con Fish Audio

La cuenta conectada tiene el plan gratuito y 12.000 créditos. Clonar una voz no tiene costo. Generar voz cuesta
1 crédito por byte de texto. El guion completo ocupa **525 bytes**, así que una toma completa
consume unos 525 créditos. Con el saldo actual alcanzan las dos muestras de prueba y varias tomas completas.
El plan gratuito acepta hasta 500 bytes por llamada; cada frase va en una llamada separada, así que no hay problema.

1. **Grabar** a cada uno por separado: de 60 a 120 s de habla natural, en un lugar silencioso, sin música ni eco.
   Un celular alcanza. Guardar el archivo original (m4a, mp3 o wav) sin convertirlo.
   Nombres sugeridos: `alan_referencia` y `adrian_referencia`. Van en `video/audio/referencias/`, carpeta que Git ignora.
2. **Autorización.** Alan confirma el uso de su voz. Adrián tiene que autorizarlo **por escrito y de forma expresa**,
   solo para el material de Derek. No se crea su clon hasta tener esa autorización.
3. **Clonar** dos voces privadas, “Derek - Alan” y “Derek - Adrian”. Fish Audio puede pedir que cada persona
   grabe una frase de verificación.
4. **Prueba corta** con cada voz: “Derek. Software con propósito, desde Paraguay.” Escuchar cómo pronuncia
   “Derek”, el acento y el tono antes de generar el guion completo.
5. **Generar y montar**:
   ```sh
   export FISH_API_KEY=…  FISH_VOICE_ID_ALAN=…  FISH_VOICE_ID_ADRIAN=…   # privados, nunca en Git
   node tools/vo-generate.mjs --dry     # muestra el costo y no envía nada
   node tools/vo-generate.mjs           # una toma por frase → video/audio/vo/<id>.mp3
   node tools/vo-build.mjs              # re-cronometra el video, rehace subtítulos y arma voiceover.wav (-16 LUFS)
   ```
   Para repetir una sola frase: borrar su archivo y correr `node tools/vo-generate.mjs 08-fe`.
   Las tomas también pueden generarse desde la web de Fish Audio; basta con guardarlas en `video/audio/vo/` con el nombre de la frase.

No se puede garantizar una reproducción perfecta del timbre ni del acento. Si una voz clonada no convence,
se puede grabar esa frase directamente y guardarla con el mismo nombre: el montaje funciona igual.

## Renderizar

```sh
node tools/vo-build.mjs
node tools/render.mjs video out/derek-presentacion-vertical.mp4 30 --page video/index.html --size 1080x1920 --audio video/audio/voiceover.wav
node tools/render.mjs video out/derek-presentacion-vertical-subtitulos.mp4 30 --page video/index.html --size 1080x1920 --query subs=1 --audio video/audio/voiceover.wav
node tools/render.mjs stills out/portada --page video/index.html --size 1080x1920 39.5   # portada
```
Sin `--audio`, el MP4 sale sin sonido, como en la previsualización actual.

## Decisiones

- **Motor propio en HTML** (el mismo de `film/` y `showreel/`) en lugar de Remotion. El brief pide no instalar Remotion,
  HyperFrames y un motor propio a la vez; este ya está hecho, es determinista y renderiza con Playwright y FFmpeg.
- **MagicPath** no está disponible en este entorno: su plugin requiere `claude plugin install` y autenticación
  `/mcp` en una sesión local. Las escenas se diseñaron directamente en código. No se usó MagicPath.
- **Logo completo, sin destacar la k.** La palabra se revela entera, de izquierda a derecha. El vector es una
  reconstrucción medida de la lámina; no reemplaza un archivo original aprobado.
- **Paleta:** grafito `#171918`, blanco cálido `#F7F7F2` y verde `#527567`, usado solo para marcar acciones
  (registrado, enviado, actualizado).
- **Pantallas de demostración** marcadas “Ejemplo ilustrativo”. Los nombres (María G., Comercial Ejemplo, www.ejemplo.com.py)
  son ficticios a propósito. No hay clientes, métricas ni testimonios.
- **Guion:** el texto es el del brief. La única diferencia es que la frase de servicios se dividió en cuatro oraciones
  completas para alternar las voces (“Automatizamos…”, “Y creamos agentes…”, “También aplicaciones…”, “Y páginas web…”).
- **Sin la sección de Paraguay y valores** (pedido del 4/10). La frase de fe (Alan) se mantiene en la locución,
  sobre la vista general de la red conectada, sin texto ni lista en pantalla. Si también hay que quitarla, basta con
  borrar la línea `08-fe` de `script.json` y correr `node tools/vo-build.mjs`.
- **Dinámica tipo MagicPath, con la paleta de Derek:** todas las escenas viven en un solo lienzo. La cámara viaja
  entre ellas con movimientos rápidos, siguiendo un camino verde que se dibuja de tarea en tarea; un cursor “Vos”
  aprueba, actualiza y envía; al final la cámara se aleja para mostrar todo conectado y el camino termina en el logo.
  Sin colores nuevos, sin brillos ni partículas.
- La pieza anterior, “Punto de convergencia” (`film/`), gira alrededor de la k. Después del comentario del fundador
  queda como exploración descartada para esta pieza.

## Costos y recursos externos

| Recurso | Uso | Costo |
|---|---|---|
| Fish Audio (plan gratuito) | Ninguno todavía | 0 créditos usados |
| Manrope (SIL OFL) | Tipografía | Gratis, licencia en `film/fonts/OFL.txt` |
| Música | Ninguna | — |

## Para retomar en otra computadora

Requisitos: Node 22, ffmpeg y Playwright con Chromium. Clonar la rama `claude/derek-visual-motion-system-3lw2fx`
y correr los comandos de arriba. El siguiente paso es recibir las muestras de voz y la autorización de Adrián, clonar las voces y generar la prueba corta.
