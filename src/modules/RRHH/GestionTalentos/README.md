# 🌟 Gestión de Talentos

Módulo completo para la gestión estratégica del talento organizacional, incluyendo Matriz 9-Box, planes de sucesión, mapas de carrera, análisis de brechas de habilidades y Planes de Desarrollo Individual (PDI).

## 📋 Características Principales

### 1. **Matriz 9-Box con Drag & Drop**
- Grid interactivo 3x3 (Potencial vs Desempeño)
- Drag & drop entre celdas usando `vue-draggable-plus`
- Identificación visual de High Potentials
- Categorización automática de empleados
- 9 categorías: High Potential, High Performers, Core Contributors, etc.

### 2. **Planificador de Sucesión**
- Identificación de roles críticos
- Sucesores listos ahora (ready now)
- Sucesores en desarrollo (1-2 años)
- Indicadores de High Potential
- Scores de evaluación

### 3. **Mapas de Carrera (Career Pathing)**
- Rutas de crecimiento vertical (promociones)
- Rutas de crecimiento lateral (cambios de área)
- Identificación de brechas de habilidades
- Tiempo estimado para cada transición
- Planes de desarrollo asociados

### 4. **Mapa de Calor: Brechas de Habilidades**
- Análisis organizacional de habilidades
- Porcentaje de cobertura por habilidad
- Niveles: Excelente, Bueno, Atención, Crítico
- Visualización tipo heatmap
- Identificación de necesidades de capacitación

### 5. **Planes de Desarrollo Individual (PDI)**
- Creación y seguimiento de PDIs
- Vinculación con brechas identificadas
- Progress tracking con porcentajes
- Fechas de inicio y fin
- Estados: Activo, Completado, Pausado

## 🗂️ Estructura del Módulo

```
src/modules/RRHH/GestionTalentos/
├── components/
│   ├── NineBoxGrid.vue              # Matriz 9-Box con drag & drop
│   ├── SuccessionPlanList.vue       # Lista de planes de sucesión
│   ├── CareerPathCards.vue          # Mapas de carrera
│   ├── SkillsGapHeatmap.vue         # Mapa de calor de brechas
│   ├── PDIList.vue                  # Lista de PDIs
│   └── CreatePDIModal.vue           # Modal para crear/editar PDI
├── composables/
│   └── useTalentActions.ts          # Acciones CRUD y mock data
├── store/
│   └── talentStore.ts               # Store para modal de PDI
├── types/
│   └── talentTypes.ts               # Tipos TypeScript
├── validations/
│   └── pdiValidation.ts             # Validación de formulario PDI
├── views/
│   └── TalentManagementView.vue     # Vista principal con tabs
└── README.md
```

## 🎨 Componentes

### **NineBoxGrid.vue**
Matriz interactiva 9-Box con drag & drop.

**Características:**
- 9 celdas con colores diferenciados
- Drag & drop entre celdas (grupo: "nine-box")
- Avatares con iniciales
- Scores de desempeño
- Animaciones suaves (200ms)

**Categorías:**
- **High Potential** (verde): Alto potencial + Alto desempeño
- **High Performers** (azul): Medio potencial + Alto desempeño
- **Core Contributors** (gris): Medio potencial + Medio desempeño
- **Solid Contributors** (gris): Bajo potencial + Alto desempeño
- **En Desarrollo** (amarillo/azul): Alto potencial + Bajo/Medio desempeño
- **Bajo Rendimiento** (rojo): Bajo potencial + Bajo desempeño

### **SuccessionPlanList.vue**
Lista de planes de sucesión para roles críticos.

**Estructura:**
- Rol crítico + titular actual
- Badge "Rol Crítico"
- Sucesores listos ahora (verde)
- Sucesores en desarrollo (amarillo)
- Indicador de High Potential (estrella)

### **CareerPathCards.vue**
Visualización de rutas de crecimiento profesional.

**Elementos:**
- Rol actual del empleado
- Posibles siguientes pasos
- Tipo de movimiento (vertical/lateral)
- Brechas de habilidades (badges)
- Tiempo estimado
- Botón "Ver Plan de Desarrollo"

### **SkillsGapHeatmap.vue**
Mapa de calor de brechas de habilidades organizacionales.

**Métricas:**
- Nombre de la habilidad
- Porcentaje de cobertura (0-100%)
- Nivel (crítico/warning/good/excellent)
- Empleados con la habilidad / Total
- Colores según nivel

### **PDIList.vue**
Lista de Planes de Desarrollo Individual activos.

**Información:**
- Empleado (avatar + nombre + puesto)
- Competencia a desarrollar
- Acción de desarrollo
- Fechas (inicio y fin)
- Progress bar con porcentaje
- Badge de estado

### **CreatePDIModal.vue**
Modal para crear nuevos PDIs.

**Campos:**
- Empleado (select)
- Competencia a desarrollar
- Acción de desarrollo (textarea)
- Fecha de inicio
- Fecha de fin

## 📊 Tipos TypeScript

