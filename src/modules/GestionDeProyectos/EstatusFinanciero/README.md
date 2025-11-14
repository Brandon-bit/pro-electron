# Estatus Financiero

Módulo para visualizar el estatus financiero de proyectos organizados por áreas y categorías con seguimiento de inversión, montos contratados y ejercidos.

## Estructura del Módulo

```
EstatusFinanciero/
├── composables/         # Lógica reutilizable
│   └── useFinancialActions.ts   # Acciones y cálculos
├── store/               # Estado global con Pinia
│   └── financialStatusStore.ts  # Store de estatus financiero
├── types/               # Definiciones de TypeScript
│   └── financialStatusTypes.ts  # Tipos e interfaces
└── views/               # Vistas principales
    └── FinancialStatusView.vue  # Vista principal con tabs
```

## Características Principales

### 1. Selector de Área

#### Header
- ✅ BaseTitle con título y subtítulo
- ✅ Select de áreas
- ✅ Botón "Exportar a Excel"
- ✅ Botón deshabilitado sin área seleccionada

#### Estado Vacío
- ✅ Card centrado
- ✅ Mensaje informativo
- ✅ Altura de 400px

### 2. Sistema de 3 Tabs

#### Tab 1: Resumen Global
- ✅ Tabla con resumen por categoría
- ✅ 8 columnas de información
- ✅ Conteo de proyectos por etapa
- ✅ Totales financieros
- ✅ Formato de moneda MXN

#### Tab 2: Detalle de la Inversión
- ✅ Filtros por tipo y etapa
- ✅ Tabla con 12 columnas
- ✅ Inputs de fecha editables
- ✅ Solo proyectos activos
- ✅ Formato de moneda

#### Tab 3: Histórico
- ✅ Alert informativo
- ✅ Solo lectura
- ✅ Proyectos completados
- ✅ Opacidad reducida
- ✅ Mismas columnas que detalle

### 3. Resumen Global (Tab 1)

#### Columnas
1. **Categoría** - Nombre de la categoría
2. **No. Proyectos** - Contador centrado
3. **Etapas** - Lista de etapas con conteo
4. **Inversión Total** - Suma de presupuestos estimados
5. **Monto Contratado** - Suma de presupuestos autorizados
6. **Monto Ejercido** - Suma de gastos reales + extraordinarios
7. **Monto por Contratar** - Inversión Total - Contratado
8. **Monto por Ejercer** - Contratado - Ejercido

#### Cálculos
```typescript
Inversión Total = Σ(estimatedBudget) por categoría
Monto Contratado = Σ(authorizedBudget) por categoría
Monto Ejercido = Σ(actualCost + extraordinaryCost) por categoría
Monto por Contratar = Inversión Total - Monto Contratado
Monto por Ejercer = Monto Contratado - Monto Ejercido
```

#### Etapas
- ✅ Conteo por etapa
- ✅ Formato: "Etapa: N"
- ✅ Múltiples etapas por categoría
- ✅ Solo proyectos activos

### 4. Detalle de la Inversión (Tab 2)

#### Filtros
- ✅ **Tipo de Proyecto**: General, Inversión, Gasto
- ✅ **Etapa**: Todas + etapas dinámicas

#### Columnas (12)
1. **Oficio** - Número de oficio
2. **ID Proyecto** - Folio del proyecto
3. **Nombre** - Nombre completo
4. **Tipo** - Inversión o Gasto
5. **Clasificación** - Estratégico/Operacional/Táctico
6. **Fecha Recepción** - Input date editable
7. **Etapa** - Etapa actual
8. **Estatus** - Estado actual
9. **Fecha Estatus** - Fecha del estado (solo lectura)
10. **Importe Est. Por Adjudicar** - Contratado - Ejercido
11. **Importe Adjudicado** - Monto ejercido
12. **Fecha Fallo Adjudicado** - Input date editable

#### Funcionalidades
- ✅ Filtrado reactivo
- ✅ Edición de fechas inline
- ✅ Guardado automático
- ✅ Solo proyectos activos
- ✅ Formato de moneda

