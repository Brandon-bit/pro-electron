# Control de Cambios

Módulo para gestión formal de solicitudes de cambio al proyecto con Kanban board, wizard de 3 pasos y estadísticas.

## Estructura del Módulo

```
ControlDeCambios/
├── components/          # Componentes Vue del módulo
│   ├── ChangeRequestModal.vue     # Modal wizard de 3 pasos
│   ├── KanbanBoard.vue            # Vista Kanban con 5 columnas
│   └── StatsCards.vue             # Cards de estadísticas
├── composables/         # Lógica reutilizable
│   └── useChangeActions.ts        # Acciones y helpers
├── store/               # Estado global con Pinia
│   └── changeStore.ts             # Store con solicitudes
├── types/               # Definiciones de TypeScript
│   └── changeTypes.ts             # Tipos e interfaces
└── views/               # Vistas principales
    └── ChangeControlView.vue      # Vista principal con tabs
```

## Características Principales

### 1. Vista Kanban (Tab 1)

#### 5 Columnas de Estado
1. **Abierta** - Solicitud recién creada
2. **En Análisis** - En evaluación
3. **Pendiente Aprobación** - Esperando decisión
4. **Aprobada** - Autorizada para implementación
5. **Implementada** - Cambio completado

#### Funcionalidades
- ✅ Grid responsive (1 col / 5 cols MD)
- ✅ Header con contador de solicitudes
- ✅ Cards con información básica
- ✅ Scroll vertical por columna (600px)
- ✅ Botones Aprobar/Rechazar en "Pendiente Aprobación"
- ✅ Hover con sombra
- ✅ Cursor pointer

#### Card de Solicitud
- ✅ ID (CR001, CR002...)
- ✅ Título (line-clamp-2)
- ✅ Solicitante
- ✅ Fecha de solicitud
- ✅ Botones de acción (si aplica)

### 2. Lista de Solicitudes (Tab 2)

#### Card Expandido por Solicitud
- ✅ Header con ID, badge de estado y fecha
- ✅ Título y descripción
- ✅ Grid 2 columnas: Justificación y Solicitante
- ✅ Divider
- ✅ Análisis de Impacto (5 campos en grid)
- ✅ Divider (si hay decisión)
- ✅ Decisión del aprobador (si existe)

#### Análisis de Impacto (5 Campos)
1. **Alcance** - Cómo afecta el alcance
2. **Cronograma** - Impacto en tiempo
3. **Costo** - Impacto económico
4. **Calidad** - Efecto en calidad
5. **Riesgos** - Riesgos asociados

### 3. Estadísticas (Tab 3)

#### 4 Cards de Métricas
1. **Total Solicitudes**
   - Número total
   - Icono: edit_document

2. **Pendientes**
   - Cantidad en "Pendiente Aprobación"
   - Icono: schedule (accent)

3. **Aprobadas**
   - Aprobadas + Implementadas
   - Icono: check_circle (success)

4. **Rechazadas**
   - Cantidad rechazada
   - Icono: thumb_down (error)

### 4. Modal Wizard (3 Pasos)

#### Paso 1: Información Básica
- ✅ Título del Cambio (input)
- ✅ Descripción Detallada (textarea 4 rows)
- ✅ Justificación (textarea 3 rows)
- ✅ Solicitante (input)
- ✅ Botón: "Siguiente: Análisis de Impacto"

#### Paso 2: Análisis de Impacto
- ✅ Impacto en Alcance (textarea 2 rows)
- ✅ Impacto en Cronograma (textarea 2 rows)
- ✅ Impacto en Costo (textarea 2 rows)
- ✅ Impacto en Calidad (textarea 2 rows)
- ✅ Riesgos Asociados (textarea 2 rows)
- ✅ Botón "Anterior"
- ✅ Botón: "Siguiente: Revisar"

