# ⏱️ Tiempos y Movimientos

## 📋 Descripción

Módulo para gestionar y monitorear tiempos y movimientos de procesos de negocio. Permite cronometrar actividades en tiempo real, calcular KPIs automáticamente, y analizar la eficiencia operacional por puesto y área.

---

## 🎯 Objetivo

Medir y optimizar el desempeño laboral mediante:
- ⏱️ Cronómetros en tiempo real por actividad
- 📊 5 KPIs calculados automáticamente por puesto
- 📈 Dashboard global con gráficas visuales
- 💾 Persistencia de datos en localStorage
- 📤 Exportación de resultados

---

## ✅ Estado Actual

### COMPLETADO (30%)
- [x] **types/tiempos.types.ts** - 20+ interfaces TypeScript
- [x] **services/tiemposServices.ts** - 20+ servicios mock con persistencia localStorage
- [x] **ARQUITECTURA.md** - Documentación técnica completa

### PENDIENTE (70%)
- [ ] **store/tiemposStore.ts** - Pinia store con cálculos automáticos
- [ ] **composables/** - 3 composables (actions, cronómetros, utils)
- [ ] **components/** - 10 componentes Vue
- [ ] **views/General.vue** - Vista principal
- [ ] **Gráficas** - Dashboard con Chart.js o similar

---

## 🗂️ Estructura Creada

```
TiemposYMovimientos/
├── types/
│   └── tiempos.types.ts ✅
├── services/
│   └── tiemposServices.ts ✅
├── ARQUITECTURA.md ✅
└── README.md ✅
```

---

## 🚀 Próximos Pasos

### **Sesión 2: Core del Sistema**

1. **Crear Store Pinia** (~500 líneas)
   ```bash
   store/tiemposStore.ts
   ```
   - State: procesos, tabla, loading
   - Getters: KPIs globales, datos gráficas
   - Actions: CRUD y cálculos

2. **Crear Composables** (~800 líneas)
   ```bash
   composables/useTiemposActions.ts     # CRUD operations
   composables/useCronometros.ts        # Timer logic
   composables/useTiemposUtils.ts       # Calculations & export
   ```

3. **Componentes Básicos** (~600 líneas)
   ```bash
   components/SelectorProceso.vue
   components/AreaAccordion.vue
   components/PuestoCard.vue
   components/TablaActividades.vue
   ```

### **Sesión 3: Modales y Dashboard**

4. **Modales** (~800 líneas)
   ```bash
   components/AdminAreasModal.vue
   components/AgregarAreaModal.vue
   components/AgregarActividadModal.vue
   components/AgregarPuestoModal.vue
   components/EditarHorasModal.vue
   ```

5. **Dashboard** (~400 líneas)
   ```bash
   components/DashboardGlobal.vue
   views/General.vue
   ```

---

## 📊 Funcionalidades Clave

### 1. Gestión de Catálogo
```
Modal: Administrar Áreas y Puestos
- Crear/Editar/Eliminar Áreas
- Crear/Editar/Eliminar Puestos por Área
- Validación: No eliminar si está en uso
```

### 2. Cronómetros en Tiempo Real
```
Por cada actividad:
- Botón Iniciar → Guarda Start, inicia setInterval
- Display en vivo → Actualiza cada segundo
- Botón Finalizar → Guarda End, detiene intervalo
- Persistencia → localStorage para recuperar al recargar
```

### 3. 5 KPIs por Puesto
```
1. Tiempo Acumulado Total (suma de cronómetros)
2. Tiempos Muertos Total (suma de inputs)
3. Horas de Trabajo (editable)
4. % Operación Laboral (acumulado/trabajo * 100)
5. % Efectividad Operacional (muertos/acumulado * 100)
```

### 4. Dashboard Global
```
- 7 KPIs estadísticos
- Gráfica de barras: Efectividad por puesto
- Gráfica pie: Distribución de actividades
```

### 5. Exportación
```
- CSV: Tabla completa con todos los datos
- Excel: Similar a CSV (simulado)
- PDF: window.print() optimizado
```

---

## 🎨 Diseño Visual

### Colores por Estado

**KPIs:**
```css
Tiempo Acumulado: border-left-primary (azul)
Tiempos Muertos: border-left-warning (amarillo)
Horas Trabajo: border-left-info (celeste)
```

**% Operación Laboral:**
```css
>= 80%: text-success (verde) ✅
50-79%: text-warning (amarillo) ⚠️
< 50%: text-error (rojo) ❌
```

**% Efectividad Operacional** *(menor es mejor)*:
```css
<= 15%: text-success (verde) ✅
16-30%: text-warning (amarillo) ⚠️
> 30%: text-error (rojo) ❌
```

### Componentes UI
```
- Accordion por área (DaisyUI)
- Cards para KPIs con iconos Material
- Tabla responsive con inputs editables
- Modales limpios y modernos
- Botones con iconos y colores semánticos
- Badges para estados de cronómetro
```

---

## 🔧 Algoritmos Implementados

### Cálculo de Tiempo Acumulado
```typescript
// Suma todos los cronómetros finalizados
actividades
  .filter(a => a.finalizada)
  .map(a => convertToSeconds(a.dateDiff))
  .reduce((sum, s) => sum + s, 0)
  → formatToDHMS(totalSeconds)
```

### Cálculo de Operación Laboral
```typescript
operacionLaboral = (tiempoAcumuladoSeconds / horasTrabajoSeconds) * 100

Ejemplo:
tiempoAcumulado = 6.5 horas = 23400 segundos
horasTrabajo = 8 horas = 28800 segundos
operacionLaboral = (23400 / 28800) * 100 = 81.25%
```

### Cálculo de Efectividad
```typescript
efectividad = (tiemposMuertosSeconds / tiempoAcumuladoSeconds) * 100

Ejemplo:
tiemposMuertos = 45 min = 2700 segundos
tiempoAcumulado = 6.5 horas = 23400 segundos
efectividad = (2700 / 23400) * 100 = 11.54%

Interpretación: 11.54% de tiempo muerto (BUENO si es bajo)
```

---

## 💾 Persistencia de Datos

### localStorage
```typescript
Key: 'tiempos_movimientos_data'

Estructura guardada:
{
  Proceso: { id, nombre },
  Areas: [ { dni, nombre, Puestos: [...] } ],
  Lista: [
    {
      dni, nombre, dniArea,
      Puestos: [
        {
          dni, nombre, horasTrabajo, horaInicio, horaFin,
          Actividades: [
            {
              dni, nombre, dias, strTiempoMuerto,
              activa, finalizada,
              Start: { year, month, day, hour, minute, second },
              End: { ... },
              dateDiff: { months, days, hours, minutes, seconds }
            }
          ]
        }
      ]
    }
  ]
}
```

### Recuperación de Cronómetros
```typescript
Al montar la vista:
1. Cargar datos de localStorage
2. Para cada actividad activa (activa=true, finalizada=false):
   - Calcular diff desde Start hasta ahora
   - Iniciar setInterval para actualizar cada segundo
   - Sumar a tiempoAcumulado del puesto
3. Recalcular todos los KPIs
```

---

## 📚 Servicios Disponibles

### CRUD Tiempos/Movimientos
```typescript
nuevoAreaService(area, puestos[])        // Agregar área al proceso
eliminarAreaService(dniTM)                // Eliminar área
agregarPuestoService(dniTM, dniP)        // Agregar puesto a área
quitarPuestoService(dniTM, dniP)         // Quitar puesto
nuevaActividadService(dniTM, dniP, data) // Nueva actividad
quitarActividadService(dniTM, dniP, dniAct) // Eliminar actividad
```

### Cronómetros
```typescript
iniciarCronoService(dniTM, dniP, dniAct)  // Iniciar cronómetro
finalizarCronoService(dniTM, dniP, dniAct) // Finalizar cronómetro
editarActividadService(dniTM, dniP, dniAct, data) // Editar datos
editarHRTService(dniTM, dniP, horaInicio, horaFin) // Editar horas
```

### Admin Catálogo
```typescript
nuevaAreaAdminService(nombre?)           // Nueva área en catálogo
nuevoPuestoAdminService(dniArea, nombre?) // Nuevo puesto
modificarAreaAdminService(dni, nombre)   // Modificar área
modificarPuestoAdminService(dniArea, dniP, nombre) // Modificar puesto
eliminarAreaAdminService(dni)            // Eliminar área
eliminarPuestoAdminService(dniArea, dniP) // Eliminar puesto
```

---

## 🧪 Ejemplo de Uso

### Flujo Completo
```typescript
// 1. Cargar proceso
await loadProcesos()
await loadTabla(procesoId)

// 2. Administrar catálogo (opcional)
await nuevaAreaAdmin('Producción')
await nuevoPuestoAdmin(1, 'Operario')

// 3. Agregar área al proceso
await nuevoArea(1, [101, 102]) // área 1, puestos 101 y 102

// 4. Agregar actividades
await nuevaActividad(1001, 101, {
  nombre: 'Ensamble',
  personas: 2,
  recomendaciones: 'Revisar proceso'
})

// 5. Cronometrar
await iniciarCrono(1001, 101, 10001)
// ... esperar ...
await finalizarCrono(1001, 101, 10001)

// 6. Los KPIs se calculan automáticamente
// 7. Exportar resultados
exportarCSV(tabla, kpis)
```

---

## 📈 KPIs y Métricas

### Por Puesto
| KPI | Fórmula | Bueno | Regular | Malo |
|-----|---------|-------|---------|------|
| Operación Laboral | (Acum/Trabajo)*100 | ≥80% | 50-79% | <50% |
| Efectividad | (Muertos/Acum)*100 | ≤15% | 16-30% | >30% |

### Globales
- Total Áreas
- Total Puestos
- Total Actividades
- Actividades Activas (en ejecución)
- Promedio Efectividad
- Mayor Efectividad (puesto)
- Menor Efectividad (puesto)

---

## 🎯 Casos de Uso

### Caso 1: Producción
```
Objetivo: Medir eficiencia de operarios
Puestos: Operario Línea 1, Operario Línea 2
Actividades: Ensamble, Inspección, Empaque
KPI clave: % Operación Laboral
Meta: > 85%
```

### Caso 2: Ventas
```
Objetivo: Analizar tiempo en actividades comerciales
Puestos: Ejecutivo Ventas, Gerente Comercial
Actividades: Prospección, Cotización, Cierre
KPI clave: Tiempo Acumulado vs Horas Trabajo
Meta: Optimizar distribución
```

### Caso 3: Logística
```
Objetivo: Reducir tiempos muertos en almacén
Puestos: Almacenista, Chofer
Actividades: Recepción, Picking, Despacho
KPI clave: % Efectividad Operacional
Meta: < 10% tiempos muertos
```

---

## 🚦 Validaciones

### Datos
```typescript
- Horas trabajo: formato HH:mm, máx 24:00
- Tiempos muertos: formato HH:mm:ss
- Días medidos: número entero > 0
- Personas: 1-10
- Frecuencia: 'diario' o 'por evento'
```

### Negocio
```typescript
- No eliminar área si tiene puestos en uso
- No eliminar puesto si tiene actividades
- No iniciar cronómetro si ya está activo
- No finalizar cronómetro si no está activo
```

---

## 🛠️ Tecnologías

- Vue 3 (Composition API)
- TypeScript
- Pinia (State Management)
- DaisyUI + Tailwind CSS
- Material Symbols (Icons)
- Vue Toastification (Notifications)
- Chart.js (Gráficas - pendiente)
- localStorage (Persistencia)

---

## 📝 Notas Importantes

### Diferencias vs Original
1. **Vue 2 → Vue 3**: Composition API, no Options API
2. **Luxon → Date nativo**: Simplificado con Date y cálculos manuales
3. **SweetAlert2 → Modales Vue**: Componentes nativos
4. **Bootstrap → DaisyUI**: Diseño moderno
5. **jQuery → Vue reactivity**: Sin dependencias externas

### Persistencia
- Usa localStorage por defecto
- Al conectar backend real, reemplazar services
- Estructura de datos compatible con API REST

### Performance
- Intervalos limitados a actividades activas
- Limpieza de intervalos al desmontar
- Cálculos memoizados en computed properties
- Lazy loading de componentes pesados

---

## 🎓 Conceptos Clave

### Tiempo Acumulado
Suma del tiempo medido en todas las actividades finalizadas del puesto.

### Tiempos Muertos
Tiempo en que el puesto no está productivo (esperas, interrupciones, etc.)

### Operación Laboral
Porcentaje de la jornada laboral efectivamente utilizado.

### Efectividad Operacional
Porcentaje de tiempo muerto respecto al tiempo total trabajado.
**Nota:** A menor porcentaje, mejor efectividad.

---

## ✅ Checklist de Implementación

**Fase 1 - Core:**
- [ ] tiemposStore.ts
- [ ] useTiemposActions.ts
- [ ] useCronometros.ts
- [ ] useTiemposUtils.ts

**Fase 2 - Componentes:**
- [ ] SelectorProceso.vue
- [ ] AreaAccordion.vue
- [ ] PuestoCard.vue
- [ ] TablaActividades.vue

**Fase 3 - Modales:**
- [ ] AdminAreasModal.vue
- [ ] AgregarAreaModal.vue
- [ ] AgregarActividadModal.vue
- [ ] AgregarPuestoModal.vue
- [ ] EditarHorasModal.vue

**Fase 4 - Vista:**
- [ ] DashboardGlobal.vue
- [ ] General.vue

**Fase 5 - Extras:**
- [ ] Gráficas (Chart.js)
- [ ] Exportación avanzada
- [ ] Pruebas E2E
- [ ] Documentación de usuario

---

## 📞 Soporte

Para continuar la implementación:
1. Revisar **ARQUITECTURA.md** para detalles técnicos
2. Verificar **types/tiempos.types.ts** para interfaces
3. Consultar **services/tiemposServices.ts** para API mock
4. Seguir el plan de implementación por fases

---

**Última actualización:** Oct 27, 2025  
**Estado:** 30% Completado (Foundation Ready)  
**Siguiente paso:** Crear Store y Composables

---

## 🎉 Una vez completado...

Esta será la vista más completa del proyecto con:
- ⏱️ Cronómetros en tiempo real
- 📊 12 KPIs calculados
- 📈 Gráficas interactivas
- 💾 Persistencia total
- 📤 Exportación completa
- 🎨 UI/UX moderna y profesional

**¡Será impresionante!** 🚀
