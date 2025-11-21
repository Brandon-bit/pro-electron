import useIncidenceTypeStore from '@/modules/RRHH/TipoIncidencias/store/incidenceTypeStore'
import {
    createIncidenceTypeService,
    deleteIncidenceTypeService,
    updateIncidenceTypeService,
    getIncidenceTypesService,
    getParentCategoriesService
} from '@/modules/RRHH/TipoIncidencias/services/incidenceTypeService'
import {
    mapIncidenceType,
    mapIncidenceTypeRequest
} from '@/modules/RRHH/TipoIncidencias/composables/mappingIncidenceTypeData'
import {
    IncidenceTypeType,
    IncidenceTypeFormType,
    IncidenceTypeResponseType,
    ParentCategoryType
} from '@/modules/RRHH/TipoIncidencias/types/incidenceTypeTypes'

export const useIncidenceTypeActions = () => {
    const incidenceTypeStore = useIncidenceTypeStore()

    const getIncidenceTypes = async (
        page: number,
        pageSize: number
    ): Promise<{ items: IncidenceTypeType[]; total: number }> => {
        const response = await getIncidenceTypesService(page, pageSize)
        return {
            items: response.data.items.map(mapIncidenceType),
            total: response.data.totalItems
        }
    }

    const getParentCategories = async (): Promise<ParentCategoryType[]> => {
        const response = await getParentCategoriesService()
        return response.data.map((cat) => ({ id: cat.id, label: cat.nombre }))
    }

    const createIncidenceType = async (
        data: IncidenceTypeFormType
    ): Promise<{ message: string; status: string; data: IncidenceTypeResponseType }> => {
        const model = mapIncidenceTypeRequest(data)
        const response = await createIncidenceTypeService(model)
        return {
            message: response.message,
            status: response.success ? 'success' : 'error',
            data: response.data
        }
    }

    const editIncidenceType = async (
        data: IncidenceTypeFormType
    ): Promise<{ message: string; status: string; data: any }> => {
        const model = mapIncidenceTypeRequest(data)
        const id = incidenceTypeStore.selectedIncidenceType.id ?? 0
        const response = await updateIncidenceTypeService(id, model)
        return {
            message: response.message,
            status: response.success ? 'success' : 'error',
            data: response.data
        }
    }

    const deleteIncidenceType = async (): Promise<{
        message: string
        status: string
        data: any
    }> => {
        let id = incidenceTypeStore.selectedIncidenceType?.id
        if (id == undefined) id = 0
        const response = await deleteIncidenceTypeService(id)
        return {
            message: response.message,
            status: response.success ? 'success' : 'error',
            data: response.data
        }
    }

    return {
        createIncidenceType,
        editIncidenceType,
        deleteIncidenceType,
        getIncidenceTypes,
        getParentCategories
    }
}
