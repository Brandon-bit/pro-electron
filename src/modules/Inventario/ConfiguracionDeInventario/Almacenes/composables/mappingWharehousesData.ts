import { WarehouseFormType, WarehouseRequestType, WarehouseResponseType, WarehouseType } from '../types/WharehousesTypes'

// Mapping backend → frontend
export const mapWarehouse = (model: WarehouseResponseType): WarehouseType => ({
    id: model.id,
    IdDireccion: model.idDireccion,
    IdTipoAlmacen: model.idTipoalmacen,
    name: model.nombre,
    email: model.correo,
    responsible: model.responsable,
    totalCapacity: model.capacidadTotal ?? 0,
    isCentralWarehouse: model.esAlmacenCentral,
    zone: model.zona,
    phone: model.telefono,
    mobile: model.celular,
    idUser: '', // si viene del backend, puedes mapearlo
    creationDate: model.fechaCreacion,
    updateDate: model.fechaActualizacion,
    active: model.activo ?? true,
    deleted: model.eliminado
})

export const mapWarehouseRequest = (form: WarehouseFormType, isEdit = false): WarehouseRequestType => {
  return {
    idDireccion: form.IdDireccion ?? 0,
    idTipoalmacen: form.idTipoalmacen,
    nombre: form.nombre,
    correo: form.correo ?? '',
    responsable: form.responsable ?? '',
    capacidadTotal: form.capacidadTotal ?? 0,
    esAlmacenCentral: form.esAlmacenCentral, // boolean según WarehouseRequestType
    zona: form.zona ?? '',
    telefono: form.telefono ?? '',
    celular: form.celular ?? '',
    idUsuario: form.idUsuario ?? '',
    fechaCreacion: isEdit ? form.CreationDate ?? new Date().toISOString() : new Date().toISOString(),
    fechaActualizacion: new Date().toISOString(),
    activo: form.Active, // boolean según WarehouseRequestType
    eliminado: form.Active ? '0' : '1' // string según WarehouseRequestType
  }
}


