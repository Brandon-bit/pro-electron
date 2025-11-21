import type {
    AccountTypeResponse,
    AccountTypeDTO,
    AccountTypeFormDTO,
    AccountTypeRequest
} from '@contabilidad/Configuracion/AccountTypes/types/accountTypesTypes'

// Map from backend response to frontend DTO
export const mapAccountTypeResponseToDTO = (response: AccountTypeResponse): AccountTypeDTO => {
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
export const mapAccountTypeDTOToRequest = (dto: AccountTypeFormDTO): AccountTypeRequest => {
    return {
        nombre: dto.name,
        descripcion: dto.description,
        niveljerarquico: 0,                          // 0 por defecto (sbyte)
        permitemovimientos: false,                   // false por defecto
        activo: dto.active,
        eliminado: false,                            // Siempre false
        fechacreacion: new Date().toISOString(),     // ISO string para DateTime
        fechaactualizacion: new Date().toISOString() // ISO string para DateTime
    }
}

// Map from DTO to Form
export const mapAccountTypeDTOToForm = (dto: AccountTypeDTO): AccountTypeFormDTO => {
    return {
        id: dto.id,
        name: dto.name,
        description: dto.description,
        active: dto.active
    }
}
