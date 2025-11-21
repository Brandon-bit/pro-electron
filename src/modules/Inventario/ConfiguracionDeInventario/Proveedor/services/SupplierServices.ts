import axiosApiInstance from '@/api/axiosApiInstance'
import type { ApiResponseType } from '@/shared/types/apiResponseType'
import { ProveedorRequestType, ProveedorResponseType } from '@inventario/ConfiguracionDeInventario/Proveedor/types/supplierTypes';
import type { PagedResponseType } from '@/shared/types/pagedResponseType'

export const GetProveedors = async (page: number = 1, pageSize: number = 10): Promise<ApiResponseType<PagedResponseType<ProveedorResponseType>>> => {
  const skip = (page - 1) * pageSize;
  const response = await axiosApiInstance.get('/proveedor/proveedor', {
    params: {
      limit: pageSize,
      skip
    }
  })
  return response.data
}

export const AddProveedor = async (data: ProveedorRequestType)
: Promise<ApiResponseType<ProveedorResponseType>> => {
  const response = await axiosApiInstance.post('/proveedor/proveedor', data);
  return response.data;
};

export const UpdateProveedor = async (id: number, data: ProveedorRequestType)
: Promise<ApiResponseType<ProveedorResponseType>> => {
  const response = await axiosApiInstance.put(`/proveedor/proveedor/${id}`, data)
  return response.data
}

export const DeleteProveedor = async (id: number, borradoLogico: boolean = true)
: Promise<ApiResponseType<ProveedorResponseType>> => {
  const response = await axiosApiInstance.delete(`/proveedor/proveedor/${id}`, {
    params: { borradoLogico }
  })
  return response.data
}
