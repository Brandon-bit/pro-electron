# Minutas

Módulo para registro de reuniones, decisiones y acciones con gestión de asistentes, ausentes y action items.

## Estructura del Módulo

```
Minutas/
├── components/          # Componentes Vue del módulo
│   ├── CreateMinuteModal.vue      # Modal para crear minuta
│   └── ActionsTable.vue           # Tabla de acciones pendientes
├── composables/         # Lógica reutilizable
│   └── useMinuteActions.ts        # Acciones y helpers
├── store/               # Estado global con Pinia
│   └── minuteStore.ts             # Store con minutas
├── types/               # Definiciones de TypeScript
│   └── minuteTypes.ts             # Tipos e interfaces
└── views/               # Vistas principales
    └── MinutesView.vue            # Vista con 2 tabs
```

## Características Principales

### 1. Tab: Minutas

#### Card por Minuta
- ✅ Header con título y badge "Distribuida"
- ✅ Fecha y hora de la reunión
- ✅ Grid 2 columnas: Asistentes y Ausentes
- ✅ Agenda (pre-formatted)
- ✅ Discusión
- ✅ Decisiones (pre-formatted)
- ✅ Acciones Acordadas con badges de estado
- ✅ Botón "Distribuir Minuta por Email"

#### Secciones de la Minuta
1. **Header** - Título, badge distribuida, fecha/hora
2. **Asistentes** - Badges con icono person
3. **Ausentes** - Badges outline (si hay)
4. **Agenda** - Pre-formatted text
5. **Discusión** - Texto normal
6. **Decisiones** - Pre-formatted text
7. **Acciones Acordadas** - Lista con badges de estado
8. **Botón Distribuir** - Si no está distribuida

### 2. Tab: Acciones Pendientes

#### Tabla de Action Items
- ✅ Columnas: ID, Acción, Minuta Origen, Responsable, Fecha Límite, Estado
- ✅ Todas las acciones de todas las minutas
- ✅ Badges de estado con colores
- ✅ Tabla zebra con DaisyUI
- ✅ Scroll horizontal

### 3. Modal de Creación

#### 9 Campos del Formulario
1. **Título / Tema de la Reunión** (input)
2. **Fecha** (date input)
3. **Hora** (input text)
4. **Asistentes Presentes** (input + botón añadir)
5. **Ausentes** (input + botón añadir)
6. **Agenda** (textarea 3 rows)
7. **Puntos Discutidos** (textarea 4 rows)
8. **Decisiones Tomadas** (textarea 3 rows)
9. **Acciones Acordadas** (formulario anidado)

#### Gestión de Asistentes/Ausentes
- ✅ Input con botón "Añadir"
- ✅ Enter para añadir
- ✅ Badges con botón eliminar (✕)
- ✅ Asistentes: badge-secondary
- ✅ Ausentes: badge-outline

#### Gestión de Acciones Acordadas
**Formulario de Acción:**
- ✅ Descripción de la Acción (input)
- ✅ Responsable (input, placeholder: @nombre)
- ✅ Fecha Límite (date input)
- ✅ Botón "Añadir Acción" con icono check_box

**Lista de Acciones Agregadas:**
- ✅ Cards con bg-base-200
- ✅ Descripción
- ✅ Responsable y fecha límite
- ✅ Botón eliminar con icono delete
- ✅ Título: "Acciones agregadas:"

#### Características del Modal
- ✅ BaseModal integrado
- ✅ Scroll vertical (max-h-70vh)
- ✅ Grid 2 columnas para fecha/hora
- ✅ Border-top para sección de acciones
- ✅ Botón: "Guardar Minuta"
- ✅ Reset al guardar

## Tipos

### MinuteType
```typescript
{
  id: string
  title: string
  date: string
  time: string
  attendees: string[]
  absentees: string[]
  agenda: string
  discussion: string
  decisions: string
  actionItems: ActionItemType[]
  distributed: boolean
}
```

### ActionItemType
```typescript
{
  id: string
  description: string
  responsible: string
  dueDate: string
  status: ActionStatus
}
```

### ActionStatus
```typescript
'Pendiente' | 'En Progreso' | 'Completada'
```

### ActionItemWithMinute
```typescript
ActionItemType & {
  minuteId: string
  minuteTitle: string
}
```

## Store

### Estado
- `minutes`: Array de minutas
- `isModalOpen`: Estado del modal

### Acciones
- `setMinutes(minutes)`: Establecer minutas
- `addMinute(newMinute)`: Agregar minuta
- `distributeMinute(id)`: Marcar como distribuida
- `openModal()`: Abrir modal
- `closeModal()`: Cerrar modal

### Getters
- `allActionItems`: Todas las acciones con info de minuta
- `pendingActions`: Acciones no completadas

## Composables

