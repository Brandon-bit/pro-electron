import type {
    AccountTypeDTO,
    AccountTypeFormDTO,
    SelectOptionDTO
} from '@contabilidad/Configuracion/AccountTypes/types/accountTypesTypes'
import {
    mapAccountTypeResponseToDTO,
    mapAccountTypeDTOToRequest
} from '@contabilidad/Configuracion/AccountTypes/composables/mappingAccountTypesData'
import axiosApiInstance from '@/api/axiosApiInstance'

export const useAccountTypesActions = () => {
    // Get all account types from backend with pagination
    const getAccountTypes = async (page: number = 1, pageSize: number = 10): Promise<{ items: AccountTypeDTO[], total: number }> => {
        try {
            const skip = (page - 1) * pageSize
            console.log(`🔍 GET /contabilidad/tipocuenta?limit=${pageSize}&skip=${skip}`)

            const response = await axiosApiInstance.get('/contabilidad/tipocuenta', {
                params: {
                    limit: pageSize,
                    skip: skip
                }
            })

            // Extraer de ApiResponse wrapper
            const data = response.data.data || response.data.Data
            const items = data?.Items || data?.items || []
            const total = data?.TotalItems || data?.totalItems || 0

            console.log(`✅ Tipos de cuenta cargados: ${items.length} de ${total}`)

            return {
                items: items.map(mapAccountTypeResponseToDTO),
                total: total
            }
        } catch (error: any) {
            console.error('❌ Error al obtener tipos de cuenta:', error)
            throw error
        }
    }

    // Get account types as select options
    const getAccountTypeOptions = async (): Promise<SelectOptionDTO[]> => {
        // Fetch a large number to get all options for dropdown
        const { items } = await getAccountTypes(1, 1000)
        return items
            .filter(type => type.active)
            .map(type => ({
                id: type.id,
                label: type.name
            }))
    }

    // Get account type by ID from backend
    const getAccountTypeById = async (id: number): Promise<AccountTypeDTO | null> => {
        try {
            console.log(`🔍 GET /contabilidad/tipocuenta/${id}`)

            const response = await axiosApiInstance.get(`/contabilidad/tipocuenta/${id}`)

            const data = response.data.data || response.data.Data
            const items = data?.Items || data?.items || []

            return items.length > 0 ? mapAccountTypeResponseToDTO(items[0]) : null
        } catch (error: any) {
            if (error.response?.status === 404) {
                console.log('⚠️ Tipo de cuenta no encontrado')
                return null
            }
            console.error('❌ Error:', error)
            throw error
        }
    }

    // Create account type in backend
    const createAccountType = async (data: AccountTypeFormDTO): Promise<AccountTypeDTO> => {
        try {
            console.log('🚀 POST /contabilidad/tipocuenta')

            const requestData = mapAccountTypeDTOToRequest(data)
            console.log('📦 Payload:', requestData)

            const response = await axiosApiInstance.post('/contabilidad/tipocuenta', requestData)

            const responseData = response.data.data || response.data.Data
            const created = responseData?.tipocuenta || responseData?.Tipocuenta

            console.log('✅ Tipo de cuenta creado:', created)

            return mapAccountTypeResponseToDTO(created)
        } catch (error: any) {
            console.error('❌ Error al crear tipo de cuenta:', error)
            throw error
        }
    }

    // Update account type in backend
    const updateAccountType = async (id: number, data: AccountTypeFormDTO): Promise<AccountTypeDTO> => {
        try {
            console.log(`🔄 PUT /contabilidad/tipocuenta/${id}`)

            const requestData = mapAccountTypeDTOToRequest(data)
            console.log('📦 Payload:', requestData)

            await axiosApiInstance.put(`/contabilidad/tipocuenta/${id}`, requestData)

            console.log('✅ Tipo de cuenta actualizado')

            // Recargar el elemento actualizado
            const updated = await getAccountTypeById(id)
            if (!updated) {
                throw new Error('No se pudo obtener el tipo de cuenta actualizado')
            }
            return updated
        } catch (error: any) {
            console.error('❌ Error al actualizar tipo de cuenta:', error)
            throw error
        }
    }

    // Delete account type from backend
    const deleteAccountType = async (id: number, borradoLogico: boolean = true): Promise<void> => {
        try {
            console.log(`🗑️ DELETE /contabilidad/tipocuenta/${id}?borradoLogico=${borradoLogico}`)

            await axiosApiInstance.delete(`/contabilidad/tipocuenta/${id}`, {
                params: { borradoLogico }
            })

            console.log('✅ Tipo de cuenta eliminado')
        } catch (error: any) {
            console.error('❌ Error al eliminar tipo de cuenta:', error)
            throw error
        }
    }

    return {
        getAccountTypes,
        getAccountTypeOptions,
        getAccountTypeById,
        createAccountType,
        updateAccountType,
        deleteAccountType
    }
}
