import axiosApiInstance from '@/api/axiosApiInstance'
import type { ApiResponseType } from '@/shared/types/apiResponseType'
import type { SOWResponseType } from '@/modules/GestionDeProyectos/Operacion/SOWDelProyecto/types/sowTypes'
import type { PagedResponseType } from '@/shared/types/pagedResponseType'

export const getSOWsService = async (page: number, pageSize: number): Promise<ApiResponseType<PagedResponseType<SOWResponseType>>> => {
    const response = await axiosApiInstance.get('/gestion-proyectos/sow', {
        params: {
            limit: pageSize,
            skip: (page - 1) * pageSize
        }
    })
    return response.data
}

export const createSOWService = async (data: any): Promise<ApiResponseType<SOWResponseType>> => {
    const response = await axiosApiInstance.post('/gestion-proyectos/sow', data)
    return response.data
}

export const updateSOWService = async (id: number, data: any): Promise<ApiResponseType<SOWResponseType>> => {
    const response = await axiosApiInstance.put(`/gestion-proyectos/sow/${id}`, data)
    return response.data
}

export const deleteSOWService = async (id: number, borradoLogico: boolean = false): Promise<ApiResponseType<SOWResponseType>> => {
    const response = await axiosApiInstance.delete(`/gestion-proyectos/sow/${id}`, {
        params: { borradoLogico }
    })
    return response.data
}

export const exportSOWService = async (id: number): Promise<Blob> => {
    const response = await axiosApiInstance.get(`/gestion-proyectos/sow/${id}/exportar`, {
        responseType: 'blob'
    })
    return response.data
}
