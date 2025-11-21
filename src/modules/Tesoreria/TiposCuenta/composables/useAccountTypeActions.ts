import {
    AccountTypeDTO,
    AccountTypeFormDTO,
    SelectOptionDTO
} from '@/modules/Tesoreria/TiposCuenta/types/accountTypeTypes'
import useAccountTypeStore from '@/modules/Tesoreria/TiposCuenta/store/accountTypeStore'
import { 
    mapAccountTypeToSelectOption,
    mapAccountTypeFormToBackend
} from '@/modules/Tesoreria/TiposCuenta/composables/mappingAccountTypes'

export const useAccountTypeActions = () => {
    const accountTypeStore = useAccountTypeStore()

    // Mock data for account types
    const mockAccountTypes: AccountTypeDTO[] = [
        { id: 1, name: 'Cuenta de Cheques', description: 'Cuenta bancaria para operaciones diarias con chequera', active: true },
        { id: 2, name: 'Cuenta de Ahorro', description: 'Cuenta bancaria para ahorro con intereses', active: true },
        { id: 3, name: 'Cuenta de Inversión', description: 'Cuenta para inversiones y rendimientos', active: true },
        { id: 4, name: 'Cuenta de Nómina', description: 'Cuenta exclusiva para pago de nómina', active: true },
        { id: 5, name: 'Cuenta de Débito', description: 'Cuenta con tarjeta de débito', active: false }
    ]

    const getAccountTypes = async (
        page: number,
        pageSize: number
    ): Promise<{ items: AccountTypeDTO[]; total: number }> => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 300))

        const startIndex = (page - 1) * pageSize
        const endIndex = startIndex + pageSize
        const paginatedData = mockAccountTypes.slice(startIndex, endIndex)

        return {
            items: paginatedData,
            total: mockAccountTypes.length
        }
    }

    const getAccountTypesForSelect = async (): Promise<SelectOptionDTO[]> => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 200))

        // Return only active account types for select options
        return mockAccountTypes
            .filter((type) => type.active)
            .map(mapAccountTypeToSelectOption)
    }

    const createAccountType = async (
        data: AccountTypeFormDTO
    ): Promise<{ message: string; status: string; data: any }> => {
        // Prepare data for backend
        const payload = mapAccountTypeFormToBackend(data)
        console.log('📤 CREATE Account Type - Payload:', payload)

        return {
            message: 'Tipo de cuenta creado exitosamente',
            status: 'success',
            data: null
        }
    }

    const updateAccountType = async (
        data: AccountTypeFormDTO
    ): Promise<{ message: string; status: string; data: any }> => {
        // Prepare data for backend
        const payload = mapAccountTypeFormToBackend(data)
        console.log('📤 UPDATE Account Type - Payload:', payload)

        return {
            message: 'Tipo de cuenta no encontrado',
            status: 'error',
            data: null
        }
    }

    const deleteAccountType = async (): Promise<{ message: string; status: string; data: any }> => {
        const id = accountTypeStore.selectedAccountType?.id
        console.log('📤 DELETE Account Type - ID:', id)

        return {
            message: 'Tipo de cuenta no encontrado',
            status: 'error',
            data: null
        }
    }

    return {
        getAccountTypes,
        getAccountTypesForSelect,
        createAccountType,
        updateAccountType,
        deleteAccountType
    }
}
