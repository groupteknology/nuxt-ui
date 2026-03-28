# AGENTS.md

## Contexto

Este repositorio es un Nuxt layer consumible por otros proyectos.
Expone componentes, composables, utilidades, estilos, tipos y configuración reutilizable.

El propósito del layer es ofrecer primitives y bloques reutilizables con una API clara, moderna, consistente, tipada y fácil de consumir desde aplicaciones Nuxt.

Este proyecto no debe comportarse como una app final. Debe comportarse como una base reutilizable y estable para otros proyectos.

---

## Objetivo del repositorio

Cada cambio debe intentar mejorar una o más de estas áreas sin deteriorar las demás:

- claridad del código
- estabilidad del contrato público
- reutilización real
- tipado e inferencia
- experiencia del consumidor
- consistencia visual
- mantenibilidad
- rendimiento real

---

## Prioridades

Al trabajar en este repositorio, prioriza siempre lo siguiente:

1. Mantener compatibilidad con el consumo del layer
2. Preservar una API pública clara, estable y consistente
3. Mantener tipado fuerte e inferencia correcta
4. Favorecer reutilización real sin sobre-abstraer
5. Mantener consistencia visual entre componentes
6. Mantener DX fuerte para el consumidor
7. Usar patrones modernos, estables y mantenibles
8. Minimizar cambios innecesarios en comportamiento, nombres y estructura pública

---

## Reglas generales

- Mantener compatibilidad con auto-imports de Nuxt
- Evitar `any`, salvo que exista una justificación técnica clara e inevitable
- No introducir soluciones débiles de tipado para resolver problemas rápidos
- Preservar inferencia de tipos, autocompletado y ergonomía de uso
- Preferir cambios pequeños, seguros y fáciles de validar
- Reutilizar lógica existente antes de duplicarla
- Extraer lógica reutilizable solo cuando exista una responsabilidad compartida y clara
- Evitar abstracciones prematuras
- Evitar complejidad accidental
- No hacer refactors grandes si no aportan una mejora real en legibilidad, mantenimiento, reutilización, tipado o rendimiento
- Antes de refactorizar, entender primero el contrato actual del código afectado
- Antes de renombrar, verificar si el elemento es interno o parte de la API pública
- No romper contratos públicos silenciosamente
- No cambiar contratos públicos, nombres expuestos o comportamiento consumible sin reportarlo explícitamente
- No mover tipos compartidos fuera de `app/types` sin una razón clara
- Priorizar claridad, mantenibilidad y rendimiento real sobre complejidad innecesaria

---

## Tecnología, versiones y mejores prácticas

Este proyecto busca usar tecnología moderna, estable y alineada con mejores prácticas actuales.

- Preferir APIs modernas, estables y recomendadas oficialmente
- Evitar patrones obsoletos o desaconsejados
- Evitar soluciones legacy si existe una alternativa moderna, estable y claramente mejor
- No actualizar dependencias, sintaxis o patrones solo por novedad si no aportan una mejora real
- Si una mejora depende de una versión más reciente, validar compatibilidad antes de asumirla
- Priorizar estabilidad, DX, rendimiento y mantenibilidad
- Cuando exista una opción moderna claramente mejor, preferirla
- Preferir implementaciones con buen soporte de tipado
- Preferir soluciones oficiales o ampliamente mantenidas cuando aporten más estabilidad

---

## API pública

Se considera API pública todo lo que pueda ser consumido directa o indirectamente desde otros proyectos, incluyendo cuando aplique:

- componentes expuestos por el layer
- composables expuestos
- utilidades expuestas
- nombres de exports
- props, emits y slots de componentes públicos
- variantes, contratos visuales o comportamientos esperados por consumidores
- clases, convenciones o estilos base esperados por proyectos consumidores
- configuración esperada por el proyecto consumidor
- tipos públicos consumibles por proyectos externos
- nombres y estructura de helpers públicos
- comportamiento observable usado por otros proyectos

Si un cambio afecta API pública:

- minimizar el impacto
- mantener compatibilidad cuando sea posible
- evitar breaking changes innecesarios
- explicar claramente el impacto en el resumen final
- indicar si existe riesgo de breaking change
- indicar si hace falta migración para consumidores

No introducir breaking changes silenciosos.

---

## DX del consumidor

