import axiosApiInstance from '@/api/axiosApiInstance'
import type { ApiResponseType } from '@/shared/types/apiResponseType'
import type { InitiativeResponseType } from '@/modules/GestionDeProyectos/AnalisisDeIniciativas/types/initiativeTypes'
import type { PagedResponseType } from '@/shared/types/pagedResponseType'

export const getInitiativesService = async (page: number, pageSize: number): Promise<ApiResponseType<PagedResponseType<InitiativeResponseType>>> => {
    const response = await axiosApiInstance.get('/gestion-proyectos/iniciativas', {
        params: {
            limit: pageSize,
            skip: (page - 1) * pageSize
        }
    })
    return response.data
}

export const createInitiativeService = async (data: any): Promise<ApiResponseType<InitiativeResponseType>> => {
    const response = await axiosApiInstance.post('/gestion-proyectos/iniciativas', data)
    return response.data
}

export const updateInitiativeService = async (id: number, data: any): Promise<ApiResponseType<InitiativeResponseType>> => {
    const response = await axiosApiInstance.put(`/gestion-proyectos/iniciativas/${id}`, data)
    return response.data
}

export const deleteInitiativeService = async (id: number, borradoLogico: boolean = false): Promise<ApiResponseType<InitiativeResponseType>> => {
    const response = await axiosApiInstance.delete(`/gestion-proyectos/iniciativas/${id}`, {
        params: { borradoLogico }
    })
    return response.data
}

export const toggleSelectionService = async (id: number, selected: boolean): Promise<ApiResponseType<InitiativeResponseType>> => {
    const response = await axiosApiInstance.patch(`/gestion-proyectos/iniciativas/${id}/seleccionar`, {
        seleccionado: selected
    })
    return response.data
}
