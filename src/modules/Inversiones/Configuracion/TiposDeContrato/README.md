# Módulo: Tipos de Contrato

Vista de tabla paginada para gestionar tipos de contrato y sus renovaciones.

## Estructura de Carpetas

```
TiposDeContrato/
├── components/
│   ├── NewContractTypeModal.vue    # Modal para nuevo tipo de contrato
│   ├── NewRenewalModal.vue         # Modal para nueva renovación
│   └── DeleteConfirmModal.vue      # Modal de confirmación de eliminación
├── composables/
│   └── useContractTypes.ts         # Lógica para manejo de tipos de contrato
├── types/
│   └── contractTypeTypes.ts        # Tipos TypeScript
├── views/
│   └── ContractTypesView.vue       # Vista principal con tabla
├── index.ts                        # Exports del módulo
└── README.md                       # Documentación
```

## Características Principales

### Vista Principal (ContractTypesView)

**Tabla Paginada con las siguientes columnas:**

1. **#** - Número de fila
2. **Tipo** - Nombre del tipo de contrato
3. **Archivo** - Badge con nombre del archivo
4. **Contratos de renovación** - Tabla anidada con renovaciones
5. **Acciones** - Botón eliminar

**Funcionalidades:**
- ✅ Tabla paginada con BaseTable
- ✅ Botón "Nuevo tipo de contrato" (azul, arriba de la tabla)
- ✅ Tabla anidada de renovaciones por cada tipo de contrato
- ✅ Botón "Nuevo tipo de renovación" dentro de cada fila
- ✅ Botón "Eliminar" para contratos y renovaciones
- ✅ Búsqueda global
- ✅ Exportar a Excel y PDF
- ✅ Paginación

### Tabla Anidada de Renovaciones

**Columnas:**
1. **#** - Número de renovación
2. **Contrato** - Nombre de la renovación
3. **Archivo** - Badge con nombre del archivo
4. **Acciones** - Botón eliminar

**Características:**
- ✅ Se muestra dentro de cada fila de tipo de contrato
- ✅ Botón "Nuevo tipo de renovación" (azul) en la parte superior
- ✅ Si no hay renovaciones, solo muestra el botón para agregar
- ✅ Estilo zebra para filas alternadas
- ✅ Botón eliminar (rojo) por cada renovación

### Modal: Nuevo Tipo de Contrato (NewContractTypeModal)

**Características:**
- ✅ Usa BaseModal component
- ✅ Un solo input de texto
- ✅ Label: "Tipo de contrato:"
- ✅ Placeholder: "Ingrese el tipo de contrato"
- ✅ Enter para enviar
- ✅ Validación: campo no vacío
- ✅ Emite evento 'confirm' con el tipo

### Modal: Nuevo Tipo de Renovación (NewRenewalModal)

**Características:**
- ✅ Usa BaseModal component
- ✅ Un solo input de texto
- ✅ Label: "Nombre de renovación:"
- ✅ Placeholder: "Ingrese el nombre de la renovación"
- ✅ Enter para enviar
- ✅ Validación: campo no vacío
- ✅ Recibe contratoId al abrir
- ✅ Emite evento 'confirm' con { contratoId, contrato }

### Modal: Confirmar Eliminación (DeleteConfirmModal)

**Características:**
- ✅ Usa BaseModal component
- ✅ Icono de advertencia (warning)
- ✅ Título: "¿Está seguro de eliminar este elemento?"
- ✅ Muestra el nombre del elemento a eliminar
- ✅ Mensaje: "Esta acción no se puede deshacer."
- ✅ Recibe id y nombre al abrir
- ✅ Emite evento 'confirm' con el id

## Tipos de Datos

### ContractType
```typescript
{
    id: string | number
    tipo: string
    archivo: string
    renovaciones: ContractRenewal[]
}
```

### ContractRenewal
```typescript
{
    id: string | number
    contratoId: string | number
    contrato: string
    archivo: string
}
```

## Componentes Utilizados

- **BaseTable** - Tabla paginada del sistema
- **BaseModal** - Modal estándar del sistema
- **BaseTitle** - Título de página

## Flujo de Trabajo

### Crear Nuevo Tipo de Contrato
1. Click en "Nuevo tipo de contrato"
2. Se abre modal con input
3. Ingresar nombre del tipo
4. Click en "Guardar" o Enter
5. Se cierra modal y recarga tabla

### Crear Nueva Renovación
1. Click en "Nuevo tipo de renovación" (dentro de una fila)
2. Se abre modal con input
3. Ingresar nombre de la renovación
4. Click en "Guardar" o Enter
5. Se cierra modal y recarga tabla
6. La renovación aparece en la tabla anidada

### Eliminar Elemento
1. Click en "Eliminar" (contrato o renovación)
2. Se abre modal de confirmación
3. Muestra nombre del elemento
4. Click en "Confirmar"
5. Se elimina y recarga tabla

## Estado Actual

✅ **Completado**
- Estructura de carpetas
- Vista con tabla paginada
- Tabla anidada de renovaciones
- Modal de nuevo tipo de contrato
- Modal de nueva renovación
- Modal de confirmación de eliminación
- Tipos TypeScript
- Composables
- Mock data para pruebas
- Badges para archivos
- Botones de acción

⏳ **Pendiente**
- Integración con API real
- Subida de archivos
- Descarga de archivos
- Edición de tipos de contrato
- Edición de renovaciones
- Validaciones adicionales
- Manejo de errores
- Notificaciones toast

## Ejemplo de Datos Mock

```typescript
{
    id: 1,
    tipo: 'Contrato 01',
    archivo: 'codigo_qr_(1).png',
    renovaciones: [
        {
            id: 1,
            contratoId: 1,
            contrato: 'Renovación 01 de Contrato 01',
            archivo: 'doc02_(2)_(2).docx'
        }
    ]
}
```
