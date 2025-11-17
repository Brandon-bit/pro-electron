import axiosApiInstance from '@/api/axiosApiInstance'
import type {
  TemplateResponseType,
  TemplateOptionResponseType,
  TemplateRequestType,
  TemplateStageRequestType,
  TemplateStageResponseType,
  TemplateActivityRequestType,
  TemplateActivityResponseType,
} from '../types/templateTypes'

const BASE_URL = '/gestion-de-proyectos'

// Servicios para plantillas

export const getTemplateOptions = async () => {
  const response = await axiosApiInstance.get<{
    success: boolean
    message: string
    data: TemplateOptionResponseType[]
  }>(`${BASE_URL}/plantillas`)
  return response.data
}

export const getTemplateById = async (id: number) => {
  const response = await axiosApiInstance.get<{
    success: boolean
    message: string
    data: TemplateResponseType
  }>(`${BASE_URL}/plantillas/${id}`)
  return response.data
}

export const createTemplate = async (template: TemplateRequestType) => {
  const response = await axiosApiInstance.post<{
    success: boolean
    message: string
    data: TemplateResponseType
  }>(`${BASE_URL}/plantillas`, template)
  return response.data
}

export const updateTemplate = async (template: TemplateRequestType) => {
  const response = await axiosApiInstance.put<{
    success: boolean
    message: string
    data: boolean
  }>(`${BASE_URL}/plantillas`, template)
  return response.data
}

export const deleteTemplate = async (id: number) => {
  const response = await axiosApiInstance.delete<{
    success: boolean
    message: string
    data: { totalItems: number }
  }>(`${BASE_URL}/plantillas/${id}`)
  return response.data
}

// Servicios para etapas

export const createTemplateStage = async (stage: TemplateStageRequestType) => {
  const response = await axiosApiInstance.post<{
    success: boolean
    message: string
    data: TemplateStageResponseType
  }>(`${BASE_URL}/plantilla-etapas`, stage)
  return response.data
}

export const updateTemplateStage = async (stage: TemplateStageRequestType) => {
  const response = await axiosApiInstance.put<{
    success: boolean
    message: string
    data: boolean
  }>(`${BASE_URL}/plantilla-etapas`, stage)
  return response.data
}

export const deleteTemplateStage = async (id: number) => {
  const response = await axiosApiInstance.delete<{
    success: boolean
    message: string
    data: { totalItems: number }
  }>(`${BASE_URL}/plantilla-etapas/${id}`)
  return response.data
}

// Servicios para actividades

export const createTemplateActivity = async (activity: TemplateActivityRequestType) => {
  const response = await axiosApiInstance.post<{
    success: boolean
    message: string
    data: TemplateActivityResponseType
  }>(`${BASE_URL}/plantilla-actividades`, activity)
  return response.data
}

export const updateTemplateActivity = async (activity: TemplateActivityRequestType) => {
  const response = await axiosApiInstance.put<{
    success: boolean
    message: string
    data: boolean
  }>(`${BASE_URL}/plantilla-actividades`, activity)
  return response.data
}

export const deleteTemplateActivity = async (id: number) => {
  const response = await axiosApiInstance.delete<{
    success: boolean
    message: string
    data: { totalItems: number }
  }>(`${BASE_URL}/plantilla-actividades/${id}`)
  return response.data
}
