export type SupplierType = {
    id?: number
    IdDireccion?: number
    socialReason: string
    comercialName: string
    rfc?: string
    email: string
    contact: string
    phone: string
    webSite: string
    payConditions: string
    idUser: string
    creationDate?: string
    updateDate?: string
    active: boolean
    eliminado?: string
}

export type ProveedorResponseType = {
    id?: number
    idDireccion: number
    razonSocial: string
    nombreComercial: string
    rfc: string
    correo: string
    contacto: string
    telefono: string
    sitioWeb: string
    condicionesPago: string
    fechaCreacion: string
    fechaActualizacion: string
    activo: boolean
    eliminado: string
}

export type ProveedorRequestType = {
    idDireccion: number
    razonSocial: string
    nombreComercial: string
    rfc: string
    correo: string
    contacto: string
    telefono: string
    sitioWeb: string
    condicionesPago: string
    idUsuario: string
    fechaCreacion: string
    fechaActualizacion: string
    activo: boolean
    eliminado: string
}

export interface SupplierFormType {
    id?: number
    IdDireccion?: number
    razonSocial: string
    nombreComercial: string
    rfc?: string
    correo: string
    contacto: string
    telefono: string
    sitioWeb?: string
    condicionesPago: string
    idUsuario: string
    Activo: boolean
    FechaCreacion?: string 
}
