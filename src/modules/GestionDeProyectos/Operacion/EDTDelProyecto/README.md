# EDT - Estructura de Desglose del Trabajo

## 📋 Descripción General

El módulo EDT (Estructura de Desglose del Trabajo) permite crear y gestionar la estructura jerárquica de un proyecto mediante un árbol visual interactivo. Utiliza **VueFlow** para renderizar el diagrama y soporta operaciones CRUD completas para etapas, actividades y sub-actividades.

## 🏗️ Arquitectura del Módulo

### Estructura de Carpetas

```
EDTDelProyecto/
├── components/          # Componentes Vue
│   ├── StageModal.vue           # Modal para Etapas (CREATE/EDIT/DELETE)
│   ├── ActivityModal.vue        # Modal para Actividades (CREATE/EDIT/DELETE)
│   ├── SubActivityModal.vue     # Modal para Sub-actividades (CREATE/EDIT/DELETE)
│   ├── AddEditStageForm.vue     # Formulario de Etapa
│   ├── AddEditActivityForm.vue  # Formulario de Actividad
│   ├── AddEditSubActivityForm.vue # Formulario de Sub-actividad
│   ├── DeleteStage.vue          # Confirmación de eliminación de Etapa
│   ├── DeleteActivity.vue       # Confirmación de eliminación de Actividad
│   ├── DeleteSubActivity.vue    # Confirmación de eliminación de Sub-actividad
│   └── EDTTree.vue              # Árbol visual con VueFlow
├── composables/         # Lógica reutilizable
│   ├── useEDTActions.ts         # Acciones CRUD y notificaciones
│   └── mappingEDTData.ts        # Conversión API ↔ Frontend
├── services/            # Servicios de API
│   └── edtService.ts            # Llamadas HTTP al backend
├── store/               # Estado global con Pinia
│   └── edtStore.ts              # Store del árbol EDT
├── types/               # Definiciones de TypeScript
│   └── edtTypes.ts              # Tipos e interfaces
├── validations/         # Esquemas de validación
│   └── edtValidation.ts         # Validación con Zod + vee-validate
└── views/               # Vistas principales
    └── EDTView.vue              # Vista principal del módulo
```

## 🎯 Características Principales

### 1. Jerarquía de 4 Niveles

```
Nivel 0: Iniciativa (Proyecto) - Nodo raíz
    ├── Nivel 1: Etapas (Stages)
    │   ├── Nivel 2: Actividades (Activities)
    │   │   └── Nivel 3: Sub-actividades (SubActivities)
```

### 2. Operaciones CRUD Completas

- **CREATE**: Agregar nuevos elementos en cada nivel
- **READ**: Visualización del árbol completo
- **UPDATE**: Editar elementos existentes
- **DELETE**: Eliminar elementos (con cascada en hijos)

### 3. Validaciones Inteligentes

- **PSN (Project Structure Number)**: Debe ser único dentro del mismo nivel padre
- **PSN > 0**: No se permiten valores 0 o negativos
- **Validación en tiempo real**: Con `vee-validate` y `Zod`
- **Mensajes de error**: Solo se muestran después de interacción del usuario

### 4. Visualización con VueFlow

- **Diagrama interactivo**: Árbol visual tipo organigrama
- **Nodos personalizados**: Diferentes estilos por nivel
- **Botones de acción**: Aparecen en hover sobre cada nodo
- **Layout automático**: Algoritmo de árbol jerárquico
- **Responsive**: Se adapta al tamaño de la pantalla

## 🔄 Flujo de Datos Completo

### 1. Carga Inicial

```typescript
// EDTView.vue - onMounted
onMounted(async () => {
    await loadInitiatives()  // Carga lista de iniciativas desde API
})
```

**Proceso:**
1. Se llama a `edtService.getInitiativesOptionsService()`
2. El backend devuelve: `{ dni: number, label: string }[]`
3. Se almacena en `edtStore.initiativesOptions`
4. Se renderiza el dropdown de iniciativas

### 2. Selección de Iniciativa

