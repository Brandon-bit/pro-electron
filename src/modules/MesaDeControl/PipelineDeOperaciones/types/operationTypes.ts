export type OperationType = {
    id?: string
    clientName: string
    type: "Inversión" | "Crédito"
    amount: number
    operator: {
        name: string
        initials: string
    }
    priority: "Alta" | "Media" | "Baja"
    stage: string
    timeInStage: number // minutes
    slaLimit: number // minutes
    documents: DocumentType[]
    validations: ValidationType[]
    comments: CommentType[]
    creationDate?: Date
}

export type DocumentType = {
    name: string
    status: "verified" | "pending" | "rejected"
    issues?: string[]
}


export type ValidationType = {
    name: string
    status: "passed" | "failed" | "pending"
    details?: string
}

export type CommentType = {
    author: string
    text: string
    timestamp: string
}

export type StageType = {
    id: string
    title: string
    color: string
}

export type IncidentTemplateType = {
    id: string
    title: string
    message: string
}

export type OperationResponseType = {
    id: string
    nombreCliente: string
    tipo: string
    monto: number
    operador: {
        nombre: string
        iniciales: string
    }
    prioridad: string
    etapa: string
    tiempoEnEtapa: number
    limitesSLA: number
    documentos: any[]
    validaciones: any[]
    comentarios: any[]
    fechaCreacion: Date
}

export type OperationFormType = {
    clientName: string
    type: "Inversión" | "Crédito"
    amount: number
    priority: "Alta" | "Media" | "Baja"
    stage: string
}

export type CommentFormType = {
    text: string
}
