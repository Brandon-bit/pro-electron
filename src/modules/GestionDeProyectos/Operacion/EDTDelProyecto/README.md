# EDT - Estructura de Desglose del Trabajo

Módulo para construir la estructura jerárquica del proyecto mediante un árbol visual interactivo y generar el Diagrama de Gantt.

## Estructura del Módulo

```
EDTDelProyecto/
├── components/          # Componentes Vue del módulo
│   ├── ProjectSelector.vue  # Selector de proyecto
│   ├── EmptyState.vue       # Estado vacío
│   ├── EDTNode.vue          # Nodo individual del árbol
│   └── EDTTree.vue          # Árbol completo con instrucciones
├── composables/         # Lógica reutilizable
│   ├── useEDTActions.ts         # Acciones y generación de Gantt
│   └── mappingEDTData.ts        # Mapeo de datos API ↔ Frontend
├── services/            # Servicios de API
│   └── edtService.ts            # Llamadas HTTP al backend
├── store/               # Estado global con Pinia
│   └── edtStore.ts              # Store del árbol EDT
├── types/               # Definiciones de TypeScript
│   └── edtTypes.ts              # Tipos e interfaces
├── validations/         # Esquemas de validación
│   └── edtValidation.ts         # Validación con Zod
└── views/               # Vistas principales
    └── EDTView.vue              # Vista principal del módulo
```

## Características Principales

### 1. Selector de Proyecto
- ✅ Carga proyecto desde `localStorage` (enviado desde Priorización)
- ✅ Dropdown con proyectos disponibles
- ✅ Creación automática del nodo raíz al seleccionar

### 2. Árbol Jerárquico Visual

#### Estructura de Niveles
- **Nivel 0**: Proyecto (raíz) - Color accent
- **Nivel 1**: Etapas - Color primary
- **Nivel 2**: Actividades - Color secondary
- **Nivel 3**: Sub-actividades - Color base

#### Nodos
- ✅ Diseño tipo organigrama
- ✅ Colores diferenciados por nivel
- ✅ Etiqueta de nivel visible
- ✅ Líneas conectoras entre nodos
- ✅ Hover effects con botones de acción

### 3. Edición Inline
- ✅ **Doble clic** en nodo para editar nombre
- ✅ Input inline con autofocus
- ✅ Guardar con **Enter** o **blur**
- ✅ Cancelar con **Escape**
- ✅ Notificación de éxito

### 4. Gestión de Nodos

#### Agregar Nodos
- ✅ Botón **+** visible en hover
- ✅ Máximo 4 niveles (0-3)
- ✅ Nombres por defecto según nivel
- ✅ Agregar múltiples hijos

#### Eliminar Nodos
- ✅ Botón **🗑️** visible en hover
- ✅ No se puede eliminar el nodo raíz
- ✅ Elimina nodo y todos sus descendientes
- ✅ Notificación de confirmación

### 5. Visualización del Árbol

#### Líneas Conectoras
- ✅ Línea vertical desde padre
- ✅ Línea horizontal entre hermanos
- ✅ Líneas verticales individuales a cada hijo
- ✅ Color base-300 para las líneas

#### Layout
- ✅ Centrado horizontal
- ✅ Scroll horizontal para árboles grandes
- ✅ Espaciado de 8 unidades entre hermanos
- ✅ Padding de 8 unidades en contenedor

### 6. Generación de Gantt
- ✅ Botón "Generar Gantt" en header
- ✅ Conversión de árbol EDT a tareas
- ✅ Asignación de IDs secuenciales
- ✅ Preservación de jerarquía (parentId)
- ✅ Almacenamiento en localStorage
- ✅ Navegación automática a Gantt

### 7. Instrucciones Integradas
- ✅ Card con tips de uso
- ✅ Icono de bombilla
- ✅ Lista de acciones disponibles
- ✅ Fondo base-200 destacado

## Flujo de Trabajo

1. **Recibir Proyecto**: El proyecto llega desde Priorización vía localStorage
2. **Seleccionar**: Elegir el proyecto del dropdown
3. **Estructurar**: Crear la jerarquía con nodos
4. **Editar**: Personalizar nombres con doble clic
5. **Organizar**: Agregar/eliminar nodos según necesidad
6. **Generar Gantt**: Convertir estructura a diagrama de Gantt

## Integración con Otros Módulos

