// ============================================
// ACCOUNT CLASIFICATION (CLASIFICACIÓN DE CUENTA)
// ============================================

// Backend response type (español)
export type AccountClasificationResponse = {
    id: number
    nombre: string
    descripcion: string
    activo: boolean
    fechaCreacion: string
    fechaActualizacion: string
}

// Frontend DTO type (inglés)
export type AccountClasificationDTO = {
    id: number
    name: string
    description: string
    active: boolean
    createdAt: string
    updatedAt: string
}

// Form type for create/update
export type AccountClasificationFormDTO = {
    id?: number
    name: string
    description: string
    active: boolean
}

// Request type to backend
export type AccountClasificationRequest = {
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
