import type {
    GeneralConfigResponse,
    GeneralConfigDTO,
    GeneralConfigFormDTO,
    GeneralConfigRequestDTO
} from '@contabilidad/Configuracion/GeneralConfig/types/generalConfigTypes'

/**
 * Mapea la respuesta del servidor a DTO
 */
export const mapGeneralConfigResponseToDTO = (response: GeneralConfigResponse): GeneralConfigDTO => {
    return {
        id: response.id,
        companyType: response.tipoEmpresa,
        description: response.descripcion,
        active: response.activo,
        createdAt: response.fechaCreacion,
        updatedAt: response.fechaActualizacion
    }
}

/**
 * Mapea el form DTO a request del servidor
 */
export const mapGeneralConfigDTOToRequest = (dto: GeneralConfigFormDTO): GeneralConfigRequestDTO => {
    return {
        tipoEmpresa: dto.companyType,
        descripcion: dto.description,
        activo: dto.active
    }
}
