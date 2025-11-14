import type { 
    FixedAsset,
    FixedAssetFormDTO, 
    FixedAssetDTO,
    FixedAssetRequest
} from '@/modules/Contabilidad/Contabilidad/ActivosFijos/types/fixedAssetsTypes'

/**
 * Mapea un activo fijo desde el formato del backend (español) al formato del frontend (inglés)
 */
export const mapFixedAsset = (model: FixedAsset): FixedAssetDTO => {
    return {
        id: model.id,
        description: model.descripcion,
        brand: model.marca,
        model: model.modelo,
        serialNumber: model.numeroSerie,
        acquisitionDate: model.fechaAdquisicion,
        supplier: model.proveedor,
        invoice: model.factura,
        originalValue: model.valorOriginal,
        usefulLife: model.vidaUtil,
        accountingAccount: model.cuentaContable,
        physicalLocation: model.ubicacionFisica,
        area: model.area,
        responsible: model.responsable,
        notes: model.notas,
        status: model.estatus,
        creationDate: model.fechaCreacion
    }
}

/**
 * Mapea un formulario de activo fijo desde el formato del frontend (inglés) al formato de request para el backend (español)
 */
export const mapFixedAssetRequest = (model: FixedAssetFormDTO): FixedAssetRequest => {
    return {
        descripcion: model.description,
        marca: model.brand,
        modelo: model.model,
        numeroSerie: model.serialNumber,
        fechaAdquisicion: model.acquisitionDate,
        proveedor: model.supplier,
        factura: model.invoice,
        valorOriginal: model.originalValue,
        vidaUtil: model.usefulLife,
        cuentaContable: model.accountingAccount,
        ubicacionFisica: model.physicalLocation,
        area: model.area,
        responsable: model.responsible,
        notas: model.notes,
        estatus: model.status
    }
}
