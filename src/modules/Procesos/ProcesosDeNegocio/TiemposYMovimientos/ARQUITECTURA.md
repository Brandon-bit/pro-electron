# 🏗️ ARQUITECTURA: Tiempos y Movimientos

## 📊 Análisis del Sistema Original

### Jerarquía de Datos
```
Proceso (seleccionable)
└── Lista de Tiempos/Movimientos (Áreas agregadas al proceso)
    └── Puestos (múltiples por área)
        └── Actividades (con cronómetro individual)
            └── Mediciones (días, tiempos muertos, frecuencia)
```

### Catálogo Separado
```
Áreas (catálogo maestro)
└── Puestos (catálogo maestro)
```

---

## 🎯 Funcionalidades Principales

### 1. CRUD Completo - 4 Niveles

**Nivel 1: Administrar Catálogo (Modal)**
- ✅ Crear/Editar/Eliminar Áreas
- ✅ Crear/Editar/Eliminar Puestos por Área
- ✅ Persistencia en localStorage

**Nivel 2: Agregar Área al Proceso**
- ✅ Seleccionar área del catálogo
- ✅ Seleccionar puestos a monitorear (checkboxes múltiples)
- ✅ Agregar a Lista con datos iniciales

**Nivel 3: Gestión de Puestos**
- ✅ Agregar puestos adicionales a un área
- ✅ Eliminar puestos del área
- ✅ Editar horas de trabajo (hora inicio/fin)
- ✅ Visualizar 5 KPIs calculados automáticamente

**Nivel 4: Gestión de Actividades**
- ✅ Agregar actividades al puesto
- ✅ Eliminar actividades
- ✅ Iniciar/Finalizar cronómetro
- ✅ Editar datos (días, tiempos muertos, frecuencia)

---

## 📐 KPIs y Cálculos

### Por Puesto (5 KPIs)

#### 1. Tiempo Acumulado Total
```typescript
tiempoAcumulado = suma de todos los cronómetros finalizados
Formato: "DDd:HH:mm:ss"
```

#### 2. Tiempos Muertos Total
```typescript
tiemposMuertos = suma de strTiempoMuerto de todas las actividades
Formato: "HH:mm:ss"
```

#### 3. Horas de Trabajo
```typescript
horasTrabajo = horaFin - horaInicio
Formato: "HH:mm"
Editable por modal
```

#### 4. % Operación Laboral
```typescript
operacionLaboral = (tiempoAcumulado / horasTrabajo) * 100

Ejemplo:
tiempoAcumulado = 06:30:00 (6.5 horas)
horasTrabajo = 08:00 (8 horas)
operacionLaboral = (6.5 / 8) * 100 = 81.25%
```

#### 5. % Efectividad Operacional
```typescript
efectividadOperacional = (tiemposMuertos / tiempoAcumulado) * 100

Ejemplo:
tiemposMuertos = 00:45:00 (0.75 horas)
tiempoAcumulado = 06:30:00 (6.5 horas)
efectividadOperacional = (0.75 / 6.5) * 100 = 11.54%

Nota: A MENOR porcentaje, MEJOR efectividad
```

### KPIs Globales (Dashboard)

```typescript
totalAreas = count(Lista)
totalPuestos = suma de puestos en todas las áreas
totalActividades = suma de actividades en todos los puestos
actividadesActivas = count(actividades con cronómetro activo)
promedioEfectividad = promedio de efectividadOperacional de todos los puestos
mayorEfectividad = { puesto, valor }
menorEfectividad = { puesto, valor }
```

---

## 🕐 Sistema de Cronómetros

### Estados del Cronómetro
```typescript
type EstadoCronometro = 'inactivo' | 'activo' | 'finalizado'

inactivo: { activa: false, finalizada: false, Start: null, End: null }
activo: { activa: true, finalizada: false, Start: DateTime, End: null, cronometro: intervalId }
finalizado: { activa: false, finalizada: true, Start: DateTime, End: DateTime, dateDiff: calculado }
```

### Persistencia (localStorage)
```typescript
// Al iniciar cronómetro
1. Guardar Start en actividad
2. Guardar en localStorage
3. Crear setInterval
4. Actualizar UI cada segundo

// Al recargar página
1. Cargar datos de localStorage
2. Para cada actividad activa:
   - Recalcular diff desde Start hasta ahora
   - Reiniciar setInterval
   - Actualizar tiempoAcumulado del puesto

// Al finalizar cronómetro
1. Guardar End en actividad
2. Calcular dateDiff final
3. Limpiar setInterval
4. Sumar a tiempoAcumulado del puesto
5. Guardar en localStorage
```

