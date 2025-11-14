import type {
    MaskConfigResponse,
    MaskConfigDTO,
    MaskConfigFormDTO,
    MaskConfigRequestDTO,
    MaskSegment,
    SegmentResponse
} from '@contabilidad/Configuracion/MaskConfig/types/maskConfigTypes'

/**
 * Mapea segmento de respuesta a DTO
 */
const mapSegmentResponseToDTO = (segment: SegmentResponse): MaskSegment => {
    return {
        id: segment.id,
        name: segment.nombre,
        digits: segment.digitos,
        minDigits: segment.digitosMinimos,
        maxDigits: segment.digitosMaximos,
        charType: segment.tipoCaracter,
        required: segment.requerido,
        description: segment.descripcion,
        placeholder: segment.marcador
    }
}

/**
 * Mapea segmento DTO a respuesta
 */
const mapSegmentDTOToResponse = (segment: MaskSegment): SegmentResponse => {
    return {
        id: segment.id,
        nombre: segment.name,
        digitos: segment.digits,
        digitosMinimos: segment.minDigits,
        digitosMaximos: segment.maxDigits,
        tipoCaracter: segment.charType,
        requerido: segment.required,
        descripcion: segment.description,
        marcador: segment.placeholder
    }
}

/**
 * Mapea la respuesta del servidor a DTO
 */
export const mapMaskConfigResponseToDTO = (response: MaskConfigResponse): MaskConfigDTO => {
    return {
        id: response.id,
        format: response.formato,
        separator: response.separador,
        maxDepth: response.profundidadMaxima,
        allowFlexibleLength: response.longitudFlexible,
        segments: response.segmentos.map(mapSegmentResponseToDTO),
        active: response.activo,
        createdAt: response.fechaCreacion,
        updatedAt: response.fechaActualizacion
    }
}

/**
 * Mapea el form DTO a request del servidor
 */
export const mapMaskConfigDTOToRequest = (dto: MaskConfigFormDTO): MaskConfigRequestDTO => {
    return {
        formato: dto.format,
        separador: dto.separator,
        profundidadMaxima: dto.maxDepth,
        longitudFlexible: dto.allowFlexibleLength,
        segmentos: dto.segments.map(mapSegmentDTOToResponse),
        activo: true
    }
}
