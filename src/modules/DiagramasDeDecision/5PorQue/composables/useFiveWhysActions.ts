import useFiveWhysStore from '@/modules/DiagramasDeDecision/5PorQue/store/fiveWhysStore'
import { showNotification } from '@/utils/toastNotifications'

export const useFiveWhysActions = () => {
    
    const fiveWhysStore = useFiveWhysStore()

    const loadData = () => {
        const storedSteps = localStorage.getItem('fiveWhysSteps')
        const storedProblem = localStorage.getItem('fiveWhysProblem')
        
        if (storedSteps) {
            fiveWhysStore.setWhySteps(JSON.parse(storedSteps))
        }
        if (storedProblem) {
            fiveWhysStore.setProblemStatement(storedProblem)
        }
    }

    const saveData = () => {
        localStorage.setItem('fiveWhysSteps', JSON.stringify(fiveWhysStore.whySteps))
        localStorage.setItem('fiveWhysProblem', fiveWhysStore.problemStatement)
        showNotification('Datos guardados exitosamente', 'success')
    }

    const handleAnswerSubmit = () => {
        if (!fiveWhysStore.currentAnswer.trim()) {
            showNotification('Por favor ingresa una respuesta', 'error')
            return false
        }

        fiveWhysStore.submitAnswer()
        showNotification(`Respuesta ${fiveWhysStore.completedSteps} guardada`, 'success')
        return true
    }

    const handleMarkAsRootCause = (stepId: number) => {
        fiveWhysStore.toggleRootCause(stepId)
        showNotification('Marcada como causa raíz', 'success')
    }

    return {
        loadData,
        saveData,
        handleAnswerSubmit,
        handleMarkAsRootCause
    }
}
