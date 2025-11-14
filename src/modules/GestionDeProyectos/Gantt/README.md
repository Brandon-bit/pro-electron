# Gantt - Matriz de Proyectos

Módulo para visualizar y gestionar el estado de todos los proyectos mediante una matriz con indicadores de progreso y estatus.

## Estructura del Módulo

```
Gantt/
├── components/          # Componentes Vue del módulo
│   ├── StatusLegend.vue     # Leyenda de estados
│   ├── SearchBar.vue        # Barra de búsqueda
│   └── ProjectsTable.vue    # Tabla de proyectos
├── composables/         # Lógica reutilizable
│   └── useGanttActions.ts   # Acciones y cálculos de estado
├── services/            # Servicios de API
│   └── ganttService.ts      # Llamadas HTTP al backend
├── store/               # Estado global con Pinia
│   └── ganttStore.ts        # Store de proyectos Gantt
├── types/               # Definiciones de TypeScript
│   └── ganttTypes.ts        # Tipos e interfaces
└── views/               # Vistas principales
    └── GanttMatrixView.vue  # Vista principal
```

## Características Principales

### 1. Matriz de Proyectos

#### Columnas de la Tabla
- ✅ **ID Proyecto**: Identificador único
- ✅ **Folio**: Folio de 8 dígitos
- ✅ **Nombre del Proyecto**: Nombre completo
- ✅ **Fecha Inicio**: Fecha de inicio
- ✅ **Fecha Fin**: Fecha de finalización
- ✅ **Estatus**: Badge con color según estado
- ✅ **Etapas**: Contador de etapas (nivel 1)
- ✅ **Actividades**: Contador de actividades (nivel > 1)
- ✅ **Acciones**: Botones de editar y exportar

### 2. Sistema de Estados

#### 6 Estados de Proyecto
1. **Proyecto finalizado** (Verde)
   - Todas las tareas completadas al 100%
   - Fecha de fin superada

2. **Proyecto atrasado crítico** (Rojo oscuro)
   - Diferencia de progreso > 30%
   - Requiere atención urgente

3. **Proyecto atrasado atención inmediata** (Rojo)
   - Diferencia de progreso > 20%
   - Necesita intervención rápida

4. **Proyecto atrasado controlable** (Naranja)
   - Diferencia de progreso > 10%
   - Puede recuperarse

5. **Proyecto atrasado** (Amarillo)
   - Diferencia de progreso > 5%
   - Ligero retraso

6. **Proyecto en tiempo** (Azul)
   - Progreso según lo planeado
   - Sin retrasos

### 3. Cálculo de Estado

#### Algoritmo de Cálculo
```typescript
1. Si proyecto terminó y todas las tareas al 100% → Finalizado
2. Calcular progreso planeado: (tiempo transcurrido / duración total) * 100
3. Calcular progreso real: promedio de progreso de todas las tareas
4. Diferencia = progreso planeado - progreso real
5. Asignar estado según diferencia:
   - > 30% → Crítico
   - > 20% → Atención inmediata
   - > 10% → Controlable
   - > 5% → Atrasado
   - ≤ 5% → En tiempo
```

### 4. Leyenda de Estados

#### Visualización
- ✅ Círculos de colores
- ✅ Etiquetas descriptivas
- ✅ Centrado en la página
- ✅ Fondo destacado
- ✅ Responsive con wrap

### 5. Búsqueda

#### Campos de Búsqueda
- ✅ ID del proyecto
- ✅ Folio
- ✅ Nombre del proyecto
- ✅ Estado del proyecto

#### Funcionalidades
- ✅ Búsqueda en tiempo real
- ✅ Case insensitive
- ✅ Icono de búsqueda
- ✅ Placeholder informativo
- ✅ Alineado a la derecha

### 6. Acciones

#### Editar Gantt
- ✅ Botón con icono de editar
- ✅ Navegación a vista de edición
- ✅ Ruta: `/gestion-de-proyectos/gantt/:projectId`

#### Exportar
- ✅ Botón con icono de descarga
- ✅ Exportación a Excel (.xlsx)
- ✅ Incluye todas las tareas del proyecto
- ✅ Formato: `Gantt_[NombreProyecto]_[Folio].xlsx`

### 7. Exportación a Excel

#### Columnas Exportadas
- Nombre Tarea
- Fecha Inicio
- Fecha Fin
- Duración
- Responsable
- Dependencias
- Progreso (%)

#### Funcionalidades
- ✅ Usa librería XLSX
- ✅ Nombre de archivo personalizado
- ✅ Descarga automática
- ✅ Notificación de éxito

### 8. Carga de Datos

#### Fuentes de Datos
- ✅ **Proyectos**: localStorage key `projects`
- ✅ **Tareas Gantt**: localStorage key `gantt_[projectId]`

#### Procesamiento
- ✅ Carga automática al montar componente
- ✅ Conteo de etapas y actividades
- ✅ Cálculo de estado
- ✅ Generación de folio si no existe

## Flujo de Trabajo

1. **Cargar Matriz**: Acceder al módulo
2. **Ver Estados**: Revisar leyenda de colores
3. **Buscar**: Filtrar proyectos si es necesario
4. **Analizar**: Revisar estados y contadores
5. **Editar**: Click en "Editar Gantt" para modificar
6. **Exportar**: Click en "Exportar" para descargar Excel

## Componentes Base Utilizados

- `BaseTitle`: Título de página con subtítulo
- Tabla zebra de DaisyUI
- Badges de DaisyUI
- Input con icono
- Botones outline

## Características de UI

### Leyenda de Estados
- ✅ Flex wrap para responsive
- ✅ Gap de 3 unidades
- ✅ Centrado horizontal
- ✅ Padding de 4 unidades
- ✅ Fondo base-200
- ✅ Bordes redondeados

