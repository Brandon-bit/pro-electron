import type {
    IncidenceTypeType,
    IncidenceTypeResponseType,
    IncidenceTypeFormType
} from '@/modules/RRHH/TipoIncidencias/types/incidenceTypeTypes'

export const mapIncidenceType = (data: IncidenceTypeResponseType): IncidenceTypeType => ({
    id: data.id,
    name: data.nombre,
    parentCategoryId: data.idCategoriaPadre,
    parentCategoryName: data.nombreCategoriaPadre,
    description: data.descripcion,
    requiresDateRange: data.requiereRangoFechas,
    requiresHours: data.requiereHoras,
    requiresJustification: data.requiereJustificacion,
    status: data.activo,
    creationDate: data.fechaCreacion
})

export const mapIncidenceTypeRequest = (data: IncidenceTypeFormType) => ({
    nombre: data.name,
    idCategoriaPadre: data.parentCategoryId,
    descripcion: data.description,
    requiereRangoFechas: data.requiresDateRange,
    requiereHoras: data.requiresHours,
    requiereJustificacion: data.requiresJustification,
    activo: data.status
})
