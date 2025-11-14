export type ProcessDiagramType = {
    id?: number
    code: string
    name: string
    description: string
    version: string
    creationDate: Date
    lastModified: Date
    active: boolean
}

export type ProcessDiagramFormType = {
    code: string
    name: string
    description: string
    version: string
    active: boolean
}

export type ProcessDiagramResponseType = {
    id: number
    codigo: string
    nombre: string
    descripcion: string
    version: string
    fechaCreacion: Date
    fechaModificacion: Date
    activo: boolean
}
