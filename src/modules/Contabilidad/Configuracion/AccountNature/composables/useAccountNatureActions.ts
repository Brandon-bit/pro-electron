import type { 
    AccountNatureDTO, 
    AccountNatureFormDTO,
    SelectOptionDTO 
} from '@contabilidad/Configuracion/AccountNature/types/accountNatureTypes'
import { 
    mapAccountNatureResponseToDTO,
    mapAccountNatureDTOToRequest 
} from '@contabilidad/Configuracion/AccountNature/composables/mappingAccountNatureData'
import type { AccountNatureResponse } from '@contabilidad/Configuracion/AccountNature/types/accountNatureTypes'

// Mock data inicial con los valores existentes
const mockAccountNatures: AccountNatureResponse[] = [
    {
        id: 1,
        nombre: 'Deudora',
        descripcion: 'Naturaleza deudora - representa activos y gastos',
        activo: true,
        fechaCreacion: '2025-01-01T00:00:00Z',
        fechaActualizacion: '2025-01-01T00:00:00Z'
    },
    {
        id: 2,
        nombre: 'Acreedora',
        descripcion: 'Naturaleza acreedora - representa pasivos, capital e ingresos',
        activo: true,
        fechaCreacion: '2025-01-01T00:00:00Z',
        fechaActualizacion: '2025-01-01T00:00:00Z'
    }
]

export const useAccountNatureActions = () => {
    // Get all account natures
    const getAccountNatures = async (): Promise<AccountNatureDTO[]> => {
        await new Promise(resolve => setTimeout(resolve, 300))
        
        console.log('=== API GET ACCOUNT NATURES ===')
        console.log('Method: GET')
        console.log('Endpoint: /api/contabilidad/configuracion/naturaleza-cuenta')
        console.log('Response:', mockAccountNatures.length, 'records')
        console.log('================================')
        
        return mockAccountNatures.map(mapAccountNatureResponseToDTO)
    }
    
    // Get account natures as select options
    const getAccountNatureOptions = async (): Promise<SelectOptionDTO[]> => {
        const accountNatures = await getAccountNatures()
        return accountNatures
            .filter(nature => nature.active)
            .map(nature => ({
                id: nature.id,
                label: nature.name
            }))
    }
    
    // Get account nature by ID
    const getAccountNatureById = async (id: number): Promise<AccountNatureDTO | null> => {
        await new Promise(resolve => setTimeout(resolve, 200))
        
        console.log('=== API GET ACCOUNT NATURE BY ID ===')
        console.log('Method: GET')
        console.log('Endpoint: /api/contabilidad/configuracion/naturaleza-cuenta/' + id)
        console.log('====================================')
        
        const accountNature = mockAccountNatures.find(nature => nature.id === id)
        return accountNature ? mapAccountNatureResponseToDTO(accountNature) : null
    }
    
    // Create account nature
    const createAccountNature = async (data: AccountNatureFormDTO): Promise<AccountNatureDTO> => {
        await new Promise(resolve => setTimeout(resolve, 500))
        
        const request = mapAccountNatureDTOToRequest(data)
        
        console.log('=== API CREATE ACCOUNT NATURE ===')
        console.log('Method: POST')
        console.log('Endpoint: /api/contabilidad/configuracion/naturaleza-cuenta')
        console.log('Payload:', JSON.stringify(request, null, 2))
        console.log('==================================')
        
        const newId = Math.max(...mockAccountNatures.map(n => n.id)) + 1
        const newAccountNature: AccountNatureResponse = {
            id: newId,
            nombre: request.nombre,
            descripcion: request.descripcion,
            activo: request.activo,
            fechaCreacion: new Date().toISOString(),
            fechaActualizacion: new Date().toISOString()
        }
        
        mockAccountNatures.push(newAccountNature)
        
        return mapAccountNatureResponseToDTO(newAccountNature)
    }
    
    // Update account nature
    const updateAccountNature = async (id: number, data: AccountNatureFormDTO): Promise<AccountNatureDTO> => {
        await new Promise(resolve => setTimeout(resolve, 500))
        
        const request = mapAccountNatureDTOToRequest(data)
        
        console.log('=== API UPDATE ACCOUNT NATURE ===')
        console.log('Method: PUT')
        console.log('Endpoint: /api/contabilidad/configuracion/naturaleza-cuenta/' + id)
        console.log('Payload:', JSON.stringify(request, null, 2))
        console.log('==================================')
        
        const index = mockAccountNatures.findIndex(nature => nature.id === id)
        if (index !== -1) {
            mockAccountNatures[index] = {
                ...mockAccountNatures[index],
                nombre: request.nombre,
                descripcion: request.descripcion,
                activo: request.activo,
                fechaActualizacion: new Date().toISOString()
            }
            return mapAccountNatureResponseToDTO(mockAccountNatures[index])
        }
        
        throw new Error('Account nature not found')
    }
    
    // Delete account nature
    const deleteAccountNature = async (id: number): Promise<void> => {
        await new Promise(resolve => setTimeout(resolve, 300))
        
        console.log('=== API DELETE ACCOUNT NATURE ===')
        console.log('Method: DELETE')
        console.log('Endpoint: /api/contabilidad/configuracion/naturaleza-cuenta/' + id)
        console.log('==================================')
        
        const index = mockAccountNatures.findIndex(nature => nature.id === id)
        if (index !== -1) {
            mockAccountNatures.splice(index, 1)
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
