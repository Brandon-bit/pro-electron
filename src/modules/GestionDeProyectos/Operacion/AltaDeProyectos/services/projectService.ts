import axiosApiInstance from '@/api/axiosApiInstance'
import type { ApiResponseType } from '@/shared/types/apiResponseType'
import type { ProjectResponseType } from '@/modules/GestionDeProyectos/Operacion/AltaDeProyectos/types/projectTypes'
import type { PagedResponseType } from '@/shared/types/pagedResponseType'

export const getProjectsService = async (page: number, pageSize: number): Promise<ApiResponseType<PagedResponseType<ProjectResponseType>>> => {
    const response = await axiosApiInstance.get('/gestion-proyectos/proyectos', {
        params: {
            limit: pageSize,
            skip: (page - 1) * pageSize
        }
    })
    return response.data
}

export const createProjectService = async (data: any): Promise<ApiResponseType<ProjectResponseType>> => {
    const response = await axiosApiInstance.post('/gestion-proyectos/proyectos', data)
    return response.data
}

export const updateProjectService = async (id: number, data: any): Promise<ApiResponseType<ProjectResponseType>> => {
    const response = await axiosApiInstance.put(`/gestion-proyectos/proyectos/${id}`, data)
    return response.data
}

export const deleteProjectService = async (id: number, borradoLogico: boolean = false): Promise<ApiResponseType<ProjectResponseType>> => {
    const response = await axiosApiInstance.delete(`/gestion-proyectos/proyectos/${id}`, {
        params: { borradoLogico }
    })
    return response.data
}

export const generateFolioService = async (): Promise<ApiResponseType<{ folio: string }>> => {
    const response = await axiosApiInstance.get('/gestion-proyectos/proyectos/generar-folio')
    return response.data
}
