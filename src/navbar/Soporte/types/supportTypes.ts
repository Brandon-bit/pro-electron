export type SupportTicketType = {
    id: string
    name: string
    email: string
    description: string
    attachments: File[]
    status: 'pending' | 'in_progress' | 'resolved'
    createdAt: string
}

export type SupportFormType = {
    name: string
    email: string
    description: string
    attachments: File[]
}