### Tabla
- ✅ Card con sombra
- ✅ Tabla zebra
- ✅ Overflow horizontal
- ✅ Headers fijos
- ✅ Hover en filas
- ✅ Alineación centrada para contadores

### Badges de Estado
- ✅ Tamaño small
- ✅ Colores según estado
- ✅ Texto descriptivo
- ✅ Fondo con transparencia

### Botones de Acción
- ✅ Tamaño small
- ✅ Outline variant
- ✅ Iconos Material Symbols
- ✅ Gap de 2 unidades
- ✅ Centrados en celda

### Búsqueda
- ✅ Input bordered
- ✅ Icono absoluto a la izquierda
- ✅ Padding left para icono
- ✅ Max width 384px
- ✅ Alineado a la derecha

## Ruta

La ruta está configurada en `/gestion-de-proyectos/gantt-matriz`

## API Endpoints

- `GET /gestion-proyectos/gantt/proyectos` - Obtener lista de proyectos
- `GET /gestion-proyectos/gantt/:projectId/tareas` - Obtener tareas de un proyecto
- `GET /gestion-proyectos/gantt/:projectId/exportar` - Exportar Gantt a Excel

## Estructura de Datos

### Proyecto Gantt
```typescript
{
  id: string
  folio: string
  name: string
  startDate: string
  endDate: string
  status: StatusType
  stages: number
  activities: number
}
```

### Tarea Gantt
```typescript
{
  id: number
  name: string
  level: number
  startDate: string | null
  endDate: string | null
  duration: number
  responsible: string
  dependencies: number[]
  progress: number
  parentId: number | null
}
```

### Configuración de Estados
```typescript
{
  finished: { 
    label: 'Proyecto finalizado', 
    color: 'text-success', 
    bgColor: 'bg-success/20' 
  },
  critical: { 
    label: 'Proyecto atrasado crítico', 
    color: 'text-error', 
    bgColor: 'bg-error/30' 
  },
  immediate: { 
    label: 'Proyecto atrasado atención inmediata', 
    color: 'text-error', 
    bgColor: 'bg-error/20' 
  },
  controllable: { 
    label: 'Proyecto atrasado controlable', 
    color: 'text-warning', 
    bgColor: 'bg-warning/20' 
  },
  delayed: { 
    label: 'Proyecto atrasado', 
    color: 'text-warning', 
    bgColor: 'bg-warning/10' 
  },
  ontime: { 
    label: 'Proyecto en tiempo', 
    color: 'text-info', 
    bgColor: 'bg-info/20' 
  }
}
```

## Ejemplo de Uso

```vue
<script setup lang="ts">
import GanttMatrixView from '@/modules/GestionDeProyectos/Gantt/views/GanttMatrixView.vue'
</script>

<template>
  <GanttMatrixView />
</template>
```

## Características Técnicas

- ✅ Estado reactivo con Pinia
- ✅ TypeScript estricto
- ✅ Notificaciones toast
- ✅ Exportación con XLSX
- ✅ Cálculo de estado automático
- ✅ Búsqueda con computed
- ✅ Navegación programática
- ✅ Carga desde localStorage
- ✅ Conteo de etapas/actividades
- ✅ Formateo de fechas

## Integración con EDT

El módulo se integra con EDT para obtener:
- ✅ Estructura de tareas (etapas y actividades)
- ✅ Niveles de jerarquía
- ✅ Progreso de tareas
- ✅ Datos para cálculo de estado

## Almacenamiento

### localStorage Keys
- `projects`: Lista de proyectos
- `gantt_[projectId]`: Tareas Gantt de cada proyecto

### Formato de Proyecto
```json
{
  "id": "PROJ-001",
  "folio": "00000001",
  "name": "Sistema CRM",
  "startDate": "2024-01-01",
  "endDate": "2024-12-31",
  ...
}
```

### Formato de Tarea
```json
{
  "id": 1,
  "name": "Análisis",
  "level": 1,
  "startDate": "2024-01-01",
  "endDate": "2024-02-01",
  "duration": 30,
  "responsible": "Juan Pérez",
  "dependencies": [],
  "progress": 75,
  "parentId": null
}
```

## Estados Vacíos

### Sin Proyectos
- ✅ Mensaje: "No hay proyectos registrados"
- ✅ Centrado en tabla
- ✅ Padding vertical
- ✅ Opacidad reducida

### Sin Resultados de Búsqueda
- ✅ Mensaje: "No se encontraron proyectos"
- ✅ Mismo estilo que estado vacío

## Colores de Estado

### Paleta DaisyUI
- **Verde** (success): Finalizado
- **Rojo** (error): Crítico/Inmediato
- **Naranja** (warning): Controlable/Atrasado
- **Azul** (info): En tiempo

### Transparencias
- Crítico: 30% opacity
- Inmediato: 20% opacity
- Controlable: 20% opacity
- Atrasado: 10% opacity
- En tiempo: 20% opacity
- Finalizado: 20% opacity

## Navegación

### Editar Gantt
Navega a la vista de edición del Gantt del proyecto seleccionado:
```
/gestion-de-proyectos/gantt/:projectId
```

## Exportación

### Proceso
1. Obtener tareas del proyecto desde localStorage
2. Mapear datos a formato de exportación
3. Crear hoja de cálculo con XLSX
4. Generar archivo con nombre personalizado
5. Descargar automáticamente
6. Mostrar notificación de éxito

### Nombre de Archivo
Formato: `Gantt_[NombreProyecto]_[Folio].xlsx`

Ejemplo: `Gantt_Sistema CRM_00000001.xlsx`
