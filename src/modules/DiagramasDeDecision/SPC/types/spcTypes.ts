export type SPCDataPointType = {
    id: number
    sample: number
    value: number
    isOutOfControl: boolean
    violationType?: string
}

export type ControlLimitsType = {
    mean: number
    ucl: number
    lcl: number
    sigma: number
}
