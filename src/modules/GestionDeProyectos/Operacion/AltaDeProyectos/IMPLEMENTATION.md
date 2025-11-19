# Alta de Proyectos - Implementación con API Real

## 📋 Resumen

Este módulo ha sido actualizado para usar endpoints reales del API en lugar de datos mock. Permite el registro completo de proyectos con validaciones, carga dinámica de opciones y integración con el backend.

## 🔌 Endpoints Implementados

### 1. GET - Obtener datos del formulario
```
GET /gestion-de-proyectos/alta-de-proyecto
```

**Descripción**: Obtiene todas las opciones necesarias para el formulario (clasificaciones, áreas, líderes, sponsors, etc.)

**Respuesta**:
```json
{
  "success": true,
  "message": "Operación realizada exitosamente",
  "data": {
    "clasificaciones": [{ "dni": 1, "label": "Estratégico" }],
    "areas": [{ "dni": 17, "label": "Tecnología" }],
    "lideres": [{ "dni": "1", "label": "jose perez" }],
    "sponsors": [{ "dni": "1", "label": "jose perez" }],
    "projectManagers": [{ "dni": "1", "label": "jose perez" }],
    "procesos": [{ "dni": "1", "label": "jose perez" }],
    "administradores": [{ "dni": "1", "label": "jose perez" }]
  }
}
```

### 2. GET - Obtener categorías por área
```
GET /gestion-de-proyectos/configuracion-general/categoria/opciones?dniArea={areaId}
```

**Descripción**: Obtiene las categorías disponibles para un área específica

**Parámetros**:
- `dniArea` (number): ID del área seleccionada

**Respuesta**:
```json
{
  "success": true,
  "message": "Operación realizada exitosamente",
  "data": [
    { "dni": 10, "label": "Bocinas" },
    { "dni": 11, "label": "Desarrollo" }
  ]
}
```

### 3. POST - Crear proyecto
```
POST /gestion-de-proyectos/alta-de-proyecto
```

**Descripción**: Crea un nuevo proyecto con toda la información proporcionada

**Request Body**:
```json
{
  "nombre": "Implementación de nuevo sistema de gestión",
  "dniPersonalizado": "PRJ-001",
  "fechaInicio": "2025-11-01T00:00:00",
  "fechaFin": "2026-03-30T00:00:00",
  "presupuestoEstimado": 1250000.00,
  "dniClasificacion": 1,
  "objetivo": "Optimizar los procesos internos",
  "alcance": "Implementación de módulos de gestión",
  "dniLider": "a4e7ea8c-9c1f-5f",
  "dniSponsor": "a4e7ea8c-9c1f-5f",
  "dniProjectManager": "a4e7ea8c-9c1f-5f",
  "dniGestorDeProcesos": "a4e7ea8c-9c1f-5f",
  "dniArea": 1,
  "dniCategoria": 1,
  "dniAdministradores": [],
  "esSubProyecto": false,
  "dniProyectoPadre": null,
  "incluirSabados": false,
  "incluirDomingos": false,
  "esTipoInversion": true,
  "usarPlantilla": false,
  "dniPlantilla": null,
  "usarIniciativa": false,
  "dniIniciativa": null,
  "activo": true
}
```

**Respuesta**:
```json
{
  "success": true,
  "message": "Operación realizada exitosamente",
  "data": { /* mismo formato que el request */ }
}
```

## 📁 Estructura de Archivos Actualizados

### 1. `types/projectTypes.ts`
Define todos los tipos TypeScript necesarios:
- `OptionType`: Para opciones de selects (dni + label)
- `ProjectFormDataResponseType`: Respuesta del GET inicial
- `CategoryOptionResponseType`: Respuesta de categorías
- `ProjectRequestType`: Payload para crear proyecto
- `ProjectResponseType`: Respuesta al crear proyecto
- `ProjectFormType`: Tipo usado en el formulario
- `ProjectType`: Representación interna del proyecto

### 2. `services/projectService.ts`
Servicios HTTP para comunicación con el API:
- `getProjectFormDataService()`: Carga datos del formulario
- `getCategoryOptionsByAreaService(areaId)`: Carga categorías por área
- `createProjectService(data)`: Crea un nuevo proyecto

### 3. `composables/mappingProjectData.ts`
Funciones de mapeo entre tipos:
- `mapProjectResponse()`: API → Tipo interno
- `mapProjectRequest()`: Formulario → API

### 4. `composables/useProjectActions.ts`
Acciones principales del módulo:
- `loadFormData()`: Carga opciones del formulario
- `loadCategoriesByArea(areaId)`: Carga categorías
- `createProject(data)`: Crea proyecto
- `saveToLocalStorage(project)`: Backup local

### 5. `store/projectStore.ts`
Store de Pinia con:
- Estado de opciones (classifications, areas, leaders, etc.)
- Proyecto seleccionado
- Estados de carga
- Acciones para manipular el estado

### 6. `validations/projectValidation.ts`
Esquema de validación con Zod que incluye:
- Validaciones de campos requeridos
- Validación de fechas (fin >= inicio)
- Validación condicional de subproyectos
- Validación condicional de plantillas
- Validación condicional de iniciativas

### 7. `components/ProjectForm.vue`
Componente principal actualizado para:
- Cargar datos desde el API en `onMounted`
- Usar los nuevos nombres de campos
- Cargar categorías dinámicamente al cambiar área
- Enviar datos al API al crear proyecto

## 🔄 Flujo de Datos

