import axiosApiInstance from '@/api/axiosApiInstance'

export const getLowStockService = async (): Promise<any[]> => {
    const response = await axiosApiInstance.get('/stockBajo')
    return response.data
}

export const updateLowStockService = async (data: any): Promise<T> => {
    const response = await axiosApiInstance.put('/stockBajo')
    return response.data
}

export const deleteLowStockExpirationService = async (id: string): Promise<T> => {
    const response = await axiosApiInstance.delete(`/stockBajo/${id}`)
    return response.data
}
