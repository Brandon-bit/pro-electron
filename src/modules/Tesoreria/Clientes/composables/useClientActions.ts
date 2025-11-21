import {
    Client,
    ClientDTO,
    ClientRequest,
    SelectOptionDTO
} from '@/modules/Tesoreria/Clientes/types/clientTypes'
import useClientStore from '@/modules/Tesoreria/Clientes/store/clientStore'
import { mapClient, mapClientRequest, mapClientToSelectOption } from '@/modules/Tesoreria/Clientes/composables/mappingClients'

export const useClientActions = () => {
    const clientStore = useClientStore()

    // Mock data from backend (en español)
    const mockClientsBackend: Client[] = [
        {
            id: 1,
            nombre: 'Comercializadora del Norte S.A. de C.V.',
            rfc: 'CDN850315ABC',
            email: 'contacto@comercializadoranorte.com',
            telefono: '8123456789',
            calle: 'Av. Constitución 1234',
            ciudad: 'Monterrey',
            estado: 'Nuevo León',
            codigoPostal: '64000',
            limiteCredito: 500000,
            diasCredito: 30,
            activo: true,
            notas: 'Cliente preferente con historial de pagos puntuales'
        },
        {
            id: 2,
            nombre: 'Distribuidora del Pacífico S.A.',
            rfc: 'DPA920520XYZ',
            email: 'ventas@dispacifico.com',
            telefono: '3331234567',
            calle: 'Blvd. Puerta de Hierro 5678',
            ciudad: 'Guadalajara',
            estado: 'Jalisco',
            codigoPostal: '45116',
            limiteCredito: 300000,
            diasCredito: 15,
            activo: true,
            notas: 'Requiere factura electrónica inmediata'
        },
        {
            id: 3,
            nombre: 'Importadora Central S.C.',
            rfc: 'ICE880710DEF',
            email: 'compras@importadoracentral.mx',
            telefono: '5555678901',
            calle: 'Paseo de la Reforma 910',
            ciudad: 'Ciudad de México',
            estado: 'CDMX',
            codigoPostal: '06600',
            limiteCredito: 750000,
            diasCredito: 45,
            activo: true,
            notas: 'Cliente corporativo - Solicita descuentos por volumen'
        },
        {
            id: 4,
            nombre: 'Servicios Empresariales del Bajío',
            rfc: 'SEB950825GHI',
            email: 'info@sebajio.com',
            telefono: '4771234567',
            calle: 'Calzada de los Insurgentes 234',
            ciudad: 'León',
            estado: 'Guanajuato',
            codigoPostal: '37000',
            limiteCredito: 200000,
            diasCredito: 30,
            activo: false,
            notas: 'Cuenta suspendida por pagos atrasados'
        },
        {
            id: 5,
            nombre: 'Tecnología y Sistemas del Sureste',
            rfc: 'TSS010315JKL',
            email: 'contacto@tecnosureste.com',
            telefono: '9999876543',
            calle: 'Calle 60 Norte 456',
            ciudad: 'Mérida',
            estado: 'Yucatán',
            codigoPostal: '97000',
            limiteCredito: 400000,
            diasCredito: 20,
            activo: true,
            notas: 'Cliente nuevo - En período de evaluación'
        }
    ]

    // Map to DTO (English)
    const mockClients: ClientDTO[] = mockClientsBackend.map(mapClient)

    const getClients = async (
        page: number,
        pageSize: number
    ): Promise<{ items: ClientDTO[]; total: number }> => {
        await new Promise((resolve) => setTimeout(resolve, 300))

        const startIndex = (page - 1) * pageSize
        const endIndex = startIndex + pageSize
        const paginatedData = mockClients.slice(startIndex, endIndex)

        return {
            items: paginatedData,
            total: mockClients.length
        }
    }

    const getClientsForSelect = async (): Promise<SelectOptionDTO[]> => {
        await new Promise((resolve) => setTimeout(resolve, 200))

        return mockClients
            .filter((client) => client.active)
            .map(mapClientToSelectOption)
    }

    const createClient = async (
        data: ClientRequest
    ): Promise<{ message: string; status: string; data: any }> => {
        const payload = mapClientRequest(data)
        console.log('📤 CREATE Client - Payload:', payload)

        return {
            message: 'Cliente creado exitosamente',
            status: 'success',
            data: null
        }
    }

    const updateClient = async (
        data: ClientRequest
    ): Promise<{ message: string; status: string; data: any }> => {
        const payload = mapClientRequest(data)
        console.log('📤 UPDATE Client - Payload:', payload)

        return {
            message: 'Cliente actualizado exitosamente',
            status: 'success',
            data: null
        }
    }

    const deleteClient = async (): Promise<{ message: string; status: string; data: any }> => {
        const id = clientStore.selectedClient?.id
        console.log('📤 DELETE Client - ID:', id)

        return {
            message: 'Cliente eliminado exitosamente',
            status: 'success',
            data: null
        }
    }

    return {
        getClients,
        getClientsForSelect,
        createClient,
        updateClient,
        deleteClient
    }
}
