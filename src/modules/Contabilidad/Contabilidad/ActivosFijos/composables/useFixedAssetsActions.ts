import type { FixedAssetDTO, FixedAssetFormDTO, FixedAsset, SelectOptionDTO } from '@/modules/Contabilidad/Contabilidad/ActivosFijos/types/fixedAssetsTypes'
import { mapFixedAsset, mapFixedAssetRequest } from '@/modules/Contabilidad/Contabilidad/ActivosFijos/composables/mappingFixedAssetsData'
import useFixedAssetsStore from '@/modules/Contabilidad/Contabilidad/ActivosFijos/store/fixedAssetsStore'

// Mock data - Fixed Assets
const mockFixedAssets: FixedAsset[] = [
    {
        id: 'AF-001',
        descripcion: 'Servidor Dell PowerEdge R740',
        marca: 'Dell',
        modelo: 'PowerEdge R740',
        numeroSerie: 'SN123456789',
        fechaAdquisicion: '2023-01-15',
        proveedor: 'Dell Technologies',
        factura: 'FACT-2023-001',
        valorOriginal: 85000,
        vidaUtil: 60,
        cuentaContable: '1201-001',
        ubicacionFisica: 'Centro de Datos - Piso 3',
        area: 'Tecnología',
        responsable: 'Juan Pérez',
        notas: 'Servidor principal para aplicaciones empresariales',
        estatus: 'Activo',
        fechaCreacion: new Date('2023-01-15')
    },
    {
        id: 'AF-002',
        descripcion: 'Vehículo Toyota Hilux 2023',
        marca: 'Toyota',
        modelo: 'Hilux 2023',
        numeroSerie: 'VIN987654321',
        fechaAdquisicion: '2023-03-20',
        proveedor: 'Toyota México',
        factura: 'FACT-2023-045',
        valorOriginal: 450000,
        vidaUtil: 120,
        cuentaContable: '1202-001',
        ubicacionFisica: 'Estacionamiento Principal',
        area: 'Ventas',
        responsable: 'María González',
        notas: 'Vehículo asignado al equipo de ventas',
        estatus: 'Activo',
        fechaCreacion: new Date('2023-03-20')
    },
    {
        id: 'AF-003',
        descripcion: 'Equipo de aire acondicionado industrial',
        marca: 'Carrier',
        modelo: 'Industrial 5000',
        numeroSerie: 'AC456789123',
        fechaAdquisicion: '2022-11-10',
        proveedor: 'Climatización Industrial SA',
        factura: 'FACT-2022-234',
        valorOriginal: 125000,
        vidaUtil: 84,
        cuentaContable: '1203-001',
        ubicacionFisica: 'Planta Producción - Nave 2',
        area: 'Mantenimiento',
        responsable: 'Carlos Ruiz',
        notas: 'Sistema de climatización para área de producción',
        estatus: 'Activo',
        fechaCreacion: new Date('2022-11-10')
    },
    {
        id: 'AF-004',
        descripcion: 'Impresora HP LaserJet Enterprise',
        marca: 'HP',
        modelo: 'LaserJet Enterprise M608',
        numeroSerie: 'HP789456123',
        fechaAdquisicion: '2021-08-05',
        proveedor: 'HP Inc.',
        factura: 'FACT-2021-156',
        valorOriginal: 15000,
        vidaUtil: 36,
        cuentaContable: '1201-002',
        ubicacionFisica: 'Almacén General',
        area: 'Administración',
        responsable: 'Ana López',
        notas: 'Equipo dado de baja por obsolescencia',
        estatus: 'Dado de baja',
        fechaCreacion: new Date('2021-08-05')
    },
    {
        id: 'AF-005',
        descripcion: 'Escritorio ejecutivo de madera',
        marca: 'OfficeMax',
        modelo: 'Executive Pro',
        numeroSerie: 'OM123789456',
        fechaAdquisicion: '2023-05-12',
        proveedor: 'Muebles de Oficina SA',
        factura: 'FACT-2023-089',
        valorOriginal: 8500,
        vidaUtil: 60,
        cuentaContable: '1203-002',
        ubicacionFisica: 'Oficina Dirección General',
        area: 'Administración',
        responsable: 'Roberto Martínez',
        notas: 'Mobiliario para oficina ejecutiva',
        estatus: 'Activo',
        fechaCreacion: new Date('2023-05-12')
    }
]

// Mock data - Accounting Account Options
const mockAccountingAccountOptions: SelectOptionDTO[] = [
    { id: '1201-001', label: '1201-001 - Equipo de cómputo' },
    { id: '1202-001', label: '1202-001 - Equipo de transporte' },
    { id: '1203-001', label: '1203-001 - Mobiliario y equipo' },
    { id: '1204-001', label: '1204-001 - Maquinaria y equipo' }
]

// Mock data - Area Options
const mockAreaOptions: SelectOptionDTO[] = [
    { id: 'Tecnología', label: 'Tecnología' },
    { id: 'Ventas', label: 'Ventas' },
    { id: 'Administración', label: 'Administración' },
    { id: 'Producción', label: 'Producción' },
    { id: 'Mantenimiento', label: 'Mantenimiento' }
]

// Mock data - Status Options
const mockStatusOptions: SelectOptionDTO[] = [
    { id: 'Activo', label: 'Activo' },
    { id: 'Dado de baja', label: 'Dado de baja' }
]