#### Paso 3: Revisar y Enviar
- ✅ Card con resumen completo
- ✅ Título como card-title
- ✅ Descripción
- ✅ Justificación
- ✅ Solicitante
- ✅ Divider
- ✅ Análisis de Impacto (5 campos)
- ✅ Botón "Anterior"
- ✅ Botón: "Enviar a Aprobación"

#### Características del Wizard
- ✅ Título dinámico: "Solicitud de Cambio - Paso X de 3"
- ✅ Navegación entre pasos
- ✅ Botón submit con texto dinámico
- ✅ Reset al enviar
- ✅ BaseModal integrado

## Tipos

### ChangeRequestType
```typescript
{
  id: string
  title: string
  description: string
  justification: string
  requester: string
  dateRequested: string
  status: ChangeStatus
  impact: ImpactType
  approver?: string
  decision?: string
}
```

### ImpactType
```typescript
{
  scope: string
  schedule: string
  cost: string
  quality: string
  risks: string
}
```

### ChangeStatus
```typescript
'Abierta' | 'En Análisis' | 'Pendiente Aprobación' | 'Aprobada' | 'Rechazada' | 'Implementada'
```

## Store

### Estado
- `changeRequests`: Array de solicitudes
- `isModalOpen`: Estado del modal
- `currentStep`: Paso actual del wizard (1-3)

### Acciones
- `setChangeRequests(requests)`: Establecer solicitudes
- `addChangeRequest(newCR)`: Agregar solicitud
- `approveChangeRequest(id)`: Aprobar solicitud
- `rejectChangeRequest(id)`: Rechazar solicitud
- `updateStatus(id, status)`: Actualizar estado
- `openModal()`: Abrir modal (reset step)
- `closeModal()`: Cerrar modal (reset step)
- `setCurrentStep(step)`: Cambiar paso del wizard

### Getters
- `getRequestsByStatus(status)`: Solicitudes por estado
- `pendingRequests`: Solicitudes pendientes
- `approvedRequests`: Aprobadas + Implementadas
- `rejectedRequests`: Solicitudes rechazadas

## Composables

### useChangeActions
- `getStatusColor(status)`: Color del badge según estado
- `loadChangeRequests()`: Cargar desde localStorage
- `saveChangeRequests()`: Guardar en localStorage
- `handleApprove(id)`: Aprobar con notificación
- `handleReject(id)`: Rechazar con notificación

## Componentes

### ChangeRequestModal.vue
- ✅ BaseModal integrado
- ✅ Wizard de 3 pasos
- ✅ Título dinámico
- ✅ Navegación entre pasos
- ✅ Botón submit dinámico
- ✅ Validación básica
- ✅ Reset al enviar
- ✅ Watch para actualizar título

### KanbanBoard.vue
- ✅ Grid de 5 columnas
- ✅ Headers con contadores
- ✅ Cards por solicitud
- ✅ Scroll vertical
- ✅ Botones aprobar/rechazar
- ✅ Hover effects

### StatsCards.vue
- ✅ Grid de 4 cards
- ✅ Material icons
- ✅ Números grandes
- ✅ Getters del store

## Colores de Estado

### Badge Colors
```typescript
'Abierta': 'badge-info'           // Azul
'En Análisis': 'badge-warning'    // Amarillo
'Pendiente Aprobación': 'badge-accent'  // Naranja
'Aprobada': 'badge-success'       // Verde
'Rechazada': 'badge-error'        // Rojo
'Implementada': 'badge-primary'   // Morado
```

## Flujo de Trabajo

1. **Abrir Modal** → Click "Nueva Solicitud de Cambio"
2. **Paso 1** → Información básica
3. **Paso 2** → Análisis de impacto
4. **Paso 3** → Revisar y enviar
5. **Crear Solicitud** → Estado "Abierta"
6. **Vista Kanban** → Ver en columna "Abierta"
7. **Mover a Análisis** → Cambiar estado manualmente
8. **Mover a Pendiente** → Cambiar estado
9. **Aprobar/Rechazar** → Botones en Kanban
10. **Guardar** → Botón "Guardar"