```typescript
// EDTView.vue - computed
const selectedInitiativeId = computed({
    get: () => edtStore.selectedInitiative?.dni || null,
    set: async (value: number | null) => {
        if (value) {
            await loadEDT(value)  // Carga el EDT completo
        }
    }
})
```

**Proceso:**
1. Usuario selecciona una iniciativa del dropdown
2. Se llama a `edtService.getEDTService(dniInitiative)`
3. El backend devuelve la estructura completa:
```typescript
{
    dniIniciativa: number
    nombre: string
    etapas: [
        {
            dni: number
            nombre: string
            psn: number
            activo: boolean
            actividades: [
                {
                    dni: number
                    nombre: string
                    psn: number
                    dias: number
                    activo: boolean
                    subActividades: [...]
                }
            ]
        }
    ]
}
```
4. Se convierte a estructura de árbol con `convertirEDTResponseAArbol()`
5. Se almacena en `edtStore.edtRoot` y `edtStore.edtRawData`

### 3. Renderizado del Árbol

```typescript
// EDTTree.vue - computed
const { nodes, edges } = computed(() => {
    if (!edtStore.edtRoot) return { nodes: [], edges: [] }
    return buildNodesAndEdges(edtStore.edtRoot)
})
```

**Proceso:**
1. Se recorre el árbol recursivamente
2. Se crea un nodo VueFlow por cada elemento
3. Se calculan posiciones con algoritmo de layout jerárquico
4. Se crean edges (conexiones) entre nodos padre-hijo
5. VueFlow renderiza el diagrama

## 🔧 Operaciones CRUD Detalladas

### CREATE - Agregar Elemento

#### Flujo Completo (Ejemplo: Agregar Etapa)

```typescript
// 1. Usuario hace clic en botón "+" del nodo raíz
handleAddStage() {
    edtStore.setStage()  // Limpia selectedStage (null)
    modalStore.open(edtStore.stageModalId, { 
        type: 'CREATE', 
        title: 'Agregar Etapa' 
    })
}

// 2. Modal se abre y resetea el formulario
watch(
    () => modalStore.modals[edtStore.stageModalId]?.status,
    (isOpen) => {
        if (isOpen && !edtStore.selectedStage) {
            // Modal en modo CREATE - resetear formulario
            resetForm({ values: { name: '', psn: 1, active: true } })
        }
    }
)

// 3. Usuario llena el formulario y hace submit
const onSubmit = async () => {
    await handleSubmit(async (formValues) => {
        const success = await createStage(formValues)
        if (success) {
            edtStore.clearStage()
            modalStore.close(edtStore.stageModalId)
        }
    })()
}

// 4. Se envía al backend
async addStage(data: { name: string; psn: number; active: boolean }) {
    const response = await edtService.addStageService({
        dniIniciativa: this.selectedInitiative.dni,
        nombre: data.name,
        psn: data.psn,
        activo: data.active
    })
    
    if (response.success) {
        await this.loadEDT(this.selectedInitiative.dni)  // Recarga el árbol
        return true
    }
}
```

**Puntos Clave:**
- `setStage()` sin parámetros establece `selectedStage = null` (modo CREATE)
- El watch del modal detecta la apertura y resetea el formulario
- Después de crear, se recarga todo el EDT para reflejar cambios
- Las notificaciones se muestran automáticamente

### UPDATE - Editar Elemento

#### Flujo Completo (Ejemplo: Editar Actividad)

```typescript
// 1. Usuario hace clic en botón "editar" del nodo
handleEditActivity(id: string, stageId: string, data: any) {
    const dni = extractDniFromId(id)
    const dniStage = extractDniFromId(stageId)
    
    edtStore.setActivity({
        dni,
        dniStage,
        name: data.label,
        psn: data.psn || 0,
        days: data.days || 1,
        active: data.active ?? true
    })
    
    modalStore.open(edtStore.activityModalId, { 
        type: 'EDIT', 
        title: 'Editar Actividad' 
    })
}

// 2. Modal se abre y carga los datos existentes
watch(
    () => edtStore.selectedActivity,
    (activity) => {
        if (activity) {
            setValues({
                name: activity.name,
                psn: activity.psn,
                days: activity.days,
                active: activity.active
            })
        }
    },
    { immediate: true }
)

// 3. Usuario modifica y hace submit
const onSubmit = async () => {
    await handleSubmit(async (formValues) => {
        if (!edtStore.selectedActivity) return
        const success = await updateActivity(
            `actividad-${edtStore.selectedActivity.dni}`,
            edtStore.selectedActivity.dniStage,
            formValues
        )
        if (success) {
            edtStore.clearActivity()
            modalStore.close(edtStore.activityModalId)
        }
    })()
}
```

