# Análisis de Pareto

Módulo para análisis de Pareto (Regla 80/20) con gráfica combinada de barras y línea usando ApexCharts.

## Estructura del Módulo

```
AnalisisDePareto/
├── components/          # Componentes Vue del módulo
│   ├── ParetoChart.vue            # Gráfica de Pareto con ApexCharts
│   └── DataTable.vue              # Tabla de datos con formulario
├── composables/         # Lógica reutilizable
│   └── useParetoActions.ts        # Acciones y helpers
├── store/               # Estado global con Pinia
│   └── paretoStore.ts             # Store con datos y cálculos
├── types/               # Definiciones de TypeScript
│   └── paretoTypes.ts             # Tipos e interfaces
└── views/               # Vistas principales
    └── ParetoView.vue             # Vista principal
```

## Características Principales

### 1. Gráfica de Pareto (ApexCharts)

#### Gráfica Combinada
- ✅ Barras para frecuencia (eje Y izquierdo)
- ✅ Línea para porcentaje acumulado (eje Y derecho)
- ✅ Dos ejes Y independientes
- ✅ Grid con líneas punteadas
- ✅ Tooltip compartido
- ✅ Leyenda en la parte superior
- ✅ Etiquetas rotadas en eje X
- ✅ Click en barras para filtrar

#### Características de la Gráfica
- ✅ Responsive (100% width)
- ✅ Altura fija de 400px
- ✅ Toolbar con opciones de zoom/descarga
- ✅ Colores personalizados (primary y destructive)
- ✅ Puntos destacados en la línea
- ✅ Cursor pointer en barras
- ✅ Re-render automático al cambiar datos

#### Interactividad
- ✅ Click en barra selecciona categoría
- ✅ Muestra información de categoría seleccionada
- ✅ Notificación al seleccionar
- ✅ Área destacada con bg-info/10

### 2. Tabla de Datos

#### Formulario de Entrada
- ✅ Grid de 4 columnas
- ✅ Input para Categoría
- ✅ Input numérico para Frecuencia
- ✅ Input numérico para Costo
- ✅ Botón "Agregar" con icono
- ✅ Fondo bg-base-200
- ✅ Validación de campos

#### Tabla de Datos
- ✅ 6 columnas
- ✅ Tabla zebra (DaisyUI)
- ✅ Formato de moneda para costo
- ✅ Porcentajes con 1 decimal
- ✅ % Acumulado en negrita
- ✅ Botón eliminar por fila
- ✅ Scroll horizontal

#### BaseTable
- ✅ Sin paginación (`:paged-table="false"`)
- ✅ Columnas definidas con `ColumnDef<T>`
- ✅ Cells renderizadas con `h()`
- ✅ Empty state automático
- ✅ Estilos consistentes por fila
- ✅ Scroll horizontal

### 3. Cálculos Automáticos

#### Algoritmo de Pareto
1. **Ordenar** - Por frecuencia descendente
2. **Calcular Total** - Suma de todas las frecuencias
3. **Calcular Porcentaje** - (frecuencia / total) * 100
4. **Calcular Acumulado** - Suma acumulativa de porcentajes
5. **Redondear** - 1 decimal para porcentajes

#### Características
- ✅ Re-cálculo automático al agregar
- ✅ Re-cálculo automático al eliminar
- ✅ Ordenamiento automático
- ✅ Porcentajes siempre suman 100%

## Tipos

### ParetoDataType
```typescript
{
  category: string
  frequency: number
  cost: number
  percentage: number
  cumulativePercentage: number
}
```

### RawParetoDataType
```typescript
{
  category: string
  frequency: number
  cost: number
}
```

### NewParetoEntryType
```typescript
{
  category: string
  frequency: string
  cost: string
}
```

## Store

### Estado
- `data`: Array de datos de Pareto
- `selectedCategory`: Categoría seleccionada (null por defecto)

### Acciones
- `setData(data)`: Establecer datos
- `calculateParetoData(rawData)`: Calcular porcentajes y acumulados
- `addData(category, frequency, cost)`: Agregar dato
- `deleteData(category)`: Eliminar dato
- `setSelectedCategory(category)`: Seleccionar categoría

