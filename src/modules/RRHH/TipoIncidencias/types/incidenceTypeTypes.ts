export type IncidenceTypeType = {
    id?: number
    name: string
    parentCategoryName: string
    parentCategoryId: number
    requiresDateRange: boolean
    requiresHours: boolean
    requiresJustification: boolean
    status: boolean
    creationDate: Date
    description?: string
}

export type IncidenceTypeResponseType = {
    id: number
    nombre: string
    idCategoriaPadre: number
    nombreCategoriaPadre: string
    descripcion?: string
    requiereRangoFechas: boolean
    requiereHoras: boolean
    requiereJustificacion: boolean
    fechaCreacion: Date
    activo: boolean
    eliminado: boolean
}

export type IncidenceTypeFormType = {
    name: string
    parentCategoryId: number
    requiresDateRange: boolean
    requiresHours: boolean
    requiresJustification: boolean
    status: boolean
    description?: string
}

export type ParentCategoryResponseType = {
    id: number
    nombre: string
}

export type ParentCategoryType = {
    id: number
    label: string
}
