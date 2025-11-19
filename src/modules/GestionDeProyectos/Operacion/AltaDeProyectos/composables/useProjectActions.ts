import type {
  ProjectFormType,
  ProjectType,
} from '@/modules/GestionDeProyectos/Operacion/AltaDeProyectos/types/projectTypes'
import useProjectStore from '@/modules/GestionDeProyectos/Operacion/AltaDeProyectos/store/projectStore'
import { projectService } from '@/modules/GestionDeProyectos/Operacion/AltaDeProyectos/services/projectService'
import {
  mapProjectResponse,
  mapProjectRequest,
} from '@/modules/GestionDeProyectos/Operacion/AltaDeProyectos/composables/mappingProjectData'
import { showNotification } from '@/utils/toastNotifications'

export const useProjectActions = () => {
  const projectStore = useProjectStore()

  /**
   * Load all form data options (classifications, areas, leaders, etc.)
   */
  const loadFormData = async () => {
    try {
      projectStore.isLoading = true
      const response = await projectService.getProjectFormDataService()
      projectStore.setFormDataOptions(response.data)
    } catch (error) {
      console.error(error)
      showNotification('Error al cargar los datos del formulario', 'error')
    } finally {
      projectStore.isLoading = false
    }
  }

  /**
   * Load category options for a specific area
   */
  const loadCategoriesByArea = async (areaId: number) => {
    try {
      projectStore.isLoadingCategories = true
      projectStore.clearCategories()
      const response = await projectService.getCategoryOptionsByAreaService(areaId)
      projectStore.setCategories(response.data)
    } catch (error) {
      console.error(error)
      showNotification('Error al cargar las categorías', 'error')
    } finally {
      projectStore.isLoadingCategories = false
    }
  }

  /**
   * Load parent project options when user selects subproject
   */
  const loadParentProjects = async () => {
    try {
      projectStore.isLoadingParentProjects = true
      const response = await projectService.getParentProjectOptionsService()
      projectStore.setParentProjects(response.data)
    } catch (error) {
      console.error(error)
      showNotification('Error al cargar los proyectos padre', 'error')
    } finally {
      projectStore.isLoadingParentProjects = false
    }
  }

  /**
   * Load template options when user opens templates modal
   */
  const loadTemplates = async () => {
    try {
      projectStore.isLoadingTemplates = true
      const response = await projectService.getTemplateOptionsService()
      projectStore.setTemplates(response.data)
    } catch (error) {
      console.error(error)
      showNotification('Error al cargar las plantillas', 'error')
    } finally {
      projectStore.isLoadingTemplates = false
    }
  }

  /**
   * Create a new project
   */
  const createProject = async (
    data: ProjectFormType
  ): Promise<{ message: string; status: string; data: ProjectType | null }> => {
    try {
      const payload = mapProjectRequest(data)
      console.log(payload)
      const response = await projectService.createProjectService(payload)
      const mapped = mapProjectResponse(response.data)
      showNotification('Proyecto creado exitosamente', 'success')
      return {
        message: response.message,
        status: response.success ? 'success' : 'error',
        data: mapped,
      }
    } catch (error) {
      console.error(error)
      showNotification('Error al crear el proyecto', 'error')
      return { message: 'Error al crear el proyecto', status: 'error', data: null }
    }
  }

  /**
   * Save project to localStorage (for offline/backup purposes)
   */
  const saveToLocalStorage = (project: ProjectType) => {
    try {
      const projects = JSON.parse(localStorage.getItem('projects') || '[]')
      projects.push(project)
      localStorage.setItem('projects', JSON.stringify(projects))
    } catch (error) {
      console.error('Error saving to localStorage:', error)
    }
  }

  return {
    loadFormData,
    loadCategoriesByArea,
    loadParentProjects,
    loadTemplates,
    createProject,
    saveToLocalStorage,
  }
}
