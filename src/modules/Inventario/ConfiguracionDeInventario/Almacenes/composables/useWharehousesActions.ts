import { WarehouseType, WarehouseFormType, WarehouseResponseType } from '../types/WharehousesTypes'
import { GetWarehouses, AddWarehouse, UpdateWarehouse, DeleteWarehouse } from '../services/WharehousesServices'
import { mapWarehouse, mapWarehouseRequest } from '../composables/mappingWharehousesData'

export const useWarehouseActions = () => {

  // Obtener almacenes con paginado
  const getWarehouses = async (page: number = 1, pageSize: number = 10): Promise<{ items: WarehouseType[], total: number }> => {
    const response = await GetWarehouses(page, pageSize)
    const items = response.data.items.map(mapWarehouse)
    return {
      items,
      total: response.data.totalItems
    }
  }

  // Crear almacén
  const addAlmacen = async (data: WarehouseFormType)
  : Promise<{ message: string, status: string, data: WarehouseResponseType }> => {
    const model = mapWarehouseRequest(data)
    const response = await AddWarehouse(model)
    return {
      message: response.message,
      status: response.success ? 'success' : 'error',
      data: response.data
    }
  }

  // Editar almacén
  const editAlmacen = async (id: number, data: WarehouseFormType)
  : Promise<{ message: string, status: string, data: WarehouseResponseType }> => {
    const model = mapWarehouseRequest(data, true)
    const response = await UpdateWarehouse(id, model)
    return {
      message: response.message,
      status: response.success ? 'success' : 'error',
      data: response.data
    }
  }

  // Eliminar almacén
  const deleteAlmacen = async (id: number, borradoLogico: boolean = true)
  : Promise<{ message: string, status: string, data: WarehouseResponseType }> => {
    const response = await DeleteWarehouse(id, borradoLogico)
    return {
      message: response.message,
      status: response.success ? 'success' : 'error',
      data: response.data
    }
  }

  return { getWarehouses, addAlmacen, editAlmacen, deleteAlmacen }
}
