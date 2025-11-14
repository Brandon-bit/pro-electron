import useTrainingStore from '@/modules/DiagramasDeDecision/GestionDeFormacion/store/trainingStore'
import { showNotification } from '@/utils/toastNotifications'

export const useTrainingActions = () => {
    
    const trainingStore = useTrainingStore()

    const handleCreateCourse = (
        title: string,
        type: 'video' | 'presencial',
        duration: string,
        capacity: number
    ) => {
        if (!title.trim()) {
            showNotification('El título del curso es requerido', 'error')
            return false
        }

        if (!duration.trim()) {
            showNotification('La duración es requerida', 'error')
            return false
        }

        if (capacity <= 0) {
            showNotification('La capacidad debe ser mayor a 0', 'error')
            return false
        }

        trainingStore.addCourse(title, type, duration, capacity)
        showNotification('Curso creado exitosamente', 'success')
        return true
    }

    const handleEnroll = (courseId: string) => {
        const availableSpots = trainingStore.availableSpots(courseId)
        
        if (availableSpots <= 0) {
            showNotification('No hay cupos disponibles', 'error')
            return
        }

        trainingStore.enrollCourse(courseId)
        showNotification('Inscripción exitosa', 'success')
    }

    return {
        handleCreateCourse,
        handleEnroll
    }
}
