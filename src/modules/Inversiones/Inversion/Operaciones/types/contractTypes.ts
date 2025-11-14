// Tipos para Operación de Contratos

export interface Contract {
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

// Detalle del contrato
export interface ContractDetail {
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

export interface PaymentCapital {
    id: string | number
    monto: number
    fecha: string
}

export interface PaymentPlan {
    id: string | number
    parcialidad: number
    fechaInicio: string
    fechaLiquidacion: string
    dias: number
    fechaPago: string
    interes: number
}

export interface PaymentInterest {
    id: string | number
    monto: number
    fecha: string
}

export interface PaymentMoratoryInterest {
    id: string | number
    monto: number
    fecha: string
}
