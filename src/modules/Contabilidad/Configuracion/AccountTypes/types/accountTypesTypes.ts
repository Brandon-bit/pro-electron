// ============================================
// ACCOUNT TYPE (TIPO DE CUENTA)
// ============================================

// Backend response type (español)
export type AccountTypeResponse = {
    id: number
    nombre: string
    descripcion: string
    activo: boolean
    fechaCreacion: string
    fechaActualizacion: string
}

// Frontend DTO type (inglés)
export type AccountTypeDTO = {
    id: number
    name: string
    description: string
    active: boolean
    createdAt: string
    updatedAt: string
}

// Form type for create/update
export type AccountTypeFormDTO = {
    id?: number
    name: string
    description: string
    active: boolean
}

// Request type to backend
export type AccountTypeRequest = {
    id?: number
    nombre: string
    descripcion: string
    activo: boolean
}

// Select option type for dropdowns
export type SelectOptionDTO = {
    id: number | string
    label: string
}
