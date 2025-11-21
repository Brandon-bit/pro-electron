import type {
    MaskConfigDTO,
    MaskConfigFormDTO,
    MaskConfigRequest,
    MaskConfigResponse,
    MaskSegment,
    SegmentRequest,
    SegmentResponse,
    CharType
} from '@contabilidad/Configuracion/MaskConfig/types/maskConfigTypes'

/**
 * Mapea el tipo de carácter de ID numérico a enum
 */
const mapIdToCharType = (idTipoCaracter: number): CharType => {
    switch (idTipoCaracter) {
        case 1:
            return 'numeric'
        case 2:
            return 'alphanumeric'
        case 3:
            return 'alpha'
        default:
            return 'numeric'
    }
}

/**
 * Mapea el tipo de carácter de enum a ID numérico
 */
const mapCharTypeToId = (charType: CharType): number => {
    switch (charType) {
        case 'numeric':
            return 1
        case 'alphanumeric':
            return 2
        case 'alpha':
            return 3
        default:
            return 1
    }
}

/**
 * Convierte un segmento de respuesta (backend) a segmento frontend
 */
const mapSegmentResponseToSegment = (segment: SegmentResponse): MaskSegment => {
    return {
        id: segment.segmentoid,
        name: segment.nombre,
        digits: parseInt(segment.digitos, 10),        // string → number
        minDigits: parseInt(segment.digitosminimos, 10),  // string → number
        maxDigits: parseInt(segment.digitosmaximos, 10),  // string → number
        charType: mapIdToCharType(segment.idTipoCaracter),
        required: segment.requerido,
        description: segment.descripcion || '',
        placeholder: segment.marcador || ''
    }
}

/**
 * Convierte un segmento frontend a segmento de request (backend)
 */
const mapSegmentToSegmentRequest = (segment: MaskSegment, order: number, configId?: number): SegmentRequest => {
    const segmentRequest: SegmentRequest = {
        segmentoid: segment.id,
        nombre: segment.name,
        orden: order.toString(),                     // number → string
        digitos: segment.digits.toString(),          // number → string
        digitosminimos: segment.minDigits.toString(),    // number → string
        digitosmaximos: segment.maxDigits.toString(),    // number → string
        idTipoCaracter: mapCharTypeToId(segment.charType),
        requerido: segment.required,
        descripcion: segment.description,
        marcador: segment.placeholder,
        activo: true,
        eliminado: false,
        fechacreacion: new Date().toISOString(),
        fechaactualizacion: new Date().toISOString()
    }

    // Agregar idConfiguracionMascara si existe (para updates)
    if (configId !== undefined) {
        segmentRequest.idConfiguracionMascara = configId
    }

    return segmentRequest
}

/**
 * Maps backend response (español) to frontend DTO (inglés)
 */
export const mapMaskConfigResponseToDTO = (response: MaskConfigResponse): MaskConfigDTO => {
    return {
        id: response.id,
        format: response.formato,
        separator: response.separador,
        maxDepth: parseInt(response.profundidadmaxima, 10),  // string → number
        allowFlexibleLength: response.longitudflexible,
        description: response.descripcion || '',
        segments: (response.configuracionmascarasegmentos || [])
            .map(seg => mapSegmentResponseToSegment(seg))
            .sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10)), // Ordenar por ID
        active: response.activo,
        createdAt: response.fechacreacion,
        updatedAt: response.fechaactualizacion
    }
}

/**
 * Maps frontend DTO to backend request (español)
 */
export const mapMaskConfigDTOToRequest = (dto: MaskConfigFormDTO, configId?: number): MaskConfigRequest => {
    return {
        formato: dto.format,
        separador: dto.separator,
        profundidadmaxima: dto.maxDepth.toString(),   // number → string
        longitudflexible: dto.allowFlexibleLength,
        descripcion: dto.description || '',
        configuracionmascarasegmentos: dto.segments.map((seg, index) =>
            mapSegmentToSegmentRequest(seg, index + 1, configId)
        ),
        activo: true,
        eliminado: false,
        fechacreacion: new Date().toISOString(),
        fechaactualizacion: new Date().toISOString()
    }
}
