# Charter de Proyectos

Módulo para documentación formal de autorización e inicio de proyectos con formulario extenso, visualización detallada y estadísticas.

## Estructura del Módulo

```
CharterDeProyectos/
├── components/          # Componentes Vue del módulo
│   ├── CreateCharterModal.vue     # Modal para crear charter
│   ├── ViewCharterModal.vue       # Modal para ver detalle
│   └── StatsCards.vue             # Cards de estadísticas
├── composables/         # Lógica reutilizable
│   └── useCharterActions.ts       # Acciones y helpers
├── store/               # Estado global con Pinia
│   └── charterStore.ts            # Store con charters
├── types/               # Definiciones de TypeScript
│   └── charterTypes.ts            # Tipos e interfaces
└── views/               # Vistas principales
    └── CharterView.vue            # Vista principal
```

## Características Principales

### 1. Lista de Charters

#### Card por Charter
- ✅ Header con nombre, badges de estado y versión
- ✅ Botones "Ver Detalle" y "Enviar a Aprobación"
- ✅ Descripción del proyecto
- ✅ Grid 3 columnas: PM, Sponsor, Presupuesto
- ✅ Hover con sombra

#### Estados
1. **Borrador** - Charter en creación
2. **En Revisión** - Enviado para aprobación
3. **Aprobado** - Autorizado formalmente

### 2. Modal de Creación

#### 13 Campos del Formulario
1. **Nombre del Proyecto** * (input)
2. **Versión** (input, default: 1.0)
3. **Descripción del Proyecto** * (textarea 3 rows)
4. **Justificación del Negocio** * (textarea 3 rows)
5. **Objetivos Medibles y Criterios de Éxito** * (textarea 4 rows)
6. **Alcance (Inclusiones)** * (textarea 3 rows)
7. **Exclusiones** (textarea 3 rows)
8. **Hitos Principales** * (textarea 3 rows)
9. **Presupuesto Resumido** * (input)
10. **Riesgos de Alto Nivel** (textarea 3 rows)
11. **Stakeholders Clave** * (textarea 3 rows)
12. **Project Manager Asignado** * (input)
13. **Sponsor del Proyecto** * (input)

#### Características
- ✅ BaseModal integrado
- ✅ Scroll vertical (max-h-70vh)
- ✅ Grid 2 columnas para algunos campos
- ✅ Placeholders descriptivos
- ✅ Campos marcados con *
- ✅ Botón: "Guardar Borrador"
- ✅ Reset al guardar

### 3. Modal de Visualización

#### Secciones del Charter
1. **Header Info** - ID, Versión, Fecha, Estado
2. **Descripción del Proyecto**
3. **Justificación del Negocio**
4. **Objetivos y Criterios de Éxito** (pre-formatted)
5. **Alcance y Exclusiones** (grid 2 cols)
6. **Hitos Principales** (pre-formatted)
7. **Presupuesto** (destacado)
8. **Riesgos de Alto Nivel** (pre-formatted)
9. **Stakeholders Clave**
10. **PM y Sponsor** (grid 2 cols)
11. **Botón Aprobar** (si está "En Revisión")
12. **Mensaje de Aprobación** (si está "Aprobado")

#### Características
- ✅ BaseModal sin botón submit
- ✅ Scroll vertical (max-h-70vh)
- ✅ Formato pre-wrap para listas
- ✅ Borders y dividers
- ✅ Badge de estado
- ✅ Botón aprobar con icono
- ✅ Mensaje de éxito verde

### 4. Estadísticas (3 Cards)

1. **Total Charters**
   - Número total
   - Icono: description

2. **En Revisión**
   - Cantidad en revisión
   - Icono: schedule (warning)

3. **Aprobados**
   - Cantidad aprobada
   - Icono: check_circle (success)

## Tipos

### CharterType
```typescript
{
  id: string
  projectName: string
  description: string
  justification: string
  objectives: string
  scope: string
  exclusions: string
  milestones: string
  budget: string
  risks: string
  stakeholders: string
  projectManager: string
  sponsor: string
  status: CharterStatus
  version: string
  createdDate: string
  approvedDate?: string
}
```

### CharterStatus
```typescript
'Borrador' | 'En Revisión' | 'Aprobado'
```

## Store

### Estado
- `charters`: Array de charters
- `isCreateModalOpen`: Estado del modal de creación
- `isViewModalOpen`: Estado del modal de visualización
- `viewingCharter`: Charter siendo visualizado

### Acciones
- `setCharters(charters)`: Establecer charters
- `addCharter(newCharter)`: Agregar charter
- `updateCharterStatus(id, status)`: Actualizar estado
- `approveCharter(id)`: Aprobar charter
- `sendToReview(id)`: Enviar a revisión
- `openCreateModal()`: Abrir modal de creación
- `closeCreateModal()`: Cerrar modal de creación
- `openViewModal(charter)`: Abrir modal de visualización
- `closeViewModal()`: Cerrar modal de visualización