**Puntos Clave:**
- `setActivity(data)` con parámetros establece `selectedActivity = data` (modo EDIT)
- El watch detecta el cambio y carga los datos en el formulario
- La validación de PSN excluye el elemento actual al verificar duplicados
- Después de editar, se recarga el EDT completo

### DELETE - Eliminar Elemento

#### Flujo Completo (Ejemplo: Eliminar Sub-actividad)

```typescript
// 1. Usuario hace clic en botón "eliminar" del nodo
handleDeleteSubActivity(id: string, activityId: string, data: any) {
    const dni = extractDniFromId(id)
    const dniActivity = extractDniFromId(activityId)
    
    edtStore.setSubActivity({
        dni,
        dniActivity,
        name: data.label,
        active: data.active ?? true
    })
    
    modalStore.open(edtStore.subactivityModalId, { 
        type: 'DELETE', 
        title: 'Eliminar Sub-actividad' 
    })
}

// 2. Modal muestra confirmación
<template>
    <p class="text-center">
        ¿Estás seguro de que deseas eliminar la sub-actividad
        <span class="!font-semibold"> "{{ edtStore.selectedSubActivity?.name }}" ? </span>
    </p>
</template>

// 3. Usuario confirma
const onSubmit = async () => {
    if (!edtStore.selectedSubActivity) return
    const success = await deleteSubActivity(
        `subactividad-${edtStore.selectedSubActivity.dni}`
    )
    if (success) {
        edtStore.clearSubActivity()
        modalStore.close(edtStore.subactivityModalId)
    }
}
```

**Puntos Clave:**
- No requiere validación de formulario (solo confirmación)
- El backend elimina en cascada (si aplica)
- Después de eliminar, se recarga el EDT completo
- Notificación de éxito automática

## 🎨 Sistema de Modales

### Arquitectura de Modales

Cada modal (Stage, Activity, SubActivity) sigue el mismo patrón:

```typescript
const modalMap = {
    CREATE: {
        component: AddEditStageForm,
        action: createStage
    },
    EDIT: {
        component: AddEditStageForm,
        action: updateStage
    },
    DELETE: {
        component: DeleteStage,
        action: deleteStage
    }
}

const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[edtStore.stageModalId]?.type
    return modalMap[modalType as keyof typeof modalMap]?.component
})
```

**Ventajas:**
- Un solo modal maneja CREATE, EDIT y DELETE
- El componente se renderiza dinámicamente según el tipo
- Reutilización de lógica de formulario
- Fácil mantenimiento

### Reset de Formularios

**Problema:** Al abrir el modal para crear después de haber creado/editado, el formulario mantenía datos anteriores.

**Solución:** Doble watch

```typescript
// Watch 1: Detecta cambios en selectedStage
watch(() => edtStore.selectedStage, (stage) => {
    if (stage) {
        setValues({ ...stage })  // EDIT mode
    } else {
        resetForm({ values: { name: '', psn: 1, active: true } })  // CREATE mode
    }
}, { immediate: true })

// Watch 2: Detecta apertura del modal
watch(() => modalStore.modals[edtStore.stageModalId]?.status, (isOpen) => {
    if (isOpen && !edtStore.selectedStage) {
        // Modal abierto en CREATE - forzar reset
        resetForm({ values: { name: '', psn: 1, active: true } })
    }
})
```

## ✅ Sistema de Validación

### Esquemas Zod

