import useLessonStore from '@/modules/GestionDeProyectos/Operacion/LeccionesAprendidas/store/lessonStore'
import { lessonService } from '@/modules/GestionDeProyectos/Operacion/LeccionesAprendidas/services/lessonService'
import { mapAttendeeResponse } from '@/modules/GestionDeProyectos/Operacion/LeccionesAprendidas/composables/mappingLessonData'
import type { AttendeeRequestType } from '@/modules/GestionDeProyectos/Operacion/LeccionesAprendidas/types/lessonTypes'
import { showNotification } from '@/utils/toastNotifications'

export const useAttendeeActions = () => {
    const lessonStore = useLessonStore()

    /**
     * Add an attendee to the selected lesson
     */
    const addAttendee = async (data: AttendeeRequestType): Promise<boolean> => {
        try {
            const response = await lessonService.addAttendeeService(data)
            if (response.success) {
                const newAttendee = mapAttendeeResponse(response.data)
                
                // Update the selected lesson's attendees
                if (lessonStore.selectedLesson) {
                    lessonStore.selectedLesson.attendees.push(newAttendee)
                    
                    // Also update in the lessons array
                    const lessonIndex = lessonStore.lessons.findIndex(
                        l => l.dni === lessonStore.selectedLesson!.dni
                    )
                    if (lessonIndex !== -1) {
                        lessonStore.lessons[lessonIndex].attendees.push(newAttendee)
                    }
                }
                
                showNotification('Asistente agregado exitosamente', 'success')
                return true
            }
            showNotification(response.message, 'error')
            return false
        } catch (error) {
            console.error(error)
            showNotification('Error al agregar el asistente', 'error')
            return false
        }
    }

    /**
     * Remove an attendee from the selected lesson
     */
    const deleteAttendee = async (data: AttendeeRequestType): Promise<boolean> => {
        try {
            const response = await lessonService.deleteAttendeeService(data)
            if (response.success) {
                // Update the selected lesson's attendees
                if (lessonStore.selectedLesson) {
                    lessonStore.selectedLesson.attendees = lessonStore.selectedLesson.attendees.filter(
                        a => a.dni !== data.dniUsuario
                    )
                    
                    // Also update in the lessons array
                    const lessonIndex = lessonStore.lessons.findIndex(
                        l => l.dni === lessonStore.selectedLesson!.dni
                    )
                    if (lessonIndex !== -1) {
                        lessonStore.lessons[lessonIndex].attendees = 
                            lessonStore.lessons[lessonIndex].attendees.filter(
                                a => a.dni !== data.dniUsuario
                            )
                    }
                }
                
                showNotification('Asistente eliminado exitosamente', 'success')
                return true
            }
            showNotification(response.message, 'error')
            return false
        } catch (error) {
            console.error(error)
            showNotification('Error al eliminar el asistente', 'error')
            return false
        }
    }

    return {
        addAttendee,
        deleteAttendee
    }
}
