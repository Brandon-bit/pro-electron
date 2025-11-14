export type MetricType = {
    id: string
    name: string
    values: number[]
}

export type CorrelationResultType = {
    metric1: string
    metric2: string
    correlation: number
}

export type SelectedCellType = {
    x: string
    y: string
}

export type ScatterDataPointType = {
    x: number
    y: number
}