### Algoritmo calculateParetoData
```typescript
1. Ordenar por frecuencia descendente
2. Calcular total de frecuencias
3. Para cada item:
   - Calcular percentage = (frequency / total) * 100
   - Acumular percentage
   - Redondear a 1 decimal
4. Retornar array con porcentajes calculados
```

## Composables

### useParetoActions
- `loadData()`: Cargar desde localStorage
- `saveData()`: Guardar en localStorage
- `handleAddData(category, frequency, cost)`: Agregar con validación
- `handleDeleteData(category)`: Eliminar con notificación
- `handleBarClick(category)`: Seleccionar categoría

## Componentes

### ParetoChart.vue
- ✅ ApexCharts integrado
- ✅ Gráfica combinada (barras + línea)
- ✅ Dos ejes Y
- ✅ Click en barras
- ✅ Información de categoría seleccionada
- ✅ Re-render con chartKey
- ✅ Watch para actualizar

### DataTable.vue
- ✅ Formulario de entrada
- ✅ Grid 4 columnas
- ✅ **BaseTable integrado** (sin paginación)
- ✅ 6 columnas definidas con ColumnDef
- ✅ Botón eliminar con h()
- ✅ Formato de moneda
- ✅ Validación de campos

### ParetoView.vue
- ✅ Header con botón guardar
- ✅ ParetoChart
- ✅ DataTable
- ✅ Carga automática al montar

## Configuración de ApexCharts

### Chart Options
```typescript
{
  chart: {
    type: 'line',
    height: 400,
    stacked: false,
    toolbar: { show: true },
    events: { dataPointSelection: handler }
  },
  plotOptions: {
    bar: {
      columnWidth: '50%',
      dataLabels: { position: 'top' }
    }
  },
  dataLabels: { enabled: false },
  stroke: {
    width: [0, 3],
    curve: 'smooth'
  },
  xaxis: {
    categories: [...],
    labels: {
      rotate: -45,
      rotateAlways: true
    }
  },
  yaxis: [
    { title: 'Frecuencia' },
    { opposite: true, title: '% Acumulado', min: 0, max: 100 }
  ],
  tooltip: { shared: true, intersect: false },
  legend: { position: 'top', horizontalAlign: 'left' },
  colors: ['#570DF8', '#F87272'],
  grid: { borderColor: '#e7e7e7', strokeDashArray: 3 }
}
```

### Series
```typescript
[
  {
    name: 'Frecuencia',
    type: 'column',
    data: [45, 32, 28, 15, 6]
  },
  {
    name: '% Acumulado',
    type: 'line',
    data: [35.7, 61.1, 83.3, 95.2, 100]
  }
]
```

## Flujo de Trabajo

1. **Cargar Datos** → Desde localStorage al montar
2. **Ver Gráfica** → Barras + línea de Pareto
3. **Click en Barra** → Seleccionar categoría
4. **Ver Información** → Área destacada con categoría
5. **Agregar Dato** → Formulario con 3 campos
6. **Validar** → Todos los campos requeridos
7. **Re-calcular** → Porcentajes y acumulados
8. **Actualizar Gráfica** → Re-render automático
9. **Eliminar Dato** → Botón en tabla
10. **Guardar** → A localStorage

## Persistencia

### LocalStorage Key
- `paretoData`: Array de datos de Pareto

### Estructura Guardada
```typescript
[
  {
    category: string,
    frequency: number,
    cost: number,
    percentage: number,
    cumulativePercentage: number
  }
]
```

## Características de UI

### Header
- ✅ BaseTitle con icono bar_chart
- ✅ Subtítulo: "Regla 80/20 - Identifica las causas vitales"
- ✅ Botón "Guardar" (outline)
- ✅ Flex justify-between

### Gráfica
- ✅ Card con sombra
- ✅ Título: "Diagrama de Pareto"
- ✅ Descripción explicativa
- ✅ ApexCharts responsive
- ✅ Altura 400px
- ✅ Área de categoría seleccionada

### Tabla
- ✅ Card con sombra
- ✅ Título: "Tabla de Datos"
- ✅ Descripción: "Datos ordenados por frecuencia descendente"
- ✅ Formulario en bg-base-200
- ✅ Tabla zebra
- ✅ Botones con iconos

## Ruta