### Formato de Tiempo
```typescript
// Luxon-like DateTime
interface IDateTime {
  year: number
  month: number
  day: number
  hour: number
  minute: number
  second: number
}

// Diff calculado
interface IDateDiff {
  months: number
  days: number
  hours: number
  minutes: number
  seconds: number
}

// Formato mostrado
"01m 05d 03h 25min 30s"  // Con meses
"05d 03h 25min 30s"      // Sin meses
"03h 25min 30s"          // Sin días
```

---

## 🗂️ Estructura de Archivos Completa

```
TiemposYMovimientos/
├── types/
│   └── tiempos.types.ts ✅ CREADO
│
├── services/
│   └── tiemposServices.ts ✅ CREADO
│       ├── getProcesosService
│       ├── getTablaMovimientosService
│       ├── nuevoAreaService
│       ├── eliminarAreaService
│       ├── agregarPuestoService
│       ├── quitarPuestoService
│       ├── nuevaActividadService
│       ├── quitarActividadService
│       ├── iniciarCronoService
│       ├── finalizarCronoService
│       ├── editarActividadService
│       ├── editarHRTService
│       ├── nuevaAreaAdminService
│       ├── nuevoPuestoAdminService
│       ├── modificarAreaAdminService
│       ├── modificarPuestoAdminService
│       ├── eliminarAreaAdminService
│       └── eliminarPuestoAdminService
│
├── store/
│   └── tiemposStore.ts ⏳ PENDIENTE
│       ├── State: procesos, tabla, isLoading
│       ├── Getters: 
│       │   ├── kpisGlobales (7 KPIs)
│       │   ├── datosGraficaEfectividad
│       │   ├── datosGraficaActividades
│       │   └── puestosConKPIs (calculados)
│       └── Actions:
│           ├── setProcesos, setTabla, setLoading
│           ├── updatePuesto, updateActividad
│           └── recalcularKPIs
│
├── composables/
│   ├── useTiemposActions.ts ⏳ PENDIENTE
│   │   ├── loadProcesos
│   │   ├── loadTabla
│   │   ├── agregarArea, eliminarArea
│   │   ├── agregarPuesto, quitarPuesto
│   │   ├── agregarActividad, quitarActividad
│   │   ├── iniciarCronometro, finalizarCronometro
│   │   ├── editarActividad, editarHorasTrabajo
│   │   └── adminAreas (CRUD completo)
│   │
│   ├── useCronometros.ts ⏳ PENDIENTE
│   │   ├── initCronometro(actividad, puesto)
│   │   ├── stopCronometro(actividad, puesto)
│   │   ├── calcularDiff(start, end?)
│   │   ├── formatearTiempo(diff)
│   │   └── recuperarCronometros() // Al montar
│   │
│   └── useTiemposUtils.ts ⏳ PENDIENTE
│       ├── calcularKPIsPuesto(puesto)
│       ├── calcularTiempoAcumulado(actividades)
│       ├── calcularTiemposMuertos(actividades)
│       ├── calcularOperacionLaboral(tiempo, horas)
│       ├── calcularEfectividad(muertos, acumulado)
│       ├── getColorKPI(valor, tipo)
│       ├── formatearHoras(hh:mm:ss)
│       ├── exportarCSV, exportarExcel, exportarPDF
│       └── validarFormatoTiempo(str)
│
├── components/
│   ├── SelectorProceso.vue ⏳ PENDIENTE
│   │   └── Dropdown simple con lista de procesos
│   │
│   ├── DashboardGlobal.vue ⏳ PENDIENTE
│   │   ├── 7 KPIs en cards
│   │   ├── Gráfica de barras (efectividad por puesto)
│   │   └── Gráfica de pie (distribución actividades)
│   │
│   ├── AdminAreasModal.vue ⏳ PENDIENTE
│   │   ├── Lista de áreas con inputs editables
│   │   ├── Botón agregar área
│   │   ├── Por cada área: lista de puestos
│   │   ├── Botón agregar puesto por área
│   │   └── Botones eliminar (con validación)
│   │
│   ├── AgregarAreaModal.vue ⏳ PENDIENTE
│   │   ├── Selector de área (del catálogo)
│   │   ├── Checkboxes de puestos (múltiple)
│   │   └── Botón agregar
│   │
│   ├── AreaAccordion.vue ⏳ PENDIENTE
│   │   ├── Header con nombre de área
│   │   ├── Botón eliminar área
│   │   ├── Collapse con lista de puestos
│   │   └── Botón agregar puesto
│   │
│   ├── PuestoCard.vue ⏳ PENDIENTE
│   │   ├── Título del puesto
│   │   ├── Botón eliminar puesto
│   │   ├── 5 KPIs en mini-cards
│   │   ├── Botón editar horas trabajo
│   │   ├── TablaActividades (child)
│   │   └── Botón agregar actividad
│   │
│   ├── TablaActividades.vue ⏳ PENDIENTE
│   │   ├── Tabla con 9 columnas
│   │   ├── Botón Iniciar/Finalizar cronómetro
│   │   ├── Input días (editable)
│   │   ├── Display tiempo ejecución (live)
│   │   ├── Input tiempos muertos (hh:mm:ss)
│   │   ├── Select frecuencia
│   │   ├── Display personas
│   │   ├── Display recomendaciones
│   │   └── Botón eliminar actividad
│   │
│   ├── AgregarActividadModal.vue ⏳ PENDIENTE
│   │   ├── Input nombre
│   │   ├── Select personas (1-10)
│   │   ├── Textarea recomendaciones
│   │   └── Botones cancelar/agregar
│   │
│   ├── AgregarPuestoModal.vue ⏳ PENDIENTE
│   │   ├── Select puesto (del catálogo de área)
│   │   └── Botones cancelar/agregar
│   │
│   └── EditarHorasModal.vue ⏳ PENDIENTE
│       ├── Input hora inicio (time)
│       ├── Input hora fin (time)
│       ├── Display horas calculadas
│       └── Botones cancelar/aceptar
│
└── views/
    └── General.vue ⏳ PENDIENTE
        ├── Header con título + selector proceso
        ├── Botones: Agregar, Admin Áreas, Exportar
        ├── DashboardGlobal (si hay datos)
        ├── Accordion de áreas (AreaAccordion)
        └── Estados: loading, empty
```

