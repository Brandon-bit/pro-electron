# Matriz de Evidencias

Módulo para visualizar y gestionar las evidencias de proyectos en curso con búsqueda, paginación y exportación usando BaseTable.

## Estructura del Módulo

```
MatrizDeEvidencias/
├── components/          # Componentes Vue del módulo
│   ├── EvidenceCounter.vue  # Contador de evidencias con botón
│   ├── StatusBadge.vue      # Badge de estado del proyecto
│   └── EvidenceModal.vue    # Modal con BaseModal y BaseTable
├── composables/         # Lógica reutilizable
│   ├── useEvidenceActions.ts      # Acciones y carga de datos
│   ├── useEvidenceTable.ts        # Definición de columnas tabla principal
│   └── useEvidenceModalTable.ts   # Definición de columnas modal
├── store/               # Estado global con Pinia
│   └── evidenceStore.ts           # Store con estado
├── types/               # Definiciones de TypeScript
│   └── evidenceTypes.ts           # Tipos e interfaces
└── views/               # Vistas principales
    └── EvidenceMatrixView.vue     # Vista principal con BaseTable
```

## Características Principales

### 1. BaseTable Integration

#### Uso del Componente Base
- ✅ Usa `BaseTable` de `src/shared/components`
- ✅ Paginación automática
- ✅ Búsqueda integrada
- ✅ Exportación a Excel/PDF
- ✅ Skeleton loading
- ✅ Estados vacíos

#### Columnas (7 + #)
1. **#** - Número de fila (automático)
2. **Proyecto** - Nombre y folio
3. **Etapa** - Badge con etapa actual
4. **Fecha Inicio** - Fecha de inicio
5. **Fecha Fin** - Fecha de finalización
6. **Evidencias** - Contador clickeable
7. **Estatus** - Badge con color según estado
8. **Gantt** - Botón para ver Gantt

#### Funcionalidades de BaseTable
- ✅ Búsqueda global en tiempo real
- ✅ Selector de registros por página (5, 10, 20, 100)
- ✅ Paginación: Inicio, Anterior, Siguiente, Final
- ✅ Exportar a PDF con autoTable
- ✅ Exportar a Excel con XLSX
- ✅ Loading skeleton animado
- ✅ Estado vacío con icono
- ✅ Contador de registros
- ✅ Estilos consistentes

### 4. Contador de Evidencias

#### Componente EvidenceCounter
- ✅ Icono de carpeta
- ✅ Número de evidencias
- ✅ Botón ghost
- ✅ Hover con color primary
- ✅ Click abre modal

### 5. Badge de Estado

#### Componente StatusBadge
- ✅ Badge small
- ✅ Colores dinámicos:
  - **En Tiempo** → badge-success
  - **Atrasado** → badge-warning
  - **Crítico** → badge-error
  - **Finalizado** → badge-info
  - **Default** → badge-ghost

### 6. Modal de Evidencias

#### Componente EvidenceModal
- ✅ Usa `BaseModal` de `src/shared/components`
- ✅ Usa `BaseTable` con `pagedTable={false}`
- ✅ Título dinámico con nombre del proyecto
- ✅ Estado vacío con icono
- ✅ Botón de descarga por evidencia
- ✅ Integración con modal store

#### Columnas del Modal (6 + #)
1. **#** - Número de fila (automático)
2. **Etapa** - Nombre de la etapa
3. **Actividad** - Nombre de la actividad
4. **Archivo** - Nombre con icono
5. **Responsable** - Persona responsable
6. **Fecha** - Fecha de carga (formato es-MX)
7. **Acción** - Botón descargar

#### Características del Modal
- ✅ Watch para abrir/cerrar automáticamente
- ✅ Usa `useModalStore` para gestión de estado
- ✅ BaseTable sin paginación (`:paged-table="false"`)
- ✅ Columnas definidas en `useEvidenceModalTable`
- ✅ Descarga de archivos por botón

### 7. Exportación a Excel

#### Funcionalidades
- ✅ Botón en header
- ✅ Exporta proyectos filtrados
- ✅ 6 columnas de datos
- ✅ Nombre: `Matriz_Evidencias_YYYY-MM-DD.xlsx`
- ✅ Notificación de éxito
- ✅ Loading state

#### Columnas Exportadas
- Proyecto
- Etapa
- Fecha Inicio
- Fecha Fin
- Evidencias
- Estatus

### 8. Carga de Datos

#### localStorage Keys
- `projects` - Lista de proyectos
- `projectEvidences` - Evidencias por proyecto

#### Filtrado
- ✅ Solo proyectos en curso
- ✅ Excluye "Finalizado"
- ✅ Excluye "Completado"
- ✅ Cuenta evidencias por proyecto

### 9. Navegación

#### Botón Gantt
- ✅ Icono gantt_chart
- ✅ Botón ghost small
- ✅ Navega a `/gestion-de-proyectos/gantt/:projectId`

## Flujo de Trabajo

1. **Ver Matriz** → Tabla con proyectos
2. **Buscar** → Filtrar proyectos
3. **Ver Evidencias** → Click en contador
4. **Descargar** → Click en botón download
5. **Ver Gantt** → Click en icono
6. **Exportar** → Botón en header
7. **Paginar** → Controles de paginación

## Tipos

### EvidenceType
```typescript
{
  id: string
  fileName: string
  fileUrl: string
  uploadDate: string
  activityId: string
  activityName: string
  stageName: string
  responsible: string
}
```

### ProjectEvidenceType
```typescript
{
  id: string
  name: string
  folio: string
  stage: string
  startDate: string
  endDate: string
  status: string
  evidenceCount: number
}
```

## Store

