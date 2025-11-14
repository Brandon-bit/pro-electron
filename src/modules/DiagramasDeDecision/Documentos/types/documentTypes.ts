export type ApprovalStepType = {
    id: string
    approver: string
    role: string
    status: 'pending' | 'approved' | 'rejected'
    date?: string
}

export type DocumentType = {
    id: string
    name: string
    type: string
    status: 'draft' | 'in_review' | 'approved' | 'published'
    version: string
    created: string
    author: string
    approvalFlow: ApprovalStepType[]
}

export type TemplateType = {
    id: string
    name: string
    description: string
}
