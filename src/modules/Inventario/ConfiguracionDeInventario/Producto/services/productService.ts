import axiosApiInstance from '@/api/axiosApiInstance'
export const getProductDetailService = async (id: string): Promise<T> => {
    const response = await axiosApiInstance.get(`/detail/${id}`)
    return response.data
}
