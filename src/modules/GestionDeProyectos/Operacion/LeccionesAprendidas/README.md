# Lecciones Aprendidas

Módulo para base de conocimiento organizacional con búsqueda, categorización, tags y análisis de tendencias.

## Estructura del Módulo

```
LeccionesAprendidas/
├── components/          # Componentes Vue del módulo
│   ├── CreateLessonModal.vue      # Modal para registrar lección
│   ├── SearchBar.vue              # Barra de búsqueda
│   └── TrendsAnalysis.vue         # Análisis de tendencias
├── composables/         # Lógica reutilizable
│   └── useLessonActions.ts        # Acciones y helpers
├── store/               # Estado global con Pinia
│   └── lessonStore.ts             # Store con lecciones
├── types/               # Definiciones de TypeScript
│   └── lessonTypes.ts             # Tipos e interfaces
└── views/               # Vistas principales
    └── LessonsView.vue            # Vista con 2 tabs
```

## Características Principales

### 1. Barra de Búsqueda

#### Búsqueda en Tiempo Real
- ✅ Input grande con placeholder descriptivo
- ✅ Búsqueda por situación
- ✅ Búsqueda por lección
- ✅ Búsqueda por tags
- ✅ Búsqueda por proyecto
- ✅ Filtrado reactivo

### 2. Tab: Lecciones

#### Card por Lección
- ✅ Header con proyecto, fase, tipo y categoría
- ✅ Fecha de registro
- ✅ Situación
- ✅ Grid 2 columnas: Causa e Impacto
- ✅ Lección Aprendida (destacada con bg-base-200)
- ✅ Recomendación (destacada con bg-info/10)
- ✅ Footer con tags y autor
- ✅ Empty state si no hay resultados

#### Secciones de la Lección
1. **Header** - Proyecto, fase, tipo, categoría, fecha
2. **Situación** - ¿Qué sucedió?
3. **Causa** - ¿Por qué sucedió?
4. **Impacto** - ¿Cuál fue el efecto?
5. **Lección Aprendida** - ¿Qué aprendimos?
6. **Recomendación** - ¿Qué hacer diferente?
7. **Tags** - Etiquetas
8. **Autor** - Quién registró

### 3. Tab: Análisis de Tendencias

#### 3 Secciones de Análisis

**1. Lecciones por Categoría**
- ✅ Grid de 3 columnas
- ✅ Cards con contador
- ✅ Nombre de categoría
- ✅ 9 categorías posibles

**2. Distribución Positiva vs Negativa**
- ✅ Grid de 2 columnas
- ✅ Contador de positivas (verde)
- ✅ Contador de negativas (naranja)
- ✅ Números grandes destacados

**3. Etiquetas Más Frecuentes**
- ✅ Badges con nombre y contador
- ✅ Flex wrap
- ✅ Badge-secondary
- ✅ Formato: "tag (count)"

### 4. Modal de Creación

#### 10 Campos del Formulario
1. **Proyecto** (input)
2. **Fase del Proyecto** (select)
3. **Descripción de la Situación** (textarea 3 rows)
4. **Causa(s)** (textarea 2 rows)
5. **Impacto** (textarea 2 rows)
6. **Lección Aprendida** (textarea 3 rows)
7. **Recomendación para el Futuro** (textarea 3 rows)
8. **Categoría** (select)
9. **Tipo** (select: Positiva/Negativa)
10. **Etiquetas (Tags)** (input + botón añadir)
11. **Autor** (input)

#### Gestión de Tags
- ✅ Input con botón "Añadir"
- ✅ Enter para añadir
- ✅ Badges con botón eliminar (✕)
- ✅ Badge-secondary
- ✅ No permite duplicados

#### Características del Modal
- ✅ BaseModal integrado
- ✅ Scroll vertical (max-h-70vh)
- ✅ Grid 2 columnas para proyecto/fase
- ✅ Grid 2 columnas para categoría/tipo
- ✅ Botón: "Guardar Lección"
- ✅ Reset al guardar

## Tipos

### LessonLearnedType
```typescript
{
  id: string
  project: string
  phase: ProjectPhase
  situation: string
  cause: string
  impact: string
  lesson: string
  recommendation: string
  category: LessonCategory
  type: LessonType
  tags: string[]
  author: string
  date: string
}
```

### LessonType
```typescript
'Positiva' | 'Negativa'
```

### LessonCategory
```typescript
'Alcance' | 'Cronograma' | 'Costo' | 'Calidad' | 'Recursos' | 'Comunicación' | 'Riesgos' | 'Stakeholders' | 'Integración'
```

### ProjectPhase
```typescript
'Inicio' | 'Planificación' | 'Ejecución' | 'Monitoreo y Control' | 'Cierre'
```

## Store

### Estado
- `lessons`: Array de lecciones
- `isModalOpen`: Estado del modal
- `searchTerm`: Término de búsqueda

### Acciones
- `setLessons(lessons)`: Establecer lecciones
- `addLesson(newLesson)`: Agregar lección
- `setSearchTerm(term)`: Actualizar búsqueda
- `openModal()`: Abrir modal
- `closeModal()`: Cerrar modal

