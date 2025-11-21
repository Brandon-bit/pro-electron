import type {
    IncidenceTypeResponseType,
    ParentCategoryResponseType
} from '@/modules/RRHH/TipoIncidencias/types/incidenceTypeTypes'
import { getIncidenceCategoriesService } from '@/modules/RRHH/CategoriaIncidencias/services/incidenceCategoryService'

// Mock data
let mockTypes: IncidenceTypeResponseType[] = [
    {
        id: 1,
        nombre: 'Falta',
        idCategoriaPadre: 1,
        nombreCategoriaPadre: 'Asistencia',
        descripcion: 'Ausencia injustificada del empleado',
        requiereRangoFechas: false,
        requiereHoras: false,
        requiereJustificacion: true,
        fechaCreacion: new Date('2024-01-01'),
        activo: true,
        eliminado: false
    },
    {
        id: 2,
        nombre: 'Retardo',
        idCategoriaPadre: 1,
        nombreCategoriaPadre: 'Asistencia',
        descripcion: 'Llegada tarde del empleado',
        requiereRangoFechas: false,
        requiereHoras: true,
        requiereJustificacion: true,
        fechaCreacion: new Date('2024-01-01'),
        activo: true,
        eliminado: false
    },
    {
        id: 3,
        nombre: 'Salida Anticipada',
        idCategoriaPadre: 1,
        nombreCategoriaPadre: 'Asistencia',
        descripcion: 'Salida antes de la hora establecida',
        requiereRangoFechas: false,
        requiereHoras: true,
        requiereJustificacion: true,
        fechaCreacion: new Date('2024-01-01'),
        activo: true,
        eliminado: false
    },
    {
        id: 4,
        nombre: 'Permiso con Goce de Sueldo',
        idCategoriaPadre: 1,
        nombreCategoriaPadre: 'Asistencia',
        descripcion: 'Permiso autorizado con pago de sueldo',
        requiereRangoFechas: true,
        requiereHoras: false,
        requiereJustificacion: false,
        fechaCreacion: new Date('2024-01-01'),
        activo: true,
        eliminado: false
    },
    {
        id: 5,
        nombre: 'Permiso sin Goce de Sueldo',
        idCategoriaPadre: 1,
        nombreCategoriaPadre: 'Asistencia',
        descripcion: 'Permiso autorizado sin pago de sueldo',
        requiereRangoFechas: true,
        requiereHoras: false,
        requiereJustificacion: false,
        fechaCreacion: new Date('2024-01-01'),
        activo: true,
        eliminado: false
    },
    {
        id: 6,
        nombre: 'Incapacidad por Enfermedad General',
        idCategoriaPadre: 2,
        nombreCategoriaPadre: 'Incapacidad',
        descripcion: 'Incapacidad médica por enfermedad común',
        requiereRangoFechas: true,
        requiereHoras: false,
        requiereJustificacion: false,
        fechaCreacion: new Date('2024-01-01'),
        activo: true,
        eliminado: false
    },
    {
        id: 7,
        nombre: 'Incapacidad por Riesgo de Trabajo',
        idCategoriaPadre: 2,
        nombreCategoriaPadre: 'Incapacidad',
        descripcion: 'Incapacidad por accidente o enfermedad laboral',
        requiereRangoFechas: true,
        requiereHoras: false,
        requiereJustificacion: false,
        fechaCreacion: new Date('2024-01-01'),
        activo: true,
        eliminado: false
    },
    {
        id: 8,
        nombre: 'Incapacidad por Maternidad/Paternidad',
        idCategoriaPadre: 2,
        nombreCategoriaPadre: 'Incapacidad',
        descripcion: 'Incapacidad por maternidad o paternidad',
        requiereRangoFechas: true,
        requiereHoras: false,
        requiereJustificacion: false,
        fechaCreacion: new Date('2024-01-01'),
        activo: true,
        eliminado: false
    },
    {
        id: 9,
        nombre: 'Horas Extra',
        idCategoriaPadre: 3,
        nombreCategoriaPadre: 'Tiempo Extra',
        descripcion: 'Horas trabajadas adicionales',
        requiereRangoFechas: false,
        requiereHoras: true,
        requiereJustificacion: false,
        fechaCreacion: new Date('2024-01-01'),
        activo: true,
        eliminado: false
    },
    {
        id: 10,
        nombre: 'Trabajo en Día Festivo',
        idCategoriaPadre: 3,
        nombreCategoriaPadre: 'Tiempo Extra',
        descripcion: 'Trabajo realizado en día festivo',
        requiereRangoFechas: false,
        requiereHoras: true,
        requiereJustificacion: false,
        fechaCreacion: new Date('2024-01-01'),
        activo: true,
        eliminado: false
    }
]

