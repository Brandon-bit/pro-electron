# SOW - Statement of Work

Módulo para crear y gestionar documentos Statement of Work (SOW) para proyectos, con editor completo y biblioteca de documentos.

## Estructura del Módulo

```
SOWDelProyecto/
├── components/          # Componentes Vue del módulo
│   ├── EditorTab.vue        # Editor de SOW con formulario completo
│   └── LibraryTab.vue       # Biblioteca de SOWs guardados
├── composables/         # Lógica reutilizable
│   ├── useSOWActions.ts     # Acciones CRUD y exportación
│   └── mappingSOWData.ts    # Mapeo de datos API ↔ Frontend
├── services/            # Servicios de API
│   └── sowService.ts        # Llamadas HTTP al backend
├── store/               # Estado global con Pinia
│   └── sowStore.ts          # Store de SOWs
├── types/               # Definiciones de TypeScript
│   └── sowTypes.ts          # Tipos e interfaces
├── validations/         # Esquemas de validación
│   └── sowValidation.ts     # Validación con Zod
└── views/               # Vistas principales
    └── SOWView.vue          # Vista principal con tabs
```

## Características Principales

### 1. Sistema de Tabs
- ✅ **Editor SOW**: Formulario completo para crear/editar
- ✅ **Biblioteca SOW**: Lista de documentos guardados
- ✅ Navegación fluida entre tabs
- ✅ Estado persistente

### 2. Editor SOW

#### Información del Proyecto
- ✅ Nombre del proyecto
- ✅ Código del proyecto
- ✅ Cliente
- ✅ Versión del documento
- ✅ Fechas de inicio y fin
- ✅ Creador del documento
- ✅ Estado (Borrador/Revisión/Aprobado/Rechazado)

#### Contenido del SOW
- ✅ **Resumen Ejecutivo**: Descripción general
- ✅ **Objetivos**: Objetivos del proyecto
- ✅ **Alcance**: Definición del alcance
- ✅ **Entregables**: Lista de entregables
- ✅ **Cronograma**: Timeline del proyecto
- ✅ **Recursos**: Recursos necesarios
- ✅ **Supuestos**: Supuestos del proyecto
- ✅ **Restricciones**: Limitaciones
- ✅ **Criterios de Aceptación**: Condiciones de aceptación
- ✅ **Términos de Pago**: Condiciones de pago

#### Funcionalidades del Editor
- ✅ Formulario con validación completa
- ✅ Campos de texto enriquecido (textarea)
- ✅ Selección de estado
- ✅ Fechas con date picker
- ✅ Botón "Limpiar" para resetear
- ✅ Botón "Guardar" con loading state
- ✅ Modo edición/creación

### 3. Biblioteca SOW

#### Tabla de SOWs
- ✅ Código del proyecto
- ✅ Nombre del proyecto
- ✅ Cliente
- ✅ Versión
- ✅ Estado con badges de colores
- ✅ Fechas de inicio y fin
- ✅ Creador
- ✅ Acciones (Ver/Editar/Exportar)

#### Funcionalidades
- ✅ Listado completo de SOWs
- ✅ Tabla zebra con hover
- ✅ Botón actualizar
- ✅ Estado de carga
- ✅ Estado vacío informativo
- ✅ Resumen con estadísticas

#### Acciones
- ✅ **Ver**: Visualizar SOW
- ✅ **Editar**: Cargar en editor
- ✅ **Exportar**: Descargar como PDF

### 4. Estados del SOW

#### Badges de Estado
```
draft    → badge-ghost    → Borrador
review   → badge-info     → En Revisión
approved → badge-success  → Aprobado
rejected → badge-error    → Rechazado
```

### 5. Resumen Estadístico
- ✅ Total de SOWs
- ✅ Borradores (azul)
- ✅ En Revisión (amarillo)
- ✅ Aprobados (verde)

## Flujo de Trabajo

1. **Crear SOW**: Ir a "Editor SOW" y llenar el formulario
2. **Guardar**: Click en "Guardar SOW"
3. **Revisar**: Ir a "Biblioteca SOW" para ver todos los documentos
4. **Editar**: Click en el ícono de editar para modificar
5. **Exportar**: Click en el ícono de descarga para exportar PDF
6. **Aprobar**: Cambiar estado a "Aprobado"

## Componentes Base Utilizados

- `BaseTitle`: Título de página con subtítulo
- `BaseFormInput`: Inputs de formulario
- `BaseTextArea`: Áreas de texto
- `BaseFormSelect`: Selectores
- Tabs de DaisyUI
- Cards y badges de DaisyUI