export const useFixedAssetsActions = () => {
    const fixedAssetsStore = useFixedAssetsStore()

    const getFixedAssets = async (
        page: number, 
        pageSize: number, 
        name: string = '', 
        area: string = '', 
        estatus: string = ''
    ): Promise<{ items: FixedAssetDTO[], total: number }> => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500))

        let filteredAssets = [...mockFixedAssets]

        // Apply filters
        if (name) {
            filteredAssets = filteredAssets.filter(asset => 
                asset.descripcion.toLowerCase().includes(name.toLowerCase()) ||
                asset.id.toLowerCase().includes(name.toLowerCase())
            )
        }

        if (area && area !== 'todas') {
            filteredAssets = filteredAssets.filter(asset => 
                asset.area.toLowerCase() === area.toLowerCase()
            )
        }

        if (estatus && estatus !== 'todos') {
            const statusFilter = estatus === 'activo' ? 'Activo' : 'Dado de baja'
            filteredAssets = filteredAssets.filter(asset => 
                asset.estatus === statusFilter
            )
        }

        const total = filteredAssets.length
        const start = (page - 1) * pageSize
        const end = start + pageSize
        const paginatedAssets = filteredAssets.slice(start, end)

        return {
            items: paginatedAssets.map(mapFixedAsset),
            total: total
        }
    }

    const getFixedAssetById = async (id: string): Promise<FixedAssetDTO> => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300))

        const asset = mockFixedAssets.find(a => a.id === id)
        if (!asset) {
            throw new Error('Activo no encontrado')
        }

        return mapFixedAsset(asset)
    }

    const createFixedAsset = async (data: FixedAssetFormDTO): Promise<{ message: string, status: string, data: any }> => {
        const requestData = mapFixedAssetRequest(data)
        
        // Log para mostrar qué se enviaría a la API
        console.log('🚀 API CREATE - Datos que se enviarían al backend:')
        console.log('Method: POST')
        console.log('Endpoint: /api/fixed-assets')
        console.log('Payload:', JSON.stringify(requestData, null, 2))

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800))
        
        // Simulate successful creation
        const newAsset: FixedAsset = {
            id: `AF-${String(mockFixedAssets.length + 1).padStart(3, '0')}`,
            ...requestData,
            fechaCreacion: new Date()
        }

        return {
            message: 'Activo fijo creado exitosamente',
            status: 'success',
            data: newAsset
        }
    }

    const updateFixedAsset = async (data: FixedAssetFormDTO): Promise<{ message: string, status: string, data: any }> => {
        const id = fixedAssetsStore.selectedFixedAsset.id ?? ''
        const requestData = mapFixedAssetRequest(data)
        
        // Log para mostrar qué se enviaría a la API
        console.log('🔄 API UPDATE - Datos que se enviarían al backend:')
        console.log('Method: PUT')
        console.log(`Endpoint: /api/fixed-assets/${id}`)
        console.log('Payload:', JSON.stringify({
            id,
            ...requestData
        }, null, 2))

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800))
        
        const index = mockFixedAssets.findIndex(a => a.id === id)
        if (index === -1) {
            return {
                message: 'Activo no encontrado',
                status: 'error',
                data: null
            }
        }

        const updatedAsset: FixedAsset = {
            ...mockFixedAssets[index],
            ...requestData
        }

        return {
            message: 'Activo fijo actualizado exitosamente',
            status: 'success',
            data: updatedAsset
        }
    }

    const deleteFixedAsset = async (): Promise<{ message: string, status: string, data: any }> => {
        const id = fixedAssetsStore.selectedFixedAsset?.id
        if (!id) {
            return {
                message: 'ID de activo no válido',
                status: 'error',
                data: null
            }
        }

        // Log para mostrar qué se enviaría a la API
        console.log('🗑️ API DELETE - Datos que se enviarían al backend:')
        console.log('Method: DELETE')
        console.log(`Endpoint: /api/fixed-assets/${id}`)
        console.log('Payload: No body required for DELETE request')
        console.log('Params:', { id })

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        const index = mockFixedAssets.findIndex(a => a.id === id)
        if (index === -1) {
            return {
                message: 'Activo no encontrado',
                status: 'error',
                data: null
            }
        }

        return {
            message: 'Activo fijo eliminado exitosamente',
            status: 'success',
            data: null
        }
    }

    const getFixedAssetsStats = async (): Promise<{
        totalAssets: number
        totalValue: number
        areasCount: number
        inactiveAssets: number
    }> => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300))

        const activeAssets = mockFixedAssets.filter(a => a.estatus === 'Activo')
        const totalValue = activeAssets.reduce((sum, a) => sum + a.valorOriginal, 0)
        const uniqueAreas = new Set(mockFixedAssets.map(a => a.area))
        const inactiveAssets = mockFixedAssets.filter(a => a.estatus === 'Dado de baja').length

        return {
            totalAssets: activeAssets.length,
            totalValue: totalValue,
            areasCount: uniqueAreas.size,
            inactiveAssets: inactiveAssets
        }
    }

    const getAccountingAccountOptions = async (): Promise<SelectOptionDTO[]> => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 200))
        
        return mockAccountingAccountOptions
    }

    const getAreaOptions = async (): Promise<SelectOptionDTO[]> => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 200))
        
        return mockAreaOptions
    }

    const getStatusOptions = async (): Promise<SelectOptionDTO[]> => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 200))
        
        return mockStatusOptions
    }

    return {
        getFixedAssets,
        getFixedAssetById,
        createFixedAsset,
        updateFixedAsset,
        deleteFixedAsset,
        getFixedAssetsStats,
        getAccountingAccountOptions,
        getAreaOptions,
        getStatusOptions
    }
}