```typescript
// stageSchema
export const stageSchema = z.object({
    name: stringValidator('El nombre es obligatorio', 'El nombre debe tener al menos 3 caracteres', 3),
    psn: z.number({ required_error: 'El PSN es obligatorio' })
        .min(1, 'El PSN debe ser mayor a 0'),
    active: z.boolean().default(true),
}).superRefine((data, ctx) => {
    const edtStore = useEDTStore()
    
    // Validar PSN único
    if (!edtStore.edtRawData?.etapas) return
    
    const psnExists = edtStore.edtRawData.etapas.some(etapa => {
        // Excluir etapa actual en modo EDIT
        if (edtStore.selectedStage && etapa.dni === edtStore.selectedStage.dni) return false
        return etapa.psn === data.psn
    })
    
    if (psnExists) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'El PSN ya existe en otra etapa',
            path: ['psn']
        })
    }
})
```

### Validación de PSN para Actividades

```typescript
// activitySchema - superRefine
let dniParentStage: number | null = null

if (edtStore.selectedActivity) {
    // Modo EDIT: usar dniStage de la actividad seleccionada
    dniParentStage = edtStore.selectedActivity.dniStage
} else if (edtStore.parentContext?.type === 'stage') {
    // Modo CREATE: usar dni del contexto padre
    dniParentStage = edtStore.parentContext.dni
}

if (!dniParentStage) return

// Buscar la etapa padre
const parentStage = edtStore.edtRawData.etapas.find(e => e.dni === dniParentStage)
if (!parentStage?.actividades) return

// Verificar PSN único dentro de la misma etapa
const psnExists = parentStage.actividades.some(activity => {
    if (edtStore.selectedActivity && activity.dni === edtStore.selectedActivity.dni) return false
    return activity.psn === data.psn
})
```

**Puntos Clave:**
- PSN debe ser único **dentro del mismo padre**
- En modo EDIT, se excluye el elemento actual de la validación
- En modo CREATE, se usa `parentContext` para saber el padre
- La validación es reactiva (se ejecuta en cada cambio)

### Mostrar Errores Solo Después de Interacción

```vue
<!-- BaseFormInput.vue -->
<span v-if="errorMessage && meta.touched" class="text-sm text-error">
    {{ errorMessage }}
</span>
```

**Lógica:**
- `meta.touched`: `true` después de que el usuario interactúa con el campo
- Los errores no se muestran al abrir el modal
- Los errores aparecen después de:
  - Hacer blur en el campo
  - Intentar submit del formulario
  - Cambiar el valor del campo

## 🗂️ Gestión de Estado (Pinia Store)

### Estado Principal

```typescript
state: () => ({
    // Initiatives
    initiativesOptions: [] as InitiativeOptionType[],
    selectedInitiative: null as InitiativeOptionType | null,
    
    // EDT Data
    edtRoot: null as EDTNodeType | null,           // Árbol para renderizado
    edtRawData: null as EDTResponseType | null,    // Datos crudos de API
    
    // Loading & Errors
    isLoading: false,
    error: null as string | null,
    
    // Selected items for modals
    selectedStage: null as SelectedStageType | null,
    selectedActivity: null as SelectedActivityType | null,
    selectedSubActivity: null as SelectedSubActivityType | null,
    
    // Modal IDs
    stageModalId: 'stage-modal',
    activityModalId: 'activity-modal',
    subactivityModalId: 'subactivity-modal',
    
    // Parent context for adding new items
    parentContext: null as { id: string; dni: number; type: 'initiative' | 'stage' | 'activity' } | null
})
```

### Acciones Principales

#### Carga de Datos
```typescript
loadInitiativeOptions()  // Carga lista de iniciativas
loadEDT(dniInitiative)   // Carga EDT completo de una iniciativa
```

#### Gestión de Etapas
```typescript
setStage(stage?)         // Establece etapa seleccionada (null = CREATE)
clearStage()             // Limpia etapa seleccionada
addStage(data)           // Crea nueva etapa
putStage(dni, data)      // Actualiza etapa existente
deleteStage(dni)         // Elimina etapa
```

