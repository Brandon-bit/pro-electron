import type {
    AccountNatureDTO,
    AccountNatureFormDTO,
    AccountNatureRequest,
    AccountNatureResponse
} from '@contabilidad/Configuracion/AccountNature/types/accountNatureTypes'

/**
 * Maps backend response (español) to frontend DTO (inglés)
 */
export const mapAccountNatureResponseToDTO = (response: AccountNatureResponse): AccountNatureDTO => {
    return {
        id: response.id,
        name: response.nombre,
        description: response.descripcion || '',
        code: response.codigo,
        active: response.activo,
        createdAt: response.fechaCreacion,
        updatedAt: response.fechaActualizacion
    }
}

/**
 * Maps frontend DTO to backend request (español)
 */
export const mapAccountNatureDTOToRequest = (dto: AccountNatureFormDTO): AccountNatureRequest => {
    return {
        nombre: dto.name,
        descripcion: dto.description,
        codigo: '',                                  // Siempre string vacío
        activo: dto.active,
        eliminado: false,                            // Siempre false
        fechacreacion: new Date().toISOString(),     // ISO string DateTime
        fechaactualizacion: new Date().toISOString() // ISO string DateTime
    }
}
