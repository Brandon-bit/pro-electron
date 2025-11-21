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
    nombre: string
    descripcion: string
    niveljerarquico: number        // Nivel jerárquico (enviar 0 si no se usa)
    permitemovimientos: boolean    // Permite movimientos (enviar false por defecto)
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
