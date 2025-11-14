// Tipos para Metas

export interface MonthGoal {
    id: string | number
    mes: string
    clientes: number
    inversion: number
}

export interface YearGoal {
    id: string | number
    año: number
    meses: MonthGoal[]
}

export interface NewYearGoalData {
    año: number
}

export interface NewMonthGoalData {
    mes: string
    clientes: number
    inversion: number
}
