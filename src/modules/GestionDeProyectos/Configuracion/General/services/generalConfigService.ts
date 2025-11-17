import axiosApiInstance from '@/api/axiosApiInstance'
import type {
  ProjectAreaResponseType,
  ProjectAreaRequestType,
  ProjectCategoryResponseType,
  ProjectCategoryRequestType,
  ProjectClassificationResponseType,
  ProjectClassificationRequestType,
} from '@/modules/GestionDeProyectos/Configuracion/General/types/generalConfigTypes'
import type { ApiResponseType } from '@/shared/types/apiResponseType'

export const generalConfigService = {
  // Áreas
  async getAreas(): Promise<ApiResponseType<ProjectAreaResponseType[]>> {
    const response = await axiosApiInstance.get(
      '/gestion-de-proyectos/configuracion-general/area'
    )
    return response.data
  },

  async createArea(data: ProjectAreaRequestType): Promise<ApiResponseType<ProjectAreaResponseType>> {
    const response = await axiosApiInstance.post(
      '/gestion-de-proyectos/configuracion-general/area',
      data
    )
    return response.data
  },

  async updateArea(data: ProjectAreaRequestType): Promise<ApiResponseType<boolean>> {
    const response = await axiosApiInstance.put(
      '/gestion-de-proyectos/configuracion-general/area',
      data
    )
    return response.data
  },

  async deleteArea(id: number): Promise<ApiResponseType<{ totalItems: number }>> {
    const response = await axiosApiInstance.delete(
      `/gestion-de-proyectos/configuracion-general/area/${id}`
    )
    return response.data
  },

  // Categorías
  async createCategory(
    data: ProjectCategoryRequestType
  ): Promise<ApiResponseType<ProjectCategoryResponseType>> {
    const response = await axiosApiInstance.post(
      '/gestion-de-proyectos/configuracion-general/categoria',
      data
    )
    return response.data
  },

  async updateCategory(data: ProjectCategoryRequestType): Promise<ApiResponseType<boolean>> {
    const response = await axiosApiInstance.put(
      '/gestion-de-proyectos/configuracion-general/categoria',
      data
    )
    return response.data
  },

  async deleteCategory(id: number): Promise<ApiResponseType<{ totalItems: number }>> {
    const response = await axiosApiInstance.delete(
      `/gestion-de-proyectos/configuracion-general/categoria/${id}`
    )
    return response.data
  },

  // Clasificaciones
  async getClassifications(): Promise<ApiResponseType<ProjectClassificationResponseType[]>> {
    const response = await axiosApiInstance.get(
      '/gestion-de-proyectos/configuracion-general/clasificacion'
    )
    return response.data
  },

  async createClassification(
    data: ProjectClassificationRequestType
  ): Promise<ApiResponseType<ProjectClassificationResponseType>> {
    const response = await axiosApiInstance.post(
      '/gestion-de-proyectos/configuracion-general/clasificacion',
      data
    )
    return response.data
  },

  async updateClassification(
    data: ProjectClassificationRequestType
  ): Promise<ApiResponseType<boolean>> {
    const response = await axiosApiInstance.put(
      '/gestion-de-proyectos/configuracion-general/clasificacion',
      data
    )
    return response.data
  },

  async deleteClassification(id: number): Promise<ApiResponseType<{ totalItems: number }>> {
    const response = await axiosApiInstance.delete(
      `/gestion-de-proyectos/configuracion-general/clasificacion/${id}`
    )
    return response.data
  },
}
