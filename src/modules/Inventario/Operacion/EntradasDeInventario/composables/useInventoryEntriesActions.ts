import {
    getInventoryEntriesService,
    getInventoryEntyByIdService,
    getWarehousesService,
    getSuppliersService,
    getProductsBySearchService,
    createInventoryEntryService,
    updateInventoryEntryService
} from '@inventario/Operacion/EntradasDeInventario/services/inventoryEntriesService'
import {
    mapInventoryEntry,
    mapWarehouse,
    mapSupplier,
    mapInventoryEntryRequest,
    mapProduct,
    mapProductDTO,
    mapProductoAC,
    mapTipomovimientoResponse
} from '@inventario/Operacion/EntradasDeInventario/composables/mappingInventoryEntries'
import {
    InventoryEntryRequest,
    WarehouseDTO,
    SupplierDTO,
    ProductoACResponseDTO,
    TipomovimientoResponseDTO
} from '@inventario/Operacion/EntradasDeInventario/types/inventoryEntriesTypes'
import useInventoryEntriesStore from '@inventario/Operacion/EntradasDeInventario/store/useInventoryEntriesStore'

import { getProductoByName as getProductoByNameService } 
from '@inventario/Operacion/EntradasDeInventario/services/inventoryEntriesService'

import { GetListaByClasificacion as GetListaByClasificacionService } 
from '@inventario/Operacion/EntradasDeInventario/services/inventoryEntriesService'

// import {ProductoACResponse } from '@inventario/Operacion/EntradasDeInventario/types/inventoryEntriesTypes'
// import { data } from '@/navbar/Exportar/data/data'

export const useInventoryEntriesActions = () => {
    const inventoryEntriesStore = useInventoryEntriesStore()

    const getInventoryEntries = async (page: number, pageSize: number) => {
        const response = await getInventoryEntriesService(page, pageSize)
        return {
            items: response.data.items.map(mapInventoryEntry),
            total: response.data.totalItems
        }
    }

    const getInventoryEntryById = async (entryId: number): Promise<any> => {
        const response = await getInventoryEntyByIdService(entryId)
        const {
            id,
            idAlmacen,
            idProveedor,
            fechaEntrada,
            documentoReferencia,
            idEstado,
            idTipoMovimiento,
            observaciones,
            detalles
        } = response
        inventoryEntriesStore.setData({
            id: id,
            warehouseId: idAlmacen,
            supplierId: idProveedor,
            date: fechaEntrada,
            observations: observaciones,
            referenceDocument: documentoReferencia,
            movementTypeId: idTipoMovimiento,
            stateId: idEstado
        })
        detalles?.forEach((product) => {
            const result = mapProductDTO(product)
            inventoryEntriesStore.addProduct(result)
        })
    }

    const getWarehouses = async (): Promise<WarehouseDTO[]> => {
        const response = await getWarehousesService()
        return response.items.map(mapWarehouse)
    }

    const getSuppliers = async (): Promise<SupplierDTO[]> => {
        const response = await getSuppliersService()
        return response.items.map(mapSupplier)
    }

    const getProductsBySearch = async (
        searchWord: string,
        limit: number,
        pageNumber: number
    ): Promise<any> => {
        const response = await getProductsBySearchService(searchWord, limit, pageNumber)
        return response
    }

    const createInventoryEntry = async (data: InventoryEntryRequest) => {
        const model = mapInventoryEntryRequest(data)
        model.detalles = inventoryEntriesStore.addedProducts.map(mapProduct)
        const response = await createInventoryEntryService(model)

        return {
            message: response.message,
            status: response.success ? 'success' : 'error',
            data: response.data
        }
    }

    const getProductoByNameAction = async (name: string): Promise<ProductoACResponseDTO[]> => {
        const response = await getProductoByNameService(name);
        if (!response || !Array.isArray(response.productos)) {
            console.warn("Productos no encontrados o formato incorrecto", response);
            return [];
        }
        return response.productos.map(mapProductoAC);
    };

    const GetListaByClasificacionAction = async (id: number): Promise<TipomovimientoResponseDTO[]> => {
        const response = await GetListaByClasificacionService(id)
        return response.map(mapTipomovimientoResponse)
    }

    const updateInventoryEntry = async (data: InventoryEntryRequest) => {
        console.log(data)

        // const model = mapInventoryEntryRequest(data)
        // model.products = inventoryEntriesStore.addedProducts.map(mapProduct)
        // const id = inventoryEntriesStore.selectedInventoryEntry?.id
        // const response = await updateInventoryEntryService(model, id)
        // return {
        //     message: response.message,
        //     status: response.success ? 'success' : 'error',
        //     data: response.data
        // }
    }

    return {
        getInventoryEntries,
        getInventoryEntryById,
        getWarehouses,
        getSuppliers,
        getProductsBySearch,
        createInventoryEntry,
        updateInventoryEntry,
        getProductoByNameAction,
        GetListaByClasificacionAction
    }
}
