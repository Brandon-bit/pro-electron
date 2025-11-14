// Annual Declaration Types
export type AnnualDeclarationTabType = 
    | 'inflation-adjustment' 
    | 'credits' 
    | 'debts' 
    | 'profit-coefficient' 
    | 'accounting-reconciliation' 
    | 'annual-isr'

export interface InflationAdjustmentType {
    id?: number
    year: number
    averageCredits: number
    averageDebts: number
    inflationRate: number
    inflationAdjustment: number
    adjustmentType: 'Acumulable' | 'Deducible'
    createdAt?: Date
    updatedAt?: Date
}

export interface CreditBalanceType {
    id?: number
    year: number
    month: number
    initialBalance: number
    finalBalance: number
    averageBalance: number
    description?: string
}

export interface DebtBalanceType {
    id?: number
    year: number
    month: number
    initialBalance: number
    finalBalance: number
    averageBalance: number
    description?: string
}

export interface ProfitCoefficientType {
    id?: number
    year: number
    totalIncome: number
    totalDeductions: number
    taxableProfit: number
    coefficient: number
    applicableYear: number
    createdAt?: Date
}

export interface AccountingReconciliationType {
    id?: number
    year: number
    accountingProfit: number
    taxAdditions: number
    taxDeductions: number
    taxableProfit: number
    items: ReconciliationItemType[]
    createdAt?: Date
}

export interface ReconciliationItemType {
    concept: string
    amount: number
    type: 'Adición' | 'Deducción'
    description?: string
}

export interface AnnualISRType {
    id?: number
    year: number
    taxableProfit: number
    isrRate: number
    isrAmount: number
    provisionalPayments: number
    isrToPay: number
    favorBalance: number
    status: 'Borrador' | 'Presentada' | 'Pagada'
    presentationDate?: Date
    paymentDate?: Date
}

// API Response Types
export interface InflationAdjustmentResponseType {
    id: number
    ejercicio: number
    promedioCreditos: number
    promedioDeudas: number
    tasaInflacion: number
    ajusteInflacion: number
    tipoAjuste: string
    fechaCreacion?: string
    fechaActualizacion?: string
}

export interface ProfitCoefficientResponseType {
    id: number
    ejercicio: number
    ingresosTotal: number
    deduccionesTotal: number
    utilidadFiscal: number
    coeficiente: number
    ejercicioAplicable: number
    fechaCreacion?: string
}

// Form Types
export interface InflationAdjustmentFormType {
    year: number
    averageCredits: number
    averageDebts: number
    inflationRate: number
}

export interface ProfitCoefficientFormType {
    year: number
    totalIncome: number
    totalDeductions: number
}

export interface AnnualISRFormType {
    year: number
    taxableProfit: number
    provisionalPayments: number
}
