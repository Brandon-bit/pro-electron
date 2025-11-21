import type {
    AccountNatureDTO,
    AccountNatureFormDTO,
    SelectOptionDTO
} from '@contabilidad/Configuracion/AccountNature/types/accountNatureTypes'
import {
    mapAccountNatureResponseToDTO,
    mapAccountNatureDTOToRequest
} from '@contabilidad/Configuracion/AccountNature/composables/mappingAccountNatureData'
import axiosApiInstance from '@/api/axiosApiInstance'

export const useAccountNatureActions = () => {
    // Get all account natures from backend with pagination
    const getAccountNatures = async (page: number = 1, pageSize: number = 10): Promise<{ items: AccountNatureDTO[], total: number }> => {
        try {
            const skip = (page - 1) * pageSize
            console.log(`🔍 GET /contabilidad/naturalezacuenta?limit=${pageSize}&skip=${skip}`)

            const response = await axiosApiInstance.get('/contabilidad/naturalezacuenta', {
                params: {
                    limit: pageSize,
                    skip: skip
                }
            })

            // Extraer de ApiResponse wrapper
            const data = response.data.data || response.data.Data
            const items = data?.Items || data?.items || []
            const total = data?.TotalItems || data?.totalItems || 0

            console.log(`✅ Naturalezas de cuenta cargadas: ${items.length} de ${total}`)

            return {
                items: items.map(mapAccountNatureResponseToDTO),
                total: total
            }
        } catch (error: any) {
            console.error('❌ Error al obtener naturalezas de cuenta:', error)
            throw error
        }
    }

    // Get account natures as select options
    const getAccountNatureOptions = async (): Promise<SelectOptionDTO[]> => {
        // Fetch a large number to get all options for dropdown
        const { items } = await getAccountNatures(1, 1000)
        return items
            .filter(nature => nature.active)
            .map(nature => ({
                id: nature.id,
                label: nature.name
            }))
    }

    // Get account nature by ID from backend
    const getAccountNatureById = async (id: number): Promise<AccountNatureDTO | null> => {
        try {
            console.log(`🔍 GET /contabilidad/naturalezacuenta/${id}`)

            const response = await axiosApiInstance.get(`/contabilidad/naturalezacuenta/${id}`)

            const data = response.data.data || response.data.Data
            const items = data?.Items || data?.items || []

            return items.length > 0 ? mapAccountNatureResponseToDTO(items[0]) : null
        } catch (error: any) {
            if (error.response?.status === 404) {
                console.log('⚠️ Naturaleza de cuenta no encontrada')
                return null
            }
            console.error('❌ Error:', error)
            throw error
        }
    }

    // Create account nature in backend
    const createAccountNature = async (data: AccountNatureFormDTO): Promise<AccountNatureDTO> => {
        try {
            console.log('🚀 POST /contabilidad/naturalezacuenta')

            const requestData = mapAccountNatureDTOToRequest(data)
            console.log('📦 Payload:', requestData)

            const response = await axiosApiInstance.post('/contabilidad/naturalezacuenta', requestData)

            const responseData = response.data.data || response.data.Data
            const created = responseData?.naturalezacuenta || responseData?.Naturalezacuenta

            console.log('✅ Naturaleza de cuenta creada:', created)

            return mapAccountNatureResponseToDTO(created)
        } catch (error: any) {
            console.error('❌ Error al crear naturaleza de cuenta:', error)
            throw error
        }
    }

    // Update account nature in backend
    const updateAccountNature = async (id: number, data: AccountNatureFormDTO): Promise<AccountNatureDTO> => {
        try {
            console.log(`🔄 PUT /contabilidad/naturalezacuenta/${id}`)

            const requestData = mapAccountNatureDTOToRequest(data)
            console.log('📦 Payload:', requestData)

            await axiosApiInstance.put(`/contabilidad/naturalezacuenta/${id}`, requestData)

            console.log('✅ Naturaleza de cuenta actualizada')

            // Recargar el elemento actualizado
            const updated = await getAccountNatureById(id)
            if (!updated) {
                throw new Error('No se pudo obtener la naturaleza de cuenta actualizada')
            }
            return updated
        } catch (error: any) {
            console.error('❌ Error al actualizar naturaleza de cuenta:', error)
            throw error
        }
    }

    // Delete account nature from backend
    const deleteAccountNature = async (id: number, borradoLogico: boolean = true): Promise<void> => {
        try {
            console.log(`🗑️ DELETE /contabilidad/naturalezacuenta/${id}?borradoLogico=${borradoLogico}`)

            await axiosApiInstance.delete(`/contabilidad/naturalezacuenta/${id}`, {
                params: { borradoLogico }
            })

            console.log('✅ Naturaleza de cuenta eliminada')
        } catch (error: any) {
            console.error('❌ Error al eliminar naturaleza de cuenta:', error)
            throw error
        }
    }

    return {
        getAccountNatures,
        getAccountNatureOptions,
        getAccountNatureById,
        createAccountNature,
        updateAccountNature,
        deleteAccountNature
    }
}