let nextId = 11

export const getIncidenceTypesService = async (page: number, pageSize: number) => {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const activeTypes = mockTypes.filter((type) => !type.eliminado)
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const paginatedData = activeTypes.slice(startIndex, endIndex)

    return {
        success: true,
        message: 'Tipos de incidencias obtenidos exitosamente',
        data: {
            items: paginatedData,
            totalItems: activeTypes.length
        }
    }
}

export const getParentCategoriesService = async (): Promise<{
    success: boolean
    message: string
    data: ParentCategoryResponseType[]
}> => {
    try {
        // Obtener todas las categorías del servicio de CategoriaIncidencias
        const response = await getIncidenceCategoriesService(1, 100)

        // Mapear las categorías al formato requerido
        const categories: ParentCategoryResponseType[] = response.data.items
            .filter((cat) => cat.activo && !cat.eliminado)
            .map((cat) => ({
                id: cat.id,
                nombre: cat.nombre
            }))

        return {
            success: true,
            message: 'Categorías obtenidas exitosamente',
            data: categories
        }
    } catch (error) {
        console.error('Error al obtener las categorías:', error)
        return {
            success: false,
            message: 'Error al obtener las categorías',
            data: []
        }
    }
}

export const createIncidenceTypeService = async (data: any) => {
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Get parent category name
    const parentCategories = await getParentCategoriesService()
    const parentCategory = parentCategories.data.find((cat) => cat.id === data.idCategoriaPadre)

    const newType: IncidenceTypeResponseType = {
        id: nextId++,
        ...data,
        nombreCategoriaPadre: parentCategory?.nombre || '',
        fechaCreacion: new Date(),
        eliminado: false
    }

    mockTypes.push(newType)

    return {
        success: true,
        message: 'Tipo de incidencia creado exitosamente',
        data: newType
    }
}

export const updateIncidenceTypeService = async (id: number, data: any) => {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const index = mockTypes.findIndex((type) => type.id === id)
    if (index === -1) {
        return {
            success: false,
            message: 'Tipo de incidencia no encontrado',
            data: null
        }
    }

    // Get parent category name if category changed
    if (data.idCategoriaPadre) {
        const parentCategories = await getParentCategoriesService()
        const parentCategory = parentCategories.data.find((cat) => cat.id === data.idCategoriaPadre)
        data.nombreCategoriaPadre = parentCategory?.nombre || mockTypes[index].nombreCategoriaPadre
    }

    mockTypes[index] = {
        ...mockTypes[index],
        ...data
    }

    return {
        success: true,
        message: 'Tipo de incidencia actualizado exitosamente',
        data: mockTypes[index]
    }
}

export const deleteIncidenceTypeService = async (id: number) => {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const index = mockTypes.findIndex((type) => type.id === id)
    if (index === -1) {
        return {
            success: false,
            message: 'Tipo de incidencia no encontrado',
            data: null
        }
    }

    mockTypes[index].eliminado = true

    return {
        success: true,
        message: 'Tipo de incidencia eliminado exitosamente',
        data: mockTypes[index]
    }
}
