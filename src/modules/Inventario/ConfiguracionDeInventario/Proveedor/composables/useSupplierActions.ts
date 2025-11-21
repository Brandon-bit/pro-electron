import { SupplierType, SupplierFormType, ProveedorResponseType } from '@inventario/ConfiguracionDeInventario/Proveedor/types/supplierTypes';
import { GetProveedors, AddProveedor, UpdateProveedor, DeleteProveedor } from '@inventario/ConfiguracionDeInventario/Proveedor/services/SupplierServices'
import { mapProveedor, mapProveedorRequest } from '@inventario/ConfiguracionDeInventario/Proveedor/composables/mappingSupplierData'

export const useSupplierActions = () => {

  // Obtener proveedores con paginado
  const getSuppliers = async (page: number = 1,pageSize: number = 10): Promise<{ items: SupplierType[], total: number }> => {
    const response = await GetProveedors(page, pageSize)
    const items = response.data.items.map(mapProveedor)
    return {
      items,
      total: response.data.totalItems
    }
  }

  // Crear proveedor
  const addSupplier = async (data: SupplierFormType)
  : Promise<{ message: string, status: string, data: ProveedorResponseType }> => {
    const model = mapProveedorRequest(data)
    const response = await AddProveedor(model)
    return {
      message: response.message,
      status: response.success ? 'success' : 'error',
      data: response.data
    }
  }

  // Editar proveedor
  const editSupplier = async (id: number, data: SupplierFormType)
  : Promise<{ message: string, status: string, data: ProveedorResponseType }> => {
    const model = mapProveedorRequest(data)
    const response = await UpdateProveedor(id, model)
    return {
      message: response.message,
      status: response.success ? 'success' : 'error',
      data: response.data
    }
  }

  // Eliminar proveedor
  const deleteSupplier = async (id: number, borradoLogico: boolean = true)
  : Promise<{ message: string, status: string, data: ProveedorResponseType }> => {
    const response = await DeleteProveedor(id, borradoLogico)
    return {
      message: response.message,
      status: response.success ? 'success' : 'error',
      data: response.data
    }
  }

  return { getSuppliers, addSupplier, editSupplier, deleteSupplier }
}
