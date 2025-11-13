import axiosApiInstance from '@/api/axiosApiInstance'
import axiosApiInstance from '@/api/axiosApiInstance'
import {
    OrderManagementRecordsType,
    SuppliersType
} from '@inventario/Operacion/GestionDePedidos/types/orderManagementTypes'

export const getOrderManagementRecordsService = async (
    page: number,
    pageSize: number
): Promise<OrderManagementRecordsType[]> => {
    const response = await axiosApiInstance.get('/gestionPedido')
    return response.data
}

export const getSuppliersService = async (): Promise<SuppliersType[]> => {
    const response = await axiosApiInstance.get('/proveedores')
    return response.data
}

export const advanceStateService = async (id: number): Promise<any> => {
    const response = await axiosApiInstance.put(`/proveedores/${id}`)
    return response
}

export const getProductsBySearchService = async (
    query: string,
    limit: number = 10,
    skip: number = 1
): Promise<any[]> => {
    const response = await axiosApiInstance.get(
        `/products/search?q=${query}&limit=${limit}&skip=${skip * limit - limit}`
    )
    return response.data
}
