# Caso de Negocio

Módulo para análisis financiero completo de proyectos con cálculo de KPIs, flujos de efectivo y evaluación de viabilidad económica.

## Estructura del Módulo

```
CasoDeNegocio/
├── components/          # Componentes Vue del módulo
│   ├── KPICards.vue           # Dashboard de KPIs financieros
│   └── ProjectSelector.vue    # Selector de proyecto inicial
├── composables/         # Lógica reutilizable
│   ├── useBusinessCalculations.ts  # Cálculos financieros complejos
│   └── useBusinessActions.ts       # Acciones y persistencia
├── store/               # Estado global con Pinia
│   └── businessCaseStore.ts        # Store con estado complejo
├── types/               # Definiciones de TypeScript
│   └── businessCaseTypes.ts        # Tipos e interfaces
└── views/               # Vistas principales
    └── BusinessCaseView.vue        # Vista principal completa
```

## Características Principales

### 1. Selector de Proyecto

#### Pantalla Inicial
- ✅ BaseTitle con subtítulo
- ✅ Card con selector
- ✅ Select de proyectos
- ✅ Carga desde localStorage o mock

### 2. Dashboard de KPIs (7 Métricas)

#### KPIs Calculados
1. **Valor Total del Proyecto** - Suma de beneficios
2. **Costo Total del Proyecto** - Suma de costos
3. **Valor Neto** - Beneficios - Costos
4. **ROI** - Return on Investment (%)
5. **VAN** - Valor Actual Neto
6. **TIR** - Tasa Interna de Retorno (%)
7. **Periodo de Recuperación** - Años hasta recuperar inversión

#### Colores Dinámicos
- ✅ Verde (primary) para valores positivos
- ✅ Rojo (error) para valores negativos
- ✅ Formato de moneda MXN
- ✅ Formato de porcentaje con 2 decimales

### 3. Supuestos

#### Tasa de Descuento
- ✅ Input numérico
- ✅ Rango: 0-100%
- ✅ Step: 0.1
- ✅ Valor por defecto: 10%

#### Distribución de Beneficios
- ✅ 6 inputs (Año 0 a Año 5)
- ✅ Grid de 6 columnas
- ✅ Validación: suma ≤ 100%
- ✅ Mensaje de error si excede
- ✅ Distribución por defecto: [20, 20, 20, 20, 10, 10]

### 4. Tabla de Beneficios

#### Estructura
- ✅ Columna de nombre
- ✅ 6 columnas de años (0-5)
- ✅ Columna de total calculado
- ✅ Botón eliminar

#### Funcionalidades
- ✅ Agregar beneficio (botón +)
- ✅ Eliminar beneficio (mínimo 1)
- ✅ Input de nombre
- ✅ Inputs numéricos por año
- ✅ Total calculado con distribución aplicada
- ✅ Deshabilitar años después de distribución completa

#### Cálculo de Beneficios Reales
```typescript
realValue = (value * distribution[year]) / 100
```

### 5. Tabla de Costos No Recurrentes

#### Estructura
- ✅ Columna de nombre
- ✅ Columna Año 0 (única)
- ✅ Columna de total
- ✅ Botón eliminar

#### Características
- ✅ Solo aplica en Año 0
- ✅ Agregar costo (botón +)
- ✅ Eliminar costo (mínimo 1)
- ✅ Total en negativo (color error)

### 6. Tabla de Costos Recurrentes

#### Estructura
- ✅ Columna de nombre
- ✅ 6 columnas de años (0-5)
- ✅ Columna de total
- ✅ Botón eliminar

#### Características
- ✅ Agregar costo (botón +)
- ✅ Eliminar costo (mínimo 1)
- ✅ Inputs numéricos por año
- ✅ Total en negativo (color error)

### 7. Tabla Resumen de Flujo de Efectivo

#### Filas (6)
1. **Beneficios Totales** - Suma de beneficios reales
2. **Costos Totales** - Suma de costos (no recurrentes + recurrentes)
3. **Flujo de Efectivo** - Beneficios - Costos (resaltado)
4. **Flujo de Efectivo Acumulado** - Suma acumulada
5. **Descuento de Flujo de Efectivo** - Con tasa de descuento
6. **Descuento de Flujo Acumulado** - VAN acumulado

#### Columnas
- ✅ 6 columnas (Año 0 a Año 5)
- ✅ Colores dinámicos (verde/rojo)
- ✅ Formato de moneda
- ✅ Fila de Flujo de Efectivo con fondo

## Cálculos Financieros

### ROI (Return on Investment)
```typescript
roi = ((totalValue - totalCost) / totalCost) * 100
```

### VAN (Valor Actual Neto)
```typescript
discountFactor = Math.pow(1 + discountRate / 100, year)
discountedCashFlow = cashFlow / discountFactor
npv = sum(discountedCashFlow)
```

