# Módulo: Configuración de Prospectos

Vista para gestionar sectores y estatus de seguimiento utilizados en el formulario de prospectos.

## Estructura de Carpetas

```
Prospectos/
├── components/
│   └── AddItemModal.vue            # Modal reutilizable para agregar items
├── composables/
│   └── useProspectConfig.ts        # Lógica para manejo de configuración
├── types/
│   └── prospectConfigTypes.ts      # Tipos TypeScript
├── views/
│   └── ProspectConfigView.vue      # Vista principal
├── index.ts                        # Exports del módulo
└── README.md                       # Documentación
```

## Características Principales

### Vista Principal (ProspectConfigView)

**Layout:**
- ✅ Título: "Configuración de Prospectos"
- ✅ Grid de 2 columnas (responsive)
- ✅ Tarjeta izquierda: Sectores
- ✅ Tarjeta derecha: Estatus de Seguimiento

**Cada Tarjeta Contiene:**
- ✅ Título centrado (Sectores / Estatus de Seguimiento)
- ✅ Botón "Agregar" (azul, pequeño)
- ✅ Tabla con 3 columnas: #, Descripción, Acciones
- ✅ Botón X rojo para eliminar
- ✅ Mensaje cuando no hay datos

**Tabla:**

Columnas:
1. **#** - Número de fila (1, 2, 3...)
2. **Descripción** - Nombre del sector/estatus
3. **Acciones** - Botón X rojo para eliminar

**Características:**
- ✅ Header con fondo oscuro
- ✅ Filas compactas (table-sm)
- ✅ Botón eliminar con confirmación
- ✅ Responsive (1 columna en mobile, 2 en desktop)

### Modal: Agregar Item (AddItemModal)

**Características:**
- ✅ Usa BaseModal component
- ✅ Usa BaseFormInput component
- ✅ Título dinámico: "Agregar Sector" o "Agregar Estatus"
- ✅ Un solo campo: "Descripción"
- ✅ Placeholder: "Ingrese la descripción"
- ✅ Enter para enviar
- ✅ Validación: campo no vacío
- ✅ Emite evento 'confirm' con la descripción
- ✅ Reset al cerrar

**Reutilización:**
- El mismo modal se usa para sectores y estatus
- El título cambia dinámicamente según el contexto
- La lógica de guardado se maneja en el componente padre

## Tipos de Datos

### Sector
```typescript
{
    id: string | number
    descripcion: string
}
```

### EstatusSeguimiento
```typescript
{
    id: string | number
    descripcion: string
}
```

### ConfigType
```typescript
type ConfigType = 'sector' | 'estatus'
```

## Componentes Utilizados

- **BaseTitle** - Título de página
- **BaseModal** - Modal estándar del sistema
- **BaseFormInput** - Input del formulario

## Flujo de Trabajo

### Agregar Sector
1. Click en "Agregar" en la tarjeta de Sectores
2. Se abre modal con título "Agregar Sector"
3. Ingresar descripción
4. Click en "Aceptar" o Enter
5. Se cierra modal
6. Se agrega fila a la tabla de Sectores

### Agregar Estatus
1. Click en "Agregar" en la tarjeta de Estatus de Seguimiento
2. Se abre modal con título "Agregar Estatus"
3. Ingresar descripción
4. Click en "Aceptar" o Enter
5. Se cierra modal
6. Se agrega fila a la tabla de Estatus

### Eliminar Item
1. Click en botón X rojo
2. Aparece confirmación
3. Click en "Aceptar"
4. Se elimina la fila

## Ejemplo de Datos Mock

### Sectores
```typescript
[
    { id: 1, descripcion: 'Sector 1' },
    { id: 2, descripcion: 'Sector 2' }
]
```

### Estatus de Seguimiento
```typescript
[
    { id: 1, descripcion: 'Estatus 1' },
    { id: 2, descripcion: 'Estatus 2' }
]
```

## Estado Actual

✅ **Completado**
- Estructura de carpetas
- Vista con grid de 2 columnas
- Tarjetas para Sectores y Estatus
- Tablas con 3 columnas
- Modal reutilizable
- Botón agregar por cada sección
- Botón eliminar con confirmación
- Composable con lógica
- Mock data
- Responsive design
- Título dinámico en modal

⏳ **Pendiente**
- Integración con API real
- Edición de items
- Validaciones adicionales
- Ordenamiento de items
- Búsqueda/filtrado
- Exportar configuración
- Notificaciones toast

## Diseño Responsive

- **Mobile (< 1024px):** 1 columna (tarjetas apiladas)
- **Desktop (≥ 1024px):** 2 columnas (lado a lado)

Ambas tarjetas tienen el mismo tamaño y estilo.

## Uso en Formulario de Prospectos

Los sectores y estatus configurados aquí se utilizan como opciones en:
- Select de "Sector" en el formulario de prospectos
- Select de "Estatus de Seguimiento" en el formulario de prospectos

Esto permite que los usuarios personalicen las opciones disponibles según sus necesidades.
