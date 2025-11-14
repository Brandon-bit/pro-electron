import axiosApiInstance from '@/api/axiosApiInstance'
import type { ProspectFilterType } from '@/modules/Inversiones/Inversion/Prospectos/types/prospectTypes'

const BASE_URL = '/inversiones/prospectos'

export const getProspectsService = async (page: number, pageSize: number, filters?: ProspectFilterType) => {
    const params = {
        page,
        pageSize,
        ...filters
    }
    return await axiosApiInstance.get(`${BASE_URL}`, { params })
}

export const getProspectByIdService = async (id: number) => {
    return await axiosApiInstance.get(`${BASE_URL}/${id}`)
}

export const createProspectService = async (data: any) => {
    return await axiosApiInstance.post(`${BASE_URL}`, data)
}

export const updateProspectService = async (id: number, data: any) => {
    return await axiosApiInstance.put(`${BASE_URL}/${id}`, data)
}

export const deleteProspectService = async (id: number) => {
    return await axiosApiInstance.delete(`${BASE_URL}/${id}`)
}

export const getProspectKPIsService = async () => {
    return await axiosApiInstance.get(`${BASE_URL}/kpis`)
}

export const updateProspectStatusService = async (id: number, status: string) => {
    return await axiosApiInstance.patch(`${BASE_URL}/${id}/status`, { status })
}

export const addProspectActivityService = async (prospectId: number, data: any) => {
    return await axiosApiInstance.post(`${BASE_URL}/${prospectId}/activities`, data)
}

export const getProspectActivitiesService = async (prospectId: number) => {
    return await axiosApiInstance.get(`${BASE_URL}/${prospectId}/activities`)
}

export const exportProspectsService = async (filters?: ProspectFilterType): Promise<Blob> => {
    const response = await axiosApiInstance.get(`${BASE_URL}/export`, {
        params: filters,
        responseType: 'blob'
    })
    return response.data
}
