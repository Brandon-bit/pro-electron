import {
    BankDTO,
    BankFormDTO,
    SelectOptionDTO
} from '@/modules/Tesoreria/Bancos/types/bankTypes'
import useBankStore from '@/modules/Tesoreria/Bancos/store/bankStore'
import { 
    mapBankToSelectOption,
    mapBankFormToBackend
} from '@/modules/Tesoreria/Bancos/composables/mappingBanks'

export const useBankActions = () => {
    const bankStore = useBankStore()

    // Mock data for banks
    const mockBanks: BankDTO[] = [
        { id: 1, name: 'BBVA México', code: '012', active: true },
        { id: 2, name: 'Santander', code: '014', active: true },
        { id: 3, name: 'Banorte', code: '072', active: true },
        { id: 4, name: 'HSBC', code: '021', active: true },
        { id: 5, name: 'Citibanamex', code: '002', active: true },
        { id: 6, name: 'Scotiabank', code: '044', active: true },
        { id: 7, name: 'Inbursa', code: '036', active: true },
        { id: 8, name: 'Banco Azteca', code: '127', active: false }
    ]

    const getBanks = async (
        page: number,
        pageSize: number
    ): Promise<{ items: BankDTO[]; total: number }> => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 300))

        const startIndex = (page - 1) * pageSize
        const endIndex = startIndex + pageSize
        const paginatedData = mockBanks.slice(startIndex, endIndex)

        return {
            items: paginatedData,
            total: mockBanks.length
        }
    }

    const getBanksForSelect = async (): Promise<SelectOptionDTO[]> => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 200))

        // Return only active banks for select options
        return mockBanks
            .filter((bank) => bank.active)
            .map(mapBankToSelectOption)
    }

    const createBank = async (
        data: BankFormDTO
    ): Promise<{ message: string; status: string; data: any }> => {
        // Prepare data for backend
        const payload = mapBankFormToBackend(data)
        console.log('📤 CREATE Bank - Payload:', payload)

        return {
            message: 'Banco creado exitosamente',
            status: 'success',
            data: null
        }
    }

    const updateBank = async (
        data: BankFormDTO
    ): Promise<{ message: string; status: string; data: any }> => {
        // Prepare data for backend
        const payload = mapBankFormToBackend(data)
        console.log('📤 UPDATE Bank - Payload:', payload)

        return {
            message: 'Banco no encontrado',
            status: 'error',
            data: null
        }
    }

    const deleteBank = async (): Promise<{ message: string; status: string; data: any }> => {
        const id = bankStore.selectedBank?.id
        console.log('📤 DELETE Bank - ID:', id)
        
        // TODO: Replace with actual API call
        // const response = await bankService.delete(id)
        
        return {
            message: 'Banco no encontrado',
            status: 'error',
            data: null
        }
    }

    return {
        getBanks,
        getBanksForSelect,
        createBank,
        updateBank,
        deleteBank
    }
}