La ruta está configurada en `/diagramas-de-decision/analisis-de-pareto`

## Integración

### Con Proyectos
- ✅ Puede asociar a proyecto (futuro)
- ✅ Independiente por ahora

### Persistencia
- ✅ Guarda en localStorage
- ✅ Carga automática al montar
- ✅ Notificación al guardar
- ✅ Notificación al agregar
- ✅ Notificación al eliminar
- ✅ Notificación al seleccionar

## Ejemplo de Uso

```vue
<script setup lang="ts">
import ParetoView from '@/modules/DiagramasDeDecision/AnalisisDePareto/views/ParetoView.vue'
</script>

<template>
  <ParetoView />
</template>
```

## Características Técnicas

- ✅ Estado reactivo con Pinia
- ✅ TypeScript estricto
- ✅ Computed properties para gráfica
- ✅ Watch para re-render
- ✅ Notificaciones toast
- ✅ Persistencia en localStorage
- ✅ **ApexCharts integrado**
- ✅ **Gráfica combinada (barras + línea)**
- ✅ **Dos ejes Y independientes**
- ✅ **BaseTable sin paginación**
- ✅ **ColumnDef con TanStack Table**
- ✅ Click en barras
- ✅ Cálculos automáticos
- ✅ Ordenamiento automático
- ✅ Validación de campos
- ✅ Formato de moneda
- ✅ Material icons
- ✅ DaisyUI styling
- ✅ Responsive design

## Validaciones

### Formulario de Entrada
- ✅ Categoría requerida
- ✅ Frecuencia requerida (número)
- ✅ Costo requerido (número)
- ✅ Notificación de error si falta campo
- ✅ Reset al agregar exitosamente

### Cálculos
- ✅ Ordenamiento automático por frecuencia
- ✅ Porcentajes siempre suman 100%
- ✅ Redondeo a 1 decimal
- ✅ Re-cálculo al agregar/eliminar

## Datos de Ejemplo

### Datos por Defecto
```typescript
[
  { 
    category: 'Retraso por Aprobaciones', 
    frequency: 45, 
    cost: 125000, 
    percentage: 35.7, 
    cumulativePercentage: 35.7 
  },
  { 
    category: 'Falta de Recursos', 
    frequency: 32, 
    cost: 85000, 
    percentage: 25.4, 
    cumulativePercentage: 61.1 
  },
  { 
    category: 'Cambios de Alcance', 
    frequency: 28, 
    cost: 70000, 
    percentage: 22.2, 
    cumulativePercentage: 83.3 
  },
  { 
    category: 'Problemas Técnicos', 
    frequency: 15, 
    cost: 35000, 
    percentage: 11.9, 
    cumulativePercentage: 95.2 
  },
  { 
    category: 'Otros', 
    frequency: 6, 
    cost: 12000, 
    percentage: 4.8, 
    cumulativePercentage: 100 
  }
]
```

## Regla 80/20

### Principio de Pareto
- **80%** de los efectos provienen del **20%** de las causas
- Identifica las "causas vitales" vs "triviales"
- Prioriza acciones en las categorías más impactantes

### Interpretación de la Gráfica
- **Barras altas** = Causas más frecuentes
- **Línea ascendente** = Acumulado de contribución
- **Punto 80%** = Identifica el 20% de causas vitales
- **Categorías a la izquierda** = Mayor prioridad

## Columnas de la Tabla

1. **Categoría** - Nombre de la causa/problema
2. **Frecuencia** - Número de ocurrencias
3. **Costo** - Costo asociado (formato moneda)
4. **% Contribución** - Porcentaje individual
5. **% Acumulado** - Porcentaje acumulado (negrita)
6. **Acciones** - Botón eliminar

## Interacción con la Gráfica

### Click en Barra
1. Usuario hace click en una barra
2. Se captura el índice del dato
3. Se obtiene la categoría
4. Se actualiza `selectedCategory` en el store
5. Se muestra área destacada debajo de la gráfica
6. Se muestra notificación info

### Área de Categoría Seleccionada
- ✅ Fondo bg-info/10
- ✅ Border info
- ✅ Texto: "Categoría seleccionada: [nombre]"
- ✅ Subtexto: "Los incidentes asociados se mostrarían filtrados aquí"
- ✅ Condicional (v-if)

