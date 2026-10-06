# Derek — “Una sola hoja” · Concepto audiovisual (v3)

Reemplaza la v2 (`derek-film-v2.md`), que se apoyaba en nodos, redes y tarjetas: los clichés del software.
Esta versión parte de una idea propia y todo el video se construye alrededor de ella.

## La idea

**Una empresa ya tiene todo lo que necesita. El problema es que está arrugado.**

Clientes, procesos, información y oportunidades no faltan: están, pero sin forma, como una hoja hecha un bollo.
Derek no agrega más cosas. **Alisa y pliega.** Cada servicio es un pliegue distinto de **la misma hoja**,
y cada pliegue deja una marca que se acumula, como la experiencia.

Por qué es la metáfora correcta para Derek y no una decoración:

| Derek | La hoja |
|---|---|
| Resolver con lo que ya existe, sin ruido | No se agrega material: solo se le da forma |
| Precisión, disciplina | Un pliegue mal hecho se nota; uno bueno es exacto |
| Integridad | **El origami no corta.** *Íntegro* significa entero: la hoja nunca se rompe |
| Intención, propósito | Ningún pliegue es casual: cada uno existe para que la forma funcione |
| Transformación | Plano → volumen → plano otra vez, con memoria |
| Investigar y construir lo propio | El patrón de pliegues es un mapa: se estudia, se prueba, se construye una forma nueva |
| La marca | El papel es literalmente el blanco cálido de Derek; la luz y la sombra, su grafito |

La fe de los fundadores no se nombra como argumento de venta: aparece como **principio de construcción**
(no cortar, no tomar atajos, cuidar cada pliegue).

## Cómo se ve cada idea (sin nodos, tarjetas ni partículas)

| Voz | Visual |
|---|---|
| “Toda empresa ya tiene lo que necesita… Pero casi siempre está todo mezclado.” | Un bollo de papel gira bajo una luz rasante sobre grafito. Con cada sustantivo dicho, el papel se reacomoda y cruje. En “mezclado” se aprieta. |
| “En Derek no empezamos agregando más cosas. Empezamos dándole forma a lo que ya existe.” | La hoja se abre y se alisa: quedan las arrugas como marcas tenues. En “forma” llega el primer pliegue preciso, una diagonal que se marca y se abre. |
| “Automatizamos lo repetitivo.” | **Fuelle.** La hoja se pliega sola en acordeón, franja por franja, y después respira sola en ritmo: lo repetitivo convertido en un mecanismo. |
| “Ordenamos la operación con sistemas y CRM.” | **Bandeja.** Los bordes se levantan en paredes y por dentro suben aristas que dividen el espacio en compartimentos: orden. En “CRM” las aristas se marcan una tras otra, como relaciones que se encadenan. |
| “Creamos sitios web y tiendas en línea, para que te encuentren y te compren.” | **Puertas.** Los laterales se pliegan sobre el centro como un armario cerrado y se abren hacia nosotros: el centro se ilumina y la cámara entra. |
| “Integramos las herramientas que ya usás. Y lo que todavía no existe, lo desarrollamos a medida.” | **Origami modular.** Otras hojas (las herramientas que ya existen) llegan y se traban con la nuestra con solapas, sin pegamento ni cortes. Queda un hueco; una hoja nueva se pliega exactamente a su medida y lo completa. |
| “Pero no queremos solo construir para otros. Investigamos problemas… Probamos. Y construimos.” | **El mapa.** La cámara se aleja: la superficie se extiende hasta el horizonte, con patrones de pliegues y zonas en blanco sin resolver. La luz barre buscando. Algunas zonas se levantan a prueba y vuelven a caer. Una se eleva en una forma nueva. |
| “Sin atajos. Con integridad, con disciplina y con respeto…” | Volvemos a nuestra hoja, sola y entera, con todas sus marcas. Gira: es una sola pieza, nunca cortada. Integridad · Disciplina · Respeto. |
| “Derek.” (los dos) | La hoja se pone de frente y crece hasta ser el fondo. El fondo pasa de grafito a papel: la hoja **es** la marca. |
| “Tecnología con propósito.” | La palabra **derek** aparece primero como relieve en seco sobre el papel y después se entinta. |

## Continuidad

Hay **un solo objeto protagonista** en todo el video: la hoja. No hay cortes ni fundidos:
bollo → alisado → diagonal → fuelle → plano → bandeja → plano → armario → plano → mosaico → horizonte → hoja sola → fondo → logo.
Entre un servicio y otro la hoja se despliega (como en el origami real) y **conserva las marcas** del pliegue anterior.
Al final su superficie es el registro de todo lo que hizo.

## Dirección de arte

- Fondo grafito `#171918`; hoja en papel `#F7F7F2` iluminada por una sola luz rasante. Las caras se sombrean según su orientación.
- Verde `#527567` solo en las líneas de pliegue “intencionales” (las marcas que dejan los servicios), nunca como relleno.
- La luz es un personaje: en la visión, la búsqueda **es** la luz que barre la superficie.
- Tipografía mínima: rótulos de los fundadores, un índice discreto por servicio (“01 · Automatización”), los valores y el cierre.

## Guion v3 (para ser dicho)

| # | Voz | Texto |
|---|---|---|
| 1 | Alan | Toda empresa ya tiene lo que necesita: clientes, procesos, información, oportunidades. Pero casi siempre está todo mezclado. |
| 2 | Adrián | En Derek no empezamos agregando más cosas. Empezamos dándole forma a lo que ya existe. |
| 3 | Alan | Automatizamos lo repetitivo. |
| 4 | Alan | Ordenamos la operación con sistemas y CRM. |
| 5 | Alan | Creamos sitios web y tiendas en línea, para que te encuentren y te compren. |
| 6 | Alan | Integramos las herramientas que ya usás. Y lo que todavía no existe, lo desarrollamos a medida. |
| 7 | Adrián | Pero no queremos solo construir para otros. Investigamos problemas que todavía no tienen una buena solución. Probamos. Y construimos. |
| 8 | Alan | Sin atajos. Con integridad, con disciplina y con respeto por cada persona que confía en nosotros. |
| 9 | Los dos | Derek. |
| 10 | Adrián | Tecnología con propósito. |

El reparto no cambia: **Alan es lo concreto** (el problema, lo que hacen, cómo trabajan) y **Adrián es el porqué**
(la forma de pensar, la visión, el propósito). “Derek” lo dicen los dos.

## Técnica

- La hoja es una malla de 37 × 37 vértices con sombreado plano por triángulo, ordenada por profundidad. La geometría
  de cada pliegue es real: rotaciones alrededor de líneas de pliegue, acordeón con ángulos por franja, paredes que
  giran y aristas. No es un dibujo.
- Un mismo motor de cámara 3D (órbita, inclinación, distancia) y la luz animada.
- Todo se ancla a palabras de la locución (`W("05","encuentren")`), como en la v2.