---

## 🎨 Diseño UX/UI Propuesto

### Layout Principal
```
┌────────────────────────────────────────────────────────┐
│ Tiempos y Movimientos: [Proceso Seleccionado]         │
│ [Selector Proceso ▼]                                   │
├────────────────────────────────────────────────────────┤
│ [➕ Agregar] [⚙️ Admin Áreas] [📊 Exportar CSV] [PDF] │
├────────────────────────────────────────────────────────┤
│ DASHBOARD GLOBAL (si hay datos)                        │
│ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐        │
│ │KPI 1 │ │KPI 2 │ │KPI 3 │ │KPI 4 │ │KPI 5 │        │
│ └──────┘ └──────┘ └──────┘ └──────┘ └──────┘        │
│ ┌─────────────────┐  ┌─────────────────┐             │
│ │ Gráfica Barras  │  │ Gráfica Pie     │             │
│ │ (Efectividad)   │  │ (Actividades)   │             │
│ └─────────────────┘  └─────────────────┘             │
├────────────────────────────────────────────────────────┤
│ ACCORDION ÁREA 1: Producción                [❌]      │
│ ├─ Puesto: Operario de Línea              [❌]       │
│ │  ┌──────────────────────────────────────────┐      │
│ │  │ 5 KPIs: [Tiempo Acum] [Muertos] [Hrs]... │      │
│ │  └──────────────────────────────────────────┘      │
│ │  Tabla Actividades:                                │
│ │  ┌────┬───────┬─────┬────────┬────────┬─────┐     │
│ │  │▶️ │Nombre│Días│Ejecución│Muertos│Frec│...│     │
│ │  ├────┼───────┼─────┼────────┼────────┼─────┤     │
│ │  │⏸️ │Act 1 │ 5  │ 01:23:45│00:15:00│Dia │...│     │
│ │  └────┴───────┴─────┴────────┴────────┴─────┘     │
│ │  [➕ Agregar Actividad]                            │
│ ├─ [➕ Agregar Puesto]                               │
└────────────────────────────────────────────────────────┘
```

### Colores por KPI
```typescript
// Tiempo Acumulado
border-left-primary (azul)

// Tiempos Muertos
border-left-warning (amarillo) si > 30min
border-left-success (verde) si <= 30min

// Horas Trabajo
border-left-info (celeste)

// % Operación Laboral
>= 80%: text-success (verde)
50-79%: text-warning (amarillo)
< 50%: text-error (rojo)

// % Efectividad Operacional (inverso: menor es mejor)
<= 15%: text-success (verde) ✅
16-30%: text-warning (amarillo)
> 30%: text-error (rojo)
```

---

## 🔧 Algoritmos Clave

### Cálculo de Tiempo Acumulado
```typescript
function calcularTiempoAcumulado(actividades: IActividad[]): string {
  let totalSeconds = 0
  
  actividades.forEach(act => {
    if (act.finalizada && act.dateDiff) {
      const seconds = 
        (act.dateDiff.months * 30 * 24 * 3600) +
        (act.dateDiff.days * 24 * 3600) +
        (act.dateDiff.hours * 3600) +
        (act.dateDiff.minutes * 60) +
        act.dateDiff.seconds
      
      totalSeconds += seconds
    }
  })
  
  return formatSecondsToDHMS(totalSeconds)
}
```

