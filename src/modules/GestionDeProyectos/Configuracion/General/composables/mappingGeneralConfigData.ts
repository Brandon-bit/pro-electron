import type {
  ProjectAreaType,
  ProjectAreaResponseType,
  ProjectAreaRequestType,
  ProjectCategoryType,
  ProjectCategoryResponseType,
  ProjectCategoryRequestType,
  ProjectClassificationType,
  ProjectClassificationResponseType,
  ProjectClassificationRequestType,
  ProjectAreaFormType,
  ProjectCategoryFormType,
  ProjectClassificationFormType,
  LessonLearnedCategoryType,
  LessonLearnedCategoryResponseType,
  LessonLearnedCategoryRequestType,
  LessonLearnedCategoryFormType,
} from '@/modules/GestionDeProyectos/Configuracion/General/types/generalConfigTypes'

export const mapAreaResponse = (model: ProjectAreaResponseType): ProjectAreaType => {
  return {
    id: model.dni,
    name: model.nombre,
    description: model.descripcion ?? '',
    active: model.activo ?? true,
    categories: (model.categorias ?? []).map((cat) => ({
      id: cat.dni,
      areaId: model.dni,
      name: cat.nombre,
      active: true,
    })),
  }
}

export const mapAreaRequest = (id: number | undefined, form: ProjectAreaFormType): ProjectAreaRequestType => {
  return {
    dni: id,
    nombre: form.name,
    descripcion: form.description ?? '',
    activo: form.active,
  }
}

export const mapCategoryResponse = (model: ProjectCategoryResponseType): ProjectCategoryType => {
  return {
    id: model.dni,
    areaId: model.dniArea,
    name: model.nombre,
    active: model.activo,
  }
}

export const mapCategoryRequest = (
  id: number | undefined,
  form: ProjectCategoryFormType
): ProjectCategoryRequestType => {
  return {
    dni: id,
    dniArea: form.areaId,
    nombre: form.name,
    activo: form.active,
  }
}

export const mapClassificationResponse = (
  model: ProjectClassificationResponseType
): ProjectClassificationType => {
  return {
    id: model.dni,
    name: model.nombre,
    description: model.descripcion ?? '',
    active: model.activo,
  }
}

export const mapClassificationRequest = (
  id: number | undefined,
  form: ProjectClassificationFormType
): ProjectClassificationRequestType => {
  return {
    dni: id,
    nombre: form.name,
    descripcion: form.description ?? '',
    activo: form.active,
  }
}

export const mapLessonLearnedCategoryResponse = (
  model: LessonLearnedCategoryResponseType
): LessonLearnedCategoryType => {
  return {
    id: model.dni,
    name: model.nombre,
    description: model.descripcion ?? '',
    active: model.activo,
  }
}

export const mapLessonLearnedCategoryRequest = (
  id: number | undefined,
  form: LessonLearnedCategoryFormType
): LessonLearnedCategoryRequestType => {
  return {
    dni: id,
    nombre: form.name,
    descripcion: form.description ?? '',
    activo: form.active,
  }
}
