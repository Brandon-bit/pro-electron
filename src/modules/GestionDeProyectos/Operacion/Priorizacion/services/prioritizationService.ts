import axiosApiInstance from '@/api/axiosApiInstance'
import type { ApiResponseType } from '@/shared/types/apiResponseType'
import type { PrioritizedProjectResponseType, PrioritizedProjectUpdateType } from '@/modules/GestionDeProyectos/Operacion/Priorizacion/types/prioritizationTypes'

export const getPrioritizedProjectsService = async (): Promise<ApiResponseType<PrioritizedProjectResponseType[]>> => {
    const response = await axiosApiInstance.get('/gestion-de-proyectos/priorizacion')
    return response.data
}

export const updatePrioritizedProjectService = async (data: PrioritizedProjectUpdateType): Promise<ApiResponseType<boolean>> => {
    const response = await axiosApiInstance.put('/gestion-de-proyectos/priorizacion', data)
    return response.data
}
