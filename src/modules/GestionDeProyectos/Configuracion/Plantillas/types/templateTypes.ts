// Tipos internos para plantillas, etapas y actividades

export type TemplateActivityType = {
  id: number
  stageId: number
  dependencyId: number
  name: string
  duration: number
  order: number
  active: boolean
}

export type TemplateStageType = {
  id: number
  templateId: number
  name: string
  order: number
  activities: TemplateActivityType[]
  active: boolean
}

export type TemplateType = {
  id: number
  name: string
  objective: string
  scope: string
  stages: TemplateStageType[]
  active: boolean
}

export type TemplateOptionType = {
  id: number
  label: string
}

// Tipos de respuesta API

export type TemplateActivityResponseType = {
  dni: number
  dniEtapa: number
  dniDependencia: number
  nombre: string
  duracion: number
  psn: number
  activo: boolean
}

export type TemplateStageResponseType = {
  dni: number
  dniPlantilla: number
  nombre: string
  psn: number
  actividades: TemplateActivityResponseType[]
  activo: boolean
}

export type TemplateResponseType = {
  dni: number
  nombre: string
  objetivo: string
  alcance: string
  etapas: TemplateStageResponseType[]
  activo: boolean
}

export type TemplateOptionResponseType = {
  dni: number
  label: string
}

// Tipos de request API

export type TemplateRequestType = {
  dni?: number | null
  nombre: string
  objetivo: string
  alcance: string
  psn?: number
  etapas?: TemplateStageResponseType[]
  activo: boolean
}

export type TemplateStageRequestType = {
  dni?: number | null
  dniPlantilla: number
  nombre: string
  psn: number
  actividades?: TemplateActivityResponseType[]
  activo: boolean
}

export type TemplateActivityRequestType = {
  dni?: number | null
  dniEtapa: number
  dniDependencia: number
  nombre: string
  duracion: number
  psn: number
  activo: boolean
}

// Tipos de formulario (para vee-validate)

export type TemplateFormType = {
  name: string
  objective: string
  scope: string
  active: boolean
}

export type TemplateStageFormType = {
  templateId: number
  name: string
  active: boolean
}

export type TemplateActivityFormType = {
  stageId: number
  dependencyId: number
  name: string
  duration: number
  active: boolean
}
