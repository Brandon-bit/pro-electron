import type {
    AccountClasificationDTO,
    AccountClasificationFormDTO,
    AccountClasificationRequest,
    AccountClasificationResponse
} from '@contabilidad/Configuracion/AccountClasification/types/accountClasificationTypes'

/**
 * Maps backend response (español) to frontend DTO (inglés)
 */
export const mapAccountClasificationResponseToDTO = (response: AccountClasificationResponse): AccountClasificationDTO => {
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
export const mapAccountClasificationDTOToRequest = (dto: AccountClasificationFormDTO): AccountClasificationRequest => {
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
