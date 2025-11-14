// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axiosApiInstance from '@/api/axiosApiInstance' // Se usará cuando se conecte al backend real
import type { ApiResponseType } from '@/shared/types/apiResponseType'
import type { PagedResponseType } from '@/shared/types/pagedResponseType'
import type { ProcessDiagramResponseType } from '@procesos/ProcesosDeNegocio/DiagramasDeProceso/types/processDiagramType'

// Mock data for development
const mockProcessDiagrams: ProcessDiagramResponseType[] = [
    {
        id: 1,
        codigo: 'PRO-001',
        nombre: 'Proceso de Reclutamiento y Selección',
        descripcion: 'Diagrama que describe el flujo completo desde la solicitud de personal hasta la contratación',
        version: '2.1',
        fechaCreacion: new Date('2024-01-15'),
        fechaModificacion: new Date('2024-12-10'),
        activo: true
    },
    {
        id: 2,
        codigo: 'PRO-002',
        nombre: 'Gestión de Compras',
        descripcion: 'Flujo de aprobación y gestión de órdenes de compra',
        version: '1.5',
        fechaCreacion: new Date('2024-02-20'),
        fechaModificacion: new Date('2024-11-25'),
        activo: true
    },
    {
        id: 3,
        codigo: 'PRO-003',
        nombre: 'Atención al Cliente',
        descripcion: 'Proceso de recepción, gestión y resolución de solicitudes de clientes',
        version: '3.0',
        fechaCreacion: new Date('2024-03-10'),
        fechaModificacion: new Date('2025-01-05'),
        activo: true
    },
    {
        id: 4,
        codigo: 'PRO-004',
        nombre: 'Control de Calidad',
        descripcion: 'Inspección y validación de productos terminados',
        version: '1.2',
        fechaCreacion: new Date('2024-04-05'),
        fechaModificacion: new Date('2024-10-18'),
        activo: false
    },
    {
        id: 5,
        codigo: 'PRO-005',
        nombre: 'Gestión de Inventario',
        descripcion: 'Proceso de control y optimización de stock',
        version: '2.0',
        fechaCreacion: new Date('2024-05-12'),
        fechaModificacion: new Date('2024-12-22'),
        activo: true
    },
    {
        id: 6,
        codigo: 'PRO-006',
        nombre: 'Proceso de Ventas',
        descripcion: 'Flujo desde la prospección hasta el cierre de ventas',
        version: '1.8',
        fechaCreacion: new Date('2024-06-18'),
        fechaModificacion: new Date('2024-11-30'),
        activo: true
    },
    {
        id: 7,
        codigo: 'PRO-007',
        nombre: 'Mantenimiento Preventivo',
        descripcion: 'Programación y ejecución de mantenimientos preventivos',
        version: '1.0',
        fechaCreacion: new Date('2024-07-22'),
        fechaModificacion: new Date('2024-09-14'),
        activo: false
    },
    {
        id: 8,
        codigo: 'PRO-008',
        nombre: 'Gestión de Proyectos',
        descripcion: 'Metodología para planificación, ejecución y cierre de proyectos',
        version: '2.5',
        fechaCreacion: new Date('2024-08-08'),
        fechaModificacion: new Date('2025-01-12'),
        activo: true
    }
]

export const getProcessDiagramsService = async (
    page: number,
    pageSize: number
): Promise<ApiResponseType<PagedResponseType<ProcessDiagramResponseType>>> => {
    // Simulación con datos mock
    await new Promise((resolve) => setTimeout(resolve, 500))

    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const items = mockProcessDiagrams.slice(startIndex, endIndex)

    return {
        success: true,
        message: 'Diagramas obtenidos exitosamente',
        data: {
            items: items,
            totalItems: mockProcessDiagrams.length,
            page: page,
            pageSize: pageSize,
            length: items.length
        }
    }

    // Descomenta cuando tengas el endpoint real:
    // const response = await axiosApiInstance.get('/procesos/diagramas', {
    //     params: {
    //         limit: pageSize,
    //         skip: startIndex
    //     }
    // })
    // return response.data
}

export const createProcessDiagramService = async (
    data: any
): Promise<ApiResponseType<ProcessDiagramResponseType>> => {
    // Simulación con datos mock
    await new Promise((resolve) => setTimeout(resolve, 500))

    const newDiagram: ProcessDiagramResponseType = {
        id: mockProcessDiagrams.length + 1,
        codigo: data.codigo,
        nombre: data.nombre,
        descripcion: data.descripcion || '',
        version: data.version,
        fechaCreacion: new Date(),
        fechaModificacion: new Date(),
        activo: data.activo
    }

    mockProcessDiagrams.push(newDiagram)

    return {
        success: true,
        message: 'Diagrama creado exitosamente',
        data: newDiagram
    }

    // Descomenta cuando tengas el endpoint real:
    // const response = await axiosApiInstance.post('/procesos/diagramas', data)
    // return response.data
}

export const updateProcessDiagramService = async (
    id: number,
    data: any
): Promise<ApiResponseType<ProcessDiagramResponseType>> => {
    // Simulación con datos mock
    await new Promise((resolve) => setTimeout(resolve, 500))

    const index = mockProcessDiagrams.findIndex((d) => d.id === id)
    if (index !== -1) {
        mockProcessDiagrams[index] = {
            ...mockProcessDiagrams[index],
            codigo: data.codigo,
            nombre: data.nombre,
            descripcion: data.descripcion || '',
            version: data.version,
            activo: data.activo,
            fechaModificacion: new Date()
        }
    }

    return {
        success: true,
        message: 'Diagrama actualizado exitosamente',
        data: mockProcessDiagrams[index]
    }

    // Descomenta cuando tengas el endpoint real:
    // const response = await axiosApiInstance.put(`/procesos/diagramas/${id}`, data)
    // return response.data
}

export const deleteProcessDiagramService = async (
    id: number,
    borradoLogico: boolean = false
): Promise<ApiResponseType<ProcessDiagramResponseType>> => {
    // Simulación con datos mock
    await new Promise((resolve) => setTimeout(resolve, 500))

    const index = mockProcessDiagrams.findIndex((d) => d.id === id)
    let deletedDiagram: ProcessDiagramResponseType | null = null

    if (index !== -1) {
        if (borradoLogico) {
            mockProcessDiagrams[index].activo = false
            deletedDiagram = mockProcessDiagrams[index]
        } else {
            deletedDiagram = mockProcessDiagrams[index]
            mockProcessDiagrams.splice(index, 1)
        }
    }

    return {
        success: true,
        message: borradoLogico
            ? 'Diagrama desactivado exitosamente'
            : 'Diagrama eliminado exitosamente',
        data: deletedDiagram!
    }

    // Descomenta cuando tengas el endpoint real:
    // const response = await axiosApiInstance.delete(`/procesos/diagramas/${id}`, {
    //     params: { borradoLogico }
    // })
    // return response.data
}