#### Gestión de Actividades
```typescript
setActivity(activity?)   // Establece actividad seleccionada
clearActivity()          // Limpia actividad seleccionada
addActivity(dniStage, data)        // Crea nueva actividad
putActivity(dni, dniStage, data)   // Actualiza actividad
deleteActivity(dni)                // Elimina actividad
```

#### Gestión de Sub-actividades
```typescript
setSubActivity(subActivity?)       // Establece sub-actividad seleccionada
clearSubActivity()                 // Limpia sub-actividad seleccionada
addSubActivity(dniActivity, data)  // Crea nueva sub-actividad
putSubActivity(dni, dniActivity, data)  // Actualiza sub-actividad
deleteSubActivity(dni)             // Elimina sub-actividad
```

### Flujo de parentContext

El `parentContext` es crucial para saber dónde agregar nuevos elementos:

```typescript
// Al agregar actividad a una etapa
handleAddActivity(stageId: string) {
    const dniStage = extractDniFromId(stageId)
    edtStore.setActivity()  // null
    edtStore.parentContext = { 
        id: stageId, 
        dni: dniStage, 
        type: 'stage'  // ← Indica que el padre es una etapa
    }
    modalStore.open(edtStore.activityModalId, { type: 'CREATE', title: 'Agregar Actividad' })
}
```

Esto permite que la validación de PSN sepa en qué nivel buscar duplicados.

## 📡 API Endpoints

### Iniciativas
```
GET /gestion-de-proyectos/edt/iniciativas-opciones
Response: InitiativeOptionType[]
```

### EDT Completo
```
GET /gestion-de-proyectos/edt/{dniIniciativa}
Response: EDTResponseType
```

### Etapas
```
POST /gestion-de-proyectos/edt/agregar-etapa
Body: { dniIniciativa, nombre, psn, activo }
Response: StageResponseType

PUT /gestion-de-proyectos/edt/actualizar-etapa
Body: { dni, dniIniciativa, nombre, psn, activo }
Response: boolean

DELETE /gestion-de-proyectos/edt/eliminar-etapa/{dni}
Response: { totalItems: number }
```

### Actividades
```
POST /gestion-de-proyectos/edt/agregar-actividad
Body: { dniIniciativaEtapa, nombre, psn, dias, activo }
Response: ActivityResponseType

PUT /gestion-de-proyectos/edt/actualizar-actividad
Body: { dni, dniIniciativaEtapa, nombre, psn, dias, activo }
Response: boolean

DELETE /gestion-de-proyectos/edt/eliminar-actividad/{dni}
Response: { totalItems: number }
```

### Sub-actividades
```
POST /gestion-de-proyectos/edt/agregar-sub-actividad
Body: { dniIniciativaActividad, nombre, activo }
Response: SubActivityResponseType

PUT /gestion-de-proyectos/edt/actualizar-sub-actividad
Body: { dni, dniIniciativaActividad, nombre, activo }
Response: boolean

DELETE /gestion-de-proyectos/edt/eliminar-sub-actividad/{dni}
Response: { totalItems: number }
```

## 🔄 Mapeo de Datos (mappingEDTData.ts)

### convertirEDTResponseAArbol()

Convierte la respuesta anidada de la API a estructura de árbol plana para VueFlow:

```typescript
// API Response (anidado)
{
    dniIniciativa: 1,
    nombre: "Proyecto X",
    etapas: [
        {
            dni: 10,
            nombre: "Etapa 1",
            actividades: [...]
        }
    ]
}

// ↓ Conversión ↓

// Tree Structure (plano con referencias)
{
    id: "iniciativa-1",
    name: "Proyecto X",
    level: 0,
    children: [
        {
            id: "etapa-10",
            name: "Etapa 1",
            level: 1,
            parentId: "iniciativa-1",
            children: [...]
        }
    ]
}
```

### extractDniFromId()

Extrae el DNI numérico del ID de nodo:

```typescript
extractDniFromId("etapa-10")      // → 10
extractDniFromId("actividad-25")  // → 25
```

## 🎨 Visualización con VueFlow

