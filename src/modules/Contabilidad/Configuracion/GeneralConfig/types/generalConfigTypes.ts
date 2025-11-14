/**
 * Tipos de empresa disponibles
 */
export type CompanyType = 'tradicional' | 'financiera'

/**
 * Tipo de respuesta del servidor para configuración general
 */
export interface GeneralConfigResponse {
    id: number
    tipoEmpresa: 'tradicional' | 'financiera'
    descripcion: string
    activo: boolean
    fechaCreacion: string
    fechaActualizacion: string
}

/**
 * Tipo DTO para configuración general
 */
export interface GeneralConfigDTO {
    id: number
    companyType: CompanyType
    description: string
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
    active: boolean
}

/**
 * Tipo para request de actualización
 */
export interface GeneralConfigRequestDTO {
    tipoEmpresa: 'tradicional' | 'financiera'
    descripcion: string
    activo: boolean
}

/**
 * Opciones para selección de tipo de empresa
 */
export interface CompanyTypeOption {
    id: CompanyType
    label: string
    description: string
}