### Getters
- `filteredLessons`: Lecciones filtradas por búsqueda
- `positiveLessons`: Lecciones positivas
- `negativeLessons`: Lecciones negativas
- `categoryCount`: Contador por categoría
- `allTags`: Todas las tags únicas
- `tagCount(tag)`: Contador por tag

## Composables

### useLessonActions
- `loadLessons()`: Cargar desde localStorage
- `saveLessons()`: Guardar en localStorage

## Componentes

### CreateLessonModal.vue
- ✅ BaseModal integrado
- ✅ Formulario extenso (11 campos)
- ✅ Selects para fase, categoría y tipo
- ✅ Gestión de tags
- ✅ Badges con botón eliminar
- ✅ Scroll vertical
- ✅ Reset al guardar

### SearchBar.vue
- ✅ Card con título
- ✅ Input grande
- ✅ Búsqueda reactiva
- ✅ Placeholder descriptivo

### TrendsAnalysis.vue
- ✅ 3 secciones de análisis
- ✅ Grid responsive
- ✅ Cards con contadores
- ✅ Badges con frecuencia
- ✅ Colores semánticos

### LessonsView.vue
- ✅ Header con botones
- ✅ Barra de búsqueda
- ✅ 2 tabs (Lecciones, Análisis)
- ✅ Cards por lección
- ✅ Empty state
- ✅ Modal incluido

## Colores y Badges

### Tipo de Lección
```typescript
'Positiva': 'badge-success'    // Verde con thumb_up
'Negativa': 'badge-warning'    // Naranja con thumb_down
```

### Otros Badges
- **Fase**: badge-outline
- **Categoría**: badge-secondary
- **Tags**: badge-outline text-xs

## Flujo de Trabajo

1. **Click "Registrar Lección"** → Abrir modal
2. **Llenar Información** → 11 campos
3. **Seleccionar Fase** → Select con 5 opciones
4. **Seleccionar Categoría** → Select con 9 opciones
5. **Seleccionar Tipo** → Positiva o Negativa
6. **Añadir Tags** → Input + Enter o botón
7. **Guardar Lección** → ID y fecha auto
8. **Ver en Lista** → Card con toda la info
9. **Buscar** → Filtrado en tiempo real
10. **Ver Análisis** → Tab "Análisis de Tendencias"

## Persistencia

### LocalStorage Key
- `lessons`: Array de lecciones

### Estructura Guardada
```typescript
[
  {
    id: string (LL001, LL002...)
    project: string
    phase: ProjectPhase
    situation: string
    cause: string
    impact: string
    lesson: string
    recommendation: string
    category: LessonCategory
    type: LessonType
    tags: string[]
    author: string
    date: string (YYYY-MM-DD)
  }
]
```

## Características de UI

### Header
- ✅ BaseTitle con icono lightbulb
- ✅ Botón "Guardar" (outline)
- ✅ Botón "Registrar Lección" (primary)
- ✅ Flex justify-between

### Barra de Búsqueda
- ✅ Card con sombra
- ✅ Título con icono search
- ✅ Input text-lg
- ✅ Placeholder descriptivo

### Tabs
- ✅ Tabs boxed (DaisyUI)
- ✅ 2 tabs (Lecciones, Análisis)
- ✅ Tab content con padding
- ✅ Radio buttons

### Cards de Lección
- ✅ Header con badges múltiples
- ✅ Fecha en esquina
- ✅ Situación destacada
- ✅ Grid 2 columnas para causa/impacto
- ✅ Lección con bg-base-200 e icono
- ✅ Recomendación con bg-info/10
- ✅ Footer con tags y autor
- ✅ Border-top en footer

### Modal de Creación
- ✅ BaseModal
- ✅ Max-height con scroll
- ✅ Grid 2 columnas
- ✅ Selects nativos
- ✅ Input + botón para tags
- ✅ Badges con botón eliminar

### Análisis de Tendencias
- ✅ 3 secciones separadas
- ✅ Grid 3 columnas para categorías
- ✅ Grid 2 columnas para positiva/negativa
- ✅ Flex wrap para tags
- ✅ Números grandes destacados
- ✅ Colores semánticos

## Ruta

La ruta está configurada en `/gestion-de-proyectos/lecciones-aprendidas`

## Integración

### Con Proyectos
- ✅ Puede asociar a proyecto específico
- ✅ Búsqueda por proyecto
- ✅ Independiente por ahora

### Persistencia
- ✅ Guarda en localStorage
- ✅ Carga automática al montar
- ✅ Notificación al guardar

## Ejemplo de Uso

```vue
<script setup lang="ts">
import LessonsView from '@/modules/GestionDeProyectos/LeccionesAprendidas/views/LessonsView.vue'
</script>

<template>
  <LessonsView />
</template>
```

## Características Técnicas

