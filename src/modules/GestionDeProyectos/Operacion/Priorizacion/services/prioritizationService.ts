import axiosApiInstance from '@/api/axiosApiInstance'
import type { ApiResponseType } from '@/shared/types/apiResponseType'
import type { PrioritizedProjectResponseType } from '@/modules/GestionDeProyectos/Operacion/Priorizacion/types/prioritizationTypes'
import type { PagedResponseType } from '@/shared/types/pagedResponseType'

export const getPrioritizedProjectsService = async (page: number, pageSize: number): Promise<ApiResponseType<PagedResponseType<PrioritizedProjectResponseType>>> => {
    const response = await axiosApiInstance.get('/gestion-proyectos/priorizacion', {
        params: {
            limit: pageSize,
            skip: (page - 1) * pageSize
        }
    })
    return response.data
}

export const createPrioritizedProjectService = async (data: any): Promise<ApiResponseType<PrioritizedProjectResponseType>> => {
    const response = await axiosApiInstance.post('/gestion-proyectos/priorizacion', data)
    return response.data
}

export const updatePrioritizedProjectService = async (id: number, data: any): Promise<ApiResponseType<PrioritizedProjectResponseType>> => {
    const response = await axiosApiInstance.put(`/gestion-proyectos/priorizacion/${id}`, data)
    return response.data
}

export const deletePrioritizedProjectService = async (id: number, borradoLogico: boolean = false): Promise<ApiResponseType<PrioritizedProjectResponseType>> => {
    const response = await axiosApiInstance.delete(`/gestion-proyectos/priorizacion/${id}`, {
        params: { borradoLogico }
    })
    return response.data
}

export const updatePrioritiesService = async (projects: any[]): Promise<ApiResponseType<any>> => {
    const response = await axiosApiInstance.post('/gestion-proyectos/priorizacion/actualizar-prioridades', {
        proyectos: projects
    })
    return response.data
}
