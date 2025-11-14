import type { 
    AccountTypeDTO, 
    AccountTypeFormDTO,
    SelectOptionDTO 
} from '@contabilidad/Configuracion/AccountTypes/types/accountTypesTypes'
import { 
    mapAccountTypeResponseToDTO,
    mapAccountTypeDTOToRequest 
} from '@contabilidad/Configuracion/AccountTypes/composables/mappingAccountTypesData'
import type { AccountTypeResponse } from '@contabilidad/Configuracion/AccountTypes/types/accountTypesTypes'

// Mock data inicial con los valores existentes
const mockAccountTypes: AccountTypeResponse[] = [
    {
        id: 1,
        nombre: 'Mayor',
        descripcion: 'Cuenta de mayor general',
        activo: true,
        fechaCreacion: '2025-01-01T00:00:00Z',
        fechaActualizacion: '2025-01-01T00:00:00Z'
    },
    {
        id: 2,
        nombre: 'Detalle',
        descripcion: 'Cuenta de detalle específico',
        activo: true,
        fechaCreacion: '2025-01-01T00:00:00Z',
        fechaActualizacion: '2025-01-01T00:00:00Z'
    },
    {
        id: 3,
        nombre: 'Título',
        descripcion: 'Cuenta de título agrupador',
        activo: true,
        fechaCreacion: '2025-01-01T00:00:00Z',
        fechaActualizacion: '2025-01-01T00:00:00Z'
    },
    {
        id: 4,
        nombre: 'Subtítulo',
        descripcion: 'Cuenta de subtítulo',
        activo: true,
        fechaCreacion: '2025-01-01T00:00:00Z',
        fechaActualizacion: '2025-01-01T00:00:00Z'
    }
]

export const useAccountTypesActions = () => {
    // Get all account types
    const getAccountTypes = async (): Promise<AccountTypeDTO[]> => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 300))
        
        console.log('=== API GET ACCOUNT TYPES ===')
        console.log('Method: GET')
        console.log('Endpoint: /api/contabilidad/configuracion/tipos-cuenta')
        console.log('Response:', mockAccountTypes.length, 'records')
        console.log('=============================')
        
        return mockAccountTypes.map(mapAccountTypeResponseToDTO)
    }
    
    // Get account types as select options
    const getAccountTypeOptions = async (): Promise<SelectOptionDTO[]> => {
        const accountTypes = await getAccountTypes()
        return accountTypes
            .filter(type => type.active)
            .map(type => ({
                id: type.id,
                label: type.name
            }))
    }
    
    // Get account type by ID
    const getAccountTypeById = async (id: number): Promise<AccountTypeDTO | null> => {
        await new Promise(resolve => setTimeout(resolve, 200))
        
        console.log('=== API GET ACCOUNT TYPE BY ID ===')
        console.log('Method: GET')
        console.log('Endpoint: /api/contabilidad/configuracion/tipos-cuenta/' + id)
        console.log('==================================')
        
        const accountType = mockAccountTypes.find(type => type.id === id)
        return accountType ? mapAccountTypeResponseToDTO(accountType) : null
    }
    
    // Create account type
    const createAccountType = async (data: AccountTypeFormDTO): Promise<AccountTypeDTO> => {
        await new Promise(resolve => setTimeout(resolve, 500))
        
        const request = mapAccountTypeDTOToRequest(data)
        
        console.log('=== API CREATE ACCOUNT TYPE ===')
        console.log('Method: POST')
        console.log('Endpoint: /api/contabilidad/configuracion/tipos-cuenta')
        console.log('Payload:', JSON.stringify(request, null, 2))
        console.log('================================')
        
        // Simulate creation with new ID
        const newId = Math.max(...mockAccountTypes.map(t => t.id)) + 1
        const newAccountType: AccountTypeResponse = {
            id: newId,
            nombre: request.nombre,
            descripcion: request.descripcion,
            activo: request.activo,
            fechaCreacion: new Date().toISOString(),
            fechaActualizacion: new Date().toISOString()
        }
        
        mockAccountTypes.push(newAccountType)
        
        return mapAccountTypeResponseToDTO(newAccountType)
    }
    
    // Update account type
    const updateAccountType = async (id: number, data: AccountTypeFormDTO): Promise<AccountTypeDTO> => {
        await new Promise(resolve => setTimeout(resolve, 500))
        
        const request = mapAccountTypeDTOToRequest(data)
        
        console.log('=== API UPDATE ACCOUNT TYPE ===')
        console.log('Method: PUT')
        console.log('Endpoint: /api/contabilidad/configuracion/tipos-cuenta/' + id)
        console.log('Payload:', JSON.stringify(request, null, 2))
        console.log('================================')
        
        const index = mockAccountTypes.findIndex(type => type.id === id)
        if (index !== -1) {
            mockAccountTypes[index] = {
                ...mockAccountTypes[index],
                nombre: request.nombre,
                descripcion: request.descripcion,
                activo: request.activo,
                fechaActualizacion: new Date().toISOString()
            }
            return mapAccountTypeResponseToDTO(mockAccountTypes[index])
        }
        
        throw new Error('Account type not found')
    }
    
    // Delete account type
    const deleteAccountType = async (id: number): Promise<void> => {
        await new Promise(resolve => setTimeout(resolve, 300))
        
        console.log('=== API DELETE ACCOUNT TYPE ===')
        console.log('Method: DELETE')
        console.log('Endpoint: /api/contabilidad/configuracion/tipos-cuenta/' + id)
        console.log('================================')
        
        const index = mockAccountTypes.findIndex(type => type.id === id)
        if (index !== -1) {
            mockAccountTypes.splice(index, 1)
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