### 5. Histórico (Tab 3)

#### Características
- ✅ Alert informativo arriba
- ✅ Solo proyectos completados
- ✅ Todas las columnas en solo lectura
- ✅ Opacidad 75%
- ✅ Sin inputs editables
- ✅ Fechas formateadas

### 6. Exportación a Excel

#### 3 Hojas
1. **Resumen Global** - Tabla de resumen por categoría
2. **Detalle de la inversión** - Proyectos activos
3. **Histórico** - Proyectos completados

#### Formato
- ✅ Nombre: `Estatus_Financiero_DD-MM-YYYY.xlsx`
- ✅ Columnas con headers
- ✅ Fechas formateadas
- ✅ Montos numéricos
- ✅ Etapas como texto

#### Funcionalidades
- ✅ Usa librería XLSX
- ✅ Descarga automática
- ✅ Notificación de éxito/error
- ✅ Deshabilitado sin área

### 7. Integración con Otros Módulos

#### Desde Alta de Proyectos
- ✅ Folio
- ✅ Nombre
- ✅ Tipo (Inversión/Gasto)
- ✅ Clasificación
- ✅ Área
- ✅ Categoría
- ✅ Etapa
- ✅ Estado

#### Desde Costos
- ✅ Presupuesto estimado
- ✅ Presupuesto autorizado
- ✅ Gastos reales
- ✅ Gastos extraordinarios

#### Cálculo de Monto Ejercido
```typescript
Monto Ejercido = 
  Σ(projectCosts.actualCost + projectCosts.extraordinaryCost) +
  Σ(userCosts.actualCost + userCosts.extraordinaryCost) +
  Σ(otherCosts.actualCost + otherCosts.extraordinaryCost)
```

### 8. Persistencia

#### localStorage Keys
- `areas` - Lista de áreas
- `categories` - Lista de categorías
- `projects` - Lista de proyectos
- `costs_[projectId]` - Costos por proyecto

#### Guardado Automático
- ✅ Al editar fechas
- ✅ Actualización en localStorage
- ✅ Actualización en store

## Flujo de Trabajo

1. **Seleccionar Área** → Dropdown en header
2. **Ver Resumen** → Tab 1 con totales
3. **Ver Detalle** → Tab 2 con filtros
4. **Editar Fechas** → Inputs inline
5. **Ver Histórico** → Tab 3 solo lectura
6. **Exportar** → Botón en header

## Tipos

### AreaType
```typescript
{
  id: string
  name: string
}
```

### CategoryType
```typescript
{
  id: string
  name: string
  areaId: string
}
```

### StageType
```typescript
{
  name: string
  count: number
}
```

### GlobalSummaryType
```typescript
{
  category: string
  projectCount: number
  stages: StageType[]
  totalInvestment: number
  contractedAmount: number
  exercisedAmount: number
  toContract: number
  toExercise: number
}
```

### ProjectDetailType
```typescript
{
  oficio: string
  projectId: string
  name: string
  type: 'Inversión' | 'Gasto'
  classification: string
  receptionDate: Date | null
  stage: string
  status: string
  statusDate: Date | null
  estimatedAmountToAward: number
  awardedAmount: number
  awardNoticeDate: Date | null
  isCompleted: boolean
  areaId?: string
  categoryId?: string
}
```

## Store

### Estado
- `selectedArea`: ID del área actual
- `areas`: Lista de áreas
- `categories`: Lista de categorías
- `projectDetails`: Lista de proyectos con detalles
- `projectTypeFilter`: Filtro de tipo
- `stageFilter`: Filtro de etapa

### Acciones
- `setSelectedArea(id)`: Cambiar área
- `setAreas(areas)`: Cargar áreas
- `setCategories(categories)`: Cargar categorías
- `setProjectDetails(details)`: Cargar proyectos
- `setProjectTypeFilter(filter)`: Cambiar filtro tipo
- `setStageFilter(filter)`: Cambiar filtro etapa
- `updateProjectDetail(id, field, value)`: Actualizar proyecto

