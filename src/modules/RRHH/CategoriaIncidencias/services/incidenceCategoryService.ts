import type { IncidenceCategoryResponseType } from '@/modules/RRHH/CategoriaIncidencias/types/incidenceCategoryTypes'

// Mock data
let mockCategories: IncidenceCategoryResponseType[] = [
    {
        id: 1,
        nombre: 'Asistencia',
        descripcion: 'Incidencias relacionadas con la asistencia del empleado',
        fechaCreacion: new Date('2024-01-01'),
        activo: true,
        eliminado: false
    },
    {
        id: 2,
        nombre: 'Incapacidad',
        descripcion: 'Incapacidades médicas y permisos por enfermedad',
        fechaCreacion: new Date('2024-01-01'),
        activo: true,
        eliminado: false
    },
    {
        id: 3,
        nombre: 'Tiempo Extra',
        descripcion: 'Horas extra y trabajo en días festivos',
        fechaCreacion: new Date('2024-01-01'),
        activo: true,
        eliminado: false
    }
]

let nextId = 4

export const getIncidenceCategoriesService = async (page: number, pageSize: number) => {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const activeCategories = mockCategories.filter((cat) => !cat.eliminado)
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const paginatedData = activeCategories.slice(startIndex, endIndex)

    return {
        success: true,
        message: 'Categorías obtenidas exitosamente',
        data: {
            items: paginatedData,
            totalItems: activeCategories.length
        }
    }
}

export const createIncidenceCategoryService = async (data: any) => {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const newCategory: IncidenceCategoryResponseType = {
        id: nextId++,
        ...data,
        fechaCreacion: new Date(),
        eliminado: false
    }

    mockCategories.push(newCategory)

    return {
        success: true,
        message: 'Categoría creada exitosamente',
        data: newCategory
    }
}

export const updateIncidenceCategoryService = async (id: number, data: any) => {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const index = mockCategories.findIndex((cat) => cat.id === id)
    if (index === -1) {
        return {
            success: false,
            message: 'Categoría no encontrada',
            data: null
        }
    }

    mockCategories[index] = {
        ...mockCategories[index],
        ...data
    }

    return {
        success: true,
        message: 'Categoría actualizada exitosamente',
        data: mockCategories[index]
    }
}

export const deleteIncidenceCategoryService = async (id: number) => {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const index = mockCategories.findIndex((cat) => cat.id === id)
    if (index === -1) {
        return {
            success: false,
            message: 'Categoría no encontrada',
            data: null
        }
    }

    mockCategories[index].eliminado = true

    return {
        success: true,
        message: 'Categoría eliminada exitosamente',
        data: mockCategories[index]
    }
}