```
┌─────────────────────────────────────────────────────────────┐
│                    1. CARGA INICIAL                         │
│  Component mounted → loadFormData() → API GET               │
│  → Store actualizado con opciones                           │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                 2. SELECCIÓN DE ÁREA                        │
│  Usuario selecciona área → watch dispara                    │
│  → loadCategoriesByArea(areaId) → API GET                   │
│  → Store actualizado con categorías                         │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                 3. LLENADO DE FORMULARIO                    │
│  Usuario completa campos → Validación en tiempo real        │
│  → vee-validate + Zod                                       │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                    4. ENVÍO                                 │
│  Usuario envía formulario → Validación final                │
│  → mapProjectRequest() convierte datos                      │
│  → createProject() → API POST                               │
│  → Notificación de éxito/error                              │
│  → Reset del formulario                                     │
└─────────────────────────────────────────────────────────────┘
```

## 🎯 Mapeo de Campos

### Formulario → API

| Campo Formulario | Campo API | Tipo | Requerido |
|-----------------|-----------|------|-----------|
| `name` | `nombre` | string | ✅ |
| `customId` | `dniPersonalizado` | string | ❌ |
| `startDate` | `fechaInicio` | ISO string | ✅ |
| `endDate` | `fechaFin` | ISO string | ✅ |
| `estimatedBudget` | `presupuestoEstimado` | number | ✅ |
| `classificationId` | `dniClasificacion` | number | ❌ |
| `objective` | `objetivo` | string | ✅ |
| `scope` | `alcance` | string | ✅ |
| `leaderId` | `dniLider` | string | ✅ |
| `sponsorId` | `dniSponsor` | string | ✅ |
| `projectManagerId` | `dniProjectManager` | string | ❌ |
| `processManagerId` | `dniGestorDeProcesos` | string | ❌ |
| `areaId` | `dniArea` | number | ✅ |
| `categoryId` | `dniCategoria` | number | ✅ |
| `adminIds` | `dniAdministradores` | string[] | ❌ |
| `isSubproject` | `esSubProyecto` | boolean | ❌ |
| `parentProjectId` | `dniProyectoPadre` | number\|null | ❌ |
| `includeSaturday` | `incluirSabados` | boolean | ❌ |
| `includeSunday` | `incluirDomingos` | boolean | ❌ |
| `isInvestmentType` | `esTipoInversion` | boolean | ❌ |
| `useTemplate` | `usarPlantilla` | boolean | ❌ |
| `templateId` | `dniPlantilla` | number\|null | ❌ |
| `useInitiative` | `usarIniciativa` | boolean | ❌ |
| `initiativeId` | `dniIniciativa` | number\|null | ❌ |
| `active` | `activo` | boolean | ❌ |

## 🛠️ Uso del Módulo

### En un componente Vue:

```vue
<script setup lang="ts">
import { onMounted } from 'vue'
import { useProjectActions } from '@/modules/GestionDeProyectos/Operacion/AltaDeProyectos/composables/useProjectActions'
import useProjectStore from '@/modules/GestionDeProyectos/Operacion/AltaDeProyectos/store/projectStore'

const projectStore = useProjectStore()
const { loadFormData, loadCategoriesByArea, createProject } = useProjectActions()

onMounted(async () => {
  // Cargar datos iniciales
  await loadFormData()
})

// Cuando el usuario selecciona un área
const onAreaChange = async (areaId: number) => {
  await loadCategoriesByArea(areaId)
}

// Cuando el usuario envía el formulario
const onSubmit = async (formData: ProjectFormType) => {
  const result = await createProject(formData)
  if (result.status === 'success') {
    console.log('Proyecto creado:', result.data)
  }
}
</script>
```

## ✅ Validaciones Implementadas

1. **Campos Requeridos**:
   - Nombre (mín 3, máx 200 caracteres)
   - Fechas de inicio y fin
   - Presupuesto estimado (>= 0)
   - Objetivo
   - Alcance
   - Líder
   - Sponsor
   - Área
   - Categoría

2. **Validaciones Condicionales**:
   - Si `isSubproject` = true → `parentProjectId` requerido
   - Si `useTemplate` = true → `templateId` requerido
   - Si `useInitiative` = true → `initiativeId` requerido

3. **Validaciones de Lógica**:
   - Fecha fin >= Fecha inicio

## 🔗 Integración con Iniciativas

El módulo soporta la creación de proyectos desde iniciativas:

```typescript
// URL: /alta-de-proyectos?fromInitiative=123&initiativeName=Mi%20Iniciativa

onMounted(() => {
  const fromInitiative = route.query.fromInitiative
  const initiativeName = route.query.initiativeName
  
  if (fromInitiative) {
    // Pre-llenar formulario con datos de la iniciativa
    projectStore.updateField('name', initiativeName)
    projectStore.updateField('useInitiative', true)
    projectStore.updateField('initiativeId', Number(fromInitiative))
  }
})
```

## 📝 Notas Importantes

1. **Formato de Fechas**: Las fechas se envían en formato ISO 8601 (`toISOString()`)
2. **IDs de Usuarios**: Los IDs de usuarios (líder, sponsor, etc.) son strings
3. **IDs Numéricos**: Los IDs de área, categoría, clasificación son numbers
4. **Campos Opcionales**: Los campos opcionales se envían como `undefined` o `null` según el caso
5. **Backup Local**: Los proyectos se guardan también en localStorage como respaldo

## 🚧 Pendientes

- [ ] Implementar endpoint para obtener proyectos padre (subproyectos)
- [ ] Implementar endpoint para obtener plantillas
- [ ] Implementar endpoint para obtener iniciativas
- [ ] Agregar funcionalidad de edición de proyectos
- [ ] Agregar funcionalidad de eliminación de proyectos

## 📚 Referencias

- Módulos de referencia:
  - `DiasInhabiles`: Patrón de servicios y composables
  - `General`: Patrón de store y mappers