### Cálculo de Tiempo en Vivo
```typescript
function calcularDiffVivo(start: IDateTime): IDateDiff {
  const startDate = new Date(
    start.year, start.month - 1, start.day,
    start.hour, start.minute, start.second
  )
  const now = new Date()
  
  const diffMs = now.getTime() - startDate.getTime()
  const diffSeconds = Math.floor(diffMs / 1000)
  
  const months = Math.floor(diffSeconds / (30 * 24 * 3600))
  const days = Math.floor((diffSeconds % (30 * 24 * 3600)) / (24 * 3600))
  const hours = Math.floor((diffSeconds % (24 * 3600)) / 3600)
  const minutes = Math.floor((diffSeconds % 3600) / 60)
  const seconds = diffSeconds % 60
  
  return { months, days, hours, minutes, seconds }
}
```

### Suma de Tiempos Muertos
```typescript
function calcularTiemposMuertos(actividades: IActividad[]): string {
  let totalSeconds = 0
  
  actividades.forEach(act => {
    if (validarFormatoTiempo(act.strTiempoMuerto)) {
      const [hh, mm, ss] = act.strTiempoMuerto.split(':').map(Number)
      totalSeconds += (hh * 3600) + (mm * 60) + ss
    }
  })
  
  return formatSecondsToHMS(totalSeconds)
}
```

---

## 📊 Especificación de Gráficas

### Gráfica 1: Barras - Efectividad por Puesto
```typescript
{
  type: 'bar',
  labels: ['Operario', 'Supervisor', 'Almacenista', ...],
  data: [11.5, 8.3, 15.2, ...], // % efectividad
  colors: [
    verde si <= 15%,
    amarillo si 16-30%,
    rojo si > 30%
  ],
  axis: {
    y: '% Efectividad (menor es mejor)'
  }
}
```

### Gráfica 2: Pie - Distribución Actividades
```typescript
{
  type: 'pie',
  labels: ['Activas', 'Finalizadas', 'Inactivas'],
  data: [5, 20, 3], // count
  colors: ['#4ade80', '#3b82f6', '#94a3b8']
}
```

---

## 🚀 Plan de Implementación

### Fase 1: Store y Composables (Sesión 2)
```
1. Crear tiemposStore.ts
   - State básico
   - Getters para KPIs
   - Actions para mutaciones
   
2. Crear useTiemposActions.ts
   - Conectar con services
   - Manejar errores
   - Toasts
   
3. Crear useCronometros.ts
   - Lógica de start/stop
   - Recuperación desde localStorage
   - Cálculos de diff
   
4. Crear useTiemposUtils.ts
   - Todos los cálculos de KPIs
   - Formateo de tiempos
   - Exportación
```

### Fase 2: Componentes Core (Sesión 2)
```
5. SelectorProceso.vue
6. AreaAccordion.vue
7. PuestoCard.vue (con 5 KPIs)
8. TablaActividades.vue (con cronómetros)
```

### Fase 3: Modales (Sesión 3)
```
9. AdminAreasModal.vue
10. AgregarAreaModal.vue
11. AgregarActividadModal.vue
12. AgregarPuestoModal.vue
13. EditarHorasModal.vue
```

### Fase 4: Dashboard y Vista (Sesión 3)
```
14. DashboardGlobal.vue (con gráficas)
15. General.vue (integración final)
16. Pruebas y ajustes
```

---

## ✅ Estado Actual

**COMPLETADO:**
- ✅ Types (20+ interfaces)
- ✅ Services (20+ endpoints con localStorage)

**PENDIENTE:**
- ⏳ Store Pinia
- ⏳ 3 Composables
- ⏳ 10 Componentes
- ⏳ Vista General
- ⏳ Gráficas

**Estimado:** 3-4 sesiones adicionales para completar todo

---

## 📚 Referencias Técnicas

### Formato de Tiempos
```
HH:mm - Horas de trabajo (08:00)
HH:mm:ss - Tiempos muertos (00:15:30)
DDd:HH:mm:ss - Tiempo acumulado (05d:03:25:30)
```

### Validación Regex
```typescript
const REGEX_HH_MM = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/
const REGEX_HH_MM_SS = /^(0[0-9]|[1-9][0-9]):(0[0-9]|[1-9][0-9]):(0[0-9]|[1-9][0-9])$/
```

### localStorage Keys
```
tiempos_movimientos_data: ITablaMovimientos completa
```

---

**Documentación creada:** Oct 27, 2025  
**Autor:** Migración Vue 2 → Vue 3