### useMinuteActions
- `getActionStatusColor(status)`: Color del badge según estado
- `loadMinutes()`: Cargar desde localStorage
- `saveMinutes()`: Guardar en localStorage
- `handleDistribute(id)`: Distribuir con notificación

## Componentes

### CreateMinuteModal.vue
- ✅ BaseModal integrado
- ✅ Formulario extenso (9 campos)
- ✅ Gestión de asistentes/ausentes
- ✅ Gestión de acciones acordadas
- ✅ Badges con botón eliminar
- ✅ Lista de acciones agregadas
- ✅ Scroll vertical
- ✅ Reset al guardar
- ✅ 337 líneas

### ActionsTable.vue
- ✅ Tabla con DaisyUI
- ✅ 6 columnas
- ✅ Badges de estado
- ✅ Scroll horizontal
- ✅ Zebra striping

### MinutesView.vue
- ✅ Header con botones
- ✅ 2 tabs (Minutas, Acciones Pendientes)
- ✅ Cards por minuta
- ✅ Tabla de acciones
- ✅ Modal incluido

## Colores de Estado

### Badge Colors
```typescript
'Pendiente': 'badge-warning'     // Amarillo
'En Progreso': 'badge-info'      // Azul
'Completada': 'badge-success'    // Verde
```

## Flujo de Trabajo

1. **Click "Nueva Minuta"** → Abrir modal
2. **Llenar Información Básica** → Título, fecha, hora
3. **Añadir Asistentes** → Input + Enter o botón
4. **Añadir Ausentes** → Input + Enter o botón
5. **Completar Agenda** → Textarea
6. **Completar Discusión** → Textarea
7. **Completar Decisiones** → Textarea
8. **Añadir Acciones** → Formulario anidado
9. **Guardar Minuta** → Estado distributed: false
10. **Ver en Lista** → Card con toda la info
11. **Distribuir** → Marcar como distribuida
12. **Ver Acciones** → Tab "Acciones Pendientes"

## Persistencia

### LocalStorage Key
- `minutes`: Array de minutas

### Estructura Guardada
```typescript
[
  {
    id: string
    title: string
    date: string (YYYY-MM-DD)
    time: string (HH:MM - HH:MM)
    attendees: string[]
    absentees: string[]
    agenda: string
    discussion: string
    decisions: string
    actionItems: [
      {
        id: string
        description: string
        responsible: string
        dueDate: string (YYYY-MM-DD)
        status: ActionStatus
      }
    ]
    distributed: boolean
  }
]
```

## Características de UI

### Header
- ✅ BaseTitle con icono description
- ✅ Botón "Guardar" (outline)
- ✅ Botón "Nueva Minuta" (primary)
- ✅ Flex justify-between

### Tabs
- ✅ Tabs boxed (DaisyUI)
- ✅ 2 tabs (Minutas, Acciones Pendientes)
- ✅ Tab content con padding
- ✅ Radio buttons

### Cards de Minuta
- ✅ Header con título y badges
- ✅ Fecha/hora con icono event
- ✅ Grid 2 columnas para asistentes/ausentes
- ✅ Badges con iconos
- ✅ Pre-formatted text
- ✅ Lista de acciones con borders
- ✅ Botón distribuir condicional

### Modal de Creación
- ✅ BaseModal
- ✅ Max-height con scroll
- ✅ Grid 2 columnas
- ✅ Input + botón para listas
- ✅ Badges con botón eliminar
- ✅ Formulario anidado para acciones
- ✅ Lista de acciones agregadas
- ✅ Border-top para secciones

### Tabla de Acciones
- ✅ Tabla zebra
- ✅ 6 columnas
- ✅ Badges de estado
- ✅ Scroll horizontal
- ✅ Max-width para descripción

## Ruta

La ruta está configurada en `/gestion-de-proyectos/minutas`

## Integración

### Con Proyectos
- ✅ Puede asociar a proyecto (futuro)
- ✅ Independiente por ahora

### Persistencia
- ✅ Guarda en localStorage
- ✅ Carga automática al montar
- ✅ Notificación al guardar
- ✅ Notificación al distribuir

## Ejemplo de Uso

```vue
<script setup lang="ts">
import MinutesView from '@/modules/GestionDeProyectos/Minutas/views/MinutesView.vue'
</script>

<template>
  <MinutesView />
</template>
```

## Características Técnicas

- ✅ Estado reactivo con Pinia
- ✅ TypeScript estricto
- ✅ Computed properties para filtros
- ✅ Watch para modal
- ✅ Notificaciones toast
- ✅ Persistencia en localStorage
- ✅ Formulario extenso
- ✅ Gestión de listas dinámicas
- ✅ Colores por estado
- ✅ Badges con estilos
- ✅ Grid responsive
- ✅ Tabs con DaisyUI
- ✅ BaseModal integrado
- ✅ Material icons
- ✅ ID autogenerado (MIN001, AI001...)
- ✅ Estado inicial distributed: false
- ✅ Pre-formatted text (whitespace-pre-wrap)

