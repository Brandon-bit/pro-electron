# Módulo: Metas

Vista para gestionar metas de clientes e inversión por año y mes.

## Estructura de Carpetas

```
Metas/
├── components/
│   ├── NewYearModal.vue        # Modal para nuevo año
│   └── NewMonthModal.vue       # Modal para nuevo mes con metas
├── composables/
│   └── useGoals.ts             # Lógica para manejo de metas
├── types/
│   └── goalTypes.ts            # Tipos TypeScript
├── views/
│   └── GoalsView.vue           # Vista principal
├── index.ts                    # Exports del módulo
└── README.md                   # Documentación
```

## Características Principales

### Vista Principal (GoalsView)

**Layout:**
- ✅ Botón "Nueva fecha meta" (azul) en la parte superior
- ✅ Grid responsive de tarjetas (1-3 columnas según pantalla)
- ✅ Cada tarjeta representa un año
- ✅ Dentro de cada tarjeta hay una tabla de meses

**Tarjeta de Año:**
- ✅ Título: "Año XXXX" (centrado, grande)
- ✅ Botón "Agregar mes" (azul, pequeño)
- ✅ Tabla de meses con 4 columnas
- ✅ Mensaje cuando no hay meses

**Tabla de Meses:**

Columnas:
1. **Mes** - Nombre del mes
2. **Clientes** - Meta de clientes
3. **Inversión** - Meta de inversión (formato moneda)
4. **Acciones** - Botón X rojo para eliminar

**Características:**
- ✅ Estilo zebra (filas alternadas)
- ✅ Header con fondo oscuro
- ✅ Formato de moneda mexicana
- ✅ Botón eliminar con confirmación

### Modal: Nueva Fecha Meta (NewYearModal)

**Características:**
- ✅ Usa BaseModal component
- ✅ Título: "Nueva fecha meta"
- ✅ Un input de tipo number para el año
- ✅ Label: "Año:"
- ✅ Placeholder: "2025"
- ✅ Rango: 2000-2100
- ✅ Valor por defecto: año actual
- ✅ Emite evento 'confirm' con el año

### Modal: Nueva Fecha Meta (Mes) (NewMonthModal)

**Características:**
- ✅ Usa BaseModal component
- ✅ Título: "Nueva fecha meta"
- ✅ 3 campos de entrada:

1. **Mes**
   - Input tipo month
   - Label: "Mes"
   - Formato: YYYY-MM

2. **Clientes meta**
   - Input tipo number
   - Label: "Clientes meta"
   - Placeholder: "0"
   - Min: 0

3. **Inversión meta**
   - Input tipo number
   - Label: "Inversión meta"
   - Placeholder: "0"
   - Min: 0
   - Step: 0.01

- ✅ Recibe añoId al abrir
- ✅ Emite evento 'confirm' con todos los datos

## Tipos de Datos

### YearGoal
```typescript
{
    id: string | number
    año: number
    meses: MonthGoal[]
}
```

### MonthGoal
```typescript
{
    id: string | number
    mes: string
    clientes: number
    inversion: number
}
```

## Componentes Utilizados

- **BaseTitle** - Título de página
- **BaseModal** - Modal estándar del sistema
- **BaseFormInput** - Inputs del formulario (opcional)

## Flujo de Trabajo

### Crear Nuevo Año
1. Click en "Nueva fecha meta"
2. Se abre modal con input de año
3. Ingresar año (ej: 2025)
4. Click en "Aceptar"
5. Se crea tarjeta del año
6. Aparece en el grid

### Agregar Mes a un Año
1. Click en "Agregar mes" dentro de una tarjeta
2. Se abre modal con 3 campos
3. Seleccionar mes (input tipo month)
4. Ingresar meta de clientes
5. Ingresar meta de inversión
6. Click en "Aceptar"
7. Se agrega fila a la tabla del año

### Eliminar Mes
1. Click en botón X rojo
2. Aparece confirmación
3. Click en "Aceptar"
4. Se elimina la fila

## Ejemplo de Datos Mock

```typescript
{
    id: 1,
    año: 2025,
    meses: [
        {
            id: 1,
            mes: 'junio',
            clientes: 10,
            inversion: 100000
        },
        {
            id: 2,
            mes: 'julio',
            clientes: 20,
            inversion: 1000000
        }
    ]
}
```

## Estado Actual

✅ **Completado**
- Estructura de carpetas
- Vista con grid de tarjetas
- Tarjetas por año
- Tabla de meses dentro de cada año
- Modal de nuevo año
- Modal de nuevo mes con 3 campos
- Composable con lógica
- Mock data
- Formato de moneda
- Confirmación de eliminación
- Responsive design

⏳ **Pendiente**
- Integración con API real
- Edición de metas
- Validaciones adicionales
- Gráficas de progreso
- Comparación con resultados reales
- Exportar metas
- Notificaciones

## Diseño Responsive

- **Mobile (< 768px):** 1 columna
- **Tablet (768px - 1024px):** 2 columnas
- **Desktop (> 1024px):** 3 columnas

Cada tarjeta se ajusta automáticamente al ancho disponible.