```typescript
// Niveles
type PotentialLevel = 'high' | 'medium' | 'low'
type PerformanceLevel = 'high' | 'medium' | 'low'
type SkillLevel = 'critical' | 'warning' | 'good' | 'excellent'
type CareerMoveType = 'vertical' | 'lateral'

// Empleado en 9-Box
interface NineBoxEmployee {
    id: number
    name: string
    position: string
    department: string
    score: number
    potential: PotentialLevel
    performance: PerformanceLevel
}

// Plan de Sucesión
interface SuccessionPlan {
    id: number
    role: string
    currentHolder: string
    isCritical: boolean
    readyNow: Successor[]
    inDevelopment: Successor[]
}

// Mapa de Carrera
interface CareerPath {
    id: number
    currentRole: string
    currentDepartment: string
    nextRoles: NextRole[]
}

// Brecha de Habilidad
interface SkillGap {
    id: number
    skill: string
    coverage: number
    level: SkillLevel
    employeesWithSkill: number
    totalEmployees: number
}

// PDI
interface PDI {
    id: number
    employeeId: number
    employeeName: string
    employeePosition: string
    competency: string
    action: string
    startDate: string
    endDate: string
    progress: number
    status: 'active' | 'completed' | 'paused'
}
```

## 🔧 Composables

### **useTalentActions.ts**

```typescript
const {
    getNineBoxData,        // Obtener datos de matriz 9-Box
    getSuccessionPlans,    // Obtener planes de sucesión
    getCareerPaths,        // Obtener mapas de carrera
    getSkillGaps,          // Obtener brechas de habilidades
    getPDIs,               // Obtener PDIs
    createPDI,             // Crear PDI
    updatePDI,             // Actualizar PDI
    deletePDI,             // Eliminar PDI
    getTalentStats,        // Obtener estadísticas
    getEmployeesForSelect  // Obtener empleados para select
} = useTalentActions()
```

## 🎯 Vista Principal

### **TalentManagementView.vue**

**Estructura:**
1. **Header** con título y botón "Crear Plan de Desarrollo"
2. **Stats Cards** (4 métricas principales)
   - High Potentials
   - En Desarrollo
   - Roles Críticos
   - Brechas Críticas
3. **Tabs** (5 pestañas)
   - Matriz 9-Box
   - Plan de Sucesión
   - Mapas de Carrera
   - Brechas de Habilidades
   - PDI
4. **Contenido del tab activo**
5. **Modal** para crear PDI

## 🚀 Uso

### Navegación
```
/rrhh/gestion-talentos
```

### Crear PDI
```typescript
// Abrir modal
const handleNewPDI = () => {
    talentStore.clearData()
    modalStore.open(talentStore.modalId, {
        type: 'CREATE',
        title: 'Crear Plan de Desarrollo'
    })
}
```

### Drag & Drop en Matriz 9-Box
```vue
<VueDraggable
    v-model="nineBoxData.highPotential.high"
    group="nine-box"
    :animation="200"
>
    <!-- Empleados -->
</VueDraggable>
```

## 📈 Estadísticas

```typescript
interface TalentStats {
    highPotentials: number      // Empleados en top-right 9-Box
    inDevelopment: number       // Empleados con PDI activo
    criticalRoles: number       // Roles con plan de sucesión
    criticalSkillGaps: number   // Habilidades críticas
}
```

## 🎨 Colores y Estilos

### Matriz 9-Box
- **Success** (verde): High Potential
- **Primary** (azul): High Performers, En desarrollo
- **Warning** (amarillo): Bajo desempeño + Alto potencial
- **Error** (rojo): Bajo potencial + Bajo desempeño
- **Base** (gris): Core Contributors, Solid Contributors

### Brechas de Habilidades
- **Excellent** (verde): 75-100%
- **Good** (azul): 50-74%
- **Warning** (amarillo): 25-49%
- **Critical** (rojo): 0-24%

## 🔄 Flujo de Trabajo

1. **Identificar Talento** → Matriz 9-Box
2. **Planificar Sucesión** → Roles críticos + Sucesores
3. **Definir Rutas** → Mapas de carrera
4. **Detectar Brechas** → Análisis de habilidades
5. **Crear PDIs** → Planes de desarrollo
6. **Seguimiento** → Progress tracking

## 📝 Validaciones

### PDI Form
```typescript
pdiSchema = z.object({
    employeeId: z.number().min(1),
    competency: z.string().min(3),
    action: z.string().min(10),
    startDate: z.string().min(1),
    endDate: z.string().min(1)
})
```

## 🔗 Integraciones

- **Gestión de Desempeño**: Scores de evaluación 360°
- **Competencias**: Catálogo de competencias organizacionales
- **Empleados**: Datos de empleados

## 📦 Dependencias

- `vue-draggable-plus`: Drag & drop functionality
- `vee-validate`: Validación de formularios
- `zod`: Schemas de validación
- `pinia`: State management

## 🎯 Roadmap Futuro

- [ ] Exportar matriz 9-Box a PDF
- [ ] Gráficos de tendencias de talento
- [ ] Alertas de sucesión (roles sin sucesor)
- [ ] Recomendaciones automáticas de PDI
- [ ] Integración con LMS (Learning Management System)
- [ ] Dashboard ejecutivo de talento
- [ ] Comparativas año vs año

## 📚 Referencias

- Matriz 9-Box: Metodología GE-McKinsey
- Career Pathing: Modelos de desarrollo profesional
- PDI: Planes de desarrollo basados en competencias

---

**Módulo creado**: Octubre 2024  
**Última actualización**: Octubre 2024  
**Versión**: 1.0.0
