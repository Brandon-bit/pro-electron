import useLessonStore from '@/modules/GestionDeProyectos/Operacion/LeccionesAprendidas/store/lessonStore'
import { lessonService } from '@/modules/GestionDeProyectos/Operacion/LeccionesAprendidas/services/lessonService'
import {
    mapLessonResponse,
    mapProjectOptionResponse,
    mapCategoryOptionResponse,
    mapAttendeeResponse
} from '@/modules/GestionDeProyectos/Operacion/LeccionesAprendidas/composables/mappingLessonData'
import type { LessonLearnedRequestType } from '@/modules/GestionDeProyectos/Operacion/LeccionesAprendidas/types/lessonTypes'
import { showNotification } from '@/utils/toastNotifications'

export const useLessonActions = () => {
    const lessonStore = useLessonStore()

    /**
     * Load project options for the select dropdown
     */
    const loadProjectOptions = async () => {
        try {
            lessonStore.setLoading(true)
            const response = await lessonService.getProjectOptionsService()
            lessonStore.setProjectOptions(response.data.map(mapProjectOptionResponse))
        } catch (error) {
            console.error(error)
            showNotification('Error al cargar los proyectos', 'error')
        } finally {
            lessonStore.setLoading(false)
        }
    }

    /**
     * Load lessons for the selected project
     */
    const loadLessons = async (projectDni: string) => {
        try {
            lessonStore.setLoading(true)
            const response = await lessonService.getLessonsService(projectDni)
            lessonStore.setLessons(response.data.map(mapLessonResponse))
        } catch (error) {
            console.error(error)
            showNotification('Error al cargar las lecciones aprendidas', 'error')
        } finally {
            lessonStore.setLoading(false)
        }
    }

    /**
     * Load category options for the select dropdown
     */
    const loadCategoryOptions = async () => {
        try {
            const response = await lessonService.getCategoryOptionsService()
            lessonStore.setCategoryOptions(response.data.map(mapCategoryOptionResponse))
        } catch (error) {
            console.error(error)
            showNotification('Error al cargar las categorías', 'error')
        }
    }

    /**
     * Load participants for attendee selection
     */
    const loadParticipants = async () => {
        try {
            const response = await lessonService.getParticipantsService()
            lessonStore.setParticipants(response.data.map(mapAttendeeResponse))
        } catch (error) {
            console.error(error)
            showNotification('Error al cargar los participantes', 'error')
        }
    }

    /**
     * Create a new lesson learned
     */
    const createLesson = async (data: LessonLearnedRequestType): Promise<boolean> => {
        try {
            const response = await lessonService.createLessonService(data)
            if (response.success) {
                const newLesson = mapLessonResponse(response.data)
                lessonStore.lessons.push(newLesson)
                showNotification('Lección aprendida creada exitosamente', 'success')
                return true
            }
            showNotification(response.message, 'error')
            return false
        } catch (error) {
            console.error(error)
            showNotification('Error al crear la lección aprendida', 'error')
            return false
        }
    }

    /**
     * Update an existing lesson learned
     */
    const updateLesson = async (data: LessonLearnedRequestType): Promise<boolean> => {
        try {
            const response = await lessonService.updateLessonService(data)
            if (response.success) {
                // Reload lessons to get updated data
                if (lessonStore.selectedProject) {
                    await loadLessons(lessonStore.selectedProject.dni)
                }
                showNotification('Lección aprendida actualizada exitosamente', 'success')
                return true
            }
            showNotification(response.message, 'error')
            return false
        } catch (error) {
            console.error(error)
            showNotification('Error al actualizar la lección aprendida', 'error')
            return false
        }
    }

    /**
     * Delete a lesson learned
     */
    const deleteLesson = async (dni: string): Promise<boolean> => {
        try {
            const response = await lessonService.deleteLessonService(dni)
            if (response.success) {
                lessonStore.lessons = lessonStore.lessons.filter(l => l.dni !== dni)
                showNotification('Lección aprendida eliminada exitosamente', 'success')
                return true
            }
            showNotification(response.message, 'error')
            return false
        } catch (error) {
            console.error(error)
            showNotification('Error al eliminar la lección aprendida', 'error')
            return false
        }
    }

    return {
        loadProjectOptions,
        loadLessons,
        loadCategoryOptions,
        loadParticipants,
        createLesson,
        updateLesson,
        deleteLesson
    }
}
