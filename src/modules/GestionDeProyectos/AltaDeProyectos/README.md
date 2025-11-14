# Alta de Proyectos

Módulo para registrar nuevos proyectos en el sistema con formulario completo, plantillas y capacidad de importación.

## Estructura del Módulo

```
AltaDeProyectos/
├── components/          # Componentes Vue del módulo
│   ├── ProjectForm.vue      # Formulario principal de registro
│   ├── TemplateModal.vue    # Modal para seleccionar plantillas
│   └── ImportModal.vue      # Modal para importar desde archivo
├── composables/         # Lógica reutilizable
│   ├── useProjectActions.ts     # Acciones CRUD y generación de folio
│   └── mappingProjectData.ts    # Mapeo de datos API ↔ Frontend
├── services/            # Servicios de API
│   └── projectService.ts        # Llamadas HTTP al backend
├── store/               # Estado global con Pinia
│   └── projectStore.ts          # Store con datos mock
├── types/               # Definiciones de TypeScript
│   └── projectTypes.ts          # Tipos e interfaces
├── validations/         # Esquemas de validación
│   └── projectValidation.ts     # Validación con Zod
└── views/               # Vistas principales
    └── ProjectRegistrationView.vue  # Vista principal
```

## Características Principales

### 1. Formulario Completo de Registro

#### Información Básica
- ✅ Nombre del proyecto (requerido)
- ✅ ID del proyecto (auto-generado)
- ✅ Fecha de inicio (requerido)
- ✅ Fecha de fin (requerido)
- ✅ Presupuesto estimado
- ✅ Clasificación (Estratégico/Operacional/Táctico)

#### Descripción del Proyecto
- ✅ Objetivo (textarea)
- ✅ Alcance (textarea)

#### Equipo del Proyecto
- ✅ Líder (select)
- ✅ Sponsor (select)
- ✅ Project Manager (select)
- ✅ Gestor de Procesos (select)

#### Clasificación
- ✅ Área del proyecto (select)
- ✅ Categorías (select dependiente del área)

#### Administradores Adicionales
- ✅ Checkboxes múltiples
- ✅ Selección de varios administradores

#### Modo de Implementación
- ✅ Toggle SubProyecto
- ✅ Selector de proyecto padre (condicional)

#### Opciones de Calendario
- ✅ Toggle Incluir Sábados
- ✅ Toggle Incluir Domingos

#### Tipo de Proyecto
- ✅ Toggle Gasto
- ✅ Toggle Inversión

### 2. Utilizar Plantilla

#### Plantillas Disponibles
- ✅ Proyecto de Desarrollo de Software
- ✅ Proyecto de Marketing Digital
- ✅ Proyecto de Capacitación

#### Funcionalidades
- ✅ Modal con lista de plantillas
- ✅ Radio buttons para selección
- ✅ Descripción de cada plantilla
- ✅ Pre-carga de datos al aplicar
- ✅ Notificación de éxito

### 3. Importar Layout

#### Formatos Soportados
- ✅ Excel (.xlsx, .xls)
- ✅ CSV (.csv)

#### Funcionalidades
- ✅ Modal con file input
- ✅ Validación de formato
- ✅ Vista previa del archivo seleccionado
- ✅ Procesamiento con loading state
- ✅ Importación de datos al formulario
- ✅ Notificaciones de estado

### 4. Generación de Folio
- ✅ Folio automático de 8 dígitos
- ✅ Secuencial basado en proyectos existentes
- ✅ Formato: 00000001, 00000002, etc.

### 5. Validaciones

#### Campos Requeridos
- Nombre del proyecto
- Fecha de inicio
- Fecha de fin

#### Validaciones Adicionales
- Fecha de fin debe ser posterior a fecha de inicio
- Longitudes mínimas y máximas
- Formatos de datos

### 6. Integración con SOW
- ✅ Carga automática de datos desde SOW guardado
- ✅ Pre-llenado de nombre, presupuesto, objetivo y alcance

## Flujo de Trabajo

1. **Acceder al Módulo**: Ir a Alta de Proyectos
2. **Opción A - Usar Plantilla**: Click en "Utilizar Plantilla" → Seleccionar → Aplicar
3. **Opción B - Importar**: Click en "Importar Layout" → Seleccionar archivo → Importar
4. **Opción C - Manual**: Llenar formulario directamente
5. **Completar Datos**: Llenar todos los campos requeridos
6. **Guardar**: Click en "Agregar Proyecto"
7. **Confirmación**: Folio generado y proyecto guardado

## Componentes Base Utilizados

- `BaseTitle`: Título de página con subtítulo
- `BaseFormInput`: Inputs de formulario
- `BaseTextArea`: Áreas de texto
- `BaseFormSelect`: Selectores
- `BaseFormCheckbox`: Checkboxes
- Modales nativos de DaisyUI
- Toggles de DaisyUI

## Características de UI

### Formulario
- ✅ Grid responsive (1 col móvil, 2 cols desktop)
- ✅ Secciones divididas con dividers
- ✅ Labels claros y descriptivos
- ✅ Placeholders informativos
- ✅ Campos deshabilitados para auto-generados
- ✅ Validación en tiempo real

