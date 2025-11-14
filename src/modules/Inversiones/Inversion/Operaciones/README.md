# Módulo: Operación de Contratos

Vista de tabla paginada para gestionar las operaciones de contratos de inversión.

## Estructura de Carpetas

```
Operaciones/
├── components/
│   ├── ContractDetailModal.vue     # Modal de detalle del contrato
│   └── DeleteContractModal.vue     # Modal de confirmación de eliminación
├── composables/
│   └── useContracts.ts             # Lógica para manejo de contratos
├── types/
│   └── contractTypes.ts            # Tipos TypeScript
├── views/
│   └── ContractsOperationView.vue  # Vista principal con tabla
├── index.ts                        # Exports del módulo
└── README.md                       # Documentación
```

## Características Principales

### Vista Principal (ContractsOperationView)

**Tabla Paginada con las siguientes columnas:**

1. **Estatus** - Badge con color según estado (En Trámite, Activo, Liquidado, Cancelado)
2. **Cliente** - Nombre del cliente
3. **Contrato** - Tipo de contrato
4. **Liquidación** - Forma de liquidación
5. **Renovación** - Estado de renovación
6. **Fecha Alta** - Fecha de alta del contrato
7. **Fecha Fin** - Fecha de finalización
8. **Monto Inicial** - Monto inicial del contrato
9. **Rendimiento Neto** - Porcentaje de rendimiento
10. **Plazo en meses** - Duración en meses
11. **Plazo en días** - Duración en días
12. **Plan de pagos** - Número de parcialidades
13. **Total** - Monto total
14. **Interés** - Monto de interés
15. **Acciones** - Botones de acción

**Funcionalidades:**
- ✅ Tabla paginada con BaseTable
- ✅ Búsqueda global
- ✅ Exportar a Excel y PDF
- ✅ Paginación con controles
- ✅ Badges de estatus con colores
- ✅ Formato de moneda mexicana

### Modal de Detalle (ContractDetailModal)

**Características:**
- ✅ Usa BaseModal component
- ✅ Muestra información completa del contrato
- ✅ Datos del cliente
- ✅ Tipo de contrato y forma de liquidación
- ✅ Toggle para calcular interés moratorio
- ✅ Botón de plantilla
- ✅ Botón modificar
- ✅ Fechas de inicio y fin
- ✅ Tabla de datos principales (plazo, tasa, impuesto)
- ✅ Tabla de montos (Pesos, Tipo de cambio, Dólares)
- ✅ Sección de pagos a capital
- ✅ Sección de plan de pagos con botón reestructurar
- ✅ Sección de pagos a interés
- ✅ Sección de pagos intereses moratorios
- ✅ Botón para agregar nueva parcialidad

**Secciones del Modal:**
1. **Información General**
   - Nombre del cliente
   - Tipo de contrato
   - Forma de liquidación
   - Toggle de interés moratorio

2. **Fechas y Plazos**
   - Fecha inicio / Fecha fin
   - Plazo en meses / días
   - Tasa de interés
   - Impuesto
   - Interés moratorio

3. **Montos**
   - Pesos
   - Tipo de cambio
   - Dólares

4. **Pagos a Capital**
   - Tabla con monto y fecha

5. **Plan de Pagos**
   - Tabla con parcialidades
   - Botón reestructurar
   - Botón nueva parcialidad

6. **Pagos a Interés**
   - Tabla con monto y fecha

7. **Pagos Intereses Moratorios**
   - Tabla con monto y fecha

### Modal de Eliminación (DeleteContractModal)

**Características:**
- ✅ Usa BaseModal component
- ✅ Confirmación de eliminación
- ✅ Muestra datos del contrato a eliminar
- ✅ Icono de advertencia
- ✅ Mensaje de confirmación
- ✅ No reversible

### Botones de Acción

1. **Detalle** (Cyan/Info)
   - Abre modal de detalle del contrato
   - Muestra toda la información

2. **Editar** (Purple/Accent)
   - Edita el contrato
   - (Por implementar)

3. **Cancelar** (Yellow/Warning)
   - Cancela el contrato
   - (Por implementar)

4. **Estado de Cuenta** (Green/Success)
   - Redirige a vista de estado de cuenta
   - (Por implementar)

5. **Eliminar** (Red/Error)
   - Abre modal de confirmación
   - Elimina el contrato

## Tipos de Datos

### Contract
```typescript
{
    id: string | number
    estatus: 'En Trámite' | 'Activo' | 'Liquidado' | 'Cancelado'
    cliente: string
    contrato: string
    liquidacion: string
    renovacion: string
    fechaAlta: string
    fechaFin: string
    montoInicial: number
    rendimientoNeto: number
    plazoMeses: number
    plazoDias: number
    planPagos: number
    total: number
    interes: number
}
```

### ContractDetail
```typescript
{
    id: string | number
    cliente: string
    tipoContrato: string
    formaLiquidacion: string
    calcularInteresMoratorio: boolean
    fechaInicio: string
    fechaFin: string
    plazoMeses: number
    plazoDias: number
    tasaInteres: number
    impuesto: number
    interesMoratorio: number
    montoPesos: number
    tipoCambio?: number
    montoDolares?: number
    pagosCapital: PaymentCapital[]
    planPagos: PaymentPlan[]
    pagosInteres: PaymentInterest[]
    pagosInteresesMoratorios: PaymentMoratoryInterest[]
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
- Modal de detalle completo
- Modal de confirmación de eliminación
- Tipos TypeScript
- Composables
- Mock data para pruebas
- Badges de estatus
- Formato de moneda

⏳ **Pendiente**
- Integración con API real
- Funcionalidad de editar contrato
- Funcionalidad de cancelar contrato
- Vista de estado de cuenta
- Funcionalidad de reestructurar plan
- Agregar nueva parcialidad
- Agregar pagos (capital, interés, moratorio)
- Validaciones
- Plantilla de contrato
