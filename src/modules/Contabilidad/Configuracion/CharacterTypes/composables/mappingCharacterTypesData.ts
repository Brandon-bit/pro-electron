import type {
    CharacterTypeDTO,
    CharacterTypeFormDTO,
    CharacterTypeRequest,
    CharacterTypeResponse
} from '@contabilidad/Configuracion/CharacterTypes/types/characterTypesTypes'

/**
 * Mapea response del backend a DTO del frontend
 */
export const mapCharacterTypeResponseToDTO = (
    response: CharacterTypeResponse
): CharacterTypeDTO => {
    return {
        id: response.id,
        name: response.nombre,
        description: response.descripcion || '',
        active: response.activo
    }
}

/**
 * Mapea DTO del frontend a request del backend
 * IMPORTANTE: codigo siempre se envía como string vacío ""
 */
export const mapCharacterTypeDTOToRequest = (
    dto: CharacterTypeFormDTO
): CharacterTypeRequest => {
    return {
        codigo: '',  // ← SIEMPRE string vacío (regla especial)
        nombre: dto.name,
        descripcion: dto.description || '',
        activo: dto.active,
        eliminado: false,
        fechacreacion: new Date().toISOString(),
        fechaactualizacion: new Date().toISOString()
    }
}