### Botones de Acción
- ✅ "Utilizar Plantilla" con icono
- ✅ "Importar Layout" con icono
- ✅ "Agregar Proyecto" con loading state

### Modales
- ✅ Modal de plantillas con radio buttons
- ✅ Modal de importación con file input
- ✅ Backdrop para cerrar
- ✅ Botones de acción en footer

### Toggles
- ✅ Toggle primary para SubProyecto
- ✅ Toggle primary para Sábados/Domingos
- ✅ Toggle primary para Gasto/Inversión
- ✅ Labels clickeables

### Checkboxes
- ✅ Grid de administradores
- ✅ Labels clickeables
- ✅ Diseño compacto

## Ruta

La ruta está configurada en `/gestion-de-proyectos/alta-de-proyectos`

## API Endpoints

- `GET /gestion-proyectos/proyectos` - Obtener lista paginada
- `POST /gestion-proyectos/proyectos` - Crear proyecto
- `PUT /gestion-proyectos/proyectos/:id` - Actualizar proyecto
- `DELETE /gestion-proyectos/proyectos/:id` - Eliminar proyecto
- `GET /gestion-proyectos/proyectos/generar-folio` - Generar folio

## Validaciones

Todas las validaciones están definidas en `validations/projectValidation.ts` usando Zod:

### Campos Requeridos
- Nombre del proyecto (3-200 caracteres)
- Fecha de inicio
- Fecha de fin

### Validación de Fechas
- Fecha de fin debe ser >= fecha de inicio

### Campos Opcionales
- Presupuesto
- Objetivo
- Alcance
- Equipo
- Área y categoría
- Administradores adicionales

## Estructura de Datos

### Proyecto Completo
```typescript
{
  id: number
  folio: string
  name: string
  startDate: Date
  endDate: Date
  budget: string
  projectId: string
  objective: string
  scope: string
  leader: string
  sponsor: string
  projectManager: string
  processManager: string
  area: string
  category: string
  additionalAdmins: string[]
  isSubproject: boolean
  parentProject: string
  includeSaturday: boolean
  includeSunday: boolean
  projectType: 'expense' | 'investment' | ''
  classification: string
  creationDate: Date
  active: boolean
}
```

## Datos Mock

### Usuarios por Rol
- **Líderes**: Juan Pérez, María García
- **Sponsors**: Carlos López, Ana Martínez
- **Project Managers**: Pedro Sánchez, Laura Rodríguez
- **Gestores de Procesos**: Miguel Torres, Isabel Fernández
- **Administradores**: Roberto Gómez, Carmen Ruiz, Francisco Díaz

### Áreas y Categorías
- **Tecnología**: Desarrollo, Infraestructura, Seguridad
- **Marketing**: Digital, Tradicional, Eventos
- **Recursos Humanos**: Reclutamiento, Capacitación, Bienestar

### Clasificaciones
- Estratégico
- Operacional
- Táctico

## Ejemplo de Uso

```vue
<script setup lang="ts">
import ProjectRegistrationView from '@/modules/GestionDeProyectos/AltaDeProyectos/views/ProjectRegistrationView.vue'
</script>

<template>
  <ProjectRegistrationView />
</template>
```

## Características Técnicas

- ✅ Formulario con VeeValidate
- ✅ Validación con Zod
- ✅ Estado reactivo con Pinia
- ✅ TypeScript estricto
- ✅ Notificaciones toast
- ✅ Generación automática de folio
- ✅ Almacenamiento en localStorage
- ✅ Carga desde SOW
- ✅ Selects dependientes (área → categoría)
- ✅ Toggles mutuamente excluyentes (gasto/inversión)
- ✅ Validación de fechas
- ✅ Manejo de archivos
- ✅ Modales nativos de DaisyUI

## Plantillas

### Plantilla 1: Desarrollo de Software
- Clasificación: Estratégico
- Área: Tecnología
- Sábados: No
- Domingos: No

### Plantilla 2: Marketing Digital
- Clasificación: Operacional
- Área: Marketing
- Sábados: Sí
- Domingos: No

### Plantilla 3: Capacitación
- Clasificación: Táctico
- Área: Recursos Humanos
- Sábados: No
- Domingos: No

## Importación de Datos

El sistema permite importar datos desde archivos Excel o CSV con el formato estándar:
- Columnas esperadas: Nombre, Presupuesto, Objetivo, Alcance, Clasificación
- Procesamiento asíncrono
- Validación de formato
- Notificaciones de éxito/error

## Integración con SOW

Si existe un SOW guardado en localStorage, el sistema automáticamente:
1. Carga el SOW más reciente
2. Pre-llena los campos: nombre, presupuesto, ID, objetivo, alcance
3. Permite editar o completar el resto de información

## Almacenamiento

Los proyectos se guardan en:
- **localStorage**: Para desarrollo y demo
- **Backend API**: Para producción

Formato en localStorage:
```json
{
  "projects": [
    {
      "folio": "00000001",
      "name": "Proyecto Demo",
      "startDate": "2024-01-01",
      "endDate": "2024-12-31",
      ...
    }
  ]
}
```