### Getters
- `totalCharters`: Total de charters
- `inReviewCharters`: Charters en revisión
- `approvedCharters`: Charters aprobados

## Composables

### useCharterActions
- `getStatusColor(status)`: Color del badge según estado
- `loadCharters()`: Cargar desde localStorage
- `saveCharters()`: Guardar en localStorage
- `handleApprove(id)`: Aprobar con notificación
- `handleSendToReview(id)`: Enviar a revisión con notificación

## Componentes

### CreateCharterModal.vue
- ✅ BaseModal integrado
- ✅ Formulario extenso (13 campos)
- ✅ Grid 2 columnas para algunos campos
- ✅ Scroll vertical
- ✅ Placeholders descriptivos
- ✅ Reset al guardar
- ✅ 256 líneas

### ViewCharterModal.vue
- ✅ BaseModal sin submit
- ✅ Visualización completa
- ✅ Pre-formatted text
- ✅ Grid 2 columnas
- ✅ Botón aprobar condicional
- ✅ Mensaje de aprobación
- ✅ Scroll vertical

### StatsCards.vue
- ✅ Grid de 3 cards
- ✅ Material icons
- ✅ Números grandes
- ✅ Getters del store

### CharterView.vue
- ✅ Header con botones
- ✅ Stats cards
- ✅ Lista de charters
- ✅ Modales incluidos

## Colores de Estado

### Badge Colors
```typescript
'Borrador': 'badge-ghost'      // Gris
'En Revisión': 'badge-warning' // Amarillo
'Aprobado': 'badge-success'    // Verde
```

## Flujo de Trabajo

1. **Click "Crear Charter"** → Abrir modal
2. **Llenar Formulario** → 13 campos
3. **Guardar Borrador** → Estado "Borrador"
4. **Ver en Lista** → Card con info
5. **Click "Enviar a Aprobación"** → Estado "En Revisión"
6. **Click "Ver Detalle"** → Abrir modal de visualización
7. **Click "Aprobar Charter"** → Estado "Aprobado"
8. **Fecha de Aprobación** → Automática
9. **Guardar** → Persistir en localStorage

## Persistencia

### LocalStorage Key
- `charters`: Array de charters

### Estructura Guardada
```typescript
[
  {
    id: string
    projectName: string
    description: string
    justification: string
    objectives: string
    scope: string
    exclusions: string
    milestones: string
    budget: string
    risks: string
    stakeholders: string
    projectManager: string
    sponsor: string
    status: CharterStatus
    version: string
    createdDate: string (YYYY-MM-DD)
    approvedDate?: string (YYYY-MM-DD)
  }
]
```

## Características de UI

### Header
- ✅ BaseTitle con icono description
- ✅ Botón "Guardar" (outline)
- ✅ Botón "Crear Charter" (primary)
- ✅ Flex justify-between

### Stats Cards
- ✅ Grid responsive (1/3 cols)
- ✅ Material icons
- ✅ Números grandes (text-2xl)
- ✅ Colores por tipo

### Lista
- ✅ Cards con sombra
- ✅ Header con badges
- ✅ Botones condicionales
- ✅ Grid 3 columnas para info
- ✅ Hover effects

### Modal de Creación
- ✅ BaseModal
- ✅ Max-height con scroll
- ✅ Grid 2 columnas
- ✅ Textareas con rows
- ✅ Placeholders descriptivos
- ✅ Botón "Guardar Borrador"

### Modal de Visualización
- ✅ BaseModal sin submit
- ✅ Max-height con scroll
- ✅ Pre-formatted text
- ✅ Borders y dividers
- ✅ Grid 2 columnas
- ✅ Botón aprobar condicional
- ✅ Mensaje de éxito

## Ruta

La ruta está configurada en `/gestion-de-proyectos/charter-de-proyectos`

## Integración

### Con Proyectos
- ✅ Puede crear proyecto desde charter (futuro)
- ✅ Independiente por ahora

### Persistencia
- ✅ Guarda en localStorage
- ✅ Carga automática al montar
- ✅ Notificación al guardar
- ✅ Notificación al aprobar
- ✅ Notificación al enviar a revisión

## Ejemplo de Uso

```vue
<script setup lang="ts">
import CharterView from '@/modules/GestionDeProyectos/CharterDeProyectos/views/CharterView.vue'
</script>

<template>
  <CharterView />
</template>
```

## Características Técnicas

- ✅ Estado reactivo con Pinia
- ✅ TypeScript estricto
- ✅ Computed properties para filtros
- ✅ Watch para modales
- ✅ Notificaciones toast
- ✅ Persistencia en localStorage
- ✅ Formulario extenso
- ✅ Visualización completa
- ✅ Colores por estado
- ✅ Badges con estilos
- ✅ Grid responsive
- ✅ BaseModal integrado
- ✅ Material icons
- ✅ ID autogenerado (CH001, CH002...)
- ✅ Fecha automática (YYYY-MM-DD)
- ✅ Estado inicial "Borrador"
- ✅ Aprobación con fecha

