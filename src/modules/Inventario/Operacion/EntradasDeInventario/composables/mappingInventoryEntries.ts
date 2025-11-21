import {
    Warehouse,
    WarehouseDTO,
    Supplier,
    SupplierAll,
    SupplierDTO,
    InventoryEntry,
    InventoryEntryDTO,
    InventoryEntryRequest,
    InventoryEntryRequestPayload,
    Product,
    ProductPayload,
    ProductoACResponse,
    ProductoACResponseDTO,
    TipomovimientoResponse,
    TipomovimientoResponseDTO
} from '@inventario/Operacion/EntradasDeInventario/types/inventoryEntriesTypes'

export const mapWarehouse = (data: Warehouse): WarehouseDTO => ({
    id: data.id,
    name: data.nombre
})

export const mapSupplier = (data: SupplierAll): SupplierDTO => ({
    id: data.id,
    name: data.nombreComercial
})

export const mapInventoryEntry = (data: InventoryEntry): InventoryEntryDTO => ({
    id: data.id,
    warehouseId: data.idAlmacen,
    warehouseName: data.nombreAlmacen,
    supplierId: data.idProveedor,
    supplierName: data.nombreProveedor,
    date: data.fechaEntrada,
    referenceDocument: data.documentoReferencia,
    observations: data.observaciones,
    movementTypeId: data.idTipoMovimiento,
    movementType: data.nombreTipoMovimiento,
    stateId: data.idEstado,
    state: data.nombreEstado
})

export const mapInventoryEntryRequest = (
    data: InventoryEntryRequest
): InventoryEntryRequestPayload => ({
    idAlmacen: data.warehouseId,
    idProveedor: data.supplierId,
    fechaEntrada: data.date,
    documentoReferencia: data.referenceDocument,
    observaciones: data.observations,
    idEstado: data.stateId,
    idTipoMovimiento: data.movementTypeId
})

export const mapProduct = (data: Product): ProductPayload => ({
    id: data.id,
    idProducto: data.productId,
    cantidad: data.quantity,
    costoUnitario: data.unitPrice,
    subtotal: data.subtotal,
    lote: data.batch,
    fechaExpiracion: data.expirationDate
})

export const mapProductDTO = (data: ProductPayload): Product => ({
    id: data.id,
    productId: data.idProducto,
    quantity: data.cantidad,
    unitPrice: data.costoUnitario,
    subtotal: data.subtotal,
    batch: data.lote,
    expirationDate: data.fechaExpiracion
})

export const mapProductoAC = (data: ProductoACResponse): ProductoACResponseDTO => ({
    id: data.id,
    name: data.nombre
})

export const mapTipomovimientoResponse = (data: TipomovimientoResponse): TipomovimientoResponseDTO => ({
    id: data.id,
    name: data.nombre
})