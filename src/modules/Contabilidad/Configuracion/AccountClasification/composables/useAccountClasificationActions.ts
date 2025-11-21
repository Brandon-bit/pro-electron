import type {
    AccountClasificationDTO,
    AccountClasificationFormDTO,
    SelectOptionDTO
} from '@contabilidad/Configuracion/AccountClasification/types/accountClasificationTypes'
import {
    mapAccountClasificationResponseToDTO,
    mapAccountClasificationDTOToRequest
} from '@contabilidad/Configuracion/AccountClasification/composables/mappingAccountClasificationData'
import axiosApiInstance from '@/api/axiosApiInstance'

export const useAccountClasificationActions = () => {
    // Get all account clasifications from backend with pagination
    const getAccountClasifications = async (page: number = 1, pageSize: number = 10): Promise<{ items: AccountClasificationDTO[], total: number }> => {
        try {
            const skip = (page - 1) * pageSize
            console.log(`🔍 GET /contabilidad/clasificacioncuenta?limit=${pageSize}&skip=${skip}`)

            const response = await axiosApiInstance.get('/contabilidad/clasificacioncuenta', {
                params: {
                    limit: pageSize,
                    skip: skip
                }
            })

            // Extraer de ApiResponse wrapper
            const data = response.data.data || response.data.Data
            const items = data?.Items || data?.items || []
            const total = data?.TotalItems || data?.totalItems || 0

            console.log(`✅ Clasificaciones de cuenta cargadas: ${items.length} de ${total}`)

            return {
                items: items.map(mapAccountClasificationResponseToDTO),
                total: total
            }
        } catch (error: any) {
            console.error('❌ Error al obtener clasificaciones de cuenta:', error)
            throw error
        }
    }

    // Get account clasifications as select options
    const getAccountClasificationOptions = async (): Promise<SelectOptionDTO[]> => {
        // Fetch a large number to get all options for dropdown
        const { items } = await getAccountClasifications(1, 1000)
        return items
            .filter(clasification => clasification.active)
            .map(clasification => ({
                id: clasification.id,
                label: clasification.name
            }))
    }

    // Get account clasification by ID from backend
    const getAccountClasificationById = async (id: number): Promise<AccountClasificationDTO | null> => {
        try {
            console.log(`🔍 GET /contabilidad/clasificacioncuenta/${id}`)

            const response = await axiosApiInstance.get(`/contabilidad/clasificacioncuenta/${id}`)

            const data = response.data.data || response.data.Data
            const items = data?.Items || data?.items || []

            return items.length > 0 ? mapAccountClasificationResponseToDTO(items[0]) : null
        } catch (error: any) {
            if (error.response?.status === 404) {
                console.log('⚠️ Clasificación de cuenta no encontrada')
                return null
            }
            console.error('❌ Error:', error)
            throw error
        }
    }

    // Create account clasification in backend
    const createAccountClasification = async (data: AccountClasificationFormDTO): Promise<AccountClasificationDTO> => {
        try {
            console.log('🚀 POST /contabilidad/clasificacioncuenta')

            const requestData = mapAccountClasificationDTOToRequest(data)
            console.log('📦 Payload:', requestData)

            const response = await axiosApiInstance.post('/contabilidad/clasificacioncuenta', requestData)

            const responseData = response.data.data || response.data.Data
            const created = responseData?.clasificacioncuenta || responseData?.Clasificacioncuenta

            console.log('✅ Clasificación de cuenta creada:', created)

            return mapAccountClasificationResponseToDTO(created)
        } catch (error: any) {
            console.error('❌ Error al crear clasificación de cuenta:', error)
            throw error
        }
    }

    // Update account clasification in backend
    const updateAccountClasification = async (id: number, data: AccountClasificationFormDTO): Promise<AccountClasificationDTO> => {
        try {
            console.log(`🔄 PUT /contabilidad/clasificacioncuenta/${id}`)

            const requestData = mapAccountClasificationDTOToRequest(data)
            console.log('📦 Payload:', requestData)

            await axiosApiInstance.put(`/contabilidad/clasificacioncuenta/${id}`, requestData)

            console.log('✅ Clasificación de cuenta actualizada')

            // Recargar el elemento actualizado
            const updated = await getAccountClasificationById(id)
            if (!updated) {
                throw new Error('No se pudo obtener la clasificación de cuenta actualizada')
            }
            return updated
        } catch (error: any) {
            console.error('❌ Error al actualizar clasificación de cuenta:', error)
            throw error
        }
    }

    // Delete account clasification from backend
    const deleteAccountClasification = async (id: number, borradoLogico: boolean = true): Promise<void> => {
        try {
            console.log(`🗑️ DELETE /contabilidad/clasificacioncuenta/${id}?borradoLogico=${borradoLogico}`)

            await axiosApiInstance.delete(`/contabilidad/clasificacioncuenta/${id}`, {
                params: { borradoLogico }
            })

            console.log('✅ Clasificación de cuenta eliminada')
        } catch (error: any) {
            console.error('❌ Error al eliminar clasificación de cuenta:', error)
            throw error
        }
    }

    return {
        getAccountClasifications,
        getAccountClasificationOptions,
        getAccountClasificationById,
        createAccountClasification,
        updateAccountClasification,
        deleteAccountClasification
    }
}
