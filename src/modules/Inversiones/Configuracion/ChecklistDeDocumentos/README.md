# Módulo: Checklist de Documentos Requeridos

Vista para gestionar la lista de documentos requeridos para prospectos.

## Estructura de Carpetas

```
ChecklistDeDocumentos/
├── components/
│   └── AddDocumentoModal.vue       # Modal para agregar documentos
├── composables/
│   └── useChecklist.ts             # Lógica para manejo de documentos
├── types/
│   └── checklistTypes.ts           # Tipos TypeScript
├── views/
│   └── ChecklistView.vue           # Vista principal
├── index.ts                        # Exports del módulo
└── README.md                       # Documentación
```

## Características Principales

### Vista Principal (ChecklistView)

**Layout:**
- ✅ Título: "Checklist de Documentos Requeridos"
- ✅ Botón "Agregar" (azul) en la parte superior
- ✅ Subtítulo: "Lista de Documentos Requeridos"
- ✅ Tabla simple (no paginada)

**Tabla:**

Columnas:
1. **#** - Número de fila
2. **Nombre del Documento** - Input editable/readonly
3. **Estado** - Badge (Activo/Inactivo)
4. **Acciones** - 3 botones

**Botones de Acción:**
1. **Editar/Guardar** (azul/verde)
   - Editar: Habilita el input
   - Guardar: Guarda cambios y deshabilita input

2. **Toggle Estado** (amarillo)
   - Icono: toggle_on / toggle_off
   - Alterna entre Activo/Inactivo
   - Sin confirmación

3. **Eliminar** (rojo)
   - Icono: delete
   - Con confirmación

**Características:**
- ✅ Inputs readonly por defecto (estilo ghost)
- ✅ Badge verde para "Activo"
- ✅ Badge rojo para "Inactivo"
- ✅ Confirmación antes de eliminar
- ✅ Mensaje cuando no hay documentos
- ✅ Loading state

### Modal: Agregar Documento (AddDocumentoModal)

**Características:**
- ✅ Usa BaseModal component
- ✅ Usa BaseFormInput component
- ✅ Título: "Nuevo Documento Requerido"
- ✅ Un campo: "Nombre del Documento"
- ✅ Placeholder: "Nombre del documento requerido"
- ✅ Enter para enviar
- ✅ Validación: campo no vacío
- ✅ Emite evento 'confirm' con el nombre

## Tipos de Datos

### DocumentoRequerido
```typescript
{
    id: string | number
    nombreDelDocumento: string
    estado: 'activo' | 'inactivo'
    isEditing?: boolean
}
```

## Componentes Utilizados

- **BaseTitle** - Título de página
- **BaseModal** - Modal estándar del sistema
- **BaseFormInput** - Input del formulario

## Flujo de Trabajo

### Agregar Documento
1. Click en "Agregar"
2. Se abre modal
3. Ingresar nombre del documento
4. Click en "Aceptar" o Enter
5. Se agrega fila a la tabla
6. Estado por defecto: "Activo"
7. Input en modo readonly

### Editar Documento
1. Click en botón "Editar" (azul)
2. Input se habilita
3. Modificar nombre
4. Click en botón "Guardar" (verde con check)
5. Se guarda el cambio
6. Input vuelve a readonly

### Cambiar Estado
1. Click en botón toggle (amarillo)
2. Estado cambia automáticamente
3. Badge cambia de color
4. Sin confirmación

### Eliminar Documento
1. Click en botón "Eliminar" (rojo)
2. Aparece confirmación
3. Click en "Aceptar"
4. Se elimina la fila

## Ejemplo de Datos Mock

```typescript
[
    { 
        id: 1, 
        nombreDelDocumento: 'zx', 
        estado: 'activo' 
    }
]
```

## Estado Actual

✅ **Completado**
- Estructura de carpetas
- Vista con tabla simple
- Botón agregar
- Modal de nuevo documento
- Inputs editables/readonly
- Botones Editar/Guardar/Toggle/Eliminar
- Badge de estado con colores
- Composable con lógica
- Mock data
- Confirmación de eliminación
- Mensaje cuando no hay datos
- Loading state

⏳ **Pendiente**
- Integración con API real
- Ordenamiento de documentos
- Búsqueda/filtrado
- Exportar lista
- Importar lista
- Historial de cambios
- Notificaciones toast
- Validaciones adicionales

## Diseño

- Tabla de ancho completo
- Header con fondo oscuro
- Inputs con estilo ghost cuando readonly
- Badges con colores según estado:
  - Verde (badge-success): Activo
  - Rojo (badge-error): Inactivo
- Botones con iconos Material Symbols

## Estilos Especiales

### Input Readonly (Ghost)
```css
.input-ghost {
    background: transparent;
    border-color: transparent;
}
```

### Badges de Estado
- **Activo:** `badge badge-success`
- **Inactivo:** `badge badge-error`

### Botones de Acción
- **Editar:** Azul (btn-primary) con icono edit
- **Guardar:** Verde (btn-success) con icono check
- **Toggle:** Amarillo (btn-warning) con icono toggle_on/toggle_off
- **Eliminar:** Rojo (btn-error) con icono delete

## Uso en el Sistema

Esta lista de documentos se utiliza en:
- Formulario de prospectos
- Checklist de documentación
- Validación de expedientes completos
- Reportes de documentación faltante

Los documentos marcados como "Activo" son los que se muestran como requeridos en el formulario de prospectos.
