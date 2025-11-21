import axiosApiInstance from '@/api/axiosApiInstance'
import type {
    GeneralConfigDTO,
    GeneralConfigFormDTO
} from '@contabilidad/Configuracion/GeneralConfig/types/generalConfigTypes'
import {
    mapGeneralConfigResponseToDTO,
    mapGeneralConfigDTOToRequest
} from '@contabilidad/Configuracion/GeneralConfig/composables/mappingGeneralConfigData'
import { useTipoEmpresaActions } from './useTipoEmpresaActions'

export const useGeneralConfigActions = () => {
    const { getTiposEmpresa } = useTipoEmpresaActions()

    /**
     * Obtiene la configuración general actual de la empresa
     * El endpoint /current retorna: { configuraciongeneral: {...}, totalItems: 1 }
     */
    const getGeneralConfig = async (): Promise<GeneralConfigDTO | null> => {
        try {
            console.log('🔍 GET /contabilidad/configuraciongeneral/current')

            // Cargar tipos de empresa en paralelo
            const [configResponse, tiposEmpresa] = await Promise.all([
                axiosApiInstance.get('/contabilidad/configuraciongeneral/current'),
                getTiposEmpresa()
            ])

            // Backend devuelve ApiResponse wrapper: 
            // { success, message, data: { configuraciongeneral: {...}, totalItems: 1 } }
            const responseData = configResponse.data.data || configResponse.data.Data

            if (!responseData) {
                console.log('⚠️ No se encontró configuración general (responseData vacío)')
                return null
            }

            // Extraer el objeto configuraciongeneral del wrapper
            const data = responseData.configuraciongeneral || responseData.Configuraciongeneral

            if (!data) {
                console.log('⚠️ No se encontró configuración general (configuraciongeneral vacío)')
                return null
            }

            // data es el objeto de configuración
            console.log('✅ Configuración extraída:', data)

            return mapGeneralConfigResponseToDTO(data, tiposEmpresa)
        } catch (error: any) {
            console.error('❌ Error al obtener configuración general:', error)
            console.error('Response:', error.response?.data)

            // Si es 404, no existe configuración (es válido)
            if (error.response?.status === 404) {
                console.log('ℹ️ No existe configuración general aún')
                return null
            }

            throw error
        }
    }

    /**
     * Crea la configuración general inicial
     * Solo debe llamarse una vez por empresa
     */
    const createGeneralConfig = async (data: GeneralConfigFormDTO): Promise<GeneralConfigDTO> => {
        try {
            console.log('🚀 POST /contabilidad/configuraciongeneral/')
            console.log('Datos form:', data)

            const tiposEmpresa = await getTiposEmpresa()
            const requestData = mapGeneralConfigDTOToRequest(data, tiposEmpresa)

            console.log('Request payload:', requestData)

            const response = await axiosApiInstance.post(
                '/contabilidad/configuraciongeneral/',
                requestData
            )

            // Backend devuelve: { success, message, data: { configuraciongeneral, TotalItems } }
            const responseData = response.data.data || response.data.Data
            const created = responseData?.configuraciongeneral || responseData?.Configuraciongeneral

            console.log('✅ Configuración creada:', created)

            return mapGeneralConfigResponseToDTO(created, tiposEmpresa)
        } catch (error: any) {
            console.error('❌ Error al crear configuración:', error)
            console.error('Response:', error.response?.data)
            throw error
        }
    }

    /**
     * Actualiza la configuración general existente
     */
    const updateGeneralConfig = async (
        id: number,
        data: GeneralConfigFormDTO
    ): Promise<void> => {
        try {
            console.log(`🔄 PUT /contabilidad/configuraciongeneral/${id}`)
            console.log('Datos form:', data)

            const tiposEmpresa = await getTiposEmpresa()
            const requestData = mapGeneralConfigDTOToRequest(data, tiposEmpresa)

            console.log('Request payload:', requestData)

            await axiosApiInstance.put(
                `/contabilidad/configuraciongeneral/${id}`,
                requestData
            )

            console.log('✅ Configuración actualizada exitosamente')
        } catch (error: any) {
            console.error('❌ Error al actualizar configuración:', error)
            console.error('Response:', error.response?.data)
            throw error
        }
    }

    return {
        getGeneralConfig,
        createGeneralConfig,
        updateGeneralConfig
    }
}
