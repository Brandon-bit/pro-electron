/**
 * Character Types Module - TypeScript Interfaces
 * Tipos de Caracteres para segmentos de máscara contable
 */

/**
 * DTO for internal use (frontend)
 * No incluye campos backend-managed ni codigo
 */
export interface CharacterTypeDTO {
    id: number
    name: string
    description: string
    active: boolean
}

/**
 * Form DTO (usado en formularios y store)
 * Solo campos editables por el usuario
 */
export interface CharacterTypeFormDTO {
    id?: number
    name: string
    description: string
    active: boolean
}

/**
 * Backend Request (español)
 * Incluye TODOS los campos que el backend espera
 */
export interface CharacterTypeRequest {
    codigo: string              // Siempre ""
    nombre: string
    descripcion: string
    activo: boolean
    eliminado: boolean
    fechacreacion: string       // ISO string
    fechaactualizacion: string  // ISO string
}

/**
 * Backend Response (español)
 * Incluye campos managed por backend
 */
export interface CharacterTypeResponse {
    id: number
    idCuenta: string           // Managed by backend
    codigo: string             // Siempre ""
    nombre: string
    descripcion: string
    idUsuario: string          // Managed by backend
    activo: boolean
    eliminado: boolean
    fechacreacion: Date
    fechaactualizacion: Date
}
