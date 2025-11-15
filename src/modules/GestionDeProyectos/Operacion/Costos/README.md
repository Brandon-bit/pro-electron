# Gestión de Costos

Módulo para gestionar y visualizar los costos de proyectos con seguimiento de gastos planificados, reales y extraordinarios.

## Estructura del Módulo

```
Costos/
├── components/          # Componentes Vue del módulo
│   ├── ProjectSelector.vue  # Selector de proyecto inicial
│   ├── KPICards.vue         # Tarjetas de indicadores
│   └── CostTable.vue        # Tabla de costos editable
├── composables/         # Lógica reutilizable
│   └── useCostActions.ts    # Acciones y cálculos
├── store/               # Estado global con Pinia
│   └── costStore.ts         # Store de costos
├── types/               # Definiciones de TypeScript
│   └── costTypes.ts         # Tipos e interfaces
└── views/               # Vistas principales
    └── CostsView.vue        # Vista principal
```

## Características Principales

### 1. Selector de Proyecto

#### Pantalla Inicial
- ✅ Icono grande de pagos
- ✅ Título "Gestión de Costos"
- ✅ Descripción informativa
- ✅ Card con selector de proyecto
- ✅ Lista de proyectos con folio y nombre

### 2. Panel de KPIs (5 Tarjetas)

#### Ejecución del Gasto
- ✅ Porcentaje de ejecución
- ✅ Barra de progreso
- ✅ Monto actual vs planificado
- ✅ Cálculo: (Gasto Real + Extraordinario) / Gasto Planificado * 100

#### Presupuesto al Finalizar
- ✅ Icono trending up
- ✅ Proyección de presupuesto final
- ✅ Cálculo basado en tendencias
- ✅ Fórmula: (Planificado / Real) * (Real + Extraordinario)

#### Desviación Presupuestal
- ✅ Icono dinámico (trending_down o error)
- ✅ Color según varianza (verde/rojo)
- ✅ Diferencia vs presupuesto autorizado
- ✅ Cálculo: Presupuesto Autorizado - Total Planificado

#### Presupuesto Estimado
- ✅ Icono de bandera
- ✅ Monto desde registro del proyecto
- ✅ Solo lectura
- ✅ Tomado del proyecto original

#### Presupuesto Autorizado
- ✅ Input editable
- ✅ Placeholder "$0.00"
- ✅ Guardado automático
- ✅ Presupuesto oficial aprobado

### 3. Sistema de Tabs (3 Pestañas)

#### Tab 1: Costos del Proyecto
- ✅ Costos de etapas y actividades del Gantt
- ✅ Cargados automáticamente desde Gantt
- ✅ Concepto no editable
- ✅ Descripción editable
- ✅ Todos los campos de costos editables

#### Tab 2: Costos de Usuarios
- ✅ Costos del equipo del proyecto
- ✅ Usuarios predefinidos (mock)
- ✅ Concepto no editable
- ✅ Descripción editable
- ✅ Todos los campos de costos editables

#### Tab 3: Otros Costos
- ✅ Costos misceláneos
- ✅ Botón "Agregar Nuevo Costo"
- ✅ Concepto editable
- ✅ Descripción editable
- ✅ Botón de eliminar por fila
- ✅ Todos los campos editables

### 4. Tabla de Costos

#### Columnas
1. **Concepto** - Nombre del costo
2. **Descripción** - Detalle adicional
3. **Gasto Planificado** - Input numérico
4. **Fecha Planificada** - Input date
5. **Gasto Real** - Input numérico
6. **Fecha Real** - Input date
7. **Gastos Extraordinarios** - Input numérico
8. **Acciones** - Solo en "Otros Costos"

#### Funcionalidades
- ✅ Inputs inline editables
- ✅ Guardado automático al cambiar
- ✅ Notificación de éxito
- ✅ Tabla zebra con hover
- ✅ Responsive con scroll horizontal
- ✅ Estado vacío

### 5. Cálculos Automáticos

#### Totales
```typescript
Total Planificado = Σ(plannedCost) de todos los items
Total Real = Σ(actualCost) de todos los items
Total Extraordinario = Σ(extraordinaryCost) de todos los items
Total Actual = Total Real + Total Extraordinario
```

#### Ejecución
```typescript
Ejecución % = (Total Actual / Total Planificado) * 100
```

#### Proyección
```typescript
Forecast = (Total Planificado / Total Real) * Total Actual
```

#### Varianza
```typescript
Varianza = Presupuesto Autorizado - Total Planificado
```

### 6. Integración con Gantt

#### Carga Automática
- ✅ Lee datos de `gantt_[projectId]` en localStorage
- ✅ Crea items para etapas (level 1)
- ✅ Crea items para actividades (level > 1)
- ✅ Indenta actividades con espacios
- ✅ Inicializa costos en 0

### 7. Persistencia

#### localStorage Keys
- `projects` - Lista de proyectos
- `costs_[projectId]` - Costos de cada proyecto
- `gantt_[projectId]` - Gantt para cargar estructura

#### Guardado Automático
- ✅ Al editar cualquier campo
- ✅ Al agregar nuevo costo
- ✅ Al eliminar costo
- ✅ Al cambiar presupuesto autorizado
- ✅ Notificación de éxito

## Flujo de Trabajo

1. **Seleccionar Proyecto**: Elegir de la lista
2. **Ver KPIs**: Revisar indicadores principales
3. **Navegar Tabs**: Explorar diferentes categorías
4. **Editar Costos**: Modificar campos inline
5. **Agregar Costos**: Botón en "Otros Costos"
6. **Eliminar Costos**: Botón de eliminar en "Otros Costos"
7. **Cambiar Proyecto**: Selector en header

## Componentes

