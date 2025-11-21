# 🎁 Módulo de Beneficios y Compensación

Sistema integral de beneficios flexibles, reconocimiento peer-to-peer y gestión de compensaciones basado en desempeño.

## 🌟 Características Principales

### 1. **Marketplace de Beneficios**
- Catálogo de beneficios canjeables por puntos
- 6 categorías: Vacaciones, Capacitación, Salud, Wellness, Financiero, Otros
- Sistema de puntos basado en desempeño
- Disponibilidad en tiempo real
- Canje con confirmación instantánea

### 2. **Reconocimiento Peer-to-Peer**
- Muro social de reconocimientos
- 5 categorías: Trabajo en Equipo, Innovación, Liderazgo, Excelencia, Valores
- Otorgamiento de puntos entre compañeros
- Mensajes personalizados
- Historial completo de reconocimientos

### 3. **Elegibilidad Automática**
- Vinculación con evaluaciones 360°
- Asignación automática según score
- Reportes por rangos de desempeño
- Top 10%, Score ≥ 4.5, Score ≥ 4.0
- Puntos automáticos por nivel

### 4. **Matriz de Equivalencias**
- Mapeo de scores a beneficios
- Configuración flexible de umbrales
- Puntos automáticos por rango
- Beneficios múltiples por nivel
- Actualización en tiempo real

## 📁 Estructura del Módulo

```
Beneficios/
├── components/
│   ├── BenefitCard.vue           # Tarjeta de beneficio
│   ├── RecognitionCard.vue       # Tarjeta de reconocimiento
│   ├── EligibilityCard.vue       # Tarjeta de elegibilidad
│   ├── MatrixCard.vue            # Tarjeta de matriz
│   └── RecognitionModal.vue      # Modal de reconocimiento
├── composables/
│   └── useBenefitsActions.ts     # Lógica de negocio
├── store/
│   └── benefitsStore.ts          # State management
├── types/
│   └── benefitsTypes.ts          # TypeScript types
├── validations/
│   └── benefitsValidation.ts     # Zod schemas
├── views/
│   └── BenefitsView.vue          # Vista principal
├── GUIA_MODULO.md                # Guía completa
└── README.md                     # Este archivo
```

## 🎯 Tipos TypeScript

### Beneficio
```typescript
interface Benefit {
    id: number
    name: string
    description: string
    type: BenefitType
    points: number
    icon: string
    color: string
    status: BenefitStatus
    availableQuantity?: number
}
```

### Reconocimiento
```typescript
interface Recognition {
    id: number
    fromEmployeeId: number
    fromEmployeeName: string
    toEmployeeId: number
    toEmployeeName: string
    category: RecognitionCategory
    message: string
    points: number
    createdAt: string
}
```

### Elegibilidad
```typescript
interface EmployeeEligibility {
    id: number
    employeeId: number
    employeeName: string
    employeePosition: string
    score: number
    performanceRank: string
    eligibleBenefits: string[]
    totalPoints: number
}
```

### Matriz
```typescript
interface BenefitMatrix {
    id: number
    threshold: string
    minScore: number
    benefits: string[]
    autoPoints: number
    color: 'success' | 'primary' | 'secondary' | 'warning'
}
```

## 🔧 Composables

### useBenefitsActions

```typescript
const {
    // Obtener datos
    getBenefitsStats,        // Estadísticas del dashboard
    getMarketplaceBenefits,  // Beneficios disponibles
    getRecognitions,         // Reconocimientos recientes
    getEligibleEmployees,    // Empleados elegibles
    getBenefitMatrix,        // Matriz de equivalencias
    getRedemptions,          // Historial de canjes
    getPointsHistory,        // Historial de puntos
    
    // Acciones
    redeemBenefit,          // Canjear beneficio
    createRecognition,      // Dar reconocimiento
    createBenefit,          // Crear beneficio
    updateBenefit,          // Actualizar beneficio
    deleteBenefit,          // Eliminar beneficio
    configureBenefit,       // Configurar beneficio
    updateBenefitMatrix,    // Actualizar matriz
    
    // Utilidades
    getEmployeesBySearch,   // Buscar empleados
    getRecognitionCategories, // Categorías
    getBenefitTypes         // Tipos de beneficio
} = useBenefitsActions()
```

## 🎨 Componentes Reutilizables

### BenefitCard
Tarjeta para mostrar un beneficio en el marketplace.

**Props:**
- `benefit: Benefit`

**Eventos:**
- `@redeem`: Canjear beneficio

**Uso:**
```vue
<BenefitCard 
    :benefit="benefit" 
    @redeem="handleRedeem" 
/>
```

### RecognitionCard
Tarjeta para mostrar un reconocimiento.

**Props:**
- `recognition: Recognition`

**Uso:**
```vue
<RecognitionCard :recognition="recognition" />
```

### EligibilityCard
Tarjeta de empleado elegible.

**Props:**
- `employee: EmployeeEligibility`

**Eventos:**
- `@view-details`: Ver detalles

**Uso:**
```vue
<EligibilityCard 
    :employee="employee" 
    @view-details="handleViewDetails" 
/>
```

### MatrixCard
Tarjeta de regla de matriz.

**Props:**
- `matrix: BenefitMatrix`

**Eventos:**
- `@edit`: Editar regla

**Uso:**
```vue
<MatrixCard 
    :matrix="matrix" 
    @edit="handleEdit" 
/>
```

