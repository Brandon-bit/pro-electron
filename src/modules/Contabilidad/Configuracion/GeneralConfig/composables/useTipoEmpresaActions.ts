import axiosApiInstance from '@/api/axiosApiInstance'
import type { TipoEmpresaDTO, CompanyType } from '../types/generalConfigTypes'

/**
 * Composable para manejar el catálogo de Tipos de Empresa
 * Maneja la conversión entre string ('tradicional'/'financiera') y ID (1/2)
 */
export const useTipoEmpresaActions = () => {
    /**
     * Obtiene el catálogo completo de tipos de empresa desde el backend
     * Si falla, lanza el error (NO usa fallback hardcodeado)
     */
    const getTiposEmpresa = async (): Promise<TipoEmpresaDTO[]> => {
        const response = await axiosApiInstance.get('/contabilidad/tipoempresa/lista')

        // Backend devuelve ApiResponse wrapper
        const items = response.data.data?.items || response.data.data?.Items || []

        return items.map((item: any) => ({
            id: item.id,
            nombre: item.nombre || item.Nombre,
            description: item.descripcion || item.Descripcion
        }))
    }

    /**
     * Convierte CompanyType (string) a ID (number)
     * @param type 'tradicional' | 'financiera'
     * @param tipos Catálogo de tipos
     * @returns ID del tipo de empresa
     */
    const getIdByType = (type: CompanyType, tipos: TipoEmpresaDTO[]): number => {
        const found = tipos.find(t => t.nombre.toLowerCase() === type.toLowerCase())

        if (!found) {
            console.warn(`Tipo de empresa "${type}" no encontrado en catálogo, usando tradicional (1)`)
            return 1 // Default: Tradicional
        }

        return found.id
    }

    /**
     * Convierte ID (number) a CompanyType (string)
     * @param id ID del tipo de empresa
     * @param tipos Catálogo de tipos
     * @returns 'tradicional' | 'financiera'
     */
    const getTypeById = (id: number, tipos: TipoEmpresaDTO[]): CompanyType => {
        const found = tipos.find(t => t.id === id)

        if (!found) {
            console.warn(`ID de tipo de empresa ${id} no encontrado en catálogo, usando tradicional`)
            return 'tradicional'
        }

        const type = found.nombre.toLowerCase()

        if (type !== 'tradicional' && type !== 'financiera') {
            console.warn(`Tipo de empresa "${found.nombre}" no es válido, usando tradicional`)
            return 'tradicional'
        }

        return type as CompanyType
    }

    return {
        getTiposEmpresa,
        getIdByType,
        getTypeById
    }
}
