import type { 
    AccountNatureResponse, 
    AccountNatureDTO,
    AccountNatureFormDTO,
    AccountNatureRequest
} from '@contabilidad/Configuracion/AccountNature/types/accountNatureTypes'

// Map from backend response to frontend DTO
export const mapAccountNatureResponseToDTO = (response: AccountNatureResponse): AccountNatureDTO => {
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
export const mapAccountNatureDTOToRequest = (dto: AccountNatureFormDTO): AccountNatureRequest => {
    return {
        id: dto.id,
        nombre: dto.name,
        descripcion: dto.description,
        activo: dto.active
    }
}

// Map from DTO to Form
export const mapAccountNatureDTOToForm = (dto: AccountNatureDTO): AccountNatureFormDTO => {
    return {
        id: dto.id,
        name: dto.name,
        description: dto.description,
        active: dto.active
    }
}