- ✅ Estado reactivo con Pinia
- ✅ TypeScript estricto
- ✅ Computed properties para filtros
- ✅ Watch para modal
- ✅ Notificaciones toast
- ✅ Persistencia en localStorage
- ✅ Búsqueda en tiempo real
- ✅ Filtrado múltiple
- ✅ Gestión de tags
- ✅ Análisis de tendencias
- ✅ Colores por tipo
- ✅ Badges con estilos
- ✅ Grid responsive
- ✅ Tabs con DaisyUI
- ✅ BaseModal integrado
- ✅ Material icons
- ✅ ID autogenerado (LL001, LL002...)
- ✅ Fecha automática (YYYY-MM-DD)
- ✅ Empty state

## Validaciones

### Modal de Creación
- ✅ Todos los campos opcionales
- ✅ Tags no permite duplicados
- ✅ Reset al guardar
- ✅ Fecha automática

### Búsqueda
- ✅ Case insensitive
- ✅ Múltiples campos
- ✅ Búsqueda en tags
- ✅ Filtrado reactivo

## Categorías (9)

1. **Alcance** - Cambios en alcance
2. **Cronograma** - Gestión de tiempo
3. **Costo** - Gestión de presupuesto
4. **Calidad** - Estándares y calidad
5. **Recursos** - Gestión de recursos
6. **Comunicación** - Comunicación efectiva
7. **Riesgos** - Gestión de riesgos
8. **Stakeholders** - Gestión de interesados
9. **Integración** - Integración de procesos

## Fases del Proyecto (5)

1. **Inicio** - Inicio del proyecto
2. **Planificación** - Planificación detallada
3. **Ejecución** - Ejecución del trabajo
4. **Monitoreo y Control** - Seguimiento
5. **Cierre** - Cierre del proyecto

## Datos de Ejemplo

### Lección Negativa
```typescript
{
  id: 'LL001',
  project: 'Implementación ERP',
  phase: 'Planificación',
  situation: 'Subestimación del tiempo necesario para mapeo de procesos',
  cause: 'No se consultó a usuarios finales en etapa inicial',
  impact: 'Retraso de 3 semanas en cronograma y necesidad de re-trabajo',
  lesson: 'La participación temprana de usuarios finales es crítica para entender procesos reales',
  recommendation: 'Incluir workshops con usuarios finales en la fase de Discovery antes de diseñar solución',
  category: 'Alcance',
  type: 'Negativa',
  tags: ['gestión-stakeholders', 'planificación', 'requisitos'],
  author: 'Juan Pérez',
  date: '2024-01-15'
}
```

### Lección Positiva
```typescript
{
  id: 'LL002',
  project: 'Implementación ERP',
  phase: 'Ejecución',
  situation: 'Implementación de ambiente de pruebas paralelo al desarrollo',
  cause: 'Decisión proactiva del equipo técnico',
  impact: 'Detección temprana de conflictos de integración, ahorro de 2 semanas en fase de testing',
  lesson: 'Ambiente de testing temprano permite identificar problemas antes de UAT',
  recommendation: 'Provisionar ambiente de testing desde el inicio del proyecto, no esperar a fase de pruebas',
  category: 'Calidad',
  type: 'Positiva',
  tags: ['testing', 'calidad', 'infraestructura'],
  author: 'María García',
  date: '2024-01-20'
}
```

## Análisis de Tendencias

### Lecciones por Categoría
- ✅ Contador por cada categoría
- ✅ Grid de 3 columnas
- ✅ Cards con número grande
- ✅ Nombre de categoría

### Distribución Positiva vs Negativa
- ✅ 2 cards lado a lado
- ✅ Número grande con color
- ✅ Verde para positivas
- ✅ Naranja para negativas

### Etiquetas Más Frecuentes
- ✅ Todas las tags únicas
- ✅ Contador por tag
- ✅ Badges con formato "tag (count)"
- ✅ Flex wrap

## Búsqueda Avanzada

### Campos de Búsqueda
1. **Situación** - Descripción de lo que sucedió
2. **Lección** - La lección aprendida
3. **Tags** - Etiquetas asociadas
4. **Proyecto** - Nombre del proyecto

### Características
- ✅ Case insensitive
- ✅ Búsqueda parcial
- ✅ Múltiples campos simultáneos
- ✅ Filtrado reactivo
- ✅ Empty state si no hay resultados

## Futuras Mejoras

- 📄 Exportación a PDF
- 📄 Plantillas de lección
- 🔄 Historial de versiones
- 📧 Compartir por email
- 👥 Notificaciones a equipo
- 📅 Integración con proyectos
- 🔔 Alertas de lecciones similares
- 📈 Dashboard de aprendizaje
- 💬 Comentarios en lecciones
- 📎 Adjuntar archivos
- 🔄 Votación de utilidad
- 📊 Métricas de aplicación

## Notas Importantes

- ✅ El ID se genera automáticamente
- ✅ La fecha se genera automáticamente
- ✅ Los tags no permiten duplicados
- ✅ La búsqueda es case insensitive
- ✅ El filtrado es reactivo
- ✅ Las lecciones se guardan en localStorage
- ✅ El modal tiene scroll vertical
- ✅ Los badges tienen colores semánticos
- ✅ El análisis se calcula dinámicamente
- ✅ Empty state si no hay resultados
- ✅ Las tags se pueden añadir con Enter
- ✅ Los badges tienen botón eliminar
