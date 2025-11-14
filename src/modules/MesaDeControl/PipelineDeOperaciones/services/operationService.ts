import axios from 'axios'
import type { OperationResponseType } from '@/modules/MesaDeControl/PipelineDeOperaciones/types/operationTypes'

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

export const getOperationsService = async (page: number, pageSize: number) => {
    const response = await axios.get(`${API_BASE_URL}/operations`, {
        params: { page, pageSize }
    })
    return response.data
}


export const getOperationByIdService = async (id: string) => {
    const response = await axios.get(`${API_BASE_URL}/operations/${id}`)
    return response.data
}

export const createOperationService = async (data: FormData) => {
    const response = await axios.post(`${API_BASE_URL}/operations`, data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return response.data
}

export const updateOperationService = async (id: string, data: FormData) => {
    const response = await axios.put(`${API_BASE_URL}/operations/${id}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return response.data
}

export const updateOperationStageService = async (id: string, stage: string) => {
    const response = await axios.patch(`${API_BASE_URL}/operations/${id}/stage`, { stage })
    return response.data
}

export const addCommentService = async (id: string, comment: string) => {
    const response = await axios.post(`${API_BASE_URL}/operations/${id}/comments`, { text: comment })
    return response.data
}

export const sendIncidentNotificationService = async (id: string, templateId: string) => {
    const response = await axios.post(`${API_BASE_URL}/operations/${id}/incidents`, { templateId })
    return response.data
}

export const approveOperationService = async (id: string) => {
    const response = await axios.post(`${API_BASE_URL}/operations/${id}/approve`)
    return response.data
}

export const rejectOperationService = async (id: string, reason: string) => {
    const response = await axios.post(`${API_BASE_URL}/operations/${id}/reject`, { reason })
    return response.data
}

export const deleteOperationService = async (id: string) => {
    const response = await axios.delete(`${API_BASE_URL}/operations/${id}`)
    return response.data
}
