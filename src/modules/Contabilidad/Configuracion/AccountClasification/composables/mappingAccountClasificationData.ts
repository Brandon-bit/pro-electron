import type { 
    AccountClasificationResponse, 
    AccountClasificationDTO,
    AccountClasificationFormDTO,
    AccountClasificationRequest
} from '@contabilidad/Configuracion/AccountClasification/types/accountClasificationTypes'

// Map from backend response to frontend DTO
export const mapAccountClasificationResponseToDTO = (response: AccountClasificationResponse): AccountClasificationDTO => {
    return {
        id: response.id,
        name: response.nombre,
        description: response.descripcion,
        active: response.activo,
        createdAt: response.fechaCreacion,
        updatedAt: response.fechaActualizacion
    }
}

// Map from frontend DTO to backend request
export const mapAccountClasificationDTOToRequest = (dto: AccountClasificationFormDTO): AccountClasificationRequest => {
    return {
        id: dto.id,
        nombre: dto.name,
        descripcion: dto.description,
        activo: dto.active
    }
}

// Map from DTO to Form
export const mapAccountClasificationDTOToForm = (dto: AccountClasificationDTO): AccountClasificationFormDTO => {
    return {
        id: dto.id,
        name: dto.name,
        description: dto.description,
        active: dto.active
    }
}