La experiencia del consumidor del layer es una prioridad.

Cuidar especialmente:

- autocompletado
- inferencia de tipos
- nombres consistentes y semánticos
- APIs previsibles
- defaults razonables
- facilidad de composición
- facilidad de extensión
- consistencia entre componentes similares
- mensajes de error claros cuando aplique

Si una mejora interna perjudica la DX del consumidor, priorizar la DX del consumidor salvo que exista una razón fuerte para cambiar el contrato.

---

## Estructura del proyecto

- `app/`: código consumible del layer
- `app/types/`: tipos compartidos del proyecto

Mantener una estructura fácil de navegar, descubrir y mantener.

Si se agregan nuevas piezas reutilizables, ubicarlas de forma consistente con la estructura existente y con su intención de consumo o reutilización interna.

---

## Organización de tipos

Todo el tipado compartido del proyecto debe organizarse de forma clara dentro de `app/types`.

### Reglas para tipos

- Usar `app/types` como fuente principal de tipos compartidos
- Mantener archivos bien estructurados, con nombres claros y responsabilidad definida
- Separar tipos por dominio, responsabilidad o módulo cuando tenga sentido
- Evitar duplicación de tipos
- Extraer tipos reutilizables cuando sean compartidos por múltiples componentes, composables o utilidades
- Distinguir claramente entre tipos internos y tipos públicos
- Preservar estabilidad de los tipos públicos cuando formen parte del contrato del layer
- Si un tipo solo se usa dentro de un archivo y no aporta reutilización, puede mantenerse local si mejora claridad
- Mantener nombres semánticos, predecibles y fáciles de encontrar
- Evitar archivos de tipos genéricos desordenados o mezclados sin criterio
- Mantener cohesión alta y acoplamiento bajo entre tipos

### Organización sugerida dentro de `app/types`

Cuando tenga sentido, organizar por dominio o responsabilidad, por ejemplo:

- `app/types/components/`
- `app/types/composables/`
- `app/types/forms/`
- `app/types/tables/`
- `app/types/shared/`
- `app/types/utils/`

No fragmentar en exceso si la estructura aún es pequeña.

---

## TypeScript

- Evitar `any`
- Preferir tipos inferidos cuando sean suficientemente claros
- Agregar tipos explícitos cuando mejoren comprensión, seguridad o contrato público
- Preservar compatibilidad con autocompletado
- No degradar tipos públicos por conveniencia
- Evitar soluciones que rompan inferencia en componentes, composables, utilidades o tipos consumibles
- Reutilizar tipos existentes antes de crear nuevos equivalentes
- Evitar helpers genéricos excesivamente complejos si dañan legibilidad o mantenimiento
- Preferir tipos que ayuden a entender el contrato antes que tipos “ingeniosos” difíciles de mantener
- Si una mejora interna complica demasiado la API tipada, priorizar la experiencia del consumidor
- No introducir casts innecesarios para forzar que algo compile
- Evitar esconder problemas de diseño con tipado artificial

---

## Componentes Vue

Al modificar componentes:

- Preservar props, emits y slots públicos salvo necesidad clara
- Mantener nombres semánticos y consistentes
- Mantener una separación clara entre lógica, presentación, estilos y tipos
- Evitar lógica excesiva dentro del template si puede moverse a composables o utilidades
- Mantener buena legibilidad del template
- No introducir comportamiento implícito difícil de entender
- Si un componente crece demasiado, dividir responsabilidades sin romper la API pública
- Reutilizar tipos definidos en `app/types` cuando corresponda
- Mantener contratos claros de entrada y salida
- Mantener coherencia con componentes similares del sistema
- Evitar props ambiguas o con múltiples responsabilidades
- Preferir APIs de componentes simples, previsibles y fáciles de usar
- Evitar side effects inesperados

### Props, emits y slots

- No cambiar nombres públicos sin una razón clara
- No introducir props redundantes si el patrón existente ya resuelve el caso
- Mantener nombres de props coherentes entre componentes similares
- Mantener emits bien nombrados y alineados con el comportamiento real
- Mantener slots claros, predecibles y consistentes
- Si un cambio afecta props, emits o slots públicos, reportarlo explícitamente

---

## Composables y utilidades

Al modificar composables o utilidades:

