import { generalConfigService } from '@/modules/GestionDeProyectos/Configuracion/General/services/generalConfigService'
import {
  mapAreaResponse,
  mapAreaRequest,
  mapCategoryRequest,
  mapCategoryResponse,
  mapClassificationRequest,
  mapClassificationResponse,
  mapLessonLearnedCategoryRequest,
  mapLessonLearnedCategoryResponse,
} from '@/modules/GestionDeProyectos/Configuracion/General/composables/mappingGeneralConfigData'
import type {
  ProjectAreaFormType,
  ProjectCategoryFormType,
  ProjectClassificationFormType,
  ProjectAreaType,
  ProjectCategoryType,
  ProjectClassificationType,
  LessonLearnedCategoryFormType,
  LessonLearnedCategoryType,
} from '@/modules/GestionDeProyectos/Configuracion/General/types/generalConfigTypes'
import useGeneralConfigStore from '@/modules/GestionDeProyectos/Configuracion/General/store/generalConfigStore'
import { showNotification } from '@/utils/toastNotifications'

export const useGeneralConfigActions = () => {
  const configStore = useGeneralConfigStore()

  const loadAreasAndCategories = async () => {
    try {
      configStore.isLoading = true
      const response = await generalConfigService.getAreas()
      configStore.areas = response.data.map(mapAreaResponse)
    } catch (error) {
      console.error(error)
      showNotification('Error al cargar las áreas', 'error')
    } finally {
      configStore.isLoading = false
    }
  }

  const loadClassifications = async () => {
    try {
      configStore.isLoading = true
      const response = await generalConfigService.getClassifications()
      configStore.classifications = response.data.map(mapClassificationResponse)
    } catch (error) {
      console.error(error)
      showNotification('Error al cargar las clasificaciones', 'error')
    } finally {
      configStore.isLoading = false
    }
  }

  const loadLessonLearnedCategories = async () => {
    try {
      configStore.isLoading = true
      const response = await generalConfigService.getLessonLearnedCategories()
      configStore.lessonLearnedCategories = response.data.map(mapLessonLearnedCategoryResponse)
    } catch (error) {
      console.error(error)
      showNotification('Error al cargar las categorías de lecciones aprendidas', 'error')
    } finally {
      configStore.isLoading = false
    }
  }

  // Áreas
  const createArea = async (
    form: ProjectAreaFormType
  ): Promise<{ message: string; status: string; data: ProjectAreaType | null }> => {
    try {
      const payload = mapAreaRequest(undefined, form)
      const response = await generalConfigService.createArea(payload)
      const mapped = mapAreaResponse(response.data)
      configStore.areas.push(mapped)
      showNotification('Área creada exitosamente', 'success')
      return { message: response.message, status: response.success ? 'success' : 'error', data: mapped }
    } catch (error) {
      console.error(error)
      showNotification('Error al crear el área', 'error')
      return { message: 'Error al crear el área', status: 'error', data: null }
    }
  }

  const updateArea = async (
    areaId: number,
    form: ProjectAreaFormType
  ): Promise<{ message: string; status: string }> => {
    try {
      const payload = mapAreaRequest(areaId, form)
      const response = await generalConfigService.updateArea(payload)

      if (response.success) {
        const idx = configStore.areas.findIndex((a) => a.id === areaId)
        if (idx !== -1) {
          configStore.areas[idx] = { ...configStore.areas[idx], ...form }
        }
      }

      showNotification(response.message, response.success ? 'success' : 'error')
      return { message: response.message, status: response.success ? 'success' : 'error' }
    } catch (error) {
      console.error(error)
      showNotification('Error al actualizar el área', 'error')
      return { message: 'Error al actualizar el área', status: 'error' }
    }
  }

  const deleteArea = async (areaId: number): Promise<boolean> => {
    try {
      const response = await generalConfigService.deleteArea(areaId)
      if (response.success) {
        configStore.areas = configStore.areas.filter((a) => a.id !== areaId)
        showNotification('Área eliminada exitosamente', 'success')
        return true
      }
      showNotification(response.message, 'error')
      return false
    } catch (error) {
      console.error(error)
      showNotification('Error al eliminar el área', 'error')
      return false
    }
  }

  // Categorías
  const createCategory = async (
    form: ProjectCategoryFormType
  ): Promise<{ message: string; status: string; data: ProjectCategoryType | null }> => {
    try {
      const payload = mapCategoryRequest(undefined, form)
      const response = await generalConfigService.createCategory(payload)
      const mapped = mapCategoryResponse(response.data)

      const area = configStore.areas.find((a) => a.id === mapped.areaId)
      if (area) {
        area.categories.push(mapped)
      }

      showNotification('Categoría creada exitosamente', 'success')
      return { message: response.message, status: response.success ? 'success' : 'error', data: mapped }
    } catch (error) {
      console.error(error)
      showNotification('Error al crear la categoría', 'error')
      return { message: 'Error al crear la categoría', status: 'error', data: null }
    }
  }

  const updateCategory = async (
    categoryId: number,
    form: ProjectCategoryFormType
  ): Promise<{ message: string; status: string }> => {
    try {
      const payload = mapCategoryRequest(categoryId, form)
      const response = await generalConfigService.updateCategory(payload)

      if (response.success) {
        // Buscar categoría en el área correspondiente
        const area = configStore.areas.find((a) => a.id === form.areaId)
        if (area) {
          const idx = area.categories.findIndex((c) => c.id === categoryId)
          if (idx !== -1) {
            area.categories[idx] = { ...area.categories[idx], ...form }
          }
        }
      }

      showNotification(response.message, response.success ? 'success' : 'error')
      return { message: response.message, status: response.success ? 'success' : 'error' }
    } catch (error) {
      console.error(error)
      showNotification('Error al actualizar la categoría', 'error')
      return { message: 'Error al actualizar la categoría', status: 'error' }
    }
  }

  const deleteCategory = async (
    areaId: number,
    categoryId: number
  ): Promise<boolean> => {
    try {
      const response = await generalConfigService.deleteCategory(categoryId)
      if (response.success) {
        const area = configStore.areas.find((a) => a.id === areaId)
        if (area) {
          area.categories = area.categories.filter((c) => c.id !== categoryId)
        }
        showNotification('Categoría eliminada exitosamente', 'success')
        return true
      }
      showNotification(response.message, 'error')
      return false
    } catch (error) {
      console.error(error)
      showNotification('Error al eliminar la categoría', 'error')
      return false
    }
  }

  // Clasificaciones
  const createClassification = async (
    form: ProjectClassificationFormType
  ): Promise<{ message: string; status: string; data: ProjectClassificationType | null }> => {
    try {
      const payload = mapClassificationRequest(undefined, form)
      const response = await generalConfigService.createClassification(payload)
      const mapped = mapClassificationResponse(response.data)
      configStore.classifications.push(mapped)
      showNotification('Clasificación creada exitosamente', 'success')
      return { message: response.message, status: response.success ? 'success' : 'error', data: mapped }
    } catch (error) {
      console.error(error)
      showNotification('Error al crear la clasificación', 'error')
      return { message: 'Error al crear la clasificación', status: 'error', data: null }
    }
  }

  const updateClassification = async (
    classificationId: number,
    form: ProjectClassificationFormType
  ): Promise<{ message: string; status: string }> => {
    try {
      const payload = mapClassificationRequest(classificationId, form)
      const response = await generalConfigService.updateClassification(payload)

      if (response.success) {
        const idx = configStore.classifications.findIndex((c) => c.id === classificationId)
        if (idx !== -1) {
          configStore.classifications[idx] = {
            ...configStore.classifications[idx],
            ...form,
          }
        }
      }

      showNotification(response.message, response.success ? 'success' : 'error')
      return { message: response.message, status: response.success ? 'success' : 'error' }
    } catch (error) {
      console.error(error)
      showNotification('Error al actualizar la clasificación', 'error')
      return { message: 'Error al actualizar la clasificación', status: 'error' }
    }
  }

  const deleteClassification = async (classificationId: number): Promise<boolean> => {
    try {
      const response = await generalConfigService.deleteClassification(classificationId)
      if (response.success) {
        configStore.classifications = configStore.classifications.filter(
          (c) => c.id !== classificationId
        )
        showNotification('Clasificación eliminada exitosamente', 'success')
        return true
      }
      showNotification(response.message, 'error')
      return false
    } catch (error) {
      console.error(error)
      showNotification('Error al eliminar la clasificación', 'error')
      return false
    }
  }

  // Lesson Learned Categories
  const createLessonLearnedCategory = async (
    form: LessonLearnedCategoryFormType
  ): Promise<{ message: string; status: string; data: LessonLearnedCategoryType | null }> => {
    try {
      const payload = mapLessonLearnedCategoryRequest(undefined, form)
      const response = await generalConfigService.createLessonLearnedCategory(payload)
      const mapped = mapLessonLearnedCategoryResponse(response.data)
      configStore.lessonLearnedCategories.push(mapped)
      showNotification('Categoría de lección aprendida creada exitosamente', 'success')
      return { message: response.message, status: response.success ? 'success' : 'error', data: mapped }
    } catch (error) {
      console.error(error)
      showNotification('Error al crear la categoría de lección aprendida', 'error')
      return { message: 'Error al crear la categoría de lección aprendida', status: 'error', data: null }
    }
  }

  const updateLessonLearnedCategory = async (
    categoryId: number,
    form: LessonLearnedCategoryFormType
  ): Promise<{ message: string; status: string }> => {
    try {
      const payload = mapLessonLearnedCategoryRequest(categoryId, form)
      const response = await generalConfigService.updateLessonLearnedCategory(payload)

      if (response.success) {
        const idx = configStore.lessonLearnedCategories.findIndex((c) => c.id === categoryId)
        if (idx !== -1) {
          configStore.lessonLearnedCategories[idx] = {
            ...configStore.lessonLearnedCategories[idx],
            ...form,
          }
        }
      }

      showNotification(response.message, response.success ? 'success' : 'error')
      return { message: response.message, status: response.success ? 'success' : 'error' }
    } catch (error) {
      console.error(error)
      showNotification('Error al actualizar la categoría de lección aprendida', 'error')
      return { message: 'Error al actualizar la categoría de lección aprendida', status: 'error' }
    }
  }

  const deleteLessonLearnedCategory = async (categoryId: number): Promise<boolean> => {
    try {
      const response = await generalConfigService.deleteLessonLearnedCategory(categoryId)
      if (response.success) {
        configStore.lessonLearnedCategories = configStore.lessonLearnedCategories.filter(
          (c) => c.id !== categoryId
        )
        showNotification('Categoría de lección aprendida eliminada exitosamente', 'success')
        return true
      }
      showNotification(response.message, 'error')
      return false
    } catch (error) {
      console.error(error)
      showNotification('Error al eliminar la categoría de lección aprendida', 'error')
      return false
    }
  }

  return {
    loadAreasAndCategories,
    loadClassifications,
    loadLessonLearnedCategories,
    createArea,
    updateArea,
    deleteArea,
    createCategory,
    updateCategory,
    deleteCategory,
    createClassification,
    updateClassification,
    deleteClassification,
    createLessonLearnedCategory,
    updateLessonLearnedCategory,
    deleteLessonLearnedCategory,
  }
}
