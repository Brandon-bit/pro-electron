export type ParetoDataType = {
    category: string
    frequency: number
    cost: number
    percentage: number
    cumulativePercentage: number
}

export type RawParetoDataType = {
    category: string
    frequency: number
    cost: number
}

export type NewParetoEntryType = {
    category: string
    frequency: string
    cost: string
}
