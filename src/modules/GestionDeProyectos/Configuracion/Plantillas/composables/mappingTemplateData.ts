import type {
  TemplateType,
  TemplateStageType,
  TemplateActivityType,
  TemplateOptionType,
  TemplateResponseType,
  TemplateStageResponseType,
  TemplateActivityResponseType,
  TemplateOptionResponseType,
  TemplateRequestType,
  TemplateStageRequestType,
  TemplateActivityRequestType,
  TemplateFormType,
  TemplateStageFormType,
  TemplateActivityFormType,
} from '../types/templateTypes'

// Mapeo de respuestas API a tipos internos

export const mapTemplateActivityResponseToInternal = (
  response: TemplateActivityResponseType
): TemplateActivityType => ({
  id: response.dni,
  stageId: response.dniEtapa,
  dependencyId: response.dniDependencia,
  name: response.nombre,
  duration: response.duracion,
  order: response.psn,
  active: response.activo,
})

export const mapTemplateStageResponseToInternal = (
  response: TemplateStageResponseType
): TemplateStageType => ({
  id: response.dni,
  templateId: response.dniPlantilla,
  name: response.nombre,
  order: response.psn,
  activities: response.actividades.map(mapTemplateActivityResponseToInternal),
  active: response.activo,
})

export const mapTemplateResponseToInternal = (
  response: TemplateResponseType
): TemplateType => ({
  id: response.dni,
  name: response.nombre,
  objective: response.objetivo,
  scope: response.alcance,
  stages: response.etapas.map(mapTemplateStageResponseToInternal),
  active: response.activo,
})

export const mapTemplateOptionResponseToInternal = (
  response: TemplateOptionResponseType
): TemplateOptionType => ({
  id: response.dni,
  label: response.label,
})

// Mapeo de formularios a requests API

export const mapTemplateFormToRequest = (
  form: TemplateFormType,
  id?: number
): TemplateRequestType => ({
  dni: id ?? null,
  nombre: form.name,
  objetivo: form.objective,
  alcance: form.scope,
  activo: form.active,
})

export const mapTemplateStageFormToRequest = (
  form: TemplateStageFormType,
  order: number,
  id?: number
): TemplateStageRequestType => ({
  dni: id ?? null,
  dniPlantilla: form.templateId,
  nombre: form.name,
  psn: order,
  activo: form.active,
})

export const mapTemplateActivityFormToRequest = (
  form: TemplateActivityFormType,
  order: number,
  id?: number
): TemplateActivityRequestType => ({
  dni: id ?? null,
  dniEtapa: form.stageId,
  dniDependencia: form.dependencyId,
  nombre: form.name,
  duracion: form.duration,
  psn: order,
  activo: form.active,
})

// Mapeo de tipos internos a requests API (para actualizaciones)

export const mapTemplateToRequest = (template: TemplateType): TemplateRequestType => ({
  dni: template.id,
  nombre: template.name,
  objetivo: template.objective,
  alcance: template.scope,
  psn: 0, // Este campo puede necesitar ajuste según la lógica de negocio
  etapas: template.stages.map(mapTemplateStageToResponse),
  activo: template.active,
})

export const mapTemplateStageToRequest = (
  stage: TemplateStageType
): TemplateStageRequestType => ({
  dni: stage.id,
  dniPlantilla: stage.templateId,
  nombre: stage.name,
  psn: stage.order,
  actividades: stage.activities.map(mapTemplateActivityToResponse),
  activo: stage.active,
})

export const mapTemplateActivityToRequest = (
  activity: TemplateActivityType
): TemplateActivityRequestType => ({
  dni: activity.id,
  dniEtapa: activity.stageId,
  dniDependencia: activity.dependencyId,
  nombre: activity.name,
  duracion: activity.duration,
  psn: activity.order,
  activo: activity.active,
})

// Mapeo de tipos internos a tipos de respuesta (para requests que incluyen objetos completos)

export const mapTemplateStageToResponse = (
  stage: TemplateStageType
): TemplateStageResponseType => ({
  dni: stage.id,
  dniPlantilla: stage.templateId,
  nombre: stage.name,
  psn: stage.order,
  actividades: stage.activities.map(mapTemplateActivityToResponse),
  activo: stage.active,
})

export const mapTemplateActivityToResponse = (
  activity: TemplateActivityType
): TemplateActivityResponseType => ({
  dni: activity.id,
  dniEtapa: activity.stageId,
  dniDependencia: activity.dependencyId,
  nombre: activity.name,
  duracion: activity.duration,
  psn: activity.order,
  activo: activity.active,
})
