// Tipos para Escenarios de Inversión

export type PaymentModality = 
    | 'mensual' 
    | 'bimestral' 
    | 'trimestral' 
    | 'cuatrimestral' 
    | 'semestral' 
    | 'vencimiento' 
    | 'reinversion'

export interface InvestmentScenario {
    nombre: string
    monto: number
    tasaInteres: number
    plazoMeses: 6 | 12 | 18 | 24 | 30 | 36 | 42 | 48
    plazoDias: number
    modalidad: PaymentModality
}

export interface MonthlyCalculation {
    mes: number
    dias: number
    interes: number
    rendimientoFinal: number
    mesDePago: boolean
}

export interface InvestmentResult {
    scenario: InvestmentScenario
    calculations: MonthlyCalculation[]
    totalDias: number
    totalInteres: number
    totalRendimiento: number
}

// Información de la empresa
export interface CompanyInfo {
    nombre: string
    direccion: string
    ciudad: string
    rfc: string
}