## Validaciones

### Modal de Creación
- ✅ Campos marcados con * (requeridos)
- ✅ Todos los campos opcionales en código
- ✅ Reset al guardar
- ✅ Estado inicial "Borrador"

### Aprobación
- ✅ Solo en estado "En Revisión"
- ✅ Asigna fecha de aprobación
- ✅ Notificación de éxito
- ✅ Cierra modal automáticamente

### Envío a Revisión
- ✅ Solo en estado "Borrador"
- ✅ Botón visible solo en borrador
- ✅ Notificación de info

## Campos del Charter

### Información Básica
- **Nombre del Proyecto**: Título descriptivo
- **Versión**: Control de versiones (default: 1.0)
- **Descripción**: Propósito general
- **Justificación**: Razón de negocio

### Objetivos y Alcance
- **Objetivos**: Criterios SMART
- **Alcance**: Qué incluye
- **Exclusiones**: Qué NO incluye

### Planificación
- **Hitos**: Fechas clave
- **Presupuesto**: Rango estimado
- **Riesgos**: Identificación inicial

### Stakeholders
- **Stakeholders Clave**: Lista de involucrados
- **Project Manager**: PM asignado
- **Sponsor**: Patrocinador ejecutivo

## Formato de Datos

### Pre-formatted Text
```typescript
<pre class="opacity-70 whitespace-pre-wrap font-sans">
  {{ charter.objectives }}
</pre>
```

Permite:
- Saltos de línea
- Listas numeradas
- Formato de texto

### Ejemplos
**Objetivos:**
```
1. Implementar módulos core en 6 meses
2. Capacitar 200 usuarios
3. Migrar datos históricos
4. Lograr 95% de adopción
```

**Hitos:**
```
M1: Diseño (Mes 2)
M2: Desarrollo (Mes 4)
M3: Testing (Mes 5)
M4: Go-Live (Mes 6)
```

**Riesgos:**
```
R1: Resistencia al cambio
R2: Problemas en migración de datos
R3: Disponibilidad de recursos clave
```

## Datos de Ejemplo

### Charter por Defecto
```typescript
{
  id: 'CH001',
  projectName: 'Implementación Sistema ERP',
  description: 'Proyecto para implementar un sistema ERP integrado que unifique procesos de finanzas, recursos humanos y operaciones',
  justification: 'Reducir costos operativos en un 25% y mejorar eficiencia mediante automatización',
  objectives: '1. Implementar módulos core en 6 meses\n2. Capacitar 200 usuarios\n3. Migrar datos históricos\n4. Lograr 95% de adopción',
  scope: 'Módulos: Finanzas, RH, Inventario, Compras. Incluye capacitación y migración de datos',
  exclusions: 'No incluye módulo de producción ni CRM. Mantenimiento post go-live bajo contrato separado',
  milestones: 'M1: Diseño (Mes 2)\nM2: Desarrollo (Mes 4)\nM3: Testing (Mes 5)\nM4: Go-Live (Mes 6)',
  budget: '$250,000 - $300,000',
  risks: 'R1: Resistencia al cambio\nR2: Problemas en migración de datos\nR3: Disponibilidad de recursos clave',
  stakeholders: 'CFO, Director RH, Gerente Operaciones, Equipo IT, Usuarios finales',
  projectManager: 'Juan Rodríguez',
  sponsor: 'María Fernández (CFO)',
  status: 'Aprobado',
  version: '1.0',
  createdDate: '2024-01-10',
  approvedDate: '2024-01-15'
}
```

## Objetivos SMART

Los objetivos deben ser:
- **S**pecific (Específicos)
- **M**easurable (Medibles)
- **A**chievable (Alcanzables)
- **R**elevant (Relevantes)
- **T**ime-bound (Temporales)

## Futuras Mejoras

- 📄 Exportación a PDF
- 📄 Plantillas de charter
- 🔄 Historial de versiones
- 📧 Notificaciones por email
- 👥 Múltiples aprobadores
- 📅 Workflow de aprobación
- 🔔 Alertas de vencimiento
- 📈 Métricas de aprobación
- 💬 Comentarios y feedback
- 📎 Adjuntar archivos
- 🖊️ Firma digital real
- 📊 Dashboard de charters

## Notas Importantes

- ✅ El ID se genera automáticamente
- ✅ La fecha de creación es automática
- ✅ La fecha de aprobación se asigna al aprobar
- ✅ El estado inicial es "Borrador"
- ✅ Solo se puede enviar a revisión desde "Borrador"
- ✅ Solo se puede aprobar desde "En Revisión"
- ✅ Los charters se guardan en localStorage
- ✅ El modal de creación tiene scroll
- ✅ El modal de visualización tiene scroll
- ✅ Los badges tienen colores semánticos
- ✅ El presupuesto se muestra destacado
- ✅ Los objetivos, hitos y riesgos mantienen formato
