# Resumen de Proyectos

Módulo para visualizar un dashboard ejecutivo de proyectos organizados por área con tracker visual de etapas.

## Estructura del Módulo

```
ResumenDeProyectos/
├── components/          # Componentes Vue del módulo
│   └── StageTracker.vue     # Tracker visual de etapas
├── composables/         # Lógica reutilizable
│   └── useSummaryActions.ts # Acciones y exportación
├── store/               # Estado global con Pinia
│   └── summaryStore.ts      # Store con estado
├── types/               # Definiciones de TypeScript
│   └── summaryTypes.ts      # Tipos e interfaces
└── views/               # Vistas principales
    └── ProjectsSummaryView.vue  # Vista principal
```

## Características Principales

### 1. Selector de Área

#### Card de Filtros
- ✅ Card con título "Filtros"
- ✅ Select de áreas
- ✅ Label descriptivo
- ✅ Max width medium

### 2. Tabla de Proyectos

#### Columnas (4)
1. **Proyecto** - Nombre en negrita + Folio
2. **Categoría** - Badge secondary
3. **Etapas** - Tracker visual
4. **Importe Estimado** - Formato moneda

#### Funcionalidades
- ✅ Tabla zebra con hover
- ✅ Filtrado por área
- ✅ Loading skeleton
- ✅ Estado vacío con icono
- ✅ Formato de moneda MXN

### 3. Stage Tracker (Componente Único)

#### Visualización
- ✅ Números en círculos/badges
- ✅ Color primary para etapa activa
- ✅ Color muted para etapas inactivas
- ✅ Tooltip con nombre al hover
- ✅ Ancho dinámico según cantidad

#### Características
- ✅ Muestra número de etapa (1, 2, 3...)
- ✅ Tooltip aparece al hover
- ✅ Transiciones suaves
- ✅ Responsive
- ✅ Estado vacío: "Sin etapas definidas"

#### Tooltip
- ✅ Posición: arriba del badge
- ✅ Centrado con transform
- ✅ Opacity 0 → 100 al hover
- ✅ Background base-100
- ✅ Border base-300
- ✅ Shadow-lg
- ✅ Z-index 10

### 4. Integración con Gantt

#### Carga de Etapas
- ✅ Lee `gantt_[projectId]` de localStorage
- ✅ Filtra tareas padre (sin parentId o parentId === '0')
- ✅ Primera etapa marcada como activa
- ✅ Mapea nombre e isActive

### 5. Exportación a Excel

#### Funcionalidades
- ✅ Botón en header
- ✅ Deshabilitado sin área o proyectos
- ✅ 4 columnas exportadas
- ✅ Nombre: `Resumen_Proyectos_[Area]_YYYY-MM-DD.xlsx`
- ✅ Notificación de éxito/error

#### Columnas Exportadas
- Proyecto
- Categoría
- Etapas (separadas por |)
- Importe Estimado

### 6. Estados

#### Loading
- ✅ 3 skeletons animados
- ✅ Altura 16 (h-16)
- ✅ Ancho completo

#### Empty State
- ✅ Icono folder_open (6xl)
- ✅ Título: "No hay proyectos para mostrar"
- ✅ Descripción informativa
- ✅ Centrado vertical y horizontal
- ✅ Padding 12

### 7. Formato de Datos

#### Moneda
```typescript
new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN'
}).format(value)
```

Resultado: `$1,234.56`

## Flujo de Trabajo

1. **Cargar Áreas** → onMounted
2. **Seleccionar Área** → Select
3. **Cargar Proyectos** → Watch area
4. **Ver Etapas** → Tracker visual
5. **Exportar** → Botón Excel

## Tipos

### AreaType
```typescript
{
  id: string
  name: string
  categories: { id: string; name: string }[]
}
```

### ProjectSummaryType
```typescript
{
  id: string
  folio: string
  name: string
  area: string
  category: string
  budget: string
  startDate: string
  endDate: string
}
```

### ProjectStageType
```typescript
{
  name: string
  isActive: boolean
}
```

