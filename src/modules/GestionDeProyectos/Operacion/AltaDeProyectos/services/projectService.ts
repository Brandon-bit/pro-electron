import axiosApiInstance from '@/api/axiosApiInstance'
import type { ApiResponseType } from '@/shared/types/apiResponseType'
import type {
  ProjectFormDataResponseType,
  CategoryOptionResponseType,
  ParentProjectOptionResponseType,
  TemplateOptionResponseType,
  ProjectRequestType,
  ProjectResponseType,
} from '@/modules/GestionDeProyectos/Operacion/AltaDeProyectos/types/projectTypes'

export const projectService = {
  /**
   * Get all the necessary information to register a new project.
   *
   * Endpoint: GET /gestion-de-proyectos/alta-de-proyecto
   *
   * @returns {Promise<ApiResponseType<ProjectFormDataResponseType>>}
   *   Response with all the options for the form (classifications, areas, leaders, sponsors, etc.)
   *
   * @example
   * const { data } = await getProjectFormDataService();
   * console.log(data.areas);
   *
   * @throws {AxiosError} If there is a network error or if the API returns an error.
   */
  async getProjectFormDataService(): Promise<ApiResponseType<ProjectFormDataResponseType>> {
    const response = await axiosApiInstance.get('/gestion-de-proyectos/alta-de-proyecto')
    return response.data
  },

  /**
   * Get category options for a specific area.
   *
   * Endpoint: GET /gestion-de-proyectos/configuracion-general/categoria/opciones
   *
   * @param {number} areaId
   *   The ID of the area to get categories for.
   *
   * @returns {Promise<ApiResponseType<CategoryOptionResponseType[]>>}
   *   Response with an array of category options.
   *
   * @example
   * const { data } = await getCategoryOptionsByAreaService(17);
   * console.log(data);
   *
   * @throws {AxiosError} If there is a network error or if the API returns an error.
   */
  async getCategoryOptionsByAreaService(
    areaId: number
  ): Promise<ApiResponseType<CategoryOptionResponseType[]>> {
    const response = await axiosApiInstance.get(
      '/gestion-de-proyectos/configuracion-general/categoria/opciones',
      {
        params: { dniArea: areaId },
      }
    )
    return response.data
  },

  /**
   * Get parent project options when user selects that the project is a subproject.
   *
   * Endpoint: GET /gestion-de-proyectos/alta-de-proyecto/proyectos-opciones
   *
   * @returns {Promise<ApiResponseType<ParentProjectOptionResponseType[]>>}
   *   Response with an array of parent project options.
   *
   * @example
   * const { data } = await getParentProjectOptionsService();
   * console.log(data);
   *
   * @throws {AxiosError} If there is a network error or if the API returns an error.
   */
  async getParentProjectOptionsService(): Promise<
    ApiResponseType<ParentProjectOptionResponseType[]>
  > {
    const response = await axiosApiInstance.get(
      '/gestion-de-proyectos/alta-de-proyecto/proyectos-opciones'
    )
    return response.data
  },

  /**
   * Get template options when user opens the templates modal.
   *
   * Endpoint: GET /gestion-de-proyectos/alta-de-proyecto/plantillas-opciones
   *
   * @returns {Promise<ApiResponseType<TemplateOptionResponseType[]>>}
   *   Response with an array of template options.
   *
   * @example
   * const { data } = await getTemplateOptionsService();
   * console.log(data);
   *
   * @throws {AxiosError} If there is a network error or if the API returns an error.
   */
  async getTemplateOptionsService(): Promise<
    ApiResponseType<TemplateOptionResponseType[]>
  > {
    const response = await axiosApiInstance.get(
      '/gestion-de-proyectos/alta-de-proyecto/plantillas-opciones'
    )
    return response.data
  },

  /**
   * Creates a new project by sending the project data to the API.
   *
   * Endpoint: POST /gestion-de-proyectos/alta-de-proyecto
   *
   * @param {ProjectRequestType} data
   *   The payload containing the project information to be created.
   *
   * @returns {Promise<ApiResponseType<ProjectResponseType>>}
   *   A promise resolving with the API response containing the created project details.
   *
   * @example
   * const payload = {
   *   nombre: "Implementación de nuevo sistema de gestión",
   *   dniPersonalizado: "PRJ-001",
   *   fechaInicio: "2025-11-01T00:00:00",
   *   fechaFin: "2026-03-30T00:00:00",
   *   presupuestoEstimado: 1250000.00,
   *   // ... rest of the fields
   * };
   *
   * const response = await createProjectService(payload);
   * console.log(response.data);
   *
   * @throws {AxiosError}
   *   Throws an error if the request fails or the API returns an error response.
   */
  async createProjectService(
    data: ProjectRequestType
  ): Promise<ApiResponseType<ProjectResponseType>> {
    const response = await axiosApiInstance.post('/gestion-de-proyectos/alta-de-proyecto', data)
    return response.data
  },
}
