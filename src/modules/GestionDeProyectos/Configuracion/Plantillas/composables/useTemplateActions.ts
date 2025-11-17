import { useTemplateStore } from '../store/templateStore'
import { showNotification } from '@/utils/toastNotifications'
import * as templateService from '../services/templateService'
import {
  mapTemplateOptionResponseToInternal,
  mapTemplateResponseToInternal,
  mapTemplateFormToRequest,
  mapTemplateStageFormToRequest,
  mapTemplateActivityFormToRequest,
  mapTemplateToRequest,
  mapTemplateStageToRequest,
  mapTemplateActivityToRequest,
} from './mappingTemplateData'
import type {
  TemplateFormType,
  TemplateStageFormType,
  TemplateActivityFormType,
  TemplateType,
  TemplateStageType,
  TemplateActivityType,
} from '../types/templateTypes'

export const useTemplateActions = () => {
  const templateStore = useTemplateStore()

  // Acciones para plantillas

  const loadTemplateOptions = async () => {
    try {
      templateStore.setLoading(true)
      const response = await templateService.getTemplateOptions()
      
      if (response.success) {
        const templates = response.data.map(mapTemplateOptionResponseToInternal)
        templateStore.setTemplates(templates)
        
        // Si hay plantillas y no hay una activa, seleccionar la primera
        if (templates.length > 0 && !templateStore.activeTemplateId) {
          await loadTemplateById(templates[0].id)
        }
      }
    } catch (error) {
      console.error('Error al cargar opciones de plantillas:', error)
      showNotification('Error al cargar las plantillas', 'error')
    } finally {
      templateStore.setLoading(false)
    }
  }

  const loadTemplateById = async (id: number) => {
    try {
      templateStore.setLoading(true)
      const response = await templateService.getTemplateById(id)
      
      if (response.success) {
        const template = mapTemplateResponseToInternal(response.data)
        templateStore.setActiveTemplate(template)
      }
    } catch (error) {
      console.error('Error al cargar plantilla:', error)
      showNotification('Error al cargar la plantilla', 'error')
    } finally {
      templateStore.setLoading(false)
    }
  }

  const createTemplate = async (form: TemplateFormType) => {
    try {
      templateStore.setLoading(true)
      const request = mapTemplateFormToRequest(form)
      const response = await templateService.createTemplate(request)
      
      if (response.success) {
        showNotification('Plantilla creada exitosamente', 'success')
        
        // Recargar opciones de plantillas
        await loadTemplateOptions()
        
        // Cargar la plantilla recién creada
        const newTemplate = mapTemplateResponseToInternal(response.data)
        templateStore.setActiveTemplate(newTemplate)
        
        return true
      }
      return false
    } catch (error) {
      console.error('Error al crear plantilla:', error)
      showNotification('Error al crear la plantilla', 'error')
      return false
    } finally {
      templateStore.setLoading(false)
    }
  }

  const updateTemplate = async (template: TemplateType) => {
    try {
      templateStore.setLoading(true)
      const request = mapTemplateToRequest(template)
      const response = await templateService.updateTemplate(request)
      
      if (response.success) {
        showNotification('Plantilla actualizada exitosamente', 'success')
        
        // Recargar la plantilla actual
        await loadTemplateById(template.id)
        
        return true
      }
      return false
    } catch (error) {
      console.error('Error al actualizar plantilla:', error)
      showNotification('Error al actualizar la plantilla', 'error')
      return false
    } finally {
      templateStore.setLoading(false)
    }
  }

  const deleteTemplate = async (id: number) => {
    try {
      templateStore.setLoading(true)
      const response = await templateService.deleteTemplate(id)
      
      if (response.success) {
        showNotification('Plantilla eliminada exitosamente', 'success')
        
        // Limpiar plantilla activa si es la que se eliminó
        if (templateStore.activeTemplateId === id) {
          templateStore.clearActiveTemplate()
        }
        
        // Recargar opciones de plantillas
        await loadTemplateOptions()
        
        return true
      }
      return false
    } catch (error) {
      console.error('Error al eliminar plantilla:', error)
      showNotification('Error al eliminar la plantilla', 'error')
      return false
    } finally {
      templateStore.setLoading(false)
    }
  }

  // Acciones para etapas

  const createStage = async (form: TemplateStageFormType, order: number) => {
    try {
      templateStore.setLoading(true)
      const request = mapTemplateStageFormToRequest(form, order)
      const response = await templateService.createTemplateStage(request)
      
      if (response.success) {
        showNotification('Etapa creada exitosamente', 'success')
        
        // Recargar la plantilla actual
        if (templateStore.activeTemplateId) {
          await loadTemplateById(templateStore.activeTemplateId)
        }
        
        return true
      }
      return false
    } catch (error) {
      console.error('Error al crear etapa:', error)
      showNotification('Error al crear la etapa', 'error')
      return false
    } finally {
      templateStore.setLoading(false)
    }
  }

  const updateStage = async (stage: TemplateStageType, silent = false) => {
    try {
      if (!silent) {
        templateStore.setLoading(true)
      }
      const request = mapTemplateStageToRequest(stage)
      const response = await templateService.updateTemplateStage(request)
      
      if (response.success) {
        if (!silent) {
          showNotification('Etapa actualizada exitosamente', 'success')
          
          // Recargar la plantilla actual
          if (templateStore.activeTemplateId) {
            await loadTemplateById(templateStore.activeTemplateId)
          }
        }
        
        return true
      }
      return false
    } catch (error) {
      console.error('Error al actualizar etapa:', error)
      if (!silent) {
        showNotification('Error al actualizar la etapa', 'error')
      }
      throw error // Re-lanzar para manejar en batch
    } finally {
      if (!silent) {
        templateStore.setLoading(false)
      }
    }
  }

  const deleteStage = async (id: number) => {
    try {
      templateStore.setLoading(true)
      const response = await templateService.deleteTemplateStage(id)
      
      if (response.success) {
        showNotification('Etapa eliminada exitosamente', 'success')
        
        // Recargar la plantilla actual
        if (templateStore.activeTemplateId) {
          await loadTemplateById(templateStore.activeTemplateId)
        }
        
        return true
      }
      return false
    } catch (error) {
      console.error('Error al eliminar etapa:', error)
      showNotification('Error al eliminar la etapa', 'error')
      return false
    } finally {
      templateStore.setLoading(false)
    }
  }

  // Acciones para actividades

  const createActivity = async (form: TemplateActivityFormType, order: number) => {
    try {
      templateStore.setLoading(true)
      const request = mapTemplateActivityFormToRequest(form, order)
      const response = await templateService.createTemplateActivity(request)
      
      if (response.success) {
        showNotification('Actividad creada exitosamente', 'success')
        
        // Recargar la plantilla actual
        if (templateStore.activeTemplateId) {
          await loadTemplateById(templateStore.activeTemplateId)
        }
        
        return true
      }
      return false
    } catch (error) {
      console.error('Error al crear actividad:', error)
      showNotification('Error al crear la actividad', 'error')
      return false
    } finally {
      templateStore.setLoading(false)
    }
  }

  const updateActivity = async (activity: TemplateActivityType, silent = false) => {
    try {
      if (!silent) {
        templateStore.setLoading(true)
      }
      const request = mapTemplateActivityToRequest(activity)
      const response = await templateService.updateTemplateActivity(request)
      
      if (response.success) {
        if (!silent) {
          showNotification('Actividad actualizada exitosamente', 'success')
          
          // Recargar la plantilla actual
          if (templateStore.activeTemplateId) {
            await loadTemplateById(templateStore.activeTemplateId)
          }
        }
        
        return true
      }
      return false
    } catch (error) {
      console.error('Error al actualizar actividad:', error)
      if (!silent) {
        showNotification('Error al actualizar la actividad', 'error')
      }
      throw error // Re-lanzar para manejar en batch
    } finally {
      if (!silent) {
        templateStore.setLoading(false)
      }
    }
  }

  const deleteActivity = async (id: number) => {
    try {
      templateStore.setLoading(true)
      const response = await templateService.deleteTemplateActivity(id)
      
      if (response.success) {
        showNotification('Actividad eliminada exitosamente', 'success')
        
        // Recargar la plantilla actual
        if (templateStore.activeTemplateId) {
          await loadTemplateById(templateStore.activeTemplateId)
        }
        
        return true
      }
      return false
    } catch (error) {
      console.error('Error al eliminar actividad:', error)
      showNotification('Error al eliminar la actividad', 'error')
      return false
    } finally {
      templateStore.setLoading(false)
    }
  }

  return {
    // Plantillas
    loadTemplateOptions,
    loadTemplateById,
    createTemplate,
    updateTemplate,
    deleteTemplate,
    
    // Etapas
    createStage,
    updateStage,
    deleteStage,
    
    // Actividades
    createActivity,
    updateActivity,
    deleteActivity,
  }
}
