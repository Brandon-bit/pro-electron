import useLessonStore from '@/modules/GestionDeProyectos/Operacion/LeccionesAprendidas/store/lessonStore'
import { showNotification } from '@/utils/toastNotifications'

export const useLessonActions = () => {
    
    const lessonStore = useLessonStore()

    const loadLessons = () => {
        const stored = localStorage.getItem('lessons')
        if (stored) {
            lessonStore.setLessons(JSON.parse(stored))
        }
    }

    const saveLessons = () => {
        localStorage.setItem('lessons', JSON.stringify(lessonStore.lessons))
        showNotification('Lecciones guardadas exitosamente', 'success')
    }

    return {
        loadLessons,
        saveLessons
    }
}
