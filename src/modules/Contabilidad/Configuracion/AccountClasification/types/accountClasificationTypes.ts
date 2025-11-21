// ============================================
// ACCOUNT CLASIFICATION (CLASIFICACIÓN DE CUENTA)
// ============================================

// Backend response type (español)
export type AccountClasificationResponse = {
    id: number
    nombre: string
    descripcion: string
    codigo: string
    activo: boolean
    fechaCreacion: string
    fechaActualizacion: string
}

// Frontend DTO type (inglés)
export type AccountClasificationDTO = {
    id: number
    name: string
    description: string
    code: string
    active: boolean
    createdAt: string
    updatedAt: string
}

// Form type for create/update (sin codigo visible)
export type AccountClasificationFormDTO = {
    id?: number
    name: string
    description: string
    active: boolean
}

// Request type to backend
export type AccountClasificationRequest = {
    nombre: string
    descripcion: string
    codigo: string                     // Siempre string vacío
    activo: boolean
    eliminado: boolean                 // Siempre false
    fechacreacion: string              // ISO string DateTime
    fechaactualizacion: string         // ISO string DateTime
}

// Select option type for dropdowns
export type SelectOptionDTO = {
    id: number | string
    label: string
}
