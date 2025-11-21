import type {
    IncidenceCategoryResponseType,
    IncidenceCategoryFormType,
    IncidenceCategoryType
} from '@/modules/RRHH/CategoriaIncidencias/types/incidenceCategoryTypes'
import useIncidenceCategoryStore from '@/modules/RRHH/CategoriaIncidencias/store/incidenceCategoryStore'
import {
    createIncidenceCategoryService,
    deleteIncidenceCategoryService,
    updateIncidenceCategoryService,
    getIncidenceCategoriesService
} from '@/modules/RRHH/CategoriaIncidencias/services/incidenceCategoryService'
import {
    mapIncidenceCategory,
    mapIncidenceCategoryRequest
} from '@/modules/RRHH/CategoriaIncidencias/composables/mappingIncidenceCategoryData'

export const useIncidenceCategoryActions = () => {
    const incidenceCategoryStore = useIncidenceCategoryStore()

    const getIncidenceCategories = async (
        page: number,
        pageSize: number
    ): Promise<{ items: IncidenceCategoryType[]; total: number }> => {
        const response = await getIncidenceCategoriesService(page, pageSize)
        return {
            items: response.data.items.map(mapIncidenceCategory),
            total: response.data.totalItems
        }
    }

    const createIncidenceCategory = async (
        data: IncidenceCategoryFormType
    ): Promise<{ message: string; status: string; data: IncidenceCategoryResponseType }> => {
        const model = mapIncidenceCategoryRequest(data)
        const response = await createIncidenceCategoryService(model)
        return {
            message: response.message,
            status: response.success ? 'success' : 'error',
            data: response.data
        }
    }

    const editIncidenceCategory = async (
        data: IncidenceCategoryFormType
    ): Promise<{ message: string; status: string; data: any }> => {
        const model = mapIncidenceCategoryRequest(data)
        const id = incidenceCategoryStore.selectedIncidenceCategory.id ?? 0
        const response = await updateIncidenceCategoryService(id, model)
        return {
            message: response.message,
            status: response.success ? 'success' : 'error',
            data: response.data
        }
    }

    const deleteIncidenceCategory = async (): Promise<{
        message: string
        status: string
        data: any
    }> => {
        let id = incidenceCategoryStore.selectedIncidenceCategory?.id
        if (id == undefined) id = 0
        const response = await deleteIncidenceCategoryService(id)
        return {
            message: response.message,
            status: response.success ? 'success' : 'error',
            data: response.data
        }
    }

    return {
        createIncidenceCategory,
        editIncidenceCategory,
        deleteIncidenceCategory,
        getIncidenceCategories
    }
}
