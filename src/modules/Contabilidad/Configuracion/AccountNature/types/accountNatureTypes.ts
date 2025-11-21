// ============================================
// ACCOUNT NATURE (NATURALEZA DE CUENTA)
// ============================================

// Backend response type (español)
export type AccountNatureResponse = {
    id: number
    nombre: string
    descripcion: string
    codigo: string
    activo: boolean
    fechaCreacion: string
    fechaActualizacion: string
}

// Frontend DTO type (inglés)
export type AccountNatureDTO = {
    id: number
    name: string
    description: string
    code: string
    active: boolean
    createdAt: string
    updatedAt: string
}

// Form type for create/update
export type AccountNatureFormDTO = {
    id?: number
    name: string
    description: string
    code?: string  // Optional, will be set to empty string in mapper
    active: boolean
}

// Request type to backend
export type AccountNatureRequest = {
    nombre: string
    descripcion: string
    codigo: string
    activo: boolean
    eliminado: boolean             // Siempre false al crear/actualizar
    fechacreacion: string          // ISO string DateTime
    fechaactualizacion: string     // ISO string DateTime
}

// Select option type for dropdowns
export type SelectOptionDTO = {
    id: number | string
    label: string
}
