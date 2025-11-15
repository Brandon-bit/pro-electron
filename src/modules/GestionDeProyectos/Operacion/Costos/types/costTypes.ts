export type CostItemType = {
    id: string
    concept: string
    description: string
    plannedCost: number
    plannedDate: string
    actualCost: number
    actualDate: string
    extraordinaryCost: number
}

export type ProjectCostsType = {
    projectCosts: CostItemType[]
    userCosts: CostItemType[]
    otherCosts: CostItemType[]
    estimatedBudget: number
    authorizedBudget: number
}

export type ProjectType = {
    id: string
    folio: string
    name: string
    estimatedBudget?: number
}

export type CostTotalsType = {
    totalPlanned: number
    totalActual: number
    executionPercentage: number
    variance: number
    forecast: number
}

export type CostCategoryType = 'projectCosts' | 'userCosts' | 'otherCosts'