### Desde Priorización
```typescript
// El proyecto prioritario se envía así:
localStorage.setItem('edtProject', JSON.stringify(topProject))
```

### Hacia Diagrama de Gantt
```typescript
// Las tareas se envían así:
localStorage.setItem('ganttTasks', JSON.stringify(tasks))
localStorage.setItem('ganttProject', JSON.stringify(selectedProject))
```

## Componentes Base Utilizados

- `BaseTitle`: Título de página con subtítulo
- `BaseButton`: Botón "Generar Gantt"
- Inputs nativos de DaisyUI para edición inline
- Cards y badges de DaisyUI

## Características de UI

### Nodos
- ✅ Min width: 200px, Max width: 250px
- ✅ Padding: 1rem (16px)
- ✅ Border radius: 0.5rem (8px)
- ✅ Border: 2px sólido
- ✅ Hover: shadow-lg
- ✅ Cursor: pointer

### Colores por Nivel
```css
Nivel 0 (Proyecto):     bg-accent/20 border-accent
Nivel 1 (Etapas):       bg-primary/10 border-primary/30
Nivel 2 (Actividades):  bg-secondary/20 border-secondary
Nivel 3 (Sub-act):      bg-base-300/30 border-base-300
```

### Botones de Acción
- ✅ Opacity 0 por defecto
- ✅ Opacity 100 en hover del nodo
- ✅ Transición suave
- ✅ Tamaño xs (extra small)
- ✅ Iconos Material Symbols

### Líneas Conectoras
- ✅ Ancho: 0.5px (2px)
- ✅ Color: bg-base-300
- ✅ Altura vertical: 2rem (32px)
- ✅ Posicionamiento absoluto

## Ruta

La ruta está configurada en `/gestion-de-proyectos/edt-del-proyecto`

## API Endpoints

- `GET /gestion-proyectos/edt/:projectId` - Obtener nodos de un proyecto
- `POST /gestion-proyectos/edt` - Crear nodo
- `PUT /gestion-proyectos/edt/:id` - Actualizar nodo
- `DELETE /gestion-proyectos/edt/:id` - Eliminar nodo
- `POST /gestion-proyectos/edt/:projectId/guardar-arbol` - Guardar árbol completo

## Validaciones

Todas las validaciones están definidas en `validations/edtValidation.ts` usando Zod:
- Campos requeridos: name, projectId
- Rangos: level (0-3)
- Longitudes: name (3-100 caracteres)

## Datos Almacenados

### En localStorage
```typescript
// Proyecto para EDT (desde Priorización)
edtProject: ProjectData

// Tareas para Gantt (hacia Gantt)
ganttTasks: GanttTask[]
ganttProject: ProjectData
```

## Estructura de Datos

### Nodo EDT
```typescript
{
  id: string              // Único generado
  name: string            // Nombre editable
  level: number           // 0-3
  children: EDTNode[]     // Nodos hijos
  parentId: string | null // ID del padre
}
```

### Tarea Gantt
```typescript
{
  id: number              // Secuencial
  name: string            // Del nodo EDT
  level: number           // Del nodo EDT
  parentId: number | null // Jerarquía
  startDate: Date | null  // A definir en Gantt
  endDate: Date | null    // A definir en Gantt
  duration: number        // Días
  dependencies: number[]  // IDs de tareas
  responsible: string     // A asignar en Gantt
}
```

## Ejemplo de Uso

```vue
<script setup lang="ts">
import EDTView from '@/modules/GestionDeProyectos/EDTDelProyecto/views/EDTView.vue'
</script>

<template>
  <EDTView />
</template>
```

## Características Técnicas

- ✅ Árbol recursivo con componente EDTNode
- ✅ Estado reactivo con Pinia
- ✅ TypeScript estricto
- ✅ Validación con Zod
- ✅ Persistencia en localStorage
- ✅ Navegación programática
- ✅ Notificaciones toast
- ✅ Edición inline con eventos de teclado
- ✅ Generación automática de IDs únicos
- ✅ Conversión de árbol a lista plana

## Instrucciones de Usuario

1. **Editar**: Doble clic en cualquier nodo
2. **Agregar hijo**: Hover + botón **+** (máx 3 niveles)
3. **Eliminar**: Hover + botón **🗑️** (excepto raíz)
4. **Niveles**: Proyecto → Etapas → Actividades → Sub-actividades
