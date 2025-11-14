export type FMEARowType = {
    id: string
    failureMode: string
    effect: string
    severity: number
    occurrence: number
    detection: number
    rpn: number
    recommendedAction: string
    severityPost: number
    occurrencePost: number
    detectionPost: number
    rpnPost: number
}

export type NewFMEAEntryType = {
    failureMode: string
    effect: string
    severity: number
    occurrence: number
    detection: number
}
