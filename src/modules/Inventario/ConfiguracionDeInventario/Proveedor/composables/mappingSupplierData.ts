import { 
    ProveedorResponseType, 
    SupplierType, 
    SupplierFormType, 
    ProveedorRequestType
} from "@inventario/ConfiguracionDeInventario/Proveedor/types/supplierTypes"

export const mapProveedor = (model: ProveedorResponseType): SupplierType => {
    return {
        id: model.id,
        IdDireccion: model.idDireccion,
        socialReason: model.razonSocial ?? "",
        comercialName: model.nombreComercial ?? "",
        rfc: model.rfc ?? "",
        email: model.correo ?? "",
        contact: model.contacto ?? "",
        phone: model.telefono ?? "",
        webSite: model.sitioWeb ?? "",
        payConditions: model.condicionesPago ?? "",
        idUser: "", 
        creationDate: model.fechaCreacion ?? "",
        updateDate: model.fechaActualizacion ?? "",
        active: model.activo ?? true, 
        eliminado: model.eliminado ?? "0"
    }
}

export const mapProveedorRequest = (form: SupplierFormType): ProveedorRequestType => {
    return {
        idDireccion: form.IdDireccion ?? 0,
        razonSocial: form.razonSocial,
        nombreComercial: form.nombreComercial,
        rfc: form.rfc ?? "",
        correo: form.correo,
        contacto: form.contacto,
        telefono: form.telefono,
        sitioWeb: form.sitioWeb ?? "",
        condicionesPago: form.condicionesPago,
        idUsuario: form.idUsuario,
        fechaCreacion: new Date().toISOString(), // siempre nueva fecha
        fechaActualizacion: new Date().toISOString(),
        activo: form.Activo,
        eliminado: form.Activo ? "0" : "1"
    }
}

