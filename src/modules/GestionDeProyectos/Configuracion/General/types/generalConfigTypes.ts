// Tipos para configuración general de proyectos: áreas, categorías y clasificaciones

export type ProjectCategoryType = {
  id: number
  areaId: number
  name: string
  active: boolean
}

export type ProjectAreaType = {
  id: number
  name: string
  description: string
  active: boolean
  categories: ProjectCategoryType[]
}

export type ProjectClassificationType = {
  id: number
  name: string
  description: string
  active: boolean
}

// Tipos de respuesta API

export type ProjectCategoryResponseType = {
  dni: number
  dniArea: number
  nombre: string
  activo: boolean
}

export type ProjectAreaResponseType = {
  dni: number
  nombre: string
  descripcion: string
  categorias: { dni: number; nombre: string }[]
  activo?: boolean
}

export type ProjectClassificationResponseType = {
  dni: number
  nombre: string
  descripcion: string
  activo: boolean
}

// Tipos de request API

export type ProjectAreaRequestType = {
  dni?: number
  nombre: string
  descripcion: string
  activo: boolean
}

export type ProjectCategoryRequestType = {
  dni?: number
  dniArea: number
  nombre: string
  activo: boolean
}

export type ProjectClassificationRequestType = {
  dni?: number
  nombre: string
  descripcion: string
  activo: boolean
}

// Tipos de formulario (para vee-validate)

export type ProjectAreaFormType = {
  name: string
  description?: string
  active: boolean
}

export type ProjectCategoryFormType = {
  areaId: number
  name: string
  active: boolean
}

export type ProjectClassificationFormType = {
  name: string
  description?: string
  active: boolean
}

// Lesson Learned Category Types
export type LessonLearnedCategoryType = {
  id: number
  name: string
  description: string
  active: boolean
}

export type LessonLearnedCategoryResponseType = {
  dni: number
  nombre: string
  descripcion: string
  activo: boolean
}

export type LessonLearnedCategoryRequestType = {
  dni?: number
  nombre: string
  descripcion: string
  activo: boolean
}

export type LessonLearnedCategoryFormType = {
  name: string
  description?: string
  active: boolean
}
