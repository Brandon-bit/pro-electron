# Módulo de Estrategia de Campañas y Gestión de Proyectos

## 📋 Descripción

Módulo completo de Vue 3 + TypeScript + Pinia para gestionar campañas estratégicas de marketing y sus proyectos asociados mediante tableros Kanban con drag & drop.

## 🏗️ Estructura del Módulo

```
EstrategiaCampanias/
├── types/
│   └── estrategiaTypes.ts          # Interfaces TypeScript
├── services/
│   └── marketingService.ts         # Servicios API
└── views/
    ├── EstrategiaView.vue          # Vista de Campañas
    └── GestionProyectosView.vue    # Vista Kanban

store/
└── marketing_estrategia.ts         # Store de Pinia
```

## 🔌 Endpoints del Backend

### Campañas Estratégicas
**Base URL:** `/api/marketing/campanias-estrategia`

- `GET /marca/{idMarca}` - Obtener campañas por marca
- `POST /` - Crear campaña
- `GET /{id}` - Obtener campaña específica
- `PUT /{id}` - Actualizar campaña
- `DELETE /{id}` - Eliminar campaña
- `GET /{id}/metricas` - Obtener métricas de campaña

### Proyectos y Kanban
**Base URL:** `/api/marketing/proyectos-gestion`

- `GET /{idProyecto}/kanban` - Obtener tablero Kanban
- `POST /{idProyecto}/tareas` - Crear tarea
- `PUT /tareas/{idTarea}` - Actualizar tarea (drag & drop)
- `DELETE /tareas/{idTarea}` - Eliminar tarea
- `GET /{id}` - Obtener proyecto específico

## 📦 Tipos de Datos

### Campaña
```typescript
interface Campania {
  id: string | number;
  nombre: string;
  descripcion?: string;
  presupuesto: number;
  fechaInicio: string;
  fechaFin: string;
  estado: 'planificacion' | 'activa' | 'pausada' | 'finalizada';
  idMarca: string | number;
  idProyecto?: string | number;
  proyectoAsociado?: ProyectoResumen;
}
```

### Kanban
```typescript
interface KanbanResponse {
  proyecto: Proyecto;
  columnas: KanbanColumna[];
}

interface KanbanColumna {
  estado: string;
  titulo: string;
  orden: number;
  tareas: Tarea[];
}

interface Tarea {
  id: string | number;
  titulo: string;
  descripcion?: string;
  estado: string;
  prioridad: 'baja' | 'media' | 'alta' | 'urgente';
  asignadoA?: string;
  fechaVencimiento?: string;
  orden: number;
}
```

## 🚀 Uso del Store

### Inicializar Store
```typescript
import { useMarketingEstrategiaStore } from '@/store/marketing_estrategia';

const estrategiaStore = useMarketingEstrategiaStore();

// Establecer marca actual
estrategiaStore.setCurrentAccount('marca-id');
```

### Campañas
```typescript
// Cargar campañas
await estrategiaStore.fetchCampanias();

// Crear campaña
await estrategiaStore.createCampania({
  Nombre: 'Campaña Verano 2024',
  Descripcion: 'Campaña de verano',
  Presupuesto: 50000,
  FechaInicio: '2024-06-01',
  FechaFin: '2024-08-31'
});

// Ver métricas
const metricas = await estrategiaStore.fetchMetricasCampania(campaniaId);
```

### Kanban
```typescript
// Cargar tablero
await estrategiaStore.fetchKanbanBoard(proyectoId);

// Crear tarea
await estrategiaStore.createTarea(proyectoId, {
  Titulo: 'Diseñar banner',
  Descripcion: 'Banner para redes sociales',
  Estado: 'por_hacer',
  Prioridad: 'alta'
});

// Mover tarea (drag & drop)
await estrategiaStore.updateTareaStatus(tareaId, 'en_proceso');
```

## 🎨 Componentes Vue

### EstrategiaView.vue

**Ruta:** `/marketing/estrategia`

**Características:**
- ✅ Grid responsivo de cards de campañas
- ✅ Selector de marca
- ✅ Modal de creación de campaña
- ✅ Modal de métricas con estadísticas
- ✅ Navegación a proyecto asociado
- ✅ Badges de estado con colores
- ✅ Formato de moneda y fechas

**Props:**
Ninguna (usa route params y store)

**Eventos:**
- Navegación a `/marketing/proyectos/{id}`

### GestionProyectosView.vue

**Ruta:** `/marketing/proyectos/:id`

**Características:**
- ✅ Tablero Kanban con columnas dinámicas
- ✅ Drag & Drop nativo (HTML5 API)
- ✅ Optimistic updates
- ✅ Modal de creación de tareas
- ✅ Badges de prioridad y fecha de vencimiento
- ✅ Edición y eliminación de tareas
- ✅ Indicador visual de tareas vencidas

**Drag & Drop:**
```typescript
// Al soltar una tarea en otra columna:
1. Actualiza UI inmediatamente (optimistic)
2. Llama al backend
3. Si falla, revierte cambios
```

## 📱 Rutas de Vue Router

Agregar al router:

