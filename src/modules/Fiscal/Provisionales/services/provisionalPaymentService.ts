import axiosApiInstance from '@/api/axiosApiInstance'

const BASE_URL = '/fiscal/provisionales'

export const getProvisionalPaymentsService = async (page: number, pageSize: number) => {
    const params = { page, pageSize }
    return await axiosApiInstance.get(`${BASE_URL}/isr`, { params })
}

export const getVATDeclarationsService = async (page: number, pageSize: number) => {
    const params = { page, pageSize }
    return await axiosApiInstance.get(`${BASE_URL}/iva`, { params })
}

export const getProvisionalPaymentKPIsService = async () => {
    return await axiosApiInstance.get(`${BASE_URL}/kpis`)
}

export const getCalculationInfoService = async () => {
    return await axiosApiInstance.get(`${BASE_URL}/calculation-info`)
}

export const generateDeclarationService = async (period: string, type: 'isr' | 'iva') => {
    return await axiosApiInstance.post(`${BASE_URL}/generate`, { period, type })
}

export const downloadDeclarationService = async (id: number, type: 'isr' | 'iva'): Promise<Blob> => {
    const response = await axiosApiInstance.get(`${BASE_URL}/${type}/${id}/download`, {
        responseType: 'blob'
    })
    return response.data
}

export const markAsPaidService = async (id: number, type: 'isr' | 'iva', paymentData: {
    paymentDate: string
    paymentReference: string
}) => {
    return await axiosApiInstance.post(`${BASE_URL}/${type}/${id}/mark-paid`, paymentData)
}

export const deleteProvisionalPaymentService = async (id: number, type: 'isr' | 'iva') => {
    return await axiosApiInstance.delete(`${BASE_URL}/${type}/${id}`)
}
