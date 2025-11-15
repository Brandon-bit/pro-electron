# Priorización de Proyectos

Módulo para organizar y priorizar proyectos seleccionados desde el módulo de Análisis de Iniciativas mediante drag & drop.

## Estructura del Módulo

```
Priorizacion/
├── components/          # Componentes Vue del módulo
│   ├── EmptyState.vue           # Estado vacío cuando no hay proyectos
│   ├── PrioritizationTable.vue  # Tabla con drag & drop
│   └── TopPriorityCard.vue      # Card del proyecto prioritario
├── composables/         # Lógica reutilizable
│   ├── usePrioritizationActions.ts  # Acciones CRUD
│   └── mappingPrioritizationData.ts # Mapeo de datos API ↔ Frontend
├── services/            # Servicios de API
│   └── prioritizationService.ts     # Llamadas HTTP al backend
├── store/               # Estado global con Pinia
│   └── prioritizationStore.ts       # Store de proyectos priorizados
├── types/               # Definiciones de TypeScript
│   └── prioritizationTypes.ts       # Tipos e interfaces
├── validations/         # Esquemas de validación
│   └── prioritizationValidation.ts  # Validación con Zod
└── views/               # Vistas principales
    └── PrioritizationView.vue       # Vista principal del módulo
```

## Características Principales

### 1. Carga Automática desde Iniciativas
- ✅ Carga proyectos desde `localStorage` enviados desde Análisis de Iniciativas
- ✅ Asignación automática de prioridades (1, 2, 3...)
- ✅ Preserva datos de alineación estratégica

### 2. Tabla de Priorización

#### Columnas
- **Drag Handle**: Icono para arrastrar filas
- **Prioridad**: Badge numerado (#1, #2, #3...)
- **Proyecto**: Nombre del proyecto
- **Clasificación**: Badge con tipo de proyecto
- **Alineación Estratégica**: Barra de progreso con porcentaje
- **ROI**: Campo editable (texto libre)
- **Riesgos**: Campo editable (Bajo/Medio/Alto)
- **Recursos**: Campo editable (cantidad)

### 3. Drag & Drop
- ✅ Arrastrar filas para reordenar
- ✅ Actualización automática de prioridades
- ✅ Efecto visual durante el arrastre (opacity 50%)
- ✅ Cursor de movimiento
- ✅ Resaltado del proyecto #1 (fondo accent)

### 4. Campos Editables
- ✅ Inputs inline para ROI, Riesgos y Recursos
- ✅ Actualización en tiempo real
- ✅ Placeholders informativos
- ✅ Diseño compacto

### 5. Proyecto de Mayor Prioridad
- ✅ Card destacado con borde accent
- ✅ Muestra el nombre del proyecto #1
- ✅ Botón "Generar EDT del Proyecto"
- ✅ Navegación automática a módulo EDT
- ✅ Almacenamiento en localStorage

### 6. Estado Vacío
- ✅ Mensaje informativo
- ✅ Icono descriptivo
- ✅ Botón para ir a Análisis de Iniciativas
- ✅ Diseño centrado y limpio

## Flujo de Trabajo

1. **Recibir Proyectos**: Los proyectos llegan desde Análisis de Iniciativas vía localStorage
2. **Visualizar**: Se muestran en la tabla con prioridades asignadas
3. **Reordenar**: Arrastra las filas para cambiar el orden de prioridad
4. **Completar Datos**: Llena los campos de ROI, Riesgos y Recursos
5. **Generar EDT**: Selecciona el proyecto #1 para generar su EDT

## Integración con Otros Módulos

### Desde Análisis de Iniciativas
```typescript
// Los proyectos seleccionados se envían así:
localStorage.setItem('prioritizationProjects', JSON.stringify(selectedInitiatives))
```

### Hacia EDT del Proyecto
```typescript
// El proyecto prioritario se envía así:
localStorage.setItem('edtProject', JSON.stringify(topProject))
```

## Componentes Base Utilizados

- `BaseTitle`: Título de página con subtítulo
- Inputs nativos de DaisyUI para campos editables
- Cards y badges de DaisyUI

## Características de UI

### Tabla
- ✅ Responsive con scroll horizontal
- ✅ Filas con hover effect
- ✅ Zebra striping
- ✅ Resaltado especial para proyecto #1
- ✅ Badges de colores

### Drag & Drop
- ✅ Cursor `cursor-move` en filas
- ✅ Cursor `cursor-grabbing` al arrastrar
- ✅ Opacity 50% durante drag
- ✅ Transiciones suaves

### Barra de Progreso
- ✅ Visualización de alineación estratégica
- ✅ Color accent
- ✅ Porcentaje numérico al lado
- ✅ Ancho máximo de 150px

### Card de Prioridad
- ✅ Fondo accent/10
- ✅ Borde accent doble
- ✅ Layout flex con botón a la derecha
- ✅ Texto destacado en color accent

## Ruta

La ruta está configurada en `/gestion-de-proyectos/priorizacion`

## API Endpoints

- `GET /gestion-proyectos/priorizacion` - Obtener lista paginada
- `POST /gestion-proyectos/priorizacion` - Crear proyecto priorizado
- `PUT /gestion-proyectos/priorizacion/:id` - Actualizar proyecto
- `DELETE /gestion-proyectos/priorizacion/:id` - Eliminar proyecto
- `POST /gestion-proyectos/priorizacion/actualizar-prioridades` - Actualizar orden

## Validaciones

Todas las validaciones están definidas en `validations/prioritizationValidation.ts` usando Zod:
- Campos requeridos: name, classification
- Rangos numéricos: strategicAlignment (0-100), priority (≥1)
- Longitudes máximas para campos de texto

## Datos Almacenados

### En localStorage
```typescript
// Proyectos para priorizar (desde Iniciativas)
prioritizationProjects: PrioritizedProject[]

// Proyecto para EDT (hacia EDT)
edtProject: PrioritizedProject
```

## Ejemplo de Uso

```vue
<script setup lang="ts">
import PrioritizationView from '@/modules/GestionDeProyectos/Priorizacion/views/PrioritizationView.vue'
</script>

<template>
  <PrioritizationView />
</template>
```

## Características Técnicas

- ✅ Drag & Drop nativo HTML5
- ✅ Estado reactivo con Pinia
- ✅ TypeScript estricto
- ✅ Validación con Zod
- ✅ Persistencia en localStorage
- ✅ Navegación programática con Vue Router
- ✅ Notificaciones toast
- ✅ Diseño responsive
