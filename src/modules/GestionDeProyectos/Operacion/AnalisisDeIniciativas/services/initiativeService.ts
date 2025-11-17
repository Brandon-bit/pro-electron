import axiosApiInstance from '@/api/axiosApiInstance'
import type { ApiResponseType } from '@/shared/types/apiResponseType'
import type { 
    InitiativeResponseType, 
    CriteriaResponseType, 
    CriteriaRequestType 
} from '@/modules/GestionDeProyectos/Operacion/AnalisisDeIniciativas/types/initiativeTypes'
import type { PagedResponseType } from '@/shared/types/pagedResponseType'

// Criterios de Evaluación
export const getCriteriaService = async (): Promise<ApiResponseType<CriteriaResponseType>> => {
    const response = await axiosApiInstance.get('/gestion-de-proyectos/criterios-de-evaluacion')
    return response.data
}

export const createCriteriaService = async (data: CriteriaRequestType): Promise<ApiResponseType<boolean>> => {
    const response = await axiosApiInstance.post('/gestion-de-proyectos/criterios-de-evaluacion', data)
    return response.data
}

export const updateCriteriaService = async (data: CriteriaRequestType): Promise<ApiResponseType<boolean>> => {
    const response = await axiosApiInstance.put('/gestion-de-proyectos/criterios-de-evaluacion', data)
    return response.data
}

// Iniciativas
export const getInitiativesService = async (page: number, pageSize: number): Promise<ApiResponseType<PagedResponseType<InitiativeResponseType>>> => {
    const response = await axiosApiInstance.get('/gestion-de-proyectos/iniciativa', {
        params: {
            limit: page,
            skip: pageSize
        }
    })
    return response.data
}

export const createInitiativeService = async (data: any): Promise<ApiResponseType<InitiativeResponseType>> => {
    const response = await axiosApiInstance.post('/gestion-de-proyectos/iniciativa', data)
    return response.data
}

export const updateInitiativeService = async (data: any): Promise<ApiResponseType<boolean>> => {
    const response = await axiosApiInstance.put('/gestion-de-proyectos/iniciativa', data)
    return response.data
}

export const deleteInitiativeService = async (dni: number): Promise<ApiResponseType<{ totalItems: number }>> => {
    const response = await axiosApiInstance.delete(`/gestion-de-proyectos/iniciativa/${dni}`)
    return response.data
}

// Priorización
export const sendToPrioritizationService = async (data: any): Promise<ApiResponseType<boolean>> => {
    const response = await axiosApiInstance.post('/gestion-de-proyectos/priorizacion', data)
    return response.data
}
