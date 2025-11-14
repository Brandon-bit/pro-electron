# 📊 Metodología de Procesos

## 📋 Descripción

Módulo para gestionar la metodología de implementación de procesos mediante fases predefinidas con actividades y cronómetros persistentes en tiempo real.

---

## 🗂️ Estructura del Módulo

```
MetodologiaDeProcesos/
├── components/
│   ├── SelectProceso.vue          # Selector de proceso nivel 4
│   ├── FaseCard.vue               # Card de fase con actividades y cronómetro
│   ├── AddActividadModal.vue      # Modal agregar actividad
│   └── DeleteActividadModal.vue   # Modal eliminar actividad
├── composables/
│   ├── useMetodologiaActions.ts   # Acciones (CRUD actividades)
│   └── useMetodologiaUtils.ts     # Utilidades (cronómetros, colores, progreso)
├── services/
│   └── metodologiaServices.ts     # Servicios API (mock con persistencia)
├── store/
│   └── metodologiaStore.ts        # Store Pinia
├── types/
│   └── metodologia.types.ts       # Tipos e interfaces
└── views/
    └── General.vue                # Vista principal con scroll horizontal
```

---

## 🎯 Funcionalidades

### ✅ **Fases Predefinidas** (No editables)
- 6 fases estándar: Planificación, Análisis, Diseño, Implementación, Pruebas, Cierre
- Cada fase incluye actividades de ejemplo
- Orden secuencial fijo

### ✅ **Estados de Fase**

| Estado | Color | Descripción | Cronómetro |
|--------|-------|-------------|------------|
| **No Iniciada** | Gris | Sin actividades completadas | "FASE NO INICIADA" |
| **Activa** | Azul | Al menos 1 actividad completada | ⏱️ Tiempo en tiempo real |
| **Finalizada** | Verde | Todas las actividades completadas | ✅ Tiempo total |

### ✅ **Gestión de Actividades**
- Agregar nueva actividad (input modal)
- Marcar como completada (checkbox)
- Eliminar actividad (solo si fase no finalizada)
- Validaciones automáticas

### ✅ **Cronómetros Persistentes**
- Se inicia al completar la primera actividad
- Cuenta en tiempo real (actualización cada segundo)
- **Se mantiene aunque el usuario salga y regrese**
- Se detiene al completar todas las actividades
- Formato: `Meses:Días HH:MM:SS`

### ✅ **Progress Bar por Fase**
- Muestra % de actividades completadas
- Colores dinámicos (info → success)
- Contador visual (ej: 2 / 5 actividades)

### ✅ **Estadísticas Globales**
- Total de fases
- Fases en progreso
- Fases completadas
- Progreso total del proceso

---

## 📦 Data Mock

### **Procesos Disponibles:**
1. Gestión de Compras (ID: 101)
2. Gestión de Ventas (ID: 102)
3. Recursos Humanos (ID: 103)
4. Desarrollo de Software (ID: 104)
5. Marketing Digital (ID: 105)

### **Fases Predefinidas (6 fases):**
1. **Planificación** (3 actividades)
2. **Análisis** (3 actividades)
3. **Diseño** (3 actividades)
4. **Implementación** (3 actividades)
5. **Pruebas** (3 actividades)
6. **Cierre** (3 actividades)

### **Actividades de Ejemplo:**
Cada fase tiene actividades específicas predefinidas. Por ejemplo:
- Planificación: "Definir objetivos", "Identificar stakeholders", "Elaborar plan"
- Análisis: "Recopilar información", "Analizar AS-IS", "Identificar oportunidades"

---

## 🚀 Uso

### **Seleccionar Proceso:**
```typescript
const { selectProceso } = useMetodologiaActions()

await selectProceso({ 
    id: 101, 
    nombre: 'Gestión de Compras' 
})
```

### **Crear Actividad:**
```typescript
const { createActividad } = useMetodologiaActions()

await createActividad({
    dniFase: 101001,
    nombre: 'Nueva actividad',
    dniProc: 101
})
```

### **Finalizar Actividad (Marcar checkbox):**
```typescript
const { finalizarActividad } = useMetodologiaActions()

await finalizarActividad({
    dniFase: 101001,
    dni: 10100101,
    dniProc: 101
})
```

---

## 🎨 Diseño UX/UI

### **Layout:**
```
┌──────────────────────────────────────────────────┐
│  [Título] Metodología    [Selector de Proceso]   │
├──────────────────────────────────────────────────┤
│  Stats: Total | En Progreso | Completadas | %    │
├──────────────────────────────────────────────────┤
│  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐   │
│  │Fase1│→│Fase2│→│Fase3│→│Fase4│→│Fase5│→     │
│  └─────┘  └─────┘  └─────┘  └─────┘  └─────┘   │
│  (Scroll Horizontal con cards)                   │
└──────────────────────────────────────────────────┘
```

### **Card de Fase:**
```
┌──────────────────────┐
│ Badge  Fase 1   Icon │
│ PLANIFICACIÓN        │
├──────────────────────┤
│ Progress: 66%        │
│ ▓▓▓▓▓▓░░░░          │
│ 2 / 3 actividades    │
├──────────────────────┤
│ ☑ Actividad 1   [×]  │
│ ☑ Actividad 2   [×]  │
│ ☐ Actividad 3   [×]  │
├──────────────────────┤
│ [+ Agregar]          │
│ ⏱ 00:15:30          │
│ En progreso          │
└──────────────────────┘
```