## Store

### Estado
- `areas`: Lista de áreas
- `selectedArea`: ID del área seleccionada
- `projects`: Lista de proyectos filtrados
- `isLoading`: Estado de carga

### Acciones
- `setAreas(areas)`: Cargar áreas
- `setSelectedArea(id)`: Cambiar área
- `setProjects(projects)`: Actualizar proyectos
- `setIsLoading(loading)`: Actualizar loading

### Getters
- `getAreaName(id)`: Obtener nombre de área
- `getCategoryName(areaId, name)`: Obtener nombre de categoría

## Composables

### useSummaryActions
- `loadAreas()`: Cargar desde localStorage
- `loadProjects(areaId)`: Cargar proyectos filtrados
- `getProjectStages(projectId)`: Obtener etapas del Gantt
- `formatCurrency(value)`: Formatear a MXN
- `exportToExcel()`: Exportar a Excel

## Componentes

### StageTracker.vue
- ✅ Props: `stages: ProjectStageType[]`
- ✅ Renderiza badges numerados
- ✅ Tooltip con nombre al hover
- ✅ Color dinámico según isActive
- ✅ Estado vacío integrado

## Características de UI

### Header
- ✅ BaseTitle con subtítulo
- ✅ Flex justify-between
- ✅ Botón primary con icono
- ✅ Responsive

### Card de Filtros
- ✅ Card con sombra
- ✅ Título "Filtros"
- ✅ Select bordered
- ✅ Max width medium

### Card de Proyectos
- ✅ Card con sombra
- ✅ Título dinámico con nombre de área
- ✅ Tabla zebra
- ✅ Hover en filas

### Tabla
- ✅ Table zebra
- ✅ Hover en filas
- ✅ Overflow horizontal
- ✅ Headers en negrita
- ✅ Text-right en montos

### Stage Tracker
- ✅ Flex gap-1
- ✅ Badges con números
- ✅ Tooltip absoluto
- ✅ Transiciones suaves
- ✅ Z-index para tooltip

## Ruta

La ruta está configurada en `/gestion-de-proyectos/resumen-de-proyectos`

## Integración

### Con Alta de Proyectos
- ✅ Folio, Nombre
- ✅ Área, Categoría
- ✅ Presupuesto

### Con Gantt
- ✅ Lee estructura de etapas
- ✅ Filtra tareas padre
- ✅ Marca primera como activa

## Ejemplo de Uso

```vue
<script setup lang="ts">
import ProjectsSummaryView from '@/modules/GestionDeProyectos/ResumenDeProyectos/views/ProjectsSummaryView.vue'
</script>

<template>
  <ProjectsSummaryView />
</template>
```

## Características Técnicas

- ✅ Estado reactivo con Pinia
- ✅ TypeScript estricto
- ✅ Notificaciones toast
- ✅ Watch para cambios de área
- ✅ Loading async simulado
- ✅ Exportación con XLSX
- ✅ Carga desde localStorage
- ✅ Integración con Gantt
- ✅ Componente StageTracker reutilizable
- ✅ Tooltips con CSS puro
- ✅ Formato de moneda MXN

## Stage Tracker Detallado

### Estructura HTML
```html
<div class="flex items-center gap-1">
  <div class="group relative">
    <div class="h-6 px-2 ...">1</div>
    <div class="tooltip ...">Nombre Etapa</div>
  </div>
</div>
```

### Estilos Dinámicos
- **Activa**: bg-primary, text-primary-content, shadow-sm
- **Inactiva**: bg-base-300, text-base-content/60

### Tooltip
- **Posición**: bottom-full (arriba)
- **Transform**: -translate-x-1/2 (centrado)
- **Opacity**: 0 → 100 con group-hover
- **Z-index**: 10

## Dependencias de Datos

El módulo requiere que existan:
- ✅ Áreas en localStorage
- ✅ Proyectos en localStorage
- ✅ Gantt por proyecto en localStorage (opcional)

Sin estos datos, se mostrarán estados vacíos apropiados.