## Persistencia

### LocalStorage Key
- `changeRequests`: Array de solicitudes

### Estructura Guardada
```typescript
[
  {
    id: string
    title: string
    description: string
    justification: string
    requester: string
    dateRequested: string (YYYY-MM-DD)
    status: ChangeStatus
    impact: {
      scope: string
      schedule: string
      cost: string
      quality: string
      risks: string
    }
    approver?: string
    decision?: string
  }
]
```

## Características de UI

### Header
- ✅ BaseTitle con icono edit_document
- ✅ Botón "Guardar" (outline)
- ✅ Botón "Nueva Solicitud de Cambio" (primary)
- ✅ Flex justify-between

### Tabs
- ✅ Tabs boxed (DaisyUI)
- ✅ 3 tabs
- ✅ Tab content con padding
- ✅ Cards dentro de tabs

### Kanban
- ✅ Grid responsive
- ✅ Headers con bg-base-200
- ✅ Scroll vertical por columna
- ✅ Cards con sombra
- ✅ Hover effects
- ✅ Botones en cards

### Lista
- ✅ Cards expandidos
- ✅ Grid 2 columnas para info
- ✅ Dividers
- ✅ Badges con colores
- ✅ Decisión condicional

### Modal
- ✅ BaseModal
- ✅ Max-width 3xl
- ✅ Scroll vertical
- ✅ Pasos condicionales (v-if)
- ✅ Botón "Anterior" en pasos 2 y 3
- ✅ Card de resumen en paso 3

### Cards de Stats
- ✅ Grid responsive (1/4 cols)
- ✅ Iconos Material
- ✅ Números grandes (text-2xl)
- ✅ Colores por tipo

## Ruta

La ruta está configurada en `/gestion-de-proyectos/control-de-cambios`

## Integración

### Con Proyectos
- ✅ Puede asociar a proyecto (futuro)
- ✅ Independiente por ahora

### Persistencia
- ✅ Guarda en localStorage
- ✅ Carga automática al montar
- ✅ Notificación al guardar
- ✅ Notificación al aprobar/rechazar

## Ejemplo de Uso

```vue
<script setup lang="ts">
import ChangeControlView from '@/modules/GestionDeProyectos/ControlDeCambios/views/ChangeControlView.vue'
</script>

<template>
  <ChangeControlView />
</template>
```

## Características Técnicas

- ✅ Estado reactivo con Pinia
- ✅ TypeScript estricto
- ✅ Computed properties para filtros
- ✅ Watch para modal y pasos
- ✅ Notificaciones toast
- ✅ Persistencia en localStorage
- ✅ Wizard multi-paso
- ✅ Navegación entre pasos
- ✅ Título dinámico
- ✅ Botón submit dinámico
- ✅ Colores por estado
- ✅ Badges con estilos
- ✅ Grid responsive
- ✅ Tabs con DaisyUI
- ✅ BaseModal integrado
- ✅ Material icons
- ✅ ID autogenerado (CR001, CR002...)
- ✅ Fecha automática (YYYY-MM-DD)

## Validaciones

### Modal
- ✅ Todos los campos opcionales
- ✅ Navegación libre entre pasos
- ✅ Reset al enviar
- ✅ Estado inicial "Abierta"

### Aprobación/Rechazo
- ✅ Solo en estado "Pendiente Aprobación"
- ✅ Asigna aprobador automáticamente
- ✅ Agrega decisión predefinida
- ✅ Notificación de éxito

## Wizard de 3 Pasos

### Navegación
```
Paso 1 → Paso 2 → Paso 3 → Submit
  ↑        ↑        ↑
  └────────┴────────┘
  (Botón Anterior)
```