## Futuras Mejoras

- 📄 Exportación a PDF/Excel
- 📄 Línea de referencia 80%
- 🔄 Filtrado de incidentes por categoría
- 📧 Compartir análisis por email
- 👥 Análisis por proyecto
- 📅 Análisis por período
- 🔔 Alertas de categorías críticas
- 📈 Dashboard de tendencias
- 💬 Comentarios por categoría
- 📎 Adjuntar evidencias
- 🔄 Comparación temporal
- 📊 Métricas de mejora

## Notas Importantes

- ✅ Los datos se ordenan automáticamente por frecuencia
- ✅ Los porcentajes se calculan automáticamente
- ✅ El acumulado siempre llega a 100%
- ✅ La gráfica se actualiza automáticamente
- ✅ El click en barras es interactivo
- ✅ Los datos se guardan en localStorage
- ✅ La validación previene datos incompletos
- ✅ El formato de moneda usa toLocaleString()
- ✅ Los porcentajes tienen 1 decimal
- ✅ La gráfica usa ApexCharts
- ✅ Dos ejes Y independientes
- ✅ Colores personalizados de DaisyUI

## Dependencias

### ApexCharts
- **Paquete**: `apexcharts` (^5.3.5)
- **Vue Wrapper**: `vue3-apexcharts`
- **Tipo de Gráfica**: Combinada (line + column)
- **Características**: Responsive, interactiva, exportable

### Instalación
```bash
npm install apexcharts vue3-apexcharts
```

### Uso en Componente
```vue
<script setup lang="ts">
import VueApexCharts from 'vue3-apexcharts'
</script>

<template>
  <VueApexCharts
    type="line"
    height="400"
    :options="chartOptions"
    :series="series"
  />
</template>
```

## Configuración Avanzada

### Dos Ejes Y
```typescript
yaxis: [
  {
    // Eje izquierdo para frecuencia
    title: { text: 'Frecuencia' },
    labels: { formatter: (val) => val.toFixed(0) }
  },
  {
    // Eje derecho para porcentaje
    opposite: true,
    title: { text: '% Acumulado' },
    min: 0,
    max: 100,
    labels: { formatter: (val) => val.toFixed(1) + '%' }
  }
]
```

### Series Combinadas
```typescript
series: [
  {
    name: 'Frecuencia',
    type: 'column',  // Barras
    data: [...]
  },
  {
    name: '% Acumulado',
    type: 'line',    // Línea
    data: [...]
  }
]
```

### Eventos
```typescript
events: {
  dataPointSelection: (event, chartContext, config) => {
    const category = data[config.dataPointIndex]?.category
    handleBarClick(category)
  }
}
```

## Formato de Datos

### Entrada del Usuario
```typescript
{
  category: "Defecto de Material",
  frequency: "45",  // String del input
  cost: "125000"    // String del input
}
```

### Después del Cálculo
```typescript
{
  category: "Defecto de Material",
  frequency: 45,
  cost: 125000,
  percentage: 35.7,
  cumulativePercentage: 35.7
}
```

## Estilos Personalizados

### Colores
- **Barras**: `#570DF8` (primary de DaisyUI)
- **Línea**: `#F87272` (destructive/error)
- **Grid**: `#e7e7e7` (gris claro)
- **Categoría seleccionada**: bg-info/10

### Tipografía
- **Título gráfica**: card-title
- **Descripción**: text-sm opacity-70
- **Etiquetas**: fontSize 12px, rotate -45deg
- **% Acumulado**: font-bold

## Testing

### Casos de Prueba
1. ✅ Agregar dato con todos los campos
2. ✅ Agregar dato sin campos (error)
3. ✅ Eliminar dato
4. ✅ Click en barra
5. ✅ Guardar datos
6. ✅ Cargar datos
7. ✅ Cálculo de porcentajes
8. ✅ Ordenamiento automático
9. ✅ Re-render de gráfica
10. ✅ Formato de moneda

## Accesibilidad

- ✅ Labels en formulario
- ✅ Placeholder descriptivos
- ✅ Botones con iconos y texto
- ✅ Colores con buen contraste
- ✅ Tooltip en gráfica
- ✅ Leyenda descriptiva
