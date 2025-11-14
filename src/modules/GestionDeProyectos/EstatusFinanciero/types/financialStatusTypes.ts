export type AreaType = {
    id: string
    name: string
}

export type CategoryType = {
    id: string
    name: string
    areaId: string
}

export type StageType = {
    name: string
    count: number
}

export type GlobalSummaryType = {
    category: string
    projectCount: number
    stages: StageType[]
    totalInvestment: number
    contractedAmount: number
    exercisedAmount: number
    toContract: number
    toExercise: number
}

export type ProjectDetailType = {
    oficio: string
    projectId: string
    name: string
    type: 'Inversión' | 'Gasto'
    classification: string
    receptionDate: Date | null
    stage: string
    status: string
    statusDate: Date | null
    estimatedAmountToAward: number
    awardedAmount: number
    awardNoticeDate: Date | null
    isCompleted: boolean
    areaId?: string
    categoryId?: string
}
