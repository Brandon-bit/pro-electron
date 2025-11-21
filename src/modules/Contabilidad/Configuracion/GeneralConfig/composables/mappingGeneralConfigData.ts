import type {
    GeneralConfigResponse,
    GeneralConfigDTO,
    GeneralConfigFormDTO,
    GeneralConfigRequestDTO,
    TipoEmpresaDTO,
    CompanyType
} from '@contabilidad/Configuracion/GeneralConfig/types/generalConfigTypes'
import { useTipoEmpresaActions } from './useTipoEmpresaActions'

const { getTypeById, getIdByType } = useTipoEmpresaActions()

/**
 * Mapea la respuesta del servidor (backend) a DTO (frontend)
 * Convierte nombres de campos español → inglés
 * Convierte idTipoEmpresa (number) → companyType (string)
 */
export const mapGeneralConfigResponseToDTO = (
    response: GeneralConfigResponse,
    tiposEmpresa: TipoEmpresaDTO[]
): GeneralConfigDTO => {
    // Determinar tipo de empresa desde relación incluida o por ID
    let companyType: CompanyType

    if (response.tipoempresa?.nombre) {
        // Si el backend incluyó la relación, usar el nombre
        const tipo = response.tipoempresa.nombre.toLowerCase()
        companyType = (tipo === 'tradicional' || tipo === 'financiera') ? tipo : 'tradicional'
    } else {
        // Sino, convertir desde ID
        companyType = getTypeById(response.idTipoEmpresa, tiposEmpresa)
    }

    return {
        id: response.id,
        companyType: companyType,
        description: response.descripcion || '',
        ejerciciofiscalinicio: response.ejerciciofiscalinicio,
        ejerciciofiscalfin: response.ejerciciofiscalfin,
        monedabase: response.monedabase || 'MXN',
        decimales: parseInt(response.decimales) || 2,
        active: response.activo,
        createdAt: response.fechacreacion,
        updatedAt: response.fechaactualizacion
    }
}

/**
 * Mapea el form DTO (frontend) a request del servidor (backend)
 * Convierte nombres de campos inglés → español
 * Convierte companyType (string) → idTipoEmpresa (number)
 * Formatea fechas a ISO string (YYYY-MM-DD) para DateOnly del backend
 */
export const mapGeneralConfigDTOToRequest = (
    dto: GeneralConfigFormDTO,
    tiposEmpresa: TipoEmpresaDTO[]
): GeneralConfigRequestDTO => {
    const idTipoEmpresa = getIdByType(dto.companyType, tiposEmpresa)

    // Las fechas ya vienen en formato YYYY-MM-DD del input type="date"
    // Solo necesitamos pasarlas directamente o null si están vacías
    const formatToDateOnly = (dateString: string | undefined): string | null => {
        if (!dateString) return null
        return dateString // Ya está en formato YYYY-MM-DD
    }

    return {
        idTipoEmpresa: idTipoEmpresa,
        descripcion: dto.description, // Enviar tal cual, sin || ''
        ejerciciofiscalinicio: formatToDateOnly(dto.ejerciciofiscalinicio),
        ejerciciofiscalfin: formatToDateOnly(dto.ejerciciofiscalfin),
        monedabase: dto.monedabase,
        decimales: dto.decimales.toString(),
        activo: dto.active,
        eliminado: false,
        fechacreacion: new Date().toISOString(), // ISO string para DateTime
        fechaactualizacion: new Date().toISOString() // ISO string para DateTime
    }
}

/**
 * Convierte GeneralConfigDTO completo a FormDTO (para edición)
 */
export const mapDTOToFormDTO = (dto: GeneralConfigDTO): GeneralConfigFormDTO => {
    return {
        companyType: dto.companyType,
        description: dto.description,
        ejerciciofiscalinicio: dto.ejerciciofiscalinicio,
        ejerciciofiscalfin: dto.ejerciciofiscalfin,
        monedabase: dto.monedabase,
        decimales: dto.decimales,
        active: dto.active
    }
}