## 🚀 Navegación

### Ruta Principal
```
/rrhh/beneficios
```

### Tabs Disponibles
1. **Marketplace** - Catálogo de beneficios
2. **Reconocimiento P2P** - Muro de reconocimientos
3. **Elegibilidad** - Reporte de empleados elegibles
4. **Matriz de Beneficios** - Configuración de equivalencias

## 📊 Estadísticas del Dashboard

```typescript
interface BenefitsStats {
    availablePoints: number        // Puntos disponibles
    activeBenefits: number         // Beneficios activos
    participatingEmployees: number // Empleados participando
    monthlyRecognitions: number    // Reconocimientos del mes
}
```

## 🔗 Integraciones

### Gestión de Desempeño
- **Entrada:** Scores de evaluación 360°
- **Salida:** Puntos y beneficios automáticos
- **Flujo:** Evaluación → Score → Matriz → Asignación

### Gestión de Talentos
- **Entrada:** High Potentials, PDIs
- **Salida:** Puntos bonus, beneficios premium
- **Flujo:** Identificación → Clasificación → Beneficios especiales

## 🎯 Casos de Uso

### 1. Empleado canjea beneficio
```typescript
// Usuario ve sus puntos disponibles
const stats = await getBenefitsStats()

// Explora marketplace
const benefits = await getMarketplaceBenefits()

// Canjea beneficio
await redeemBenefit(benefitId, employeeId)

// Puntos se descuentan automáticamente
```

### 2. Empleado da reconocimiento
```typescript
// Abre modal de reconocimiento
handleOpenRecognitionModal()

// Busca compañero
const employees = await getEmployeesBySearch(query)

// Envía reconocimiento
await createRecognition({
    toEmployeeId: 102,
    category: 'teamwork',
    message: 'Excelente colaboración',
    points: 50
})

// Compañero recibe puntos
```

### 3. RRHH revisa elegibilidad
```typescript
// Obtiene empleados elegibles
const eligible = await getEligibleEmployees()

// Filtra por rango
const top10 = eligible.filter(e => e.performanceRank === 'top10')

// Ve beneficios específicos
const benefits = top10[0].eligibleBenefits
```

### 4. RRHH configura matriz
```typescript
// Obtiene matriz actual
const matrix = await getBenefitMatrix()

// Actualiza regla
await updateBenefitMatrix(matrixId, {
    threshold: 'Top 10% (Score ≥ 4.8)',
    minScore: 4.8,
    benefits: ['Capacitación Ejecutiva', '3 días libres'],
    autoPoints: 1500
})

// Se aplica automáticamente
```

## 🎨 Estilos y Temas

### Colores por Tipo
- **Primary** (Azul): Vacaciones, Capacitación ejecutiva
- **Secondary** (Morado): Cursos, Capacitación
- **Success** (Verde): Salud, Seguro médico
- **Warning** (Amarillo): Wellness, Gimnasio

### Colores por Rango
- **Success** (Verde): Top 10%
- **Primary** (Azul): Top 25%, Score ≥ 4.5
- **Secondary** (Morado): Score ≥ 4.0
- **Warning** (Amarillo): Score ≥ 3.5

## 📦 Dependencias

- `vue`: ^3.x
- `pinia`: State management
- `vee-validate`: Validación de formularios
- `zod`: Schemas de validación
- `@vee-validate/zod`: Integración Vee-Validate + Zod

## 🔧 Configuración

### Store
```typescript
// benefitsStore.ts
export const useBenefitsStore = defineStore('benefits', () => {
    const recognitionModalId = 'recognition-modal'
    const benefitModalId = 'benefit-modal'
    const configModalId = 'config-modal'
    const matrixModalId = 'matrix-modal'
    
    // ... state y actions
})
```

### Validaciones
```typescript
// benefitsValidation.ts
export const recognitionSchema = z.object({
    toEmployeeId: selectValidator('Selecciona un empleado'),
    category: z.enum(['teamwork', 'innovation', 'leadership', 'excellence', 'values']),
    message: stringValidator('El mensaje es requerido', 'Mínimo 10 caracteres', 10),
    points: numberValidator('Los puntos son requeridos', false, 'Mínimo 10 puntos')
})
```

## 📚 Documentación Adicional

- **GUIA_MODULO.md**: Guía completa del módulo
- **benefitsTypes.ts**: Definiciones TypeScript completas
- **useBenefitsActions.ts**: Documentación de funciones

## 🐛 Troubleshooting

### Problema: Puntos no se actualizan
**Solución:** Recargar stats después de cada acción
```typescript
await redeemBenefit(benefitId, employeeId)
await loadStats()
```

### Problema: Modal no se cierra
**Solución:** Cerrar modal y limpiar datos
```typescript
modalStore.close(benefitsStore.recognitionModalId)
resetForm()
benefitsStore.clearRecognitionData()
```

## 🚀 Roadmap

- [ ] Historial de canjes por empleado
- [ ] Notificaciones push
- [ ] Gamificación con badges
- [ ] Exportar reportes a Excel
- [ ] Dashboard ejecutivo de ROI
- [ ] Integración con nómina
- [ ] App móvil

---

**Versión:** 1.0.0  
**Fecha:** Octubre 2024  
**Autor:** Equipo de Desarrollo  
**Estado:** ✅ Producción
