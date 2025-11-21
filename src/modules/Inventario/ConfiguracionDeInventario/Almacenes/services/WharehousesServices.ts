import axiosApiInstance from '@/api/axiosApiInstance'
import type { ApiResponseType } from '@/shared/types/apiResponseType'
import type { PagedResponseType } from '@/shared/types/pagedResponseType'
import { WarehouseFormType, WarehouseResponseType, WarehouseRequestType } from '../types/WharehousesTypes'

const API = '/almacen/almacen'

// Obtener almacenes con paginado
export const GetWarehouses = async (page: number = 1, pageSize: number = 10)
: Promise<ApiResponseType<PagedResponseType<WarehouseResponseType>>> => {
  const skip = (page - 1) * pageSize
  const response = await axiosApiInstance.get(API, {
    params: {
      limit: pageSize,
      skip
    }
  })
  return response.data
}

// Crear almacén
export const AddWarehouse = async (data: WarehouseRequestType) 
: Promise<ApiResponseType<WarehouseResponseType>> => {
  const response = await axiosApiInstance.post(API, data) // Usar 'data' directamente
  return response.data
}

// Editar almacén
export const UpdateWarehouse = async (id: number, data: WarehouseRequestType)
: Promise<ApiResponseType<WarehouseResponseType>> => {
  const response = await axiosApiInstance.put(`${API}/${id}`, data) // Usar 'data' directamente
  return response.data
}

// Eliminar almacén
export const DeleteWarehouse = async (id: number, borradoLogico: boolean = true)
: Promise<ApiResponseType<WarehouseResponseType>> => {
  const response = await axiosApiInstance.delete(`${API}/${id}`, {
    params: { borradoLogico }
  })
  return response.data
}
