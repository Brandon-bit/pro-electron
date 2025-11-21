export type IncidenceCategoryType = {
    id?: number
    name: string
    status: boolean
    creationDate: Date
    description?: string
}

export type IncidenceCategoryResponseType = {
    id: number
    nombre: string
    descripcion?: string
    fechaCreacion: Date
    activo: boolean
    eliminado: boolean
}

export type IncidenceCategoryFormType = {
    name: string
    status: boolean
    description?: string
}
