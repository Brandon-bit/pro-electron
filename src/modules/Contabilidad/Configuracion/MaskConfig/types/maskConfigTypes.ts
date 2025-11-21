/**
 * Tipo de carácter permitido en un segmento
 */
export type CharType = 'numeric' | 'alphanumeric' | 'alpha'

/**
 * Segmento de la máscara contable
 */
export interface MaskSegment {
    id: string
    name: string
    digits: number
    minDigits: number
    maxDigits: number
    charType: CharType
    required: boolean
    description: string
    placeholder: string
}

/**
 * Configuración completa de la máscara
 */
export interface MaskConfiguration {
    format: string
    segments: MaskSegment[]
    separator: string
    maxDepth: number
    allowFlexibleLength: boolean
}

/**
 * Segmento en la respuesta del servidor
 */
export interface SegmentResponse {
    id?: number
    idCuenta?: string
    idConfiguracionMascara?: number
    segmentoid: string
    nombre: string
    orden: string                    // Backend usa string!
    digitos: string                  // Backend usa string!
    digitosminimos: string           // Backend usa string!
    digitosmaximos: string           // Backend usa string!
    idTipoCaracter: number           // 1=numeric, 2=alphanumeric, 3=alpha
    requerido: boolean
    descripcion: string
    marcador: string
    idUsuario?: string
    activo?: boolean
    eliminado?: boolean
    fechacreacion?: string
    fechaactualizacion?: string
}

/**
 * Respuesta del servidor para configuración de máscara
 */
export interface MaskConfigResponse {
    id: number
    idCuenta?: string
    formato: string
    separador: string
    profundidadmaxima: string        // Backend usa string!
    longitudflexible: boolean
    descripcion?: string
    configuracionmascarasegmentos?: SegmentResponse[]
    idUsuario?: string
    activo: boolean
    eliminado?: boolean
    fechacreacion: string
    fechaactualizacion: string
}

/**
 * DTO para configuración de máscara
 */
export interface MaskConfigDTO {
    id: number
    format: string
    separator: string
    maxDepth: number
    allowFlexibleLength: boolean
    description?: string
    segments: MaskSegment[]
    active: boolean
    createdAt: string
    updatedAt: string
}

/**
 * DTO para formulario de máscara
 */
export interface MaskConfigFormDTO {
    format: string
    separator: string
    maxDepth: number
    allowFlexibleLength: boolean
    description?: string
    segments: MaskSegment[]
}

/**
 * Segmento para request al backend
 */
export interface SegmentRequest {
    idConfiguracionMascara?: number  // FK a la máscara padre (opcional para crear)
    segmentoid: string
    nombre: string
    orden: string                    // Backend requiere string!
    digitos: string                  // Backend requiere string!
    digitosminimos: string           // Backend requiere string!
    digitosmaximos: string           // Backend requiere string!
    idTipoCaracter: number
    requerido: boolean
    descripcion: string
    marcador: string
    activo: boolean
    eliminado: boolean
    fechacreacion: string
    fechaactualizacion: string
}

/**
 * Request para actualizar/crear máscara
 */
export interface MaskConfigRequest {
    formato: string
    separador: string
    profundidadmaxima: string        // Backend requiere string!
    longitudflexible: boolean
    descripcion?: string
    configuracionmascarasegmentos: SegmentRequest[]
    activo: boolean
    eliminado: boolean
    fechacreacion: string
    fechaactualizacion: string
}

/**
 * Opciones de separador
 */
export interface SeparatorOption {
    id: string
    label: string
    value: string
}

/**
 * Opciones de tipo de carácter
 */
export interface CharTypeOption {
    id: CharType
    label: string
}

/**
 * Formato predefinido
 */
export interface PredefinedFormat {
    id: string
    label: string
    format: string
    separator: string
}