### Estado
- `projects`: Lista de proyectos
- `searchTerm`: Término de búsqueda
- `selectedProject`: Proyecto seleccionado para modal
- `currentPage`: Página actual
- `itemsPerPage`: Items por página
- `isLoading`: Estado de carga

### Acciones
- `setProjects(projects)`: Cargar proyectos
- `setSearchTerm(term)`: Actualizar búsqueda
- `setSelectedProject(project)`: Seleccionar proyecto
- `setCurrentPage(page)`: Cambiar página
- `setItemsPerPage(items)`: Cambiar items por página
- `setIsLoading(loading)`: Actualizar loading

### Getters
- `filteredProjects`: Proyectos filtrados por búsqueda
- `totalPages`: Total de páginas
- `paginatedProjects`: Proyectos de la página actual

## Composables

### useEvidenceActions
- `loadProjects()`: Cargar desde localStorage
- `getProjectEvidences(id)`: Obtener evidencias de proyecto
- `handleGanttClick(id)`: Navegar a Gantt
- `exportToExcel()`: Exportar a Excel

## Componentes

### EvidenceCounter.vue
- ✅ Props: `count`
- ✅ Emit: `click`
- ✅ Botón ghost con icono
- ✅ Hover primary

### StatusBadge.vue
- ✅ Props: `status`
- ✅ Computed para clase
- ✅ Badge small
- ✅ Colores dinámicos

### EvidenceModal.vue
- ✅ Props: `isOpen`, `project`, `evidences`
- ✅ Emit: `close`
- ✅ Modal de DaisyUI
- ✅ Tabla de evidencias
- ✅ Estado vacío
- ✅ Botón descargar

## Características de UI

### Header
- ✅ BaseTitle con subtítulo
- ✅ Flex justify-between
- ✅ Botón primary con icono
- ✅ Responsive

### Búsqueda
- ✅ Input bordered
- ✅ Icono absoluto
- ✅ Padding left
- ✅ Max width 512px
- ✅ Flex-1

### Filtros
- ✅ Contador de proyectos
- ✅ Select de items por página
- ✅ Width 130px
- ✅ Flex gap

### Tabla
- ✅ Card con sombra
- ✅ Table zebra
- ✅ Hover en filas
- ✅ Overflow horizontal
- ✅ Headers en negrita

### Paginación
- ✅ Centrada
- ✅ Gap de 2
- ✅ Botones outline
- ✅ Botón primary en activo
- ✅ Deshabilitado en límites

### Modal
- ✅ Max width 4xl
- ✅ Título con nombre
- ✅ Tabla zebra
- ✅ Estado vacío centrado
- ✅ Botón cerrar

## Ruta

La ruta está configurada en `/gestion-de-proyectos/matriz-de-evidencias`

## Estados Vacíos

### Sin Proyectos
- ✅ Icono search_off
- ✅ Mensaje: "No hay proyectos en curso"
- ✅ Centrado en tabla
- ✅ Colspan 7

### Sin Resultados
- ✅ Icono search_off
- ✅ Mensaje: "No se encontraron proyectos"
- ✅ Submensaje: "Intenta con otros términos"

### Sin Evidencias
- ✅ Icono folder_off
- ✅ Mensaje: "No hay evidencias registradas"
- ✅ Submensaje informativo
- ✅ Centrado en modal

## Formato de Datos

### localStorage Structure
```json
{
  "projects": [
    {
      "id": "proj-1",
      "name": "Sistema CRM",
      "folio": "00000001",
      "status": "En Tiempo",
      ...
    }
  ],
  "projectEvidences": {
    "proj-1": [
      {
        "id": "ev-1",
        "fileName": "documento.pdf",
        "fileUrl": "...",
        "uploadDate": "2024-10-22",
        ...
      }
    ]
  }
}
```

## Ejemplo de Uso

```vue
<script setup lang="ts">
import EvidenceMatrixView from '@/modules/GestionDeProyectos/MatrizDeEvidencias/views/EvidenceMatrixView.vue'
</script>

<template>
  <EvidenceMatrixView />
</template>
```

## Características Técnicas

- ✅ Estado reactivo con Pinia
- ✅ TypeScript estricto
- ✅ Notificaciones toast
- ✅ Paginación manual
- ✅ Búsqueda con computed
- ✅ Exportación con XLSX
- ✅ Carga desde localStorage
- ✅ Modal nativo de DaisyUI
- ✅ Navegación programática
- ✅ Filtrado de proyectos activos

## Integración

### Con Alta de Proyectos
- ✅ Nombre, Folio
- ✅ Fechas
- ✅ Estado

### Con Gantt
- ✅ Navegación a vista de Gantt
- ✅ Paso de projectId

### Con EDT
- ✅ Etapas y actividades
- ✅ Estructura para evidencias

## Descarga de Evidencias

El botón de descarga en el modal:
1. Crea un elemento `<a>`
2. Asigna `href` con fileUrl
3. Asigna `download` con fileName
4. Ejecuta click programático
5. Inicia descarga del navegador

## Paginación Inteligente

- ✅ Reset a página 1 al buscar
- ✅ Reset a página 1 al cambiar items
- ✅ Cálculo automático de páginas
- ✅ Slice de array para paginación
- ✅ Botones deshabilitados en límites

## Colores de Estado

- **En Tiempo** → Verde (success)
- **Atrasado** → Amarillo (warning)
- **Crítico** → Rojo (error)
- **Finalizado** → Azul (info)
- **Otros** → Gris (ghost)

## Iconos Material Symbols

- `search` - Búsqueda
- `download` - Exportar/Descargar
- `folder_open` - Contador evidencias
- `gantt_chart` - Ver Gantt
- `description` - Archivo
- `search_off` - Sin resultados
- `folder_off` - Sin evidencias
