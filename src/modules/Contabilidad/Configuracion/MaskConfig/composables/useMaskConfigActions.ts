import axiosApiInstance from '@/api/axiosApiInstance'
import type {
    MaskConfigDTO,
    MaskConfigFormDTO
} from '@contabilidad/Configuracion/MaskConfig/types/maskConfigTypes'
import {
    mapMaskConfigResponseToDTO,
    mapMaskConfigDTOToRequest
} from '@contabilidad/Configuracion/MaskConfig/composables/mappingMaskConfigData'

export const useMaskConfigActions = () => {
    /**
     * Obtiene la configuración de máscara actual
     * Usa el endpoint /current como GeneralConfig (configuración única)
     */
    const getMaskConfig = async (): Promise<MaskConfigDTO | null> => {
        try {
            console.log('🔍 GET /contabilidad/configuracionmascara/current')

            const response = await axiosApiInstance.get('/contabilidad/configuracionmascara/current')

            // Backend devuelve ApiResponse wrapper: 
            // { success, message, data: { configuracionmascara: {...}, totalItems: 1 } }
            const responseData = response.data.data || response.data.Data

            if (!responseData) {
                console.log('⚠️ No se encontró configuración de máscara (responseData vacío)')
                return null
            }

            // Extraer el objeto configuracionmascara del wrapper
            const data = responseData.configuracionmascara || responseData.Configuracionmascara

            if (!data) {
                console.log('⚠️ No se encontró configuración de máscara (configuracionmascara vacío)')
                return null
            }

            console.log('✅ Configuración de máscara extraída:', data)

            return mapMaskConfigResponseToDTO(data)
        } catch (error: any) {
            console.error('❌ Error al obtener configuración de máscara:', error)
            console.error('Response:', error.response?.data)

            // Si es 404, no existe configuración (es válido)
            if (error.response?.status === 404) {
                console.log('ℹ️ No existe configuración de máscara aún')
                return null
            }

            throw error
        }
    }

    /**
     * Crea la configuración de máscara inicial
     * Solo debe llamarse una vez por empresa
     */
    const createMaskConfig = async (data: MaskConfigFormDTO): Promise<MaskConfigDTO> => {
        try {
            console.log('🚀 POST /contabilidad/configuracionmascara/')
            console.log('Datos form:', data)

            // No pasar configId al crear (es nuevo)
            const requestData = mapMaskConfigDTOToRequest(data)

            console.log('Request payload:', requestData)

            const response = await axiosApiInstance.post(
                '/contabilidad/configuracionmascara/',
                requestData
            )

            // Backend devuelve: { success, message, data: { configuracionmascara, TotalItems } }
            const responseData = response.data.data || response.data.Data
            const created = responseData?.configuracionmascara || responseData?.Configuracionmascara

            console.log('✅ Configuración de máscara creada:', created)

            return mapMaskConfigResponseToDTO(created)
        } catch (error: any) {
            console.error('❌ Error al crear configuración de máscara:', error)
            console.error('Response:', error.response?.data)
            throw error
        }
    }

    /**
     * Actualiza la configuración de máscara existente
     */
    const updateMaskConfig = async (
        id: number,
        data: MaskConfigFormDTO
    ): Promise<void> => {
        try {
            console.log(`🔄 PUT /contabilidad/configuracionmascara/${id}`)
            console.log('Datos form:', data)

            // Pasar configId al actualizar para relacionar segmentos
            const requestData = mapMaskConfigDTOToRequest(data, id)

            console.log('Request payload:', requestData)

            await axiosApiInstance.put(
                `/contabilidad/configuracionmascara/${id}`,
                requestData
            )

            console.log('✅ Configuración de máscara actualizada exitosamente')
        } catch (error: any) {
            console.error('❌ Error al actualizar configuración de máscara:', error)
            console.error('Response:', error.response?.data)
            throw error
        }
    }

    return {
        getMaskConfig,
        createMaskConfig,
        updateMaskConfig
    }
}
