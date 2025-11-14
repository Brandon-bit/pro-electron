import axiosApiInstance from '@/api/axiosApiInstance'

import type { ReceivedInvoiceFilterType } from '@/modules/Fiscal/FacturasRecibidas/types/receivedInvoiceTypes'

const BASE_URL = '/fiscal/facturas-recibidas'

export const getReceivedInvoicesService = async (
    page: number,
    pageSize: number,
    filters?: ReceivedInvoiceFilterType
) => {
    const params = {
        page,
        pageSize,
        ...filters
    }
    return await axiosApiInstance.get(`${BASE_URL}`, { params })
}

export const getReceivedInvoiceKPIsService = async () => {
    return await axiosApiInstance.get(`${BASE_URL}/kpis`)
}

export const uploadXmlService = async (file: File) => {
    const formData = new FormData()
    formData.append('xml', file)
    return await axiosApiInstance.post(`${BASE_URL}/upload-xml`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const validateInvoiceService = async (id: number) => {
    return await axiosApiInstance.post(`${BASE_URL}/${id}/validate`)
}

export const rejectInvoiceService = async (id: number, reason: string) => {
    return await axiosApiInstance.post(`${BASE_URL}/${id}/reject`, { reason })
}

export const downloadPdfService = async (id: number): Promise<Blob> => {
    const response = await axiosApiInstance.get(`${BASE_URL}/${id}/pdf`, {
        responseType: 'blob'
    })
    return response.data
}

export const downloadXmlService = async (id: number): Promise<Blob> => {
    const response = await axiosApiInstance.get(`${BASE_URL}/${id}/xml`, {
        responseType: 'blob'
    })
    return response.data
}

export const deleteReceivedInvoiceService = async (id: number) => {
    return await axiosApiInstance.delete(`${BASE_URL}/${id}`)
}

export const exportReceivedInvoicesService = async (filters?: ReceivedInvoiceFilterType): Promise<Blob> => {
    const response = await axiosApiInstance.get(`${BASE_URL}/export`, {
        params: filters,
        responseType: 'blob'
    })
    return response.data
}