```typescript
{
  path: '/marketing/estrategia',
  name: 'EstrategiaCampanias',
  component: () => import('@/modules/Marketing/EstrategiaCampanias/views/EstrategiaView.vue'),
  meta: { requiresAuth: true }
},
{
  path: '/marketing/proyectos/:id',
  name: 'GestionProyectos',
  component: () => import('@/modules/Marketing/EstrategiaCampanias/views/GestionProyectosView.vue'),
  meta: { requiresAuth: true }
}
```

## 🎯 Flujo de Trabajo

### Flujo de Campaña
```
1. Usuario selecciona marca
   ↓
2. Store carga campañas de la marca
   ↓
3. Usuario ve grid de campañas
   ↓
4. Click "Nueva Campaña" → Modal
   ↓
5. Completa formulario y guarda
   ↓
6. Backend crea campaña
   ↓
7. Store actualiza lista
   ↓
8. Nueva campaña aparece en grid
```

### Flujo de Kanban
```
1. Usuario click "Ir a Proyecto"
   ↓
2. Navega a /marketing/proyectos/{id}
   ↓
3. Store carga tablero Kanban
   ↓
4. Usuario ve columnas con tareas
   ↓
5. Drag tarea a otra columna
   ↓
6. UI actualiza inmediatamente
   ↓
7. Backend persiste cambio
   ↓
8. Si falla, revierte UI
```

## 🔐 Autenticación

El módulo usa JWT automáticamente:
- Token se inyecta en headers via `axiosApiInstance`
- Backend extrae `accountId` de los claims del token
- No es necesario enviar `accountId` en los requests

## 🎨 Estilos y UI

**Librería:** DaisyUI + Tailwind CSS

**Iconos:** lucide-vue-next

**Badges de Estado:**
- `planificacion` → `badge-info` (azul)
- `activa` → `badge-success` (verde)
- `pausada` → `badge-warning` (amarillo)
- `finalizada` → `badge-ghost` (gris)

**Badges de Prioridad:**
- `urgente` → `badge-error` (rojo)
- `alta` → `badge-warning` (amarillo)
- `media` → `badge-info` (azul)
- `baja` → `badge-ghost` (gris)

## 🐛 Manejo de Errores

Todos los servicios tienen try-catch:
```typescript
try {
  await estrategiaStore.createCampania(data);
  alert('Campaña creada exitosamente');
} catch (error) {
  console.error('Error:', error);
  alert('Error al crear la campaña');
}
```

## ⚡ Optimistic Updates

El drag & drop usa optimistic updates:
1. Actualiza UI inmediatamente
2. Llama al backend en paralelo
3. Si falla, recarga tablero para revertir

```typescript
async updateTareaStatus(tareaId, nuevoEstado) {
  // 1. Optimistic: Actualizar UI
  // ... mover tarea en el store ...
  
  try {
    // 2. Persistir en backend
    await marketingService.updateTarea(tareaId, { Estado: nuevoEstado });
  } catch (error) {
    // 3. Revertir si falla
    await this.fetchKanbanBoard(proyectoId);
  }
}
```

## 📊 Métricas Disponibles

El modal de métricas muestra:
- **ROI** - Retorno de inversión (%)
- **Total Inversiones** - Monto invertido
- **Conversiones** - Número de conversiones
- **Tasa de Conversión** - Porcentaje
- **Alcance** - Personas alcanzadas
- **Métricas Detalladas** - Array de métricas custom

## 🔄 Reactividad

Usa `storeToRefs` para mantener reactividad:
```typescript
const { campanias, kanbanBoard, isLoading } = storeToRefs(estrategiaStore);
```

## 🚦 Estados de Carga

Ambas vistas manejan 3 estados:
1. **Loading** - Spinner mientras carga
2. **Empty** - Mensaje cuando no hay datos
3. **Success** - Muestra datos

## 🎓 Mejores Prácticas

✅ **Tipos Estrictos** - TypeScript en todo el módulo
✅ **Validación** - Formularios validan campos requeridos
✅ **Feedback** - Alertas de éxito/error
✅ **Responsive** - Grid adapta a diferentes pantallas
✅ **Accesibilidad** - Titles en botones, labels correctos
✅ **Performance** - Lazy loading de rutas
✅ **Mantenibilidad** - Código modular y documentado

## 📝 Notas Importantes

1. **PascalCase en DTOs** - Backend .NET usa PascalCase
2. **JWT Automático** - No enviar `accountId` manualmente
3. **Optimistic Updates** - Solo en operaciones frecuentes (drag & drop)
4. **Error Boundaries** - Todos los async tienen try-catch
5. **Formato de Fechas** - ISO 8601 para compatibilidad

## 🔧 Extensiones Futuras

- [ ] Filtros y búsqueda en campañas
- [ ] Edición inline de tareas
- [ ] Subtareas y checklists
- [ ] Comentarios en tareas
- [ ] Notificaciones de vencimiento
- [ ] Exportar métricas a PDF/Excel
- [ ] Gráficos de métricas con Chart.js
- [ ] Timeline de actividad del proyecto

## 📚 Referencias

- [Vue 3 Composition API](https://vuejs.org/guide/introduction.html)
- [Pinia Store](https://pinia.vuejs.org/)
- [DaisyUI Components](https://daisyui.com/components/)
- [HTML5 Drag and Drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)
