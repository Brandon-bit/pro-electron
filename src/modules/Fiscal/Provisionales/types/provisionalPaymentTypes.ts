// Provisional Payment Types
export type ProvisionalPaymentStatusType = "Pagado" | "Pendiente" | "Vencido"

export interface ProvisionalPaymentType {
    id?: number
    period: string
    income: number
    deductions: number
    taxableProfit: number
    isr: number
    vat: number
    total: number
    dueDate: Date
    status: ProvisionalPaymentStatusType
    paymentDate?: Date
    paymentReference?: string
}

export interface VATDeclarationType {
    id?: number
    period: string
    collectedVAT: number
    creditableVAT: number
    favorBalance: number
    vatToPay: number
    dueDate: Date
    status: ProvisionalPaymentStatusType
    paymentDate?: Date
    paymentReference?: string
}

export interface ProvisionalPaymentKPIType {
    title: string
    value: string
    subtitle: string
    icon: string
    color: string
}

// API Response Types
export interface ProvisionalPaymentResponseType {
    id: number
    periodo: string
    ingresos: number
    deducciones: number
    utilidadFiscal: number
    isr: number
    iva: number
    total: number
    fechaLimite: string
    estatus: string
    fechaPago?: string
    referenciaPago?: string
}

export interface VATDeclarationResponseType {
    id: number
    periodo: string
    ivaCobrado: number
    ivaAcreditable: number
    saldoFavor: number
    ivaPagar: number
    fechaLimite: string
    estatus: string
    fechaPago?: string
    referenciaPago?: string
}

// Form Types
export interface ProvisionalPaymentFormType {
    period: string
    income: number
    deductions: number
    paymentDate?: string
    paymentReference?: string
}

export interface VATDeclarationFormType {
    period: string
    collectedVAT: number
    creditableVAT: number
    paymentDate?: string
    paymentReference?: string
}

// Calculation Info
export interface CalculationInfoType {
    profitCoefficient: number
    isrRate: number
    vatRate: number
    calculationBase: string
}
