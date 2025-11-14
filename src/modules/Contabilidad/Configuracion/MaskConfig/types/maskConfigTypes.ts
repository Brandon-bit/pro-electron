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
 * Respuesta del servidor para configuración de máscara
 */
export interface MaskConfigResponse {
    id: number
    formato: string
    separador: string
    profundidadMaxima: number
    longitudFlexible: boolean
    segmentos: SegmentResponse[]
    activo: boolean
    fechaCreacion: string
    fechaActualizacion: string
}

/**
 * Segmento en la respuesta del servidor
 */
export interface SegmentResponse {
    id: string
    nombre: string
    digitos: number
    digitosMinimos: number
    digitosMaximos: number
    tipoCaracter: 'numeric' | 'alphanumeric' | 'alpha'
    requerido: boolean
    descripcion: string
    marcador: string
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
    segments: MaskSegment[]
}

/**
 * Request para actualizar/crear máscara
 */
export interface MaskConfigRequestDTO {
    formato: string
    separador: string
    profundidadMaxima: number
    longitudFlexible: boolean
    segmentos: SegmentResponse[]
    activo: boolean
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