### TIR (Tasa Interna de Retorno)
```typescript
// Búsqueda binaria para encontrar tasa donde NPV = 0
// 100 iteraciones
// Rango: -99% a 100%
// Precisión: 0.01
```

### Periodo de Recuperación
```typescript
// Encuentra año donde flujo acumulado >= 0
// Interpolación lineal para precisión decimal
paybackPeriod = year - 1 + interpolation
```

### Flujo de Efectivo
```typescript
cashFlow[year] = benefits[year] - totalCosts[year]
accumulatedCashFlow[year] = accumulatedCashFlow[year-1] + cashFlow[year]
```

## Tipos

### BenefitType
```typescript
{
  id: string
  name: string
  values: number[]  // 6 años
}
```

### CostType
```typescript
{
  id: string
  name: string
  values: number[]  // 6 años
}
```

### YearlyTotalsType
```typescript
{
  benefits: number[]
  nonRecurringCosts: number[]
  recurringCosts: number[]
  totalCosts: number[]
  cashFlow: number[]
  accumulatedCashFlow: number[]
  discountedCashFlow: number[]
  accumulatedDiscountedCashFlow: number[]
}
```

### KPIsType
```typescript
{
  totalValue: number
  totalCost: number
  netValue: number
  roi: number
  npv: number
  irr: number
  paybackPeriod: number
}
```

## Store

### Estado
- `selectedProject`: ID del proyecto
- `projects`: Lista de proyectos
- `discountRate`: Tasa de descuento (%)
- `benefitDistribution`: Array de 6 números (%)
- `benefits`: Array de beneficios
- `nonRecurringCosts`: Array de costos no recurrentes
- `recurringCosts`: Array de costos recurrentes

### Acciones
- `setSelectedProject(id)`: Cambiar proyecto
- `setDiscountRate(rate)`: Actualizar tasa
- `setBenefitDistribution(dist)`: Actualizar distribución
- `addBenefit()`: Agregar beneficio
- `removeBenefit(id)`: Eliminar beneficio
- `updateBenefit(id, field, value)`: Actualizar beneficio
- `addNonRecurringCost()`: Agregar costo no recurrente
- `removeNonRecurringCost(id)`: Eliminar costo
- `updateNonRecurringCost(id, field, value)`: Actualizar costo
- `addRecurringCost()`: Agregar costo recurrente
- `removeRecurringCost(id)`: Eliminar costo
- `updateRecurringCost(id, field, value)`: Actualizar costo

### Getters
- `getProjectName`: Nombre del proyecto seleccionado
- `distributionSum`: Suma de distribución de beneficios
- `distributionValid`: Validación ≤ 100%

## Composables

### useBusinessCalculations
- `lastYearWithDistribution`: Último año con distribución
- `realBenefits`: Beneficios con distribución aplicada
- `yearlyTotals`: Totales por año
- `kpis`: KPIs calculados
- `chartData`: Datos para gráfica (futuro)
- `formatCurrency(value)`: Formato MXN
- `formatPercent(value)`: Formato %
- `getRealBenefitById(id)`: Obtener beneficio real

### useBusinessActions
- `loadProjects()`: Cargar proyectos
- `updateBenefitDistribution(idx, value)`: Actualizar distribución
- `saveBusinessCase()`: Guardar en localStorage
- `loadBusinessCase(projectId)`: Cargar desde localStorage

## Componentes

### KPICards.vue
- ✅ Props: kpis, formatCurrency, formatPercent
- ✅ Grid responsive (2 cols MD, 4 cols LG)
- ✅ Cards con sombra
- ✅ Colores dinámicos
- ✅ Formato de moneda y porcentaje

### ProjectSelector.vue
- ✅ BaseTitle
- ✅ Card con selector
- ✅ Select de proyectos
- ✅ Integrado con store

## Persistencia

### LocalStorage Keys
- `projects`: Lista de proyectos
- `business_case_[projectId]`: Caso de negocio por proyecto

### Estructura Guardada
```typescript
{
  projectId: string
  discountRate: number
  benefitDistribution: number[]
  benefits: BenefitType[]
  nonRecurringCosts: CostType[]
  recurringCosts: CostType[]
  updatedAt: string
}
```

## Flujo de Trabajo

1. **Cargar Proyectos** → onMounted
2. **Seleccionar Proyecto** → Selector
3. **Cargar Caso** → Watch project change
4. **Configurar Supuestos** → Tasa y distribución
5. **Agregar Beneficios** → Tabla dinámica
6. **Agregar Costos** → No recurrentes y recurrentes
7. **Ver KPIs** → Cálculo automático
8. **Ver Resumen** → Tabla de flujos
9. **Guardar** → Botón guardar

## Validaciones

