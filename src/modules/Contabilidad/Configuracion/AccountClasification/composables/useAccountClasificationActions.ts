import type { 
    AccountClasificationDTO, 
    AccountClasificationFormDTO,
    SelectOptionDTO 
} from '@contabilidad/Configuracion/AccountClasification/types/accountClasificationTypes'
import { 
    mapAccountClasificationResponseToDTO,
    mapAccountClasificationDTOToRequest 
} from '@contabilidad/Configuracion/AccountClasification/composables/mappingAccountClasificationData'
import type { AccountClasificationResponse } from '@contabilidad/Configuracion/AccountClasification/types/accountClasificationTypes'

// Mock data inicial con los valores existentes
const mockAccountClasifications: AccountClasificationResponse[] = [
    {
        id: 1,
        nombre: 'Balance',
        descripcion: 'Cuentas del balance general - Activo, Pasivo y Capital',
        activo: true,
        fechaCreacion: '2025-01-01T00:00:00Z',
        fechaActualizacion: '2025-01-01T00:00:00Z'
    },
    {
        id: 2,
        nombre: 'Orden',
        descripcion: 'Cuentas de orden - No afectan el balance',
        activo: true,
        fechaCreacion: '2025-01-01T00:00:00Z',
        fechaActualizacion: '2025-01-01T00:00:00Z'
    },
    {
        id: 3,
        nombre: 'Resultados',
        descripcion: 'Cuentas de resultados - Ingresos y Gastos',
        activo: true,
        fechaCreacion: '2025-01-01T00:00:00Z',
        fechaActualizacion: '2025-01-01T00:00:00Z'
    }
]

export const useAccountClasificationActions = () => {
    // Get all account clasifications
    const getAccountClasifications = async (): Promise<AccountClasificationDTO[]> => {
        await new Promise(resolve => setTimeout(resolve, 300))
        
        console.log('=== API GET ACCOUNT CLASIFICATIONS ===')
        console.log('Method: GET')
        console.log('Endpoint: /api/contabilidad/configuracion/clasificacion-cuenta')
        console.log('Response:', mockAccountClasifications.length, 'records')
        console.log('=======================================')
        
        return mockAccountClasifications.map(mapAccountClasificationResponseToDTO)
    }
    
    // Get account clasifications as select options
    const getAccountClasificationOptions = async (): Promise<SelectOptionDTO[]> => {
        const accountClasifications = await getAccountClasifications()
        return accountClasifications
            .filter(clasification => clasification.active)
            .map(clasification => ({
                id: clasification.id,
                label: clasification.name
            }))
    }
    
    // Get account clasification by ID
    const getAccountClasificationById = async (id: number): Promise<AccountClasificationDTO | null> => {
        await new Promise(resolve => setTimeout(resolve, 200))
        
        console.log('=== API GET ACCOUNT CLASIFICATION BY ID ===')
        console.log('Method: GET')
        console.log('Endpoint: /api/contabilidad/configuracion/clasificacion-cuenta/' + id)
        console.log('============================================')
        
        const accountClasification = mockAccountClasifications.find(clasification => clasification.id === id)
        return accountClasification ? mapAccountClasificationResponseToDTO(accountClasification) : null
    }
    
    // Create account clasification
    const createAccountClasification = async (data: AccountClasificationFormDTO): Promise<AccountClasificationDTO> => {
        await new Promise(resolve => setTimeout(resolve, 500))
        
        const request = mapAccountClasificationDTOToRequest(data)
        
        console.log('=== API CREATE ACCOUNT CLASIFICATION ===')
        console.log('Method: POST')
        console.log('Endpoint: /api/contabilidad/configuracion/clasificacion-cuenta')
        console.log('Payload:', JSON.stringify(request, null, 2))
        console.log('=========================================')
        
        const newId = Math.max(...mockAccountClasifications.map(c => c.id)) + 1
        const newAccountClasification: AccountClasificationResponse = {
            id: newId,
            nombre: request.nombre,
            descripcion: request.descripcion,
            activo: request.activo,
            fechaCreacion: new Date().toISOString(),
            fechaActualizacion: new Date().toISOString()
        }
        
        mockAccountClasifications.push(newAccountClasification)
        
        return mapAccountClasificationResponseToDTO(newAccountClasification)
    }
    
    // Update account clasification
    const updateAccountClasification = async (id: number, data: AccountClasificationFormDTO): Promise<AccountClasificationDTO> => {
        await new Promise(resolve => setTimeout(resolve, 500))
        
        const request = mapAccountClasificationDTOToRequest(data)
        
        console.log('=== API UPDATE ACCOUNT CLASIFICATION ===')
        console.log('Method: PUT')
        console.log('Endpoint: /api/contabilidad/configuracion/clasificacion-cuenta/' + id)
        console.log('Payload:', JSON.stringify(request, null, 2))
        console.log('=========================================')
        
        const index = mockAccountClasifications.findIndex(clasification => clasification.id === id)
        if (index !== -1) {
            mockAccountClasifications[index] = {
                ...mockAccountClasifications[index],
                nombre: request.nombre,
                descripcion: request.descripcion,
                activo: request.activo,
                fechaActualizacion: new Date().toISOString()
            }
            return mapAccountClasificationResponseToDTO(mockAccountClasifications[index])
        }
        
        throw new Error('Account clasification not found')
    }
    
    // Delete account clasification
    const deleteAccountClasification = async (id: number): Promise<void> => {
        await new Promise(resolve => setTimeout(resolve, 300))
        
        console.log('=== API DELETE ACCOUNT CLASIFICATION ===')
        console.log('Method: DELETE')
        console.log('Endpoint: /api/contabilidad/configuracion/clasificacion-cuenta/' + id)
        console.log('=========================================')
        
        const index = mockAccountClasifications.findIndex(clasification => clasification.id === id)
        if (index !== -1) {
            mockAccountClasifications.splice(index, 1)
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