### **Colores por Estado:**
- 🟦 **Activa:** Blue gradient
- 🟩 **Finalizada:** Green gradient  
- ⬜ **No iniciada:** Gray

### **Animaciones:**
- Fade in con delay escalonado
- Hover effects en cards
- Progress bar animada
- Pulse en cronómetro activo

---

## ⏱️ Cronómetros

### **Implementación:**
```typescript
const { useCronometro, formatTimeDiff } = useMetodologiaUtils()

const { timeDiff, start } = useCronometro(fase)

onMounted(() => {
    if (fase.activa) {
        start() // Inicia automáticamente
    }
})

// Formato: "0m 5d 02:15:30"
const tiempoFormateado = formatTimeDiff(timeDiff.value)
```

### **Persistencia:**
- Los tiempos Start/End se guardan en ISO string
- Al regresar a la vista, se recalcula desde Start
- Si está finalizada, muestra el tiempo total (End - Start)

---

## 🛠️ Migración desde Vue 2

### **Cambios principales:**
- ✅ Vue 2 → Vue 3 (Composition API)
- ✅ Bootstrap → DaisyUI + Tailwind
- ✅ jQuery → Vue reactivity
- ✅ Luxon.js → Native JavaScript Date
- ✅ SweetAlert2 → Custom Vue modals
- ✅ vue-resource → Fetch API (mock)
- ✅ Global state → Pinia store
- ✅ Inline scripts → Composables

### **Equivalencias:**

| Vue 2 (Viejo) | Vue 3 (Nuevo) |
|---------------|---------------|
| `new Vue({ el, data })` | `defineComponent`, `ref` |
| `this.$http.post()` | `metodologiaServices.create()` |
| `inputSwal2()` | `<AddActividadModal />` |
| `confirmSwal2()` | `<DeleteActividadModal />` |
| `setInterval()` | `useCronometro()` composable |
| luxon.DateTime | Native Date + calculations |

---

## 📝 Notas Técnicas

### **Validaciones:**
- No se puede agregar/eliminar actividades en fases finalizadas
- No se pueden marcar actividades ya completadas
- Checkbox disabled automáticamente

### **Cálculo de Tiempo:**
```typescript
// Tiempo transcurrido
const diffMs = endDate.getTime() - startDate.getTime()

// Conversión a componentes
seconds = Math.floor(diffMs / 1000)
minutes = Math.floor(seconds / 60)
hours = Math.floor(minutes / 60)
days = Math.floor(hours / 24)
months = Math.floor(days / 30)
```

### **Estados de Fase:**
1. **No Iniciada:** `!activa && !finalizada`
2. **Activa:** `activa && !finalizada`
3. **Finalizada:** `finalizada === true`

### **Scroll Horizontal:**
- Cards con min-width fijo (350px)
- Gap de 3rem entre cards
- Scrollbar personalizado con gradient
- Smooth scroll behavior

---

## 🎉 Estado del Módulo

✅ **Completado al 100%**

- [x] Tipos e interfaces
- [x] Servicios mock con persistencia
- [x] Store Pinia
- [x] Composables (actions + utils)
- [x] Componente selector
- [x] Componente FaseCard (complejo)
- [x] 2 modales funcionales
- [x] Vista principal con stats
- [x] Cronómetros en tiempo real
- [x] Progress bars
- [x] Colores dinámicos por estado
- [x] Validaciones
- [x] Animaciones CSS
- [x] Scroll horizontal
- [x] Responsive design

---

## 🔮 Posibles Mejoras Futuras

- [ ] Drag & drop para reordenar actividades
- [ ] Editar nombre de actividad inline
- [ ] Notas/comentarios por actividad
- [ ] Asignar responsables
- [ ] Fechas estimadas vs reales
- [ ] Notificaciones de vencimiento
- [ ] Exportar reporte PDF
- [ ] Comparar tiempos entre procesos
- [ ] Dashboard de métricas
- [ ] Integración con backend real

---

## 👨‍💻 Autor

**Migrado desde:** Vue 2 + Bootstrap + .NET Framework + Luxon  
**Migrado a:** Vue 3 + DaisyUI + Vite + Native JS  
**Fecha:** Oct 2025

---

## 🚦 Pruebas

### **URL:**
```
http://localhost:5173/procesos/procesos-de-negocio/metodologia-de-procesos
```

### **Flujo de Prueba:**

1. **Abre la vista**
2. **Selecciona** "Desarrollo de Software"
3. **Verás 6 fases** en scroll horizontal
4. **Marca checkbox** de primera actividad → Fase se activa, cronómetro inicia
5. **Agrega** nueva actividad con botón "+"
6. **Completa todas** las actividades → Fase se finaliza, cronómetro se detiene
7. **Cierra** el navegador y regresa → Cronómetro persiste
8. **Observa** las estadísticas globales actualizarse

**¡Todo funcional con UI moderna!** 🎊

---

## 📸 Vista Previa

- 📊 Stats cards con iconos
- 🎨 Cards con colores por estado
- ⏱️ Cronómetros animados
- 📈 Progress bars
- ✨ Animaciones suaves
- 📱 Responsive
- 🎯 UX intuitiva
