// Backend response type (español)
export type FixedAsset = {
    id: string
    descripcion: string
    marca: string
    modelo: string
    numeroSerie: string
    fechaAdquisicion: string
    proveedor: string
    factura: string
    valorOriginal: number
    vidaUtil: number
    cuentaContable: string
    ubicacionFisica: string
    area: string
    responsable: string
    notas: string
    estatus: 'Activo' | 'Dado de baja'
    fechaCreacion: Date
}

// Frontend DTO type (inglés)
export type FixedAssetDTO = {
    id?: string
    description: string
    brand: string
    model: string
    serialNumber: string
    acquisitionDate: string
    supplier: string
    invoice: string
    originalValue: number
    usefulLife: number
    accountingAccount: string
    physicalLocation: string
    area: string
    responsible: string
    notes: string
    status: 'Activo' | 'Dado de baja'
    creationDate?: Date
}

// Form type for create/update
export type FixedAssetFormDTO = {
    description: string
    brand: string
    model: string
    serialNumber: string
    acquisitionDate: string
    supplier: string
    invoice: string
    originalValue: number
    usefulLife: number
    accountingAccount: string
    physicalLocation: string
    area: string
    responsible: string
    notes: string
    status: 'Activo' | 'Dado de baja'
}

// Request type to backend
export type FixedAssetRequest = {
    id?: string
    descripcion: string
    marca: string
    modelo: string
    numeroSerie: string
    fechaAdquisicion: string
    proveedor: string
    factura: string
    valorOriginal: number
    vidaUtil: number
    cuentaContable: string
    ubicacionFisica: string
    area: string
    responsable: string
    notas: string
    estatus: 'Activo' | 'Dado de baja'
}

// Select option type for dropdowns
export type SelectOptionDTO = {
    id: number | string
    label: string
}
