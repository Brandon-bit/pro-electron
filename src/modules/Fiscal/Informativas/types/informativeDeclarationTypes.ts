// Informative Declaration Types
export type InformativeDeclarationTabType = 
    | 'diot' 
    | 'electronic-accounting' 
    | 'interest' 
    | 'cash-deposits' 
    | 'tax-loss'

export interface DIOTType {
    id?: number
    period: string
    year: number
    month: number
    suppliers: DIOTSupplierType[]
    status: 'Borrador' | 'Generada' | 'Presentada'
    generatedDate?: Date
    presentedDate?: Date
}

export interface DIOTSupplierType {
    supplierRFC: string
    supplierName: string
    operationType: string
    taxBase: number
    vat: number
    vatWithheld: number
    total: number
}

export interface ElectronicAccountingType {
    id?: number
    period: string
    year: number
    month: number
    catalogFile?: string
    balanceFile?: string
    trialBalanceFile?: string
    policiesFile?: string
    auxiliaryFile?: string
    status: 'Pendiente' | 'Generada' | 'Enviada'
    sentDate?: Date
}

export interface InterestDeclarationType {
    id?: number
    year: number
    interestPaid: number
    interestReceived: number
    financialInstitutions: FinancialInstitutionType[]
    status: 'Borrador' | 'Presentada'
    presentedDate?: Date
}

export interface FinancialInstitutionType {
    institutionName: string
    interestAmount: number
    withheldTax: number
}

export interface CashDepositDeclarationType {
    id?: number
    period: string
    year: number
    month: number
    deposits: CashDepositType[]
    totalAmount: number
    status: 'Borrador' | 'Presentada'
    presentedDate?: Date
}

export interface CashDepositType {
    date: Date
    accountNumber: string
    bankName: string
    amount: number
    description?: string
}

export interface TaxLossDeclarationType {
    id?: number
    year: number
    taxLoss: number
    pendingToApply: number
    appliedAmount: number
    remainingBalance: number
    status: 'Borrador' | 'Presentada'
    presentedDate?: Date
}

// API Response Types
export interface DIOTResponseType {
    id: number
    periodo: string
    ejercicio: number
    mes: number
    proveedores: any[]
    estatus: string
    fechaGeneracion?: string
    fechaPresentacion?: string
}

// Form Types
export interface DIOTFormType {
    year: number
    month: number
}

export interface InterestDeclarationFormType {
    year: number
    interestPaid: number
    interestReceived: number
}

export interface CashDepositFormType {
    year: number
    month: number
    date: string
    accountNumber: string
    bankName: string
    amount: number
    description?: string
}

export interface TaxLossFormType {
    year: number
    taxLoss: number
}
