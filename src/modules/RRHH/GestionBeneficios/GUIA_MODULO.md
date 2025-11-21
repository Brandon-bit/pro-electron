# 📘 Guía del Módulo: Beneficios y Compensación

## 📋 Índice
1. [Visión General](#visión-general)
2. [Estructura del Módulo](#estructura-del-módulo)
3. [Componentes Principales](#componentes-principales)
4. [Flujo de Datos](#flujo-de-datos)
5. [Guía de Uso](#guía-de-uso)
6. [Patrones y Convenciones](#patrones-y-convenciones)
7. [Integración con otros módulos](#integración-con-otros-módulos)

---

## 🎯 Visión General

### Propósito
El módulo de **Beneficios y Compensación** permite gestionar un sistema de beneficios flexibles basado en puntos, reconocimiento peer-to-peer y elegibilidad automática vinculada al desempeño de los empleados.

### Funcionalidades Principales
- ✅ **Marketplace de Beneficios**: Catálogo de beneficios canjeables por puntos
- ✅ **Reconocimiento P2P**: Sistema de reconocimiento entre compañeros
- ✅ **Elegibilidad Automática**: Asignación de beneficios según desempeño
- ✅ **Matriz de Equivalencias**: Mapeo de scores a beneficios automáticos
- ✅ **Sistema de Puntos**: Gestión de puntos ganados y canjeados

### Tecnologías Utilizadas
- **Vue 3** (Composition API)
- **TypeScript**
- **DaisyUI** + **TailwindCSS**
- **Material Symbols** (Iconografía)
- **Vee-Validate** + **Zod** (Validaciones)
- **Pinia** (State Management)

---

## 📁 Estructura del Módulo

```
Beneficios/
├── components/
│   ├── BenefitCard.vue           # Tarjeta de beneficio individual
│   ├── RecognitionCard.vue       # Tarjeta de reconocimiento
│   ├── EligibilityCard.vue       # Tarjeta de empleado elegible
│   ├── MatrixCard.vue            # Tarjeta de matriz de equivalencias
│   └── RecognitionModal.vue      # Modal para dar reconocimiento
├── composables/
│   └── useBenefitsActions.ts     # Lógica de negocio y mock data
├── store/
│   └── benefitsStore.ts          # Store de Pinia para modales
├── types/
│   └── benefitsTypes.ts          # Definiciones TypeScript
├── validations/
│   └── benefitsValidation.ts     # Schemas de validación
├── views/
│   └── BenefitsView.vue          # Vista principal
└── GUIA_MODULO.md                # Esta guía
```

---

## 🧩 Componentes Principales

### 1. **BenefitsView.vue**
**Ruta:** `/rrhh/beneficios`

**Descripción:** Vista principal con sistema de tabs para navegar entre las diferentes funcionalidades del módulo.

**Estado Local:**
- `activeTab`: Tab actualmente seleccionado
- `stats`: Estadísticas del dashboard
- `benefits`: Lista de beneficios del marketplace
- `recognitions`: Lista de reconocimientos
- `eligibleEmployees`: Empleados elegibles
- `benefitMatrix`: Matriz de equivalencias

**Tabs:**
1. **Marketplace**: Catálogo de beneficios canjeables
2. **Reconocimiento P2P**: Muro de reconocimientos
3. **Elegibilidad**: Reporte de empleados elegibles
4. **Matriz de Beneficios**: Configuración de equivalencias

---

### 2. **BenefitCard.vue**
**Descripción:** Componente reutilizable para mostrar un beneficio en el marketplace.

**Props:**
```typescript
interface Props {
  benefit: Benefit
}
```

**Eventos:**
- `redeem`: Emitido cuando se canjea un beneficio

**Características:**
- Icono personalizado por tipo de beneficio
- Badge con puntos requeridos
- Cantidad disponible
- Botón de canje con hover effect

---

### 3. **RecognitionCard.vue**
**Descripción:** Tarjeta para mostrar un reconocimiento peer-to-peer.

**Props:**
```typescript
interface Props {
  recognition: Recognition
}
```

**Características:**
- Avatar con inicial del empleado
- Badge de categoría (Trabajo en Equipo, Innovación, etc.)
- Mensaje de reconocimiento
- Puntos otorgados
- Timestamp relativo (hace X horas/días)

---

### 4. **EligibilityCard.vue**
**Descripción:** Muestra información de elegibilidad de un empleado.

**Props:**
```typescript
interface Props {
  employee: EmployeeEligibility
}
```

**Eventos:**
- `viewDetails`: Ver detalles de elegibilidad

**Características:**
- Score de desempeño
- Rango de performance (Top 10%, Score ≥ 4.5, etc.)
- Puntos disponibles
- Cantidad de beneficios elegibles
- Badge con color según rango

---

### 5. **MatrixCard.vue**
**Descripción:** Tarjeta para mostrar una regla de la matriz de equivalencias.

**Props:**
```typescript
interface Props {
  matrix: BenefitMatrix
}
```

**Eventos:**
- `edit`: Editar regla de matriz

**Características:**
- Umbral de score
- Beneficios automáticos
- Puntos automáticos
- Badge con color según nivel

---

### 6. **RecognitionModal.vue**
**Descripción:** Modal para dar reconocimiento a un compañero.

**Campos del Formulario:**
- Empleado a reconocer (búsqueda con autocomplete)
- Categoría de reconocimiento
- Mensaje
- Puntos a otorgar

**Validaciones:**
- Empleado requerido
- Categoría válida
- Mensaje mínimo 10 caracteres
- Puntos mínimo 10

---

## 🔄 Flujo de Datos

### Composable: `useBenefitsActions.ts`

**Funciones Disponibles:**
```typescript
export const useBenefitsActions = () => {
  const getBenefitsStats = async (): Promise<BenefitsStats>
  const getMarketplaceBenefits = async (): Promise<Benefit[]>
  const getRecognitions = async (): Promise<Recognition[]>
  const getEligibleEmployees = async (): Promise<EmployeeEligibility[]>
  const getBenefitMatrix = async (): Promise<BenefitMatrix[]>
  const getRedemptions = async (): Promise<BenefitRedemption[]>
  const redeemBenefit = async (benefitId: number, employeeId: number)
  const createRecognition = async (data: RecognitionFormDTO)
  const createBenefit = async (data: BenefitFormDTO)
  const updateBenefit = async (id: number, data: BenefitFormDTO)
  const deleteBenefit = async (id: number)
  const configureBenefit = async (data: BenefitConfigFormDTO)
  const updateBenefitMatrix = async (id: number, data: BenefitMatrixFormDTO)
  const getEmployeesBySearch = async (query: string, limit: number, page: number)
  const getRecognitionCategories = (): SelectOptionDTO[]
  const getBenefitTypes = (): SelectOptionDTO[]
  const getPointsHistory = async (employeeId: number): Promise<PointsHistory[]>
}
```

---

## 📖 Guía de Uso

### Caso de Uso 1: Canjear Beneficio

**Pasos:**
1. Navegar a la pestaña "Marketplace"
2. Ver puntos disponibles en el banner superior
3. Explorar beneficios disponibles
4. Click en "Canjear" en el beneficio deseado
5. Confirmar canje (se descuentan puntos)

**Reglas de Negocio:**
- El empleado debe tener suficientes puntos
- El beneficio debe estar activo
- Debe haber cantidad disponible (si aplica)

---

### Caso de Uso 2: Dar Reconocimiento P2P

**Pasos:**
1. Click en "Dar Reconocimiento" (header o tab)
2. Buscar empleado a reconocer
3. Seleccionar categoría (Trabajo en Equipo, Innovación, etc.)
4. Escribir mensaje personalizado
5. Asignar puntos (mínimo 10)
6. Enviar reconocimiento

**Impacto:**
- El empleado reconocido recibe puntos
- Se publica en el muro de reconocimientos
- Se actualiza el contador mensual

---

### Caso de Uso 3: Revisar Elegibilidad

**Pasos:**
1. Navegar a "Elegibilidad"
2. Ver resumen por rangos (Top 10%, Score ≥ 4.5, etc.)
3. Revisar lista de empleados elegibles
4. Ver detalles de beneficios específicos por empleado

**Criterios de Elegibilidad:**
- Basado en score de evaluación 360°
- Vinculado a matriz de equivalencias
- Actualización automática con cada evaluación

---

### Caso de Uso 4: Configurar Matriz de Beneficios

**Pasos:**
1. Navegar a "Matriz de Beneficios"
2. Revisar reglas actuales
3. Click en "Editar" en una regla
4. Modificar umbral, beneficios o puntos
5. Guardar cambios

**Ejemplo de Reglas:**
- Top 10% (Score ≥ 4.8) → Capacitación Ejecutiva + 1500 puntos
- Score ≥ 4.5 → 2 días libres + Vale despensa + 800 puntos
- Score ≥ 4.0 → Bono wellness + Curso online + 500 puntos

---

## 🎨 Patrones y Convenciones

### Estilo de Componentes

**Tarjetas con Hover Effect:**
```css
.component-card {
  background: hsl(var(--b1));
  border-radius: 0.75rem;
  border: 1px solid hsl(var(--bc) / 0.12);
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px -1px rgb(0 0 0 / 0.04);
}

.component-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px -4px rgb(0 0 0 / 0.12);
}
```

**Stats Cards:**
```vue
<div class="stat-card">
  <div class="stat-icon-wrapper bg-primary/10">
    <span class="material-symbols-outlined text-primary">icon</span>
  </div>
  <div class="stat-content">
    <h3 class="stat-label">Label</h3>
    <div class="stat-value text-primary">Value</div>
    <p class="stat-description">Description</p>
  </div>
</div>
```

---

### Iconos Material Symbols

- `shopping_cart` - Marketplace
- `workspace_premium` - Reconocimiento
- `verified` - Elegibilidad
- `table_chart` - Matriz
- `stars` - Puntos
- `card_giftcard` - Beneficios
- `groups` - Empleados
- `emoji_events` - Trofeo/Logros

---

### Colores y Badges

**Paleta por Tipo de Beneficio:**
```typescript
'primary'   // Vacaciones, Capacitación ejecutiva
'secondary' // Cursos, Capacitación
'success'   // Salud, Seguro médico
'warning'   // Wellness, Gimnasio
'info'      // Información general
```

**Colores por Rango de Desempeño:**
```typescript
'success'   // Top 10%
'primary'   // Top 25%, Score ≥ 4.5
'secondary' // Score ≥ 4.0
'warning'   // Score ≥ 3.5
```

---

## 🔗 Integración con otros módulos

### Gestión de Desempeño
**Relación:** Los scores de evaluación 360° determinan la elegibilidad automática.

**Flujo:**
1. Se completa evaluación de desempeño
2. Se calcula score final
3. Sistema verifica matriz de equivalencias
4. Se asignan puntos y beneficios automáticamente

---

### Gestión de Talentos
**Relación:** Los High Potentials y empleados en PDI pueden recibir beneficios adicionales.

**Flujo:**
1. Empleado identificado como High Potential
2. Se otorgan puntos bonus
3. Acceso a beneficios premium (Capacitación Ejecutiva)

---

## 📊 Tipos de Beneficios

### Categorías Disponibles

| Tipo | Descripción | Ejemplos |
|------|-------------|----------|
| **Vacaciones** | Días libres adicionales | 2 días extra, 1 semana adicional |
| **Capacitación** | Cursos y formación | MBA, Diplomado, Curso de idiomas |
| **Salud** | Seguros y cobertura médica | Seguro médico plus, Dental |
| **Wellness** | Bienestar físico/mental | Gimnasio, Yoga, Terapia |
| **Financiero** | Bonos y vales | Vale despensa, Bono navideño |
| **Otro** | Beneficios diversos | Estacionamiento, Home office |

---

## 🎯 Categorías de Reconocimiento

1. **Trabajo en Equipo** 🤝
   - Colaboración excepcional
   - Apoyo a compañeros
   - Sinergia de equipo

2. **Innovación** 💡
   - Ideas disruptivas
   - Mejora de procesos
   - Soluciones creativas

3. **Liderazgo** 👑
   - Guía efectiva
   - Inspiración al equipo
   - Toma de decisiones

4. **Excelencia** ⭐
   - Calidad superior
   - Atención al detalle
   - Superación de expectativas

5. **Valores** ❤️
   - Integridad
   - Compromiso
   - Ética profesional

---

## 🔧 Troubleshooting

### Problema: Puntos no se actualizan después de canje

**Solución:**
```typescript
// Recargar stats después de canje
await redeemBenefit(benefitId, employeeId)
await loadStats() // ← Importante
```

---

### Problema: Búsqueda de empleados no funciona

**Verificar:**
1. Query mínimo 1 carácter
2. Debounce de 300ms configurado
3. Scroll infinito para paginación

```typescript
watch(employeeValue, (query) => {
  if (timeout.value) clearTimeout(timeout.value)
  timeout.value = setTimeout(async () => {
    await searchEmployees(currentPage.value)
  }, 300)
})
```

---

### Problema: Modal no se cierra después de submit

**Solución:**
```typescript
const onSubmit = handleSubmit(async (formValues) => {
  await createRecognition(formValues)
  modalStore.close(benefitsStore.recognitionModalId) // ← Cerrar modal
  resetForm() // ← Limpiar formulario
  benefitsStore.clearRecognitionData() // ← Limpiar store
})
```

---

## 📈 Métricas del Dashboard

```typescript
interface BenefitsStats {
  availablePoints: number        // Puntos disponibles del usuario
  activeBenefits: number         // Beneficios activos en marketplace
  participatingEmployees: number // Empleados en el programa
  monthlyRecognitions: number    // Reconocimientos del mes
}
```

---

## 🚀 Roadmap Futuro

- [ ] Historial de canjes por empleado
- [ ] Notificaciones push de nuevos beneficios
- [ ] Gamificación con niveles y badges
- [ ] Exportar reporte de elegibilidad a Excel
- [ ] Dashboard ejecutivo de ROI de beneficios
- [ ] Integración con nómina
- [ ] App móvil para canjear beneficios
- [ ] Sistema de referidos con puntos

---

## 📚 Referencias

- **Beneficios Flexibles**: Modelo de compensación total
- **Reconocimiento P2P**: Cultura de apreciación
- **Puntos por Desempeño**: Gamificación en RRHH

---

**Módulo creado**: Octubre 2024  
**Última actualización**: Octubre 2024  
**Versión**: 1.0.0  
**Estado**: ✅ Producción
