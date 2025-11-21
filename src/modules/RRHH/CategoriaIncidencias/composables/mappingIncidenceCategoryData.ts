import type {
    IncidenceCategoryType,
    IncidenceCategoryResponseType,
    IncidenceCategoryFormType
} from '@/modules/RRHH/CategoriaIncidencias/types/incidenceCategoryTypes'

export const mapIncidenceCategory = (
    data: IncidenceCategoryResponseType
): IncidenceCategoryType => ({
    id: data.id,
    name: data.nombre,
    description: data.descripcion,
    status: data.activo,
    creationDate: data.fechaCreacion
})

export const mapIncidenceCategoryRequest = (data: IncidenceCategoryFormType) => ({
    nombre: data.name,
    descripcion: data.description,
    activo: data.status
})
