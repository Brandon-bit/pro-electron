import axiosApiInstance from '@/api/axiosApiInstance'
import {
    InventoryThreshold,
    InventoryForm
} from '@inventario/Operacion/PuntosMaximosMinimos/types/maxMinTypes'

export const getMaxMinPointsService = async (
    page: number,
    pageSize: number
): Promise<InventoryThreshold[]> => {
    console.log(page)
    console.log(pageSize)
    const response = await axiosApiInstance.get('/puntosMaximosMinimos')
    return response.data
}

export const createMaxMinPointsService = async (data: InventoryForm): Promise<any> => {
    console.log(data)
    // const response = await axiosApiInstance.post('/puntosMaximosMinimos', data)
    // return response.data
}

export const updateMaxMinService = async (data: InventoryForm): Promise<any> => {
    console.log(data)
    return
}

export const deleteMaxMinService = async (id: number): Promise<any> => {
    console.log(id)
    // const response = await axiosApiInstance.delete(`/puntosMaximosMinimos/${id}`)
    // return response.data
}
