export type AreaType = {
    id: string
    name: string
    categories: { id: string; name: string }[]
}

export type ProjectSummaryType = {
    id: string
    folio: string
    name: string
    area: string
    category: string
    budget: string
    startDate: string
    endDate: string
}

export type ProjectStageType = {
    name: string
    isActive: boolean
}