### Nodos Personalizados

Cada nivel tiene su propio template personalizado:

```vue
<!-- Nodo Raíz (Iniciativa) -->
<template #node-root="{ data }">
    <div class="edt-node-root">
        <h3>{{ data.label }}</h3>
        <BaseButton @click="handleAddStage" />
    </div>
</template>

<!-- Nodo Etapa -->
<template #node-stage="{ id, data }">
    <div class="edt-node-stage">
        <span>{{ data.label }}</span>
        <div class="action-buttons">
            <BaseButton @click="handleEditStage(id, data)" />
            <BaseButton @click="handleDeleteStage(id, data)" />
            <BaseButton @click="handleAddActivity(id)" />
        </div>
    </div>
</template>
```

### Colores por Nivel
```css
Nivel 0 (Iniciativa):   bg-accent/20 border-accent
Nivel 1 (Etapas):       bg-primary/10 border-primary/30
Nivel 2 (Actividades):  bg-secondary/20 border-secondary
Nivel 3 (Sub-act):      bg-base-300/30 border-base-300
```

### Layout del Árbol

```typescript
// Algoritmo de posicionamiento jerárquico
const HORIZONTAL_SPACING = 300  // Espacio entre nodos hermanos
const VERTICAL_SPACING = 150    // Espacio entre niveles

// Cada nodo calcula su posición basándose en:
// - Nivel (Y): level * VERTICAL_SPACING
// - Posición horizontal (X): índice * HORIZONTAL_SPACING + offset del padre
```

## 📝 Mejores Prácticas para Desarrollo

### 1. Agregar un Nuevo Campo al Formulario

**Ejemplo:** Agregar campo "descripción" a Etapas

```typescript
// 1. Actualizar tipos (edtTypes.ts)
export type StageFormType = {
    name: string
    psn: number
    active: boolean
    description: string  // ← Nuevo campo
}

// 2. Actualizar validación (edtValidation.ts)
export const stageSchema = z.object({
    name: stringValidator(...),
    psn: z.number().min(1),
    active: z.boolean().default(true),
    description: z.string().optional()  // ← Nuevo campo
})

// 3. Actualizar formulario (AddEditStageForm.vue)
<BaseFormInput
    name="description"
    type="text"
    label="Descripción"
/>

// 4. Actualizar modal (StageModal.vue)
initialValues: {
    name: '',
    psn: 1,
    active: true,
    description: ''  // ← Nuevo campo
}

// 5. Actualizar store (edtStore.ts)
async addStage(data: { name: string; psn: number; active: boolean; description: string }) {
    const response = await edtService.addStageService({
        dniIniciativa: this.selectedInitiative.dni,
        nombre: data.name,
        psn: data.psn,
        activo: data.active,
        descripcion: data.description  // ← Mapear al backend
    })
}
```

### 2. Agregar Validación Personalizada

```typescript
// En edtValidation.ts
export const stageSchema = z.object({
    // ... campos existentes
}).superRefine((data, ctx) => {
    const edtStore = useEDTStore()
    
    // Tu validación personalizada
    if (data.name.toLowerCase().includes('test')) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'El nombre no puede contener "test"',
            path: ['name']
        })
    }
})
```

### 3. Agregar Nuevo Nivel Jerárquico

**No recomendado** - El sistema está diseñado para 4 niveles. Si necesitas más niveles:

1. Actualizar tipos en `edtTypes.ts`
2. Crear nuevos modales y formularios
3. Actualizar `EDTTree.vue` con nuevo template de nodo
4. Actualizar validaciones
5. Actualizar servicios de API

### 4. Debugging

```typescript
// Activar logs de validación (ya implementados)
console.log('Validación PSN Etapa: Verificando PSN', data.psn)
console.log('Validación PSN Actividad: Modo CREACIÓN, dniEtapa:', dniParentStage)

// Ver estado del store en DevTools
// Vue DevTools → Pinia → edt-store

// Ver estructura del árbol
console.log('EDT Root:', edtStore.edtRoot)
console.log('EDT Raw Data:', edtStore.edtRawData)
```

