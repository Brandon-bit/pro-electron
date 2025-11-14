import useExamStore from '@/modules/DiagramasDeDecision/GestionDeExamenes/store/examStore'
import { showNotification } from '@/utils/toastNotifications'

export const useExamActions = () => {
    
    const examStore = useExamStore()

    const handleCreateExam = (
        name: string,
        category: string,
        timeLimit: number,
        passingScore: number,
        attempts: number
    ) => {
        if (!name.trim()) {
            showNotification('El nombre del examen es requerido', 'error')
            return false
        }

        if (!category) {
            showNotification('Selecciona una categoría', 'error')
            return false
        }

        examStore.addExam(name, category, timeLimit, passingScore, attempts)
        showNotification('Examen creado exitosamente', 'success')
        return true
    }

    const handleFinishExam = () => {
        showNotification('Examen finalizado. Resultados procesados.', 'success')
        examStore.clearExam()
    }

    return {
        handleCreateExam,
        handleFinishExam
    }
}
