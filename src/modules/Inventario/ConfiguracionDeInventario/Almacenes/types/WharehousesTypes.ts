// Tipos frontend
export type WarehouseType = {
    id?: number
    IdDireccion?: number
    IdTipoAlmacen: number
    name: string
    email?: string
    responsible?: string
    totalCapacity?: number
    isCentralWarehouse: boolean
    zone?: string
    phone?: string
    mobile?: string
    idUser: string
    creationDate?: string
    updateDate?: string
    active: boolean
    deleted?: string
}

// Tipos backend (response)
export type WarehouseResponseType = {
    id?: number
    idDireccion: number
    idTipoalmacen: number
    nombre: string
    correo?: string
    responsable?: string
    capacidadTotal?: number
    esAlmacenCentral: boolean
    zona?: string
    telefono?: string
    celular?: string
    fechaCreacion: string
    fechaActualizacion: string
    activo: boolean
    eliminado: string
}

// Tipos backend (request)
export type WarehouseRequestType = {
    idDireccion: number
    idTipoalmacen: number
    nombre: string
    correo?: string
    responsable?: string
    capacidadTotal?: number
    esAlmacenCentral: boolean
    zona?: string
    telefono?: string
    celular?: string
    idUsuario: string
    fechaCreacion: string
    fechaActualizacion: string
    activo: boolean
    eliminado: string
}

// Tipos de formulario (frontend)
export interface WarehouseFormType {
    id?: number
    IdDireccion?: number      
    idTipoalmacen: number     
    nombre: string
    correo?: string
    responsable?: string
    capacidadTotal?: number
    esAlmacenCentral: boolean
    zona?: string
    telefono?: string
    celular?: string
    idUsuario: string
    Active: boolean          // ⚠ importante, solo frontend
    CreationDate?: string
}