### 5. Testing

```typescript
// Casos de prueba recomendados:

// 1. Crear etapa con PSN duplicado → Debe fallar
// 2. Crear actividad con PSN duplicado en la misma etapa → Debe fallar
// 3. Crear actividad con PSN duplicado en otra etapa → Debe pasar
// 4. Editar etapa sin cambiar PSN → Debe pasar
// 5. Editar etapa cambiando a PSN duplicado → Debe fallar
// 6. Eliminar etapa con actividades → Debe eliminar en cascada
// 7. Abrir modal CREATE después de CREATE → Formulario debe estar limpio
// 8. Abrir modal CREATE después de EDIT → Formulario debe estar limpio
```

## 🚨 Problemas Comunes y Soluciones

### Problema 1: Formulario no se limpia al crear nuevo registro

**Causa:** El watch de `selectedStage/Activity/SubActivity` no se dispara porque ya es `null`.

**Solución:** Agregar segundo watch que observe el estado del modal:

```typescript
watch(
    () => modalStore.modals[edtStore.stageModalId]?.status,
    (isOpen) => {
        if (isOpen && !edtStore.selectedStage) {
            resetForm({ values: { name: '', psn: 1, active: true } })
        }
    }
)
```

### Problema 2: Validación de PSN no funciona en actividades

**Causa:** `selectedActivity` no es `null` en modo CREATE, o `parentContext` no está configurado.

**Solución:** Asegurarse de que:
1. `setActivity()` sin parámetros establece `selectedActivity = null`
2. `parentContext` se configura antes de abrir el modal:
```typescript
edtStore.parentContext = { id: stageId, dni: dniStage, type: 'stage' }
```

### Problema 3: El árbol no se actualiza después de CRUD

**Causa:** No se está recargando el EDT después de la operación.

**Solución:** Siempre llamar a `loadEDT()` después de operaciones exitosas:

```typescript
if (response.success) {
    await this.loadEDT(this.selectedInitiative.dni)  // ← Importante
    return true
}
```

### Problema 4: Errores de validación aparecen al abrir modal

**Causa:** No se está usando `meta.touched` para controlar la visibilidad de errores.

**Solución:** En componentes de formulario:

```vue
<span v-if="errorMessage && meta.touched" class="text-sm text-error">
    {{ errorMessage }}
</span>
```

## 📚 Recursos Adicionales

### Librerías Utilizadas

- **VueFlow**: Renderizado de diagramas de flujo
  - Docs: https://vueflow.dev/
  - Usado para: Visualización del árbol EDT

- **Vee-validate**: Validación de formularios
  - Docs: https://vee-validate.logaretm.com/
  - Usado para: Gestión de formularios y validación

- **Zod**: Esquemas de validación
  - Docs: https://zod.dev/
  - Usado para: Definir reglas de validación

- **Pinia**: State management
  - Docs: https://pinia.vuejs.org/
  - Usado para: Store global del EDT

### Convenciones de Código

- **Nombres en inglés**: Variables, funciones y tipos
- **Comentarios en español**: Para documentación
- **TypeScript estricto**: Sin `any` excepto en casos justificados
- **Composition API**: `<script setup>` en todos los componentes
- **Reactive state**: Usar `ref` y `computed` apropiadamente

### Estructura de Commits

```
feat(edt): agregar campo descripción a etapas
fix(edt): corregir validación de PSN en actividades
refactor(edt): simplificar lógica de modales
docs(edt): actualizar README con nuevas funcionalidades
```

## 🎯 Roadmap Futuro

- [ ] Drag & drop para reordenar nodos
- [ ] Exportar EDT a PDF/Excel
- [ ] Importar EDT desde archivo
- [ ] Historial de cambios (audit log)
- [ ] Colaboración en tiempo real
- [ ] Plantillas de EDT predefinidas
- [ ] Cálculo automático de rutas críticas
- [ ] Integración con calendario

## � Contacto y Soporte

Para preguntas o problemas con este módulo, contactar al equipo de desarrollo o revisar la documentación técnica completa en el repositorio del proyecto.
