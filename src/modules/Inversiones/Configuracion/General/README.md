# Módulo: Configuración General

Vista para gestionar parámetros generales del sistema de inversiones.

## Estructura de Carpetas

```
General/
├── components/
│   ├── AddValueModal.vue           # Modal para agregar valores numéricos
│   ├── AddImpuestoModal.vue        # Modal para agregar impuestos
│   └── AddLiquidacionModal.vue     # Modal para agregar tipos de liquidación
├── composables/
│   └── useGeneralConfig.ts         # Lógica para manejo de configuración
├── types/
│   └── generalConfigTypes.ts       # Tipos TypeScript
├── views/
│   └── GeneralConfigView.vue       # Vista principal
├── index.ts                        # Exports del módulo
└── README.md                       # Documentación
```

## Características Principales

### Vista Principal (GeneralConfigView)

**Layout:**
- ✅ Título: "Configuración General"
- ✅ Grid de 2 columnas (responsive)
- ✅ 6 secciones de configuración

**Secciones:**

1. **Plazos**
   - Tabla con columna "Plazos en meses"
   - Inputs editables/readonly
   - Botones: Editar, Guardar, Eliminar

2. **Días para cálculo de interés diario**
   - Tabla con columna "Días"
   - Inputs editables/readonly
   - Botones: Editar, Guardar, Eliminar

3. **Rendimientos**
   - Tabla con columna "Interés"
   - Inputs editables/readonly con decimales
   - Botones: Editar, Guardar, Eliminar

4. **Tasas Interés Moratorio**
   - Tabla con columna "Interés"
   - Inputs editables/readonly con decimales
   - Botones: Editar, Guardar, Eliminar

5. **Impuestos por Año**
   - Tabla con columnas "Impuesto" y "Año"
   - Inputs editables/readonly
   - Botones: Editar, Guardar, Eliminar

6. **Tipos de liquidación**
   - Lista de checkboxes
   - Toggle para activar/desactivar
   - Sin botón eliminar

**Funcionalidad de Edición:**
- ✅ Inputs readonly por defecto (estilo ghost)
- ✅ Botón "Editar" (azul) habilita el input
- ✅ Al editar, aparece botón "Guardar" (verde con check)
- ✅ Botón "Eliminar" (rojo) siempre visible
- ✅ Confirmación antes de eliminar

### Modal: Agregar Valor (AddValueModal)

**Características:**
- ✅ Usa BaseModal component
- ✅ Título dinámico según sección
- ✅ Label dinámico según sección
- ✅ Input tipo number
- ✅ Min: 0, Step: 0.01
- ✅ Enter para enviar
- ✅ Emite evento 'confirm' con el valor

**Uso:**
- Plazos: "Agregar Plazo" / "Plazos en meses:"
- Días: "Agregar Días" / "Días:"
- Rendimientos: "Agregar Rendimiento" / "Interés:"
- Tasas: "Agregar Tasa" / "Interés:"

### Modal: Agregar Impuesto (AddImpuestoModal)

**Características:**
- ✅ Usa BaseModal component
- ✅ Título: "Agregar Impuesto"
- ✅ 2 campos:
  - Impuesto (number, decimales)
  - Año (number, 2000-2100)
- ✅ Emite evento 'confirm' con { impuesto, año }

### Modal: Agregar Liquidación (AddLiquidacionModal)

**Características:**
- ✅ Usa BaseModal component
- ✅ Usa BaseFormInput component
- ✅ Título: "Agregar Tipo de Liquidación"
- ✅ Un campo: Nombre (text)
- ✅ Emite evento 'confirm' con el nombre

## Tipos de Datos

### Plazo
```typescript
{
    id: string | number
    plazosEnMeses: number
    isEditing?: boolean
}
```

### DiaCalculoInteres
```typescript
{
    id: string | number
    dias: number
    isEditing?: boolean
}
```

### Rendimiento
```typescript
{
    id: string | number
    interes: number
    isEditing?: boolean
}
```

### TasaInteresMoratorio
```typescript
{
    id: string | number
    interes: number
    isEditing?: boolean
}
```

### ImpuestoPorAño
```typescript
{
    id: string | number
    impuesto: number
    año: number
    isEditing?: boolean
}
```

### TipoLiquidacion
```typescript
{
    id: string | number
    nombre: string
    activo: boolean
}
```

## Componentes Utilizados

- **BaseTitle** - Título de página
- **BaseModal** - Modal estándar del sistema
- **BaseFormInput** - Input del formulario

## Flujo de Trabajo

### Agregar Valor
1. Click en "Agregar" en cualquier sección
2. Se abre modal con input numérico
3. Ingresar valor
4. Click en "Aceptar"
5. Se agrega fila a la tabla
6. Input aparece en modo readonly

### Editar Valor
1. Click en botón "Editar" (azul)
2. Input se habilita para edición
3. Modificar valor
4. Click en botón "Guardar" (verde con check)
5. Se guarda el cambio
6. Input vuelve a modo readonly

### Eliminar Valor
1. Click en botón "Eliminar" (rojo)
2. Aparece confirmación
3. Click en "Aceptar"
4. Se elimina la fila

### Toggle Liquidación
1. Click en checkbox
2. Se activa/desactiva automáticamente
3. Sin confirmación

## Ejemplo de Datos Mock

### Plazos
```typescript
[
    { id: 1, plazosEnMeses: 6 },
    { id: 2, plazosEnMeses: 12 },
    { id: 3, plazosEnMeses: 24 }
]
```

### Rendimientos
```typescript
[
    { id: 1, interes: 13.6 },
    { id: 2, interes: 18.6 },
    { id: 3, interes: 20 }
]
```

### Impuestos
```typescript
[
    { id: 1, impuesto: 3.4, año: 2025 },
    { id: 2, impuesto: 4.65, año: 2025 }
]
```

### Tipos de Liquidación
```typescript
[
    { id: 1, nombre: 'semestral', activo: true },
    { id: 2, nombre: 'anual', activo: false }
]
```

## Estado Actual

✅ **Completado**
- Estructura de carpetas
- Vista con 6 secciones
- Grid responsive de 2 columnas
- Inputs editables/readonly
- Botones Editar/Guardar/Eliminar
- 3 modales diferentes
- Composable con toda la lógica
- Mock data
- Toggle para liquidación
- Confirmación de eliminación
- Estilos input-ghost para readonly

⏳ **Pendiente**
- Integración con API real
- Validaciones adicionales
- Ordenamiento de items
- Búsqueda/filtrado
- Exportar configuración
- Importar configuración
- Historial de cambios
- Notificaciones toast

## Diseño Responsive

- **Mobile (< 1024px):** 1 columna (secciones apiladas)
- **Desktop (≥ 1024px):** 2 columnas (lado a lado)

Todas las secciones tienen el mismo estilo de tarjeta.

## Estilos Especiales

### Input Readonly (Ghost)
```css
.input-ghost {
    background: transparent;
    border-color: transparent;
}
```

Cuando el input está en modo readonly, se ve como texto plano sin bordes.

### Botones de Acción
- **Editar:** Azul (btn-primary)
- **Guardar:** Verde (btn-success) con icono check
- **Eliminar:** Rojo (btn-error) con icono delete

## Uso en el Sistema

Estos parámetros se utilizan en:
- Cálculo de intereses
- Creación de contratos
- Generación de planes de pago
- Cálculo de impuestos
- Tipos de liquidación disponibles
