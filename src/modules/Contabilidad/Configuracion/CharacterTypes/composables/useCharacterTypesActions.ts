import axiosApiInstance from '@/api/axiosApiInstance'
import type { CharacterTypeDTO, CharacterTypeFormDTO } from '@contabilidad/Configuracion/CharacterTypes/types/characterTypesTypes'
import {
    mapCharacterTypeResponseToDTO,
    mapCharacterTypeDTOToRequest
} from '@contabilidad/Configuracion/CharacterTypes/composables/mappingCharacterTypesData'

/**
 * Composable para manejar acciones de API de Character Types
 */
export const useCharacterTypesActions = () => {
    /**
     * Obtiene tipos de caracteres con paginación
     * @param page - Número de página (1-indexed)
     * @param pageSize - Tamaño de página
     * @returns { items, total }
     */
    const getCharacterTypes = async (
        page: number,
        pageSize: number
    ): Promise<{ items: CharacterTypeDTO[]; total: number }> => {
        try {
            const skip = (page - 1) * pageSize

            console.log(`📥 GET /contabilidad/tipocaractersegmento?limit=${pageSize}&skip=${skip}`)

            const response = await axiosApiInstance.get('/contabilidad/tipocaractersegmento', {
                params: {
                    limit: pageSize,
                    skip: skip
                }
            })

            // Backend devuelve ApiResponse wrapper
            const responseData = response.data.data || response.data.Data
            const items = responseData?.Items || responseData?.items || []
            const total = responseData?.TotalItems || responseData?.totalItems || 0

            console.log(`✅ Recibidos ${items.length} de ${total} tipos de caracteres`)

            return {
                items: items.map(mapCharacterTypeResponseToDTO),
                total
            }
        } catch (error: any) {
            console.error('❌ Error al obtener tipos de caracteres:', error)
            throw error
        }
    }

    /**
     * Obtiene todos los tipos de caracteres sin paginación
     * Útil para llenar selects/dropdowns
     */
    const getAllCharacterTypes = async (): Promise<CharacterTypeDTO[]> => {
        try {
            console.log('📥 GET /contabilidad/tipocaractersegmento/lista')

            const response = await axiosApiInstance.get('/contabilidad/tipocaractersegmento/lista')

            const responseData = response.data.data || response.data.Data
            const items = responseData?.Items || responseData?.items || []

            console.log(`✅ Recibidos ${items.length} tipos de caracteres (lista completa)`)

            return items.map(mapCharacterTypeResponseToDTO)
        } catch (error: any) {
            console.error('❌ Error al obtener lista de tipos de caracteres:', error)
            throw error
        }
    }

    /**
     * Obtiene un tipo de carácter por ID
     */
    const getCharacterTypeById = async (id: number): Promise<CharacterTypeDTO | null> => {
        try {
            console.log(`📥 GET /contabilidad/tipocaractersegmento/${id}`)

            const response = await axiosApiInstance.get(`/contabilidad/tipocaractersegmento/${id}`)

            const responseData = response.data.data || response.data.Data
            const items = responseData?.Items || responseData?.items || []

            if (items.length === 0) {
                return null
            }

            return mapCharacterTypeResponseToDTO(items[0])
        } catch (error: any) {
            console.error(`❌ Error al obtener tipo de carácter ${id}:`, error)
            throw error
        }
    }

    /**
     * Crea un nuevo tipo de carácter
     */
    const createCharacterType = async (data: CharacterTypeFormDTO): Promise<CharacterTypeDTO> => {
        try {
            console.log('🚀 POST /contabilidad/tipocaractersegmento/')
            console.log('Datos form:', data)

            const requestData = mapCharacterTypeDTOToRequest(data)

            console.log('Request payload:', requestData)

            const response = await axiosApiInstance.post(
                '/contabilidad/tipocaractersegmento/',
                requestData
            )

            // Backend devuelve: { success, message, data: { tipocaractersegmento, TotalItems } }
            const responseData = response.data.data || response.data.Data
            const created = responseData?.tipocaractersegmento || responseData?.Tipocaractersegmento

            console.log('✅ Tipo de carácter creado:', created)

            return mapCharacterTypeResponseToDTO(created)
        } catch (error: any) {
            console.error('❌ Error al crear tipo de carácter:', error)
            console.error('Response:', error.response?.data)
            throw error
        }
    }

    /**
     * Actualiza un tipo de carácter existente
     */
    const updateCharacterType = async (
        id: number,
        data: CharacterTypeFormDTO
    ): Promise<void> => {
        try {
            console.log(`🔄 PUT /contabilidad/tipocaractersegmento/${id}`)
            console.log('Datos form:', data)

            const requestData = mapCharacterTypeDTOToRequest(data)

            console.log('Request payload:', requestData)

            await axiosApiInstance.put(
                `/contabilidad/tipocaractersegmento/${id}`,
                requestData
            )

            console.log('✅ Tipo de carácter actualizado exitosamente')
        } catch (error: any) {
            console.error('❌ Error al actualizar tipo de carácter:', error)
            console.error('Response:', error.response?.data)
            throw error
        }
    }

    /**
     * Elimina un tipo de carácter (soft delete por defecto)
     */
    const deleteCharacterType = async (id: number): Promise<void> => {
        try {
            console.log(`🗑️ DELETE /contabilidad/tipocaractersegmento/${id}?borradoLogico=true`)

            await axiosApiInstance.delete(`/contabilidad/tipocaractersegmento/${id}`, {
                params: { borradoLogico: true }
            })

            console.log('✅ Tipo de carácter eliminado exitosamente')
        } catch (error: any) {
            console.error('❌ Error al eliminar tipo de carácter:', error)
            console.error('Response:', error.response?.data)
            throw error
        }
    }

    return {
        getCharacterTypes,
        getAllCharacterTypes,
        getCharacterTypeById,
        createCharacterType,
        updateCharacterType,
        deleteCharacterType
    }
}
