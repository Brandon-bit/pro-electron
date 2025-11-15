export type SOWType = {
    id?: number
    projectName: string
    projectCode: string
    client: string
    startDate: Date | null
    endDate: Date | null
    
    // Secciones del SOW
    executiveSummary: string
    objectives: string
    scope: string
    deliverables: string
    timeline: string
    resources: string
    assumptions: string
    constraints: string
    acceptanceCriteria: string
    paymentTerms: string
    
    status: 'draft' | 'review' | 'approved' | 'rejected'
    version: string
    createdBy: string
    creationDate?: Date
    lastModified?: Date
    active: boolean
}

export type SOWResponseType = {
    id: number
    nombreProyecto: string
    codigoProyecto: string
    cliente: string
    fechaInicio: Date
    fechaFin: Date
    
    resumenEjecutivo: string
    objetivos: string
    alcance: string
    entregables: string
    cronograma: string
    recursos: string
    supuestos: string
    restricciones: string
    criteriosAceptacion: string
    terminosPago: string
    
    estado: string
    version: string
    creadoPor: string
    fechaCreacion: Date
    ultimaModificacion: Date
    activo: boolean
    eliminado: boolean
}

export type SOWFormType = {
    projectName: string
    projectCode: string
    client: string
    startDate: Date | null
    endDate: Date | null
    
    executiveSummary: string
    objectives: string
    scope: string
    deliverables: string
    timeline: string
    resources: string
    assumptions: string
    constraints: string
    acceptanceCriteria: string
    paymentTerms: string
    
    status: 'draft' | 'review' | 'approved' | 'rejected'
    version: string
    createdBy: string
    active: boolean
}
