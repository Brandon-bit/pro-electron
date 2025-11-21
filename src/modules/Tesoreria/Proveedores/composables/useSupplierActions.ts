import {
    Supplier,
    SupplierDTO,
    SupplierRequest,
    SelectOptionDTO
} from '@/modules/Tesoreria/Proveedores/types/supplierTypes'
import useSupplierStore from '@/modules/Tesoreria/Proveedores/store/supplierStore'
import { mapSupplier, mapSupplierRequest, mapSupplierToSelectOption } from '@/modules/Tesoreria/Proveedores/composables/mappingSuppliers'

export const useSupplierActions = () => {
    const supplierStore = useSupplierStore()

    // Mock data from backend (en español)
    const mockSuppliersBackend: Supplier[] = [
        {
            id: 1,
            nombre: 'Distribuidora Nacional S.A. de C.V.',
            rfc: 'DNA850420XYZ',
            email: 'ventas@distribuidoranacional.com',
            telefono: '5556789012',
            calle: 'Av. Insurgentes Sur 2345',
            ciudad: 'Ciudad de México',
            estado: 'CDMX',
            codigoPostal: '03100',
            diasCredito: 30,
            activo: true,
            notas: 'Proveedor principal de materias primas'
        },
        {
            id: 2,
            nombre: 'Importaciones del Pacífico S.A.',
            rfc: 'IPA920815ABC',
            email: 'contacto@imppacifico.com',
            telefono: '3339876543',
            calle: 'Calzada Independencia 789',
            ciudad: 'Guadalajara',
            estado: 'Jalisco',
            codigoPostal: '44100',
            diasCredito: 45,
            activo: true,
            notas: 'Especializado en productos importados'
        },
        {
            id: 3,
            nombre: 'Suministros Industriales del Norte',
            rfc: 'SIN880305DEF',
            email: 'ventas@suministrosnorte.mx',
            telefono: '8187654321',
            calle: 'Av. Constitución 456',
            ciudad: 'Monterrey',
            estado: 'Nuevo León',
            codigoPostal: '64000',
            diasCredito: 15,
            activo: true,
            notas: 'Entrega rápida en zona norte'
        },
        {
            id: 4,
            nombre: 'Comercializadora del Bajío S.C.',
            rfc: 'CBA950612GHI',
            email: 'info@combajio.com',
            telefono: '4771234567',
            calle: 'Boulevard López Mateos 123',
            ciudad: 'León',
            estado: 'Guanajuato',
            codigoPostal: '37000',
            diasCredito: 30,
            activo: false,
            notas: 'Suspendido temporalmente por retrasos en entregas'
        },
        {
            id: 5,
            nombre: 'Tecnología y Equipos del Sureste',
            rfc: 'TES010920JKL',
            email: 'ventas@tecsureste.com',
            telefono: '9999876543',
            calle: 'Calle 60 Norte 890',
            ciudad: 'Mérida',
            estado: 'Yucatán',
            codigoPostal: '97000',
            diasCredito: 60,
            activo: true,
            notas: 'Proveedor de equipos especializados'
        }
    ]

    // Map to DTO (English)
    const mockSuppliers: SupplierDTO[] = mockSuppliersBackend.map(mapSupplier)

    const getSuppliers = async (
        page: number,
        pageSize: number
    ): Promise<{ items: SupplierDTO[]; total: number }> => {
        await new Promise((resolve) => setTimeout(resolve, 300))

        const startIndex = (page - 1) * pageSize
        const endIndex = startIndex + pageSize
        const paginatedData = mockSuppliers.slice(startIndex, endIndex)

        return {
            items: paginatedData,
            total: mockSuppliers.length
        }
    }

    const getSuppliersForSelect = async (): Promise<SelectOptionDTO[]> => {
        await new Promise((resolve) => setTimeout(resolve, 200))

        return mockSuppliers
            .filter((supplier) => supplier.active)
            .map(mapSupplierToSelectOption)
    }

    const createSupplier = async (
        data: SupplierRequest
    ): Promise<{ message: string; status: string; data: any }> => {
        const payload = mapSupplierRequest(data)
        console.log('📤 CREATE Supplier - Payload:', payload)

        return {
            message: 'Proveedor creado exitosamente',
            status: 'success',
            data: null
        }
    }

    const updateSupplier = async (
        data: SupplierRequest
    ): Promise<{ message: string; status: string; data: any }> => {
        const payload = mapSupplierRequest(data)
        console.log('📤 UPDATE Supplier - Payload:', payload)

        return {
            message: 'Proveedor actualizado exitosamente',
            status: 'success',
            data: null
        }
    }

    const deleteSupplier = async (): Promise<{ message: string; status: string; data: any }> => {
        const id = supplierStore.selectedSupplier?.id
        console.log('📤 DELETE Supplier - ID:', id)

        return {
            message: 'Proveedor eliminado exitosamente',
            status: 'success',
            data: null
        }
    }

    return {
        getSuppliers,
        getSuppliersForSelect,
        createSupplier,
        updateSupplier,
        deleteSupplier
    }
}