### Getters
- `filteredCategories`: Categorías del área seleccionada
- `filteredProjects`: Proyectos del área seleccionada
- `activeProjects`: Proyectos activos con filtros
- `completedProjects`: Proyectos completados
- `uniqueStages`: Etapas únicas para filtro

## Composables

### useFinancialActions
- `loadData()`: Cargar desde localStorage
- `globalSummary`: Computed con resumen por categoría
- `formatCurrency(value)`: Formatear a MXN
- `updateProjectDetail(id, field, value)`: Actualizar y guardar
- `exportToExcel()`: Exportar 3 hojas

## Características de UI

### Header
- ✅ Flex justify-between
- ✅ BaseTitle
- ✅ Select bordered
- ✅ Botón primary con icono

### Estado Vacío
- ✅ Card centrado
- ✅ Altura fija
- ✅ Mensaje informativo

### Tabs
- ✅ Tabs bordered de DaisyUI
- ✅ 3 pestañas
- ✅ Tab content con padding
- ✅ Radio inputs nativos

### Tablas
- ✅ Table zebra
- ✅ Hover en filas
- ✅ Min-width en columnas
- ✅ Overflow horizontal
- ✅ Text-right en montos
- ✅ Text-center en contadores

### Inputs de Fecha
- ✅ Input small bordered
- ✅ Type date
- ✅ Width full
- ✅ Change event

### Alert
- ✅ Alert info en histórico
- ✅ Icono material
- ✅ Texto pequeño

## Ruta

La ruta está configurada en `/gestion-de-proyectos/estatus-financiero`

## Formato de Moneda

```typescript
new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN'
}).format(value)
```

Resultado: `$1,234.56`

## Formato de Fecha

```typescript
date.toLocaleDateString('es-MX')
```

Resultado: `22/10/2024`

## Estados Vacíos

### Sin Área Seleccionada
- ✅ Card centrado
- ✅ Mensaje: "Seleccione un área para ver el estatus financiero"

### Sin Datos en Resumen
- ✅ Mensaje: "No hay datos disponibles para esta área"
- ✅ Colspan 8

### Sin Proyectos Activos
- ✅ Mensaje: "No hay proyectos activos"
- ✅ Colspan 12

### Sin Proyectos Completados
- ✅ Mensaje: "No hay proyectos completados"
- ✅ Colspan 12

## Filtros Dinámicos

### Tipo de Proyecto
- General (todos)
- Inversión
- Gasto

### Etapa
- Todas (default)
- + Etapas únicas de proyectos

## Cálculos Automáticos

Todos los cálculos se actualizan automáticamente cuando:
- ✅ Se cambia de área
- ✅ Se aplican filtros
- ✅ Se editan fechas
- ✅ Se cargan datos

Los cálculos son reactivos gracias a `computed` de Vue.

## Ejemplo de Uso

```vue
<script setup lang="ts">
import FinancialStatusView from '@/modules/GestionDeProyectos/EstatusFinanciero/views/FinancialStatusView.vue'
</script>

<template>
  <FinancialStatusView />
</template>
```

## Características Técnicas

- ✅ Estado reactivo con Pinia
- ✅ TypeScript estricto
- ✅ Notificaciones toast
- ✅ Computed para cálculos
- ✅ Getters para filtrado
- ✅ Exportación con XLSX
- ✅ Carga desde localStorage
- ✅ Integración con Costos
- ✅ Tabs nativas de DaisyUI
- ✅ Inputs date editables
- ✅ Formato de moneda MXN
- ✅ Formato de fecha es-MX

## Dependencias de Datos

El módulo requiere que existan:
- ✅ Áreas en localStorage
- ✅ Categorías en localStorage
- ✅ Proyectos en localStorage
- ✅ Costos por proyecto en localStorage

Sin estos datos, las tablas mostrarán estados vacíos.
