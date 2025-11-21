# 📘 Guía del Módulo: Gestión de Talentos

## 📋 Índice
1. [Visión General](#visión-general)
2. [Estructura del Módulo](#estructura-del-módulo)
3. [Componentes Principales](#componentes-principales)
4. [Flujo de Datos](#flujo-de-datos)
5. [Guía de Uso](#guía-de-uso)
6. [Patrones y Convenciones](#patrones-y-convenciones)

---

## 🎯 Visión General

### Propósito
El módulo de **Gestión de Talentos** permite identificar, desarrollar y retener el talento clave de la organización mediante herramientas de evaluación, planificación de sucesión y desarrollo de carrera.

### Funcionalidades Principales
- ✅ **Matriz 9-Box**: Evaluación de potencial vs desempeño
- ✅ **Planes de Sucesión**: Identificación de sucesores para roles críticos
- ✅ **Mapas de Carrera**: Rutas de desarrollo profesional
- ✅ **Análisis de Brechas**: Identificación de gaps de habilidades
- ✅ **PDI (Plan de Desarrollo Individual)**: Planes personalizados de crecimiento

### Tecnologías Utilizadas
- **Vue 3** (Composition API)
- **TypeScript**
- **DaisyUI** + **TailwindCSS**
- **vue-draggable-plus** (Drag & Drop)
- **Material Symbols** (Iconografía)

---

## 📁 Estructura del Módulo

```
GestionTalentos/
├── components/
│   ├── NineBoxGrid.vue           # Matriz 9-Box interactiva
│   ├── NineBoxCell.vue           # Celda reutilizable de la matriz
│   ├── SuccessionPlanList.vue    # Lista de planes de sucesión
│   ├── CareerPathCards.vue       # Mapas de carrera
│   ├── SkillsGapHeatmap.vue      # Mapa de calor de brechas
│   ├── PDIList.vue               # Lista de PDIs activos
│   └── CreatePDIModal.vue        # Modal para crear PDI
├── composables/
│   └── useTalentActions.ts       # Lógica de negocio
├── types/
│   └── talentTypes.ts            # Definiciones TypeScript
├── views/
│   └── TalentManagementView.vue  # Vista principal
└── GUIA_MODULO.md                # Esta guía
```

---

## 🧩 Componentes Principales

### 1. **TalentManagementView.vue**
**Ruta:** `/rrhh/gestion-talentos`

**Descripción:** Vista principal con sistema de tabs para navegar entre las diferentes herramientas de gestión de talento.

**Estado Local:**
- `activeTab`: Tab actualmente seleccionado

---

### 2. **NineBoxGrid.vue**
**Descripción:** Matriz interactiva 9x3 para evaluar empleados según potencial y desempeño con funcionalidad drag & drop.

**Categorías:**
| Categoría | Potencial | Desempeño | Color | Descripción |
|-----------|-----------|-----------|-------|-------------|
| **High Potential** ⭐ | Alto | Alto | Verde | Talento estrella, listo para roles de liderazgo |
| **High Performers** | Medio | Alto | Azul | Expertos técnicos, alto rendimiento |
| **Core Contributors** | Medio | Medio | Gris | Base sólida de la organización |
| **Solid Contributors** | Bajo | Alto | Gris | Especialistas en su rol actual |
| **En Desarrollo** | Alto | Bajo/Medio | Amarillo/Azul | Alto potencial que necesita desarrollo |
| **Bajo Rendimiento** | Bajo | Bajo | Rojo | Requiere plan de mejora o salida |

---

### 3. **NineBoxCell.vue** 🆕
**Descripción:** Componente reutilizable que representa una celda individual de la matriz 9-Box.

**Props:**
```typescript
interface Props {
  modelValue: Employee[]
  title: string
  subtitle: string
  bgColor: string
  borderColor: string
  avatarColor: string
  textColor?: string
}
```

**Ventajas:**
- Reduce ~65% de código repetitivo
- Fácil mantenimiento
- Reutilizable en otros contextos

---

### 4. **SuccessionPlanList.vue**
**Descripción:** Lista de planes de sucesión para roles críticos.

**Niveles de Preparación:**
- 🟢 **Ready Now**: Listo inmediatamente
- 🟡 **Developing**: En desarrollo (1-2 años)
- 🔵 **Future**: Potencial a largo plazo (3+ años)

---

### 5. **CareerPathCards.vue**
**Descripción:** Visualización de rutas de desarrollo profesional.

**Tipos de Movimiento:**
- 📈 **Vertical**: Promoción
- ➡️ **Horizontal**: Cambio de área
- 🔄 **Lateral**: Mismo nivel, diferente rol

---

### 6. **SkillsGapHeatmap.vue**
**Descripción:** Mapa de calor de brechas de habilidades.

**Niveles de Prioridad:**
- 🔴 **High**: Gap ≥ 3 puntos
- 🟡 **Medium**: Gap = 2 puntos
- 🟢 **Low**: Gap ≤ 1 punto

---

### 7. **PDIList.vue**
**Descripción:** Lista de Planes de Desarrollo Individual activos.

**Estados:**
- 🟢 **Active**: En progreso
- ✅ **Completed**: Completado
- ⏳ **Pending**: Pendiente de inicio

---

## 🔄 Flujo de Datos

### Composable: `useTalentActions.ts`

**Funciones Disponibles:**
```typescript
export const useTalentActions = () => {
  const getNineBoxData = async (): Promise<NineBoxGrid>
  const getSuccessionPlans = async (): Promise<SuccessionPlan[]>
  const getCareerPaths = async (): Promise<CareerPath[]>
  const getSkillsGaps = async (): Promise<SkillsGap[]>
  const getPDIs = async (): Promise<PDI[]>
  const createPDI = async (pdi: PDIRequest): Promise<void>
}
```

---

## 📖 Guía de Uso

### Caso de Uso 1: Evaluar Talento con Matriz 9-Box

**Pasos:**
1. Navegar a la pestaña "Matriz 9-Box"
2. Observar la distribución actual de empleados
3. Arrastrar empleados entre celdas según evaluación
4. Identificar empleados en la celda "High Potential" ⭐
5. Crear PDIs para empleados con alto potencial

---

### Caso de Uso 2: Planificar Sucesión

**Pasos:**
1. Navegar a "Planificador de Sucesión"
2. Identificar roles con badge "Rol Crítico"
3. Revisar sucesores y su nivel de preparación
4. Para sucesores "Developing", crear PDI específico

**Mejores Prácticas:**
- Tener al menos 2-3 sucesores por rol crítico
- Balancear entre "Ready Now" y "Future"
- Actualizar planes trimestralmente

---

### Caso de Uso 3: Diseñar Ruta de Carrera

**Pasos:**
1. Navegar a "Mapas de Carrera"
2. Seleccionar rol actual del empleado
3. Revisar posibles siguientes pasos
4. Identificar habilidades requeridas
5. Crear PDI enfocado en cerrar gaps

---

### Caso de Uso 4: Cerrar Brechas de Habilidades

**Pasos:**
1. Navegar a "Brechas de Habilidades"
2. Identificar skills con prioridad "High"
3. Diseñar programa de capacitación
4. Asignar recursos y timeline

---

### Caso de Uso 5: Crear y Monitorear PDI

**Pasos:**
1. Navegar a pestaña "PDI"
2. Click en "Crear PDI"
3. Completar formulario
4. Monitorear progreso regularmente

**Mejores Prácticas:**
- Objetivos SMART
- Revisiones mensuales
- Vincular con evaluaciones de desempeño

---

## 🎨 Patrones y Convenciones

### Estilo de Componentes

**Títulos con Iconos:**
```vue
<h2 class="card-title flex items-center gap-2">
  <span class="material-symbols-outlined">icon_name</span>
  Título del Componente
</h2>
```

**Tabs Lifted:**
```vue
<div role="tablist" class="tabs tabs-lifted mb-6">
  <a role="tab" class="tab" :class="{ 'tab-active': activeTab === 'tab1' }">
    <span class="material-symbols-outlined text-sm mr-2">icon</span>
    Tab Label
  </a>
</div>
```

**Cards Homologados:**
```css
.component-card {
  position: relative;
  background: hsl(var(--b1));
  border-radius: 0.75rem;
  border: 1px solid hsl(var(--bc) / 0.12);
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px -1px rgb(0 0 0 / 0.04);
}

.component-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px -4px rgb(0 0 0 / 0.12);
}
```

---

### Iconos Material Symbols

- `grid_view` - Matriz 9-Box
- `account_tree` - Planificador de Sucesión
- `route` - Mapas de Carrera
- `warning` - Brechas de Habilidades
- `book` - PDI
- `star` - High Potential

---

### Colores y Badges

**Paleta:**
```typescript
'bg-success/10'   // High Potential (verde)
'bg-primary/10'   // High Performers (azul)
'bg-warning/10'   // En Desarrollo (amarillo)
'bg-error/10'     // Bajo Rendimiento (rojo)
'bg-base-200'     // Neutral (gris)
```

---

## 🔧 Troubleshooting

### Drag & Drop no funciona
```typescript
// Verificar grupo
<VueDraggable
  v-model="employees"
  group="nine-box"  // ← Debe ser igual en todas
  :animation="200"
>
```

### Cards muy grandes
```vue
<!-- Usar padding de Tailwind, no card-body -->
<div class="p-3 pb-2">  <!-- ✅ -->
  <h3>Título</h3>
</div>
```

### Datos no se cargan
```typescript
// Verificar manejo de errores
try {
  data.value = await getData()
} catch (error) {
  console.error('Error:', error)
} finally {
  loading.value = false
}
```

---

**Última actualización:** Octubre 28, 2024  
**Versión:** 2.0.0  
**Estado:** ✅ Producción