### Botones por Paso
- **Paso 1**: "Siguiente: Análisis de Impacto"
- **Paso 2**: "Anterior" + "Siguiente: Revisar"
- **Paso 3**: "Anterior" + "Enviar a Aprobación"

### Título Dinámico
- "Solicitud de Cambio - Paso 1 de 3"
- "Solicitud de Cambio - Paso 2 de 3"
- "Solicitud de Cambio - Paso 3 de 3"

## Kanban Board

### Columnas
```
┌─────────┬─────────┬─────────┬─────────┬─────────┐
│ Abierta │ En      │ Pendiente│ Aprobada│ Imple-  │
│         │ Análisis│ Aprob.  │         │ mentada │
├─────────┼─────────┼─────────┼─────────┼─────────┤
│ [Card]  │ [Card]  │ [Card]  │ [Card]  │ [Card]  │
│         │         │ [Aprobar│         │         │
│         │         │  Rechazar│         │         │
└─────────┴─────────┴─────────┴─────────┴─────────┘
```

### Scroll
- Max-height: 600px
- Overflow-y: auto
- Por columna independiente

## Análisis de Impacto

### 5 Dimensiones
1. **Alcance** - Cambios en entregables
2. **Cronograma** - Impacto en fechas
3. **Costo** - Impacto económico
4. **Calidad** - Efecto en estándares
5. **Riesgos** - Nuevos riesgos o mitigación

### Ejemplos
- **Cronograma**: "+3 semanas", "-5 días", "Sin impacto"
- **Costo**: "+$15,000", "-$2,000", "Sin impacto"
- **Alcance**: "Incremento: Nuevo módulo", "Reducción: Eliminar feature"

## Datos de Ejemplo

### Solicitud por Defecto
```typescript
{
  id: 'CR001',
  title: 'Añadir módulo de reportes personalizados',
  description: 'Implementar funcionalidad para que usuarios creen reportes personalizados',
  justification: 'Solicitud del cliente principal para mejorar análisis de datos',
  requester: 'María García',
  dateRequested: '2024-01-15',
  status: 'Pendiente Aprobación',
  impact: {
    scope: 'Incremento: Nuevo módulo completo de reportes',
    schedule: '+3 semanas al cronograma',
    cost: '+$15,000 en desarrollo',
    quality: 'Requiere testing extensivo',
    risks: 'Posible conflicto con módulo existente de informes'
  }
}
```

## Decisiones de Aprobación

### Aprobar
```typescript
{
  status: 'Aprobada',
  approver: 'Director PMO',
  decision: 'Aprobada para implementación'
}
```

### Rechazar
```typescript
{
  status: 'Rechazada',
  approver: 'Director PMO',
  decision: 'No alineado con objetivos actuales'
}
```

## Futuras Mejoras

- 📊 Gráfica de tendencias
- 📊 Distribución por categoría
- 📄 Exportación a PDF
- 📄 Exportación a Excel
- 🔄 Historial de cambios de estado
- 📧 Notificaciones por email
- 👥 Múltiples aprobadores
- 📅 Fechas de implementación
- 🔔 Alertas de vencimiento
- 📈 Métricas de tiempo de aprobación
- 🏷️ Categorías de cambio
- 💬 Comentarios y discusión
- 📎 Adjuntar archivos

## Notas Importantes

- ✅ El wizard guarda el estado del paso actual
- ✅ Los colores son dinámicos según el estado
- ✅ El Kanban se actualiza en tiempo real
- ✅ Las solicitudes se guardan en localStorage
- ✅ El modal se resetea al cerrar
- ✅ Las tabs usan radio buttons de DaisyUI
- ✅ Los badges tienen colores semánticos
- ✅ La lista es scrollable
- ✅ Los botones de aprobación solo aparecen en "Pendiente Aprobación"
- ✅ El ID se genera automáticamente
- ✅ La fecha se genera automáticamente
- ✅ El estado inicial es "Abierta"