- Priorizar responsabilidades claras y acotadas
- Evitar mezclar lógica de UI con lógica de datos si pueden separarse
- Mantener firmas simples, tipadas y predecibles
- Preservar inferencia de tipos en parámetros y retornos
- Evitar helpers genéricos innecesariamente complejos si perjudican legibilidad
- Preferir reutilización real antes que abstracción excesiva
- Reutilizar tipos definidos en `app/types` cuando corresponda
- No convertir utilidades simples en infraestructuras complejas sin necesidad
- Favorecer funciones con responsabilidad clara, nombres semánticos y comportamiento explícito

---

## Formularios

Los formularios son una parte importante del sistema reusable del layer.

Al trabajar en formularios o utilidades relacionadas:

- priorizar tipado fuerte de valores, props y eventos
- preservar consistencia entre componentes de formulario similares
- mantener APIs claras para modelado, validación, estado y renderizado
- evitar duplicar lógica de inicialización, validación, errores o transformación si puede centralizarse bien
- preferir primitives y helpers reutilizables antes que lógica repetida en cada componente
- mantener previsibilidad en nombres y contratos de campos
- no romper integración con esquemas, validaciones o tipos compartidos si existen
- si un patrón de formulario se repite, considerar extraer la lógica a composables, helpers o tipos compartidos

### Reglas para formularios públicos

- tratar props, eventos, modelos y tipos de formulario como parte importante del contrato público
- no cambiar nombres o comportamientos sin reportarlo explícitamente
- preservar DX, inferencia y autocompletado para el consumidor

---

## Tablas y estructuras de datos visuales

Las tablas y componentes de listado deben mantener consistencia, claridad y tipado fuerte.

- priorizar contratos claros para columnas, filas, slots y transforms
- evitar configuraciones ambiguas o difíciles de inferir
- mantener coherencia entre tablas similares
- preferir tipos claros para configuración reusable
- si hay lógica repetida de selección, transformación, render o columnas, extraerla cuando realmente sea compartida
- mantener buen equilibrio entre flexibilidad y claridad
- no convertir una tabla simple en una API genérica excesivamente compleja sin necesidad

---

## Configs y primitives reutilizables

Este layer puede contener configuraciones, definiciones y primitives reutilizables.

Al trabajar en ellas:

- priorizar contratos tipados y fáciles de entender
- evitar configuraciones mágicas o implícitas sin necesidad
- mantener nombres claros y consistentes
- preservar discoverability y autocompletado
- evitar sobrecargar una sola primitive con demasiadas responsabilidades
- si una config se vuelve demasiado compleja, evaluar dividir por responsabilidad

---

## TailwindCSS

Este proyecto usa TailwindCSS como parte central del sistema de estilos.

### Reglas generales de estilos

- Priorizar clases utilitarias de Tailwind antes que CSS adicional innecesario
- Mantener consistencia visual entre componentes
- Reutilizar patrones visuales existentes antes de crear nuevos
- Evitar clases repetidas si pueden centralizarse de forma clara y segura
- No introducir abstracciones de estilos si empeoran legibilidad o mantenimiento
- Mantener equilibrio entre reutilización y claridad
- Preferir variantes y composiciones consistentes entre componentes similares
- Evitar romper estilos base consumidos por otros proyectos
- Si se usan clases dinámicas, hacerlo de forma clara y mantenible
- Evitar estilos arbitrarios innecesarios si existe una utilidad estándar de Tailwind
- Mantener orden y legibilidad en las clases del template

### Sobre reutilización de estilos

- Extraer patrones repetidos solo cuando la repetición sea real y estable
- No crear abstracciones visuales prematuras
- Si un patrón visual se repite en varios componentes, considerar extraerlo cuidadosamente
- Mantener consistencia entre variantes, tamaños, estados y jerarquías visuales
- No duplicar estilos base si pueden componerse con claridad

### Sobre cambios visuales

- Tratar los estilos públicos y variantes visibles como parte del contrato del layer
- Evitar cambios visuales inesperados en componentes públicos
- Si un cambio altera spacing, tamaños, variantes, alineación, colores, estados o layout esperado, reportarlo explícitamente

---

## Accesibilidad