## Validaciones

### Modal de Creación
- ✅ Todos los campos opcionales
- ✅ Asistentes/ausentes pueden estar vacíos
- ✅ Acciones pueden estar vacías
- ✅ Reset al guardar
- ✅ Estado inicial distributed: false

### Distribución
- ✅ Solo si no está distribuida
- ✅ Botón visible solo si distributed: false
- ✅ Notificación de éxito

## Gestión de Listas

### Asistentes
- **Añadir**: Input + botón o Enter
- **Visualizar**: Badges con icono person
- **Eliminar**: Botón ✕ en badge
- **Estilo**: badge-secondary

### Ausentes
- **Añadir**: Input + botón o Enter
- **Visualizar**: Badges outline
- **Eliminar**: Botón ✕ en badge
- **Estilo**: badge-outline

### Acciones Acordadas
- **Añadir**: Formulario con 3 campos
- **Visualizar**: Cards con bg-base-200
- **Eliminar**: Botón con icono delete
- **ID**: Autogenerado (AI001, AI002...)
- **Estado**: Inicial "Pendiente"

## Formato de Datos

### Pre-formatted Text
```typescript
<pre class="text-sm opacity-70 whitespace-pre-wrap font-sans">
  {{ minute.agenda }}
</pre>
```

Permite:
- Saltos de línea
- Listas numeradas
- Formato de texto

### Ejemplos
**Agenda:**
```
1. Presentación del proyecto
2. Definición de roles y responsabilidades
3. Revisión del cronograma inicial
4. Próximos pasos
```

**Decisiones:**
```
D1: Implementación será en 3 fases
D2: Sesiones semanales de seguimiento los lunes 9am
D3: Plan de comunicación será responsabilidad de Ana
```

## Datos de Ejemplo

### Minuta por Defecto
```typescript
{
  id: 'MIN001',
  title: 'Reunión de Kickoff - Proyecto ERP',
  date: '2024-01-20',
  time: '10:00 - 11:30',
  attendees: ['Juan Pérez (PM)', 'María García', 'Carlos López', 'Ana Martínez'],
  absentees: ['Roberto Sánchez'],
  agenda: '1. Presentación del proyecto\n2. Definición de roles y responsabilidades\n3. Revisión del cronograma inicial\n4. Próximos pasos',
  discussion: 'Se presentó el alcance general del proyecto ERP. Se discutió la estrategia de implementación por fases y la importancia de la gestión del cambio.',
  decisions: 'D1: Implementación será en 3 fases\nD2: Sesiones semanales de seguimiento los lunes 9am\nD3: Plan de comunicación será responsabilidad de Ana',
  actionItems: [
    { id: 'AI001', description: 'Preparar plan detallado de proyecto', responsible: 'Juan Pérez', dueDate: '2024-01-27', status: 'En Progreso' },
    { id: 'AI002', description: 'Identificar stakeholders clave', responsible: 'María García', dueDate: '2024-01-25', status: 'Completada' }
  ],
  distributed: true
}
```

## Tabla de Acciones Pendientes

### Columnas
1. **ID** - Identificador único (AI001, AI002...)
2. **Acción** - Descripción (max-width)
3. **Minuta Origen** - Título de la minuta
4. **Responsable** - Persona asignada
5. **Fecha Límite** - Fecha de vencimiento
6. **Estado** - Badge con color

### Características
- ✅ Todas las acciones de todas las minutas
- ✅ Flat map de action items
- ✅ Info de minuta origen
- ✅ Badges de estado
- ✅ Scroll horizontal
- ✅ Zebra striping

## Futuras Mejoras

- 📄 Exportación a PDF
- 📄 Plantillas de minuta
- 🔄 Historial de versiones
- 📧 Envío real por email
- 👥 Notificaciones a asistentes
- 📅 Integración con calendario
- 🔔 Alertas de acciones vencidas
- 📈 Dashboard de acciones
- 💬 Comentarios en acciones
- 📎 Adjuntar archivos
- 🔄 Actualizar estado de acciones
- 📊 Métricas de cumplimiento

## Notas Importantes

- ✅ El ID de minuta se genera automáticamente
- ✅ El ID de acción se genera automáticamente
- ✅ El estado inicial de acción es "Pendiente"
- ✅ El estado inicial de minuta es distributed: false
- ✅ Los asistentes y ausentes son arrays de strings
- ✅ Las acciones acordadas son arrays de objetos
- ✅ La agenda y decisiones mantienen formato
- ✅ El botón distribuir solo aparece si no está distribuida
- ✅ La tabla muestra todas las acciones de todas las minutas
- ✅ Los badges tienen colores semánticos
- ✅ El modal tiene scroll vertical
- ✅ Las listas se pueden añadir con Enter
- ✅ Los badges tienen botón eliminar
