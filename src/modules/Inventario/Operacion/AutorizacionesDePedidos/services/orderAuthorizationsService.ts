import {
    OrderAuthorizationsRecordsType,
    OrderAuthorizationPayloadType
} from '@inventario/Operacion/AutorizacionesDePedidos/types/orderAuthorizationsTypes'
import axiosApiInstance from '@/api/axiosApiInstance'

export const getOrderAuthorizationsRecordsService = async (
    page: number,
    pageSize: number
): Promise<OrderAuthorizationsRecordsType[]> => {
    console.log(page, pageSize)
    const response = await axiosApiInstance.get('/autorizacionesDePedidos')
    return response.data
}

export const updateOrderAuthorizationService = async (
    data: OrderAuthorizationPayloadType
): Promise<any> => {
    console.log(data)
    // const response = await axiosApiInstance.put(`/autorizacionesDePedidos/${data.id}`, data)
    // return response.data
}