- No introducir regresiones obvias de accesibilidad en componentes públicos
- Mantener comportamiento razonable para focus, disabled, estados visuales y semántica cuando aplique
- Si un cambio afecta interacción o estructura del componente, considerar impacto en accesibilidad
- Mantener consistencia de interacción entre componentes similares

---

## Naming

El naming es parte importante del mantenimiento del layer.

- Usar nombres descriptivos y coherentes con la responsabilidad real
- Evitar nombres ambiguos, genéricos o demasiado cortos sin contexto
- Preferir nombres que expliquen intención, no solo implementación
- Mantener consistencia entre nombres relacionados
- No renombrar por preferencia personal si no existe una mejora real
- Si un renombre mejora claridad, consistencia o descubribilidad, puede hacerse
- Si el renombre afecta consumo externo, tratarlo como cambio de API pública

---

## Refactors

Los refactors son bienvenidos solo si aportan valor real.

Un refactor es válido si mejora claramente uno o más de estos puntos:

- legibilidad
- reutilización real
- organización
- tipado
- mantenibilidad
- consistencia
- rendimiento real
- reducción de duplicación significativa

Evitar refactors que:

- solo cambian estilo personal
- aumentan complejidad sin beneficio claro
- introducen abstracciones innecesarias
- rompen contratos públicos sin necesidad
- empeoran inferencia o DX
- fragmentan demasiado el código
- convierten una solución simple en una arquitectura pesada

Antes de refactorizar, entender primero:

- qué problema real existe
- si el patrón actual está siendo reutilizado
- si el cambio afecta API pública o consumo externo
- si la nueva estructura será realmente más fácil de mantener

---

## Rendimiento

- Priorizar rendimiento real y medible sobre micro-optimizaciones teóricas
- Evitar trabajo innecesario en runtime si puede resolverse con una estructura más clara
- No sacrificar claridad y mantenibilidad por optimizaciones marginales sin evidencia
- Preferir patrones modernos que reduzcan complejidad y costo de mantenimiento
- Si un cambio mejora rendimiento pero afecta API o claridad, explicar el tradeoff

---

## Criterios de implementación

Al implementar cambios:

- investigar primero el contexto del código afectado
- identificar si el cambio afecta consumo externo
- entender si el contrato actual es interno o público
- hacer el cambio mínimo necesario para resolver bien el problema
- preservar claridad, reutilización, tipado fuerte y consistencia visual
- validar que el resultado siga siendo coherente con el diseño y patrones del proyecto
- preferir soluciones modernas y estables cuando aporten una mejora clara
- no asumir que una refactorización es correcta solo porque compila
- revisar si el cambio afecta naming, tipos compartidos, variantes visuales o DX

---

## Qué hacer antes de terminar

Antes de dar por terminado un cambio:

1. correr typecheck
2. correr lint
3. correr la app o pruebas mínimas de consumo
4. verificar que el layer sigue siendo consumible
5. verificar que no se hayan degradado tipos públicos ni estilos públicos
6. verificar que los tipos compartidos estén correctamente organizados en `app/types`
7. revisar si hubo impacto en API pública, DX, estilos o contratos tipados
8. resumir archivos tocados, impacto público, riesgos y posibles breaking changes

---

## Validación esperada

Antes de finalizar, confirmar explícitamente cuando aplique:

- que compila correctamente
- que typecheck pasa
- que lint pasa
- que no se rompieron exports consumibles
- que no se rompieron auto-imports
- que no se degradó la inferencia de tipos
- que no se rompieron props, emits o slots públicos
- que no se rompieron variantes o estilos públicos esperados
- que los tipos compartidos están bien ubicados en `app/types`

---

## Resumen final esperado

Al finalizar, incluir siempre:

- archivos modificados
- qué se cambió
- por qué se cambió
- impacto en consumo externo
- impacto visual o de estilos, si aplica
- impacto en tipos públicos o en `app/types`, si aplica
- riesgos o puntos a revisar
- si hubo o no posible breaking change
- si hubo o no impacto en API pública
- si hubo o no impacto en DX del consumidor

---

## Criterio de cierre

Un cambio no se considera terminado solo porque funcione localmente.

Debe quedar:

- coherente con la arquitectura del layer
- consistente con los patrones del proyecto
- estable para consumidores
- correctamente tipado
- razonablemente validado
- bien nombrado
- mantenible
- sin breaking changes silenciosos
