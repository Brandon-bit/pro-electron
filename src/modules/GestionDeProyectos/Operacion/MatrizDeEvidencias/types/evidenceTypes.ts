export type EvidenceType = {
    id: string
    fileName: string
    fileUrl: string
    uploadDate: string
    activityId: string
    activityName: string
    stageName: string
    responsible: string
}

export type ProjectEvidenceType = {
    id: string
    name: string
    folio: string
    stage: string
    startDate: string
    endDate: string
    status: string
    evidenceCount: number
}
