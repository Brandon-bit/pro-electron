import axiosApiInstance from '@/api/axiosApiInstance'
import type { ApiResponseType } from '@/shared/types/apiResponseType'
import type { EDTResponseType } from '@/modules/GestionDeProyectos/Operacion/EDTDelProyecto/types/edtTypes'

export const getEDTNodesService = async (projectId: number): Promise<ApiResponseType<EDTResponseType[]>> => {
    const response = await axiosApiInstance.get(`/gestion-proyectos/edt/${projectId}`)
    return response.data
}

export const createEDTNodeService = async (data: any): Promise<ApiResponseType<EDTResponseType>> => {
    const response = await axiosApiInstance.post('/gestion-proyectos/edt', data)
    return response.data
}

export const updateEDTNodeService = async (id: number, data: any): Promise<ApiResponseType<EDTResponseType>> => {
    const response = await axiosApiInstance.put(`/gestion-proyectos/edt/${id}`, data)
    return response.data
}

export const deleteEDTNodeService = async (id: number, borradoLogico: boolean = false): Promise<ApiResponseType<EDTResponseType>> => {
    const response = await axiosApiInstance.delete(`/gestion-proyectos/edt/${id}`, {
        params: { borradoLogico }
    })
    return response.data
}

export const saveEDTTreeService = async (projectId: number, tree: any): Promise<ApiResponseType<any>> => {
    const response = await axiosApiInstance.post(`/gestion-proyectos/edt/${projectId}/guardar-arbol`, {
        arbol: tree
    })
    return response.data
}
