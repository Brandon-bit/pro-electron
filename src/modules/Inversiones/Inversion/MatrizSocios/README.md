# Módulo: Matriz de Socios

Vista de tabla paginada para gestionar todos los socios registrados en el sistema.

## Estructura de Carpetas

```
MatrizSocios/
├── components/
│   └── DocumentsModal.vue      # Modal para gestión de documentos
├── composables/
│   └── usePartners.ts          # Lógica para manejo de socios
├── types/
│   └── partnerTypes.ts         # Tipos TypeScript
├── views/
│   └── PartnersMatrixView.vue  # Vista principal con tabla
├── index.ts                    # Exports del módulo
└── README.md                   # Documentación
```

## Características Principales

### Vista Principal (PartnersMatrixView)

**Tabla Paginada con las siguientes columnas:**

1. **Documentos** - Botón que abre el modal de documentos
2. **Estatus de carga** - Barra de progreso visual (0-100%)
3. **Envío Automático** - Toggle switch
4. **Nombre** - Nombre completo del socio
5. **Código** - Código único del socio
6. **Cuenta** - Número de cuenta
7. **Teléfono** - Teléfono fijo
8. **Celular** - Teléfono celular
9. **Correo** - Correo electrónico
10. **Acciones** - Botones de Documentos, Detalle y Contratos

**Funcionalidades:**
- ✅ Tabla paginada con BaseTable
- ✅ Búsqueda global
- ✅ Exportar a Excel y PDF
- ✅ Paginación con controles
- ✅ Indicador de registros (Ver X Resultados)
- ✅ Barra de progreso de documentación
- ✅ Toggle de envío automático

### Modal de Documentos (DocumentsModal)

**Características:**
- ✅ Usa BaseModal component
- ✅ Muestra nombre del socio
- ✅ Progreso general de documentación
- ✅ Secciones de documentos dinámicas
- ✅ Input file por sección
- ✅ Lista de archivos cargados
- ✅ Eliminar archivos
- ✅ Acepta: PDF, DOC, DOCX, JPG, JPEG, PNG

**Secciones de Documentos:**
1. ZX
2. Identificación Oficial
3. Comprobante de Domicilio
4. Constancia de Situación Fiscal

### Botones de Acción

1. **Documentos** (Azul/Primary)
   - Abre modal de gestión de documentos
   - Muestra progreso de documentación

2. **Detalle** (Cyan/Info)
   - Redirige a vista de detalle del socio
   - (Por implementar)

3. **Contratos** (Purple/Accent)
   - Redirige a vista de contratos del socio
   - (Por implementar)

## Tipos de Datos

### Partner
```typescript
{
    id: string | number
    nombre: string
    codigo: string
    cuenta: string
    telefono: string
    celular: string
    correo: string
    estatusCarga: number // 0-1 (porcentaje)
    envioAutomatico: boolean
    documentosCompletados: number
    documentosTotales: number
}
```

### DocumentSection
```typescript
{
    id: string | number
    nombre: string
    archivos: DocumentFile[]
}
```

## Componentes Utilizados

- **BaseTable** - Tabla paginada del sistema
- **BaseModal** - Modal estándar del sistema
- **BaseTitle** - Título de página

## Estado Actual

✅ **Completado**
- Estructura de carpetas
- Vista de tabla paginada
- Modal de documentos
- Tipos TypeScript
- Composables
- Mock data para pruebas

⏳ **Pendiente**
- Integración con API real
- Vista de detalle del socio
- Vista de contratos
- Validaciones de archivos
- Descarga de documentos
