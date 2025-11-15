export type BenefitType = {
    id: string
    name: string
    values: number[]
}

export type CostType = {
    id: string
    name: string
    values: number[]
}

export type YearlyTotalsType = {
    benefits: number[]
    nonRecurringCosts: number[]
    recurringCosts: number[]
    totalCosts: number[]
    cashFlow: number[]
    accumulatedCashFlow: number[]
    discountedCashFlow: number[]
    accumulatedDiscountedCashFlow: number[]
}

export type KPIsType = {
    totalValue: number
    totalCost: number
    netValue: number
    roi: number
    npv: number
    irr: number
    paybackPeriod: number
}

export type ChartDataType = {
    year: string
    beneficios: number
    costos: number
}

export type ProjectType = {
    id: string
    name: string
}

export const YEARS = 6 // Año 0 a Año 5