### ProjectSelector.vue
- ✅ Pantalla inicial centrada
- ✅ Icono grande
- ✅ Card con selector
- ✅ Lista de proyectos filtrada

### KPICards.vue
- ✅ Grid responsive (1/2/5 cols)
- ✅ 5 tarjetas de indicadores
- ✅ Cálculos reactivos
- ✅ Input editable en última tarjeta
- ✅ Iconos Material Symbols
- ✅ Colores según estado

### CostTable.vue
- ✅ Tabla zebra
- ✅ Inputs inline
- ✅ Props: items, category, editable
- ✅ Emit: update, delete
- ✅ Estado vacío
- ✅ Botón eliminar condicional

### CostsView.vue
- ✅ Vista principal
- ✅ Selector de proyecto en header
- ✅ Panel de KPIs
- ✅ Tabs nativas de DaisyUI
- ✅ 3 pestañas con tablas

## Tipos

### CostItemType
```typescript
{
  id: string
  concept: string
  description: string
  plannedCost: number
  plannedDate: string
  actualCost: number
  actualDate: string
  extraordinaryCost: number
}
```

### ProjectCostsType
```typescript
{
  projectCosts: CostItemType[]
  userCosts: CostItemType[]
  otherCosts: CostItemType[]
  estimatedBudget: number
  authorizedBudget: number
}
```

### CostTotalsType
```typescript
{
  totalPlanned: number
  totalActual: number
  executionPercentage: number
  variance: number
  forecast: number
}
```

## Store

### Estado
- `selectedProject`: ID del proyecto actual
- `projects`: Lista de proyectos
- `costs`: Objeto con todos los costos

### Acciones
- `setSelectedProject(id)`: Cambiar proyecto
- `setProjects(projects)`: Cargar proyectos
- `setCosts(costs)`: Actualizar costos
- `updateAuthorizedBudget(budget)`: Actualizar presupuesto

### Getters
- `selectedProjectData`: Datos del proyecto actual

## Composables

### useCostActions
- `loadProjects()`: Cargar desde localStorage
- `loadCosts(projectId)`: Cargar costos del proyecto
- `saveCosts(costs)`: Guardar en localStorage
- `calculateTotals`: Computed con todos los cálculos
- `updateCostItem(category, id, field, value)`: Actualizar item
- `addOtherCost()`: Agregar nuevo costo
- `deleteOtherCost(id)`: Eliminar costo

## Características de UI

### Selector Inicial
- ✅ Centrado vertical y horizontal
- ✅ Icono de 6xl
- ✅ Título de 3xl
- ✅ Card con sombra
- ✅ Select bordered

### Header
- ✅ Flex justify-between
- ✅ BaseTitle con subtítulo
- ✅ Select en la derecha
- ✅ Max width 384px

### KPI Cards
- ✅ Grid responsive
- ✅ Cards con sombra
- ✅ Padding de 4
- ✅ Texto de 2xl
- ✅ Progress bar
- ✅ Iconos con color
- ✅ Input en última card

### Tabs
- ✅ Tabs boxed de DaisyUI
- ✅ 3 pestañas
- ✅ Tab content con padding
- ✅ Títulos y descripciones
- ✅ Botón en tab 3

### Tabla
- ✅ Table zebra
- ✅ Hover en filas
- ✅ Inputs small
- ✅ Inputs bordered
- ✅ Placeholder en números
- ✅ Type date en fechas
- ✅ Botón ghost en acciones

## Ruta

La ruta está configurada en `/gestion-de-proyectos/costos`

## Datos Mock

### Usuarios Predefinidos
```javascript
[
  {
    id: 'u1',
    concept: 'Juan Pérez',
    description: 'Desarrollador Senior'
  },
  {
    id: 'u2',
    concept: 'María García',
    description: 'Project Manager'
  }
]
```

## Estados Vacíos

### Sin Proyecto Seleccionado
- ✅ Pantalla inicial con selector
- ✅ Icono grande
- ✅ Mensaje informativo

### Sin Costos
- ✅ Mensaje: "No hay costos registrados"
- ✅ Centrado en tabla
- ✅ Colspan completo

## Validaciones

### Números
- ✅ parseFloat con fallback a 0
- ✅ Placeholder "$0.00"
- ✅ Type number en inputs

### Fechas
- ✅ Type date en inputs
- ✅ Formato ISO

### Guardado
- ✅ Notificación de éxito
- ✅ Guardado en localStorage
- ✅ Actualización de store

## Integración

### Con Alta de Proyectos
- ✅ Lee presupuesto estimado
- ✅ Usa folio y nombre

### Con Gantt
- ✅ Lee estructura de tareas
- ✅ Crea costos por etapa
- ✅ Crea costos por actividad
- ✅ Mantiene jerarquía

## Ejemplo de Uso

```vue
<script setup lang="ts">
import CostsView from '@/modules/GestionDeProyectos/Costos/views/CostsView.vue'
</script>

<template>
  <CostsView />
</template>
```

## Características Técnicas

- ✅ Estado reactivo con Pinia
- ✅ TypeScript estricto
- ✅ Notificaciones toast
- ✅ Computed para cálculos
- ✅ Watch para cambios de proyecto
- ✅ Guardado automático
- ✅ Carga desde localStorage
- ✅ Integración con Gantt
- ✅ Tabs nativas de DaisyUI
- ✅ Inputs inline editables

## Cálculos en Tiempo Real

Todos los KPIs se recalculan automáticamente cuando:
- ✅ Se edita cualquier costo
- ✅ Se agrega un nuevo costo
- ✅ Se elimina un costo
- ✅ Se cambia el presupuesto autorizado

Los cálculos son reactivos gracias a `computed` de Vue.