### Distribución de Beneficios
- ✅ Suma no puede exceder 100%
- ✅ Mensaje de error visible
- ✅ Color rojo en total
- ✅ Toast notification al exceder

### Inputs Deshabilitados
- ✅ Años después de distribución completa
- ✅ Visual feedback con disabled

### Eliminación
- ✅ Mínimo 1 beneficio
- ✅ Mínimo 1 costo no recurrente
- ✅ Mínimo 1 costo recurrente
- ✅ Botón deshabilitado cuando es mínimo

## Formato de Datos

### Moneda
```typescript
new Intl.NumberFormat('es-MX', { 
  style: 'currency', 
  currency: 'MXN',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
}).format(value)
```

Resultado: `$1,234`

### Porcentaje
```typescript
`${value.toFixed(2)}%`
```

Resultado: `12.34%`

## Características de UI

### Header
- ✅ BaseTitle con subtítulo dinámico
- ✅ Botón "Guardar" (primary)
- ✅ Botón "Cambiar Proyecto" (outline)
- ✅ Flex justify-between

### Cards
- ✅ Card con sombra
- ✅ Card-body con padding
- ✅ Card-title
- ✅ Overflow-x-auto en tablas

### Tablas
- ✅ Table zebra
- ✅ Hover en filas
- ✅ Headers en negrita
- ✅ Min-width en columnas
- ✅ Text-right en montos
- ✅ Input-sm en celdas

### Botones
- ✅ Btn-primary para agregar
- ✅ Btn-ghost para eliminar
- ✅ Btn-square para iconos
- ✅ Material icons

### Inputs
- ✅ Input-bordered
- ✅ Input-sm en tablas
- ✅ Type="number" con min/max/step
- ✅ Placeholder descriptivo
- ✅ V-model.number para números

## Ruta

La ruta está configurada en `/gestion-de-proyectos/caso-de-negocio`

## Integración

### Con Alta de Proyectos
- ✅ Lee proyectos de localStorage
- ✅ Fallback a mock si no hay datos

### Persistencia
- ✅ Guarda por proyecto
- ✅ Carga automática al seleccionar
- ✅ Notificación de éxito

## Ejemplo de Uso

```vue
<script setup lang="ts">
import BusinessCaseView from '@/modules/GestionDeProyectos/CasoDeNegocio/views/BusinessCaseView.vue'
</script>

<template>
  <BusinessCaseView />
</template>
```

## Características Técnicas

- ✅ Estado reactivo con Pinia
- ✅ TypeScript estricto
- ✅ Computed properties para cálculos
- ✅ Watch para cambios de proyecto
- ✅ Notificaciones toast
- ✅ Validación en tiempo real
- ✅ Persistencia en localStorage
- ✅ Cálculos financieros complejos
- ✅ Búsqueda binaria para TIR
- ✅ Interpolación para payback
- ✅ Formato de moneda y porcentaje
- ✅ Componentes reutilizables
- ✅ Composables para lógica

## Cálculos Avanzados

### Algoritmo TIR
1. Inicializar rango: -99% a 100%
2. Iterar 100 veces
3. Calcular punto medio
4. Evaluar NPV en punto medio
5. Ajustar rango según signo
6. Converger cuando |NPV| < 0.01

### Interpolación Payback
```typescript
if (accumulatedCashFlow[i] >= 0 && accumulatedCashFlow[i-1] < 0) {
  interpolation = abs(accumulatedCashFlow[i-1]) / cashFlow[i]
  paybackPeriod = i - 1 + interpolation
}
```

## Constantes

```typescript
const YEARS = 6  // Año 0 a Año 5
```

## Mock Data

### Proyectos por Defecto
```typescript
[
  { id: '1', name: 'Proyecto Alpha' },
  { id: '2', name: 'Proyecto Beta' },
  { id: '3', name: 'Proyecto Gamma' }
]
```

## Dependencias de Datos

El módulo requiere:
- ✅ Proyectos en localStorage (opcional, usa mock)
- ✅ Caso de negocio guardado (opcional, inicia vacío)

Sin datos guardados, el módulo funciona con valores por defecto.

## Futuras Mejoras

- 📊 Gráfica de punto de equilibrio (Recharts)
- 📊 Gráfica de flujo de efectivo
- 📊 Gráfica de beneficios vs costos
- 📄 Exportación a PDF
- 📄 Exportación a Excel
- 🔄 Comparación de escenarios
- 📈 Análisis de sensibilidad
- 💾 Historial de versiones

## Notas Importantes

- ✅ Todos los cálculos son reactivos
- ✅ Los KPIs se actualizan automáticamente
- ✅ La distribución de beneficios afecta los totales
- ✅ Los costos se muestran en negativo
- ✅ El periodo de recuperación puede ser decimal
- ✅ La TIR usa aproximación numérica
- ✅ El VAN considera la tasa de descuento
