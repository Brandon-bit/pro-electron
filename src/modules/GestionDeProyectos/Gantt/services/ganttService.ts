import axiosApiInstance from '@/api/axiosApiInstance'
import type { ApiResponseType } from '@/shared/types/apiResponseType'

export const getGanttProjectsService = async (): Promise<ApiResponseType<any[]>> => {
    const response = await axiosApiInstance.get('/gestion-proyectos/gantt/proyectos')
    return response.data
}

export const getGanttTasksService = async (projectId: string): Promise<ApiResponseType<any[]>> => {
    const response = await axiosApiInstance.get(`/gestion-proyectos/gantt/${projectId}/tareas`)
    return response.data
}

export const exportGanttService = async (projectId: string): Promise<Blob> => {
    const response = await axiosApiInstance.get(`/gestion-proyectos/gantt/${projectId}/exportar`, {
        responseType: 'blob'
    })
    return response.data
}
