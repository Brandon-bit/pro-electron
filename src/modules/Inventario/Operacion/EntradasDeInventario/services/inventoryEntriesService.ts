import axiosApiInstance from '@/api/axiosApiInstance'
// import axiosApiInstance from '@/api/axiosApiInstance'
// import axiosApiInstanceTwo from '@/api/axiosApiInstanceTwo'
// import axiosApiInstance from '@/api/axiosApiInstance'
// import axiosApiInstanceTwo from '@/api/axiosApiInstanceTwo'
import {
    Warehouse,
    Supplier,
    SupplierAll,
    SupplierAll,
    InventoryEntry,
    InventoryEntryRequestPayload,
    ProductoACResponse,
    TipomovimientoResponse
} from '@inventario/Operacion/EntradasDeInventario/types/inventoryEntriesTypes'
import { ApiResponseType } from '@/shared/types/apiResponseType'
import { PagedResponseType } from '@/shared/types/pagedResponseType'

export const getInventoryEntriesService = async (
    page: number,
    pageSize: number
): Promise<ApiResponseType<PagedResponseType<InventoryEntry>>> => {
    const response = await axiosApiInstance.get('/entrada/entrada', {
        params: {
            limit: page,
            skip: pageSize
        }
    })
    return response.data
}

// export const getInventoryEntyByIdService = async (id: number): Promise<InventoryEntry> => {
//     const response = await axiosApiInstance.get(`/entrada/entrada/${id}`)
export const getInventoryEntyByIdService = async (id: number): Promise<InventoryEntry> => {
    const response = await axiosApiInstance.get(`/entrada/entrada/${id}`)
    return response.data
}

export const getWarehousesService = async (): Promise<{ items: Warehouse[] }> => {
    const response = await axiosApiInstance.get('/almacen/almacen/lista')
    return response.data.data
}

export const getProductoByName = async (nombre: string): Promise<{ productos: ProductoACResponse[] }> => {
    const response = await axiosApiInstance.get(
        `/producto/Producto/GetProductoByName/${nombre}`
    );
    if (!response.data || !response.data.data) {
        return { productos: [] };
    }
    return response.data.data;
};


export const GetListaByClasificacion = async (id: number): Promise<TipomovimientoResponse[]> => {
    const response = await axiosApiInstance.get(`/movimiento/tipomovimiento/clasificacion/${id}`);
    return response.data.data.items;
};

// export const getWarehousesService = async (): Promise<{ items: Warehouse[] }> => {
//     const response = await axiosApiInstance.get('/almacen/almacen/lista')
//     return response.data.data
// }

    // export const getSuppliersService = async (): Promise<{ items: SupplierAll[] }> => {
    //     const response = await axiosApiInstance.get('/proveedor/proveedor')
    //     return response.data.data
export const getSuppliersService = async (): Promise<{ items: SupplierAll[] }> => {
    const response = await axiosApiInstance.get('/proveedor/proveedor')
    return response.data.data
}

export const getProductsBySearchService = async (
    query: string,
    limit: number = 10,
    skip: number = 1
): Promise<any[]> => {
    // const response = await axiosApiInstance.get(
    const response = await axiosApiInstance.get(
        `/products/search?q=${query}&limit=${limit}&skip=${skip * limit - limit}`
    )
    return response.data
}

export const createInventoryEntryService = async (
    data: InventoryEntryRequestPayload
): Promise<any> => {
    console.log(data)
    // const response = await axiosApiInstance.post('/inventoryAudit', data)
    // return response.data
}

export const updateInventoryEntryService = async (
    data: InventoryEntryRequestPayload,
    id: number | undefined
): Promise<any> => {
    console.log(data)
    console.log(id)
    // const response = await axiosApiInstance.put(`/inventoryAudit/${data.id}`, data)
    // return response.data
}

// export const deleteInventoryEntryService = async (
//     data: InventoryEntryDeletePayload,
//     id: number | undefined
// ): Promise<any> => {
//     console.log(data)
//     console.log(id)
//     // const response = await axiosApiInstance.put(`/inventoryAudit/${data.id}`, data)
//     // return response.data
// }
