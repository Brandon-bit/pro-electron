/**
 * Tipos de empresa disponibles
 */
export type CompanyType = 'tradicional' | 'financiera'

/**
 * Respuesta del catálogo de tipos de empresa
 */
export interface TipoEmpresaResponse {
    id: number
    nombre: string
    descripcion?: string
    activo?: boolean
}

/**
 * Tipo de respuesta del servidor para configuración general
 * ⚠️ ACTUALIZADO: Ahora coincide con backend real
 */
export interface GeneralConfigResponse {
    id: number
    idCuenta: string
    idTipoEmpresa: number                  // FK a cont_tipoempresa (era string antes)
    descripcion: string
    ejerciciofiscalinicio?: string         // ISO Date string
    ejerciciofiscalfin?: string            // ISO Date string
    monedabase: string                     // Ej: 'MXN', 'USD'
    decimales: string                      // String en backend, se convierte a number
    idUsuario: string
    activo: boolean
    eliminado: boolean
    fechacreacion: string
    fechaactualizacion: string
    tipoempresa?: TipoEmpresaResponse      // Relación incluida por backend
}

/**
 * Tipo DTO para configuración general (uso interno frontend)
 */
export interface GeneralConfigDTO {
    id: number
    companyType: CompanyType
    description: string
    ejerciciofiscalinicio?: string
    ejerciciofiscalfin?: string
    monedabase: string
    decimales: number
    active: boolean
    createdAt: string
    updatedAt: string
}

/**
 * Tipo para formulario de configuración general
 */
export interface GeneralConfigFormDTO {
    companyType: CompanyType
    description: string
    ejerciciofiscalinicio?: string         // Opcional: inicio ejercicio fiscal
    ejerciciofiscalfin?: string            // Opcional: fin ejercicio fiscal
    monedabase: string                     // Obligatorio: 'MXN', 'USD', etc.
    decimales: number                      // Obligatorio: 0-4
    active: boolean
}

/**
 * Tipo para request de actualización al backend
 */
export interface GeneralConfigRequestDTO {
    idTipoEmpresa: number                  // FK convertido desde companyType
    descripcion: string
    ejerciciofiscalinicio: string | null   // Formato: "YYYY-MM-DD" para DateOnly
    ejerciciofiscalfin: string | null      // Formato: "YYYY-MM-DD" para DateOnly
    monedabase: string
    decimales: string                      // Backend espera string
    activo: boolean
    eliminado: boolean
    fechacreacion: string                  // ISO string para DateTime
    fechaactualizacion: string             // ISO string para DateTime
}

/**
 * Opciones para selección de tipo de empresa
 */
export interface CompanyTypeOption {
    id: CompanyType
    label: string
    description: string
}

/**
 * DTO para tipo de empresa (uso interno)
 */
export interface TipoEmpresaDTO {
    id: number
    nombre: string
    description?: string
}