## Características de UI

### Editor
- ✅ Card con sombra
- ✅ Secciones divididas con dividers
- ✅ Grid responsive (1 col móvil, 2 cols desktop)
- ✅ Iconos Material Symbols
- ✅ Textareas con altura variable
- ✅ Botones con iconos
- ✅ Loading states

### Biblioteca
- ✅ Tabla responsive con scroll
- ✅ Zebra striping
- ✅ Hover effects
- ✅ Badges de colores
- ✅ Botones de acción compactos
- ✅ Resumen con grid
- ✅ Estado vacío con icono grande

### Tabs
- ✅ Tabs boxed con fondo
- ✅ Iconos en tabs
- ✅ Estado activo destacado
- ✅ Transiciones suaves

## Ruta

La ruta está configurada en `/gestion-de-proyectos/sow-del-proyecto`

## API Endpoints

- `GET /gestion-proyectos/sow` - Obtener lista paginada
- `POST /gestion-proyectos/sow` - Crear SOW
- `PUT /gestion-proyectos/sow/:id` - Actualizar SOW
- `DELETE /gestion-proyectos/sow/:id` - Eliminar SOW
- `GET /gestion-proyectos/sow/:id/exportar` - Exportar SOW a PDF

## Validaciones

Todas las validaciones están definidas en `validations/sowValidation.ts` usando Zod:

### Campos Requeridos
- Nombre del proyecto (3-100 caracteres)
- Código del proyecto (max 50 caracteres)
- Cliente (max 100 caracteres)
- Fechas de inicio y fin
- Resumen ejecutivo (min 10 caracteres)
- Objetivos (min 10 caracteres)
- Alcance (min 10 caracteres)
- Entregables
- Cronograma
- Recursos
- Criterios de aceptación
- Términos de pago
- Versión
- Creador

### Campos Opcionales
- Supuestos
- Restricciones

## Estructura de Datos

### SOW Completo
```typescript
{
  id: number
  projectName: string
  projectCode: string
  client: string
  startDate: Date
  endDate: Date
  executiveSummary: string
  objectives: string
  scope: string
  deliverables: string
  timeline: string
  resources: string
  assumptions: string
  constraints: string
  acceptanceCriteria: string
  paymentTerms: string
  status: 'draft' | 'review' | 'approved' | 'rejected'
  version: string
  createdBy: string
  creationDate: Date
  lastModified: Date
  active: boolean
}
```

## Ejemplo de Uso

```vue
<script setup lang="ts">
import SOWView from '@/modules/GestionDeProyectos/SOWDelProyecto/views/SOWView.vue'
</script>

<template>
  <SOWView />
</template>
```

## Características Técnicas

- ✅ Formulario con VeeValidate
- ✅ Validación con Zod
- ✅ Estado reactivo con Pinia
- ✅ TypeScript estricto
- ✅ Notificaciones toast
- ✅ Exportación a PDF
- ✅ Manejo de estados de carga
- ✅ Reseteo de formularios
- ✅ Navegación entre tabs
- ✅ Formateo de fechas

## Secciones del SOW

### 1. Resumen Ejecutivo
Descripción general del proyecto, contexto y justificación.

### 2. Objetivos
Objetivos específicos y medibles que se buscan alcanzar.

### 3. Alcance
Definición clara de qué está incluido y qué no en el proyecto.

### 4. Entregables
Lista detallada de productos o servicios a entregar.

### 5. Cronograma
Timeline con fases, hitos y fechas clave.

### 6. Recursos
Recursos humanos, técnicos y materiales necesarios.

### 7. Supuestos
Condiciones que se asumen verdaderas para el proyecto.

### 8. Restricciones
Limitaciones de tiempo, presupuesto, tecnología, etc.

### 9. Criterios de Aceptación
Condiciones que deben cumplirse para aceptar los entregables.

### 10. Términos de Pago
Condiciones, calendario y forma de pago acordados.

## Exportación

El sistema permite exportar SOWs a PDF con:
- ✅ Formato profesional
- ✅ Todas las secciones incluidas
- ✅ Información del proyecto
- ✅ Versión y estado
- ✅ Descarga automática

## Gestión de Versiones

- ✅ Campo de versión editable
- ✅ Formato sugerido: X.Y (ej: 1.0, 1.1, 2.0)
- ✅ Historial de modificaciones
- ✅ Fecha de última modificación

## Estados del Documento

1. **Borrador**: Documento en creación
2. **En Revisión**: Enviado para revisión
3. **Aprobado**: Documento aprobado y vigente
4. **Rechazado**: Documento rechazado, requiere cambios
