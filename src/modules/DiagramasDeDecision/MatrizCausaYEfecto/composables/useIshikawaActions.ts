import useIshikawaStore from '@/modules/DiagramasDeDecision/MatrizCausaYEfecto/store/ishikawaStore'
import { showNotification } from '@/utils/toastNotifications'

export const useIshikawaActions = () => {
    
    const ishikawaStore = useIshikawaStore()

    const loadData = () => {
        const storedCauses = localStorage.getItem('ishikawaCauses')
        const storedProblem = localStorage.getItem('ishikawaProblem')
        
        if (storedCauses) {
            ishikawaStore.setCauses(JSON.parse(storedCauses))
        }
        if (storedProblem) {
            ishikawaStore.setProblemStatement(storedProblem)
        }
    }

    const saveData = () => {
        localStorage.setItem('ishikawaCauses', JSON.stringify(ishikawaStore.causes))
        localStorage.setItem('ishikawaProblem', ishikawaStore.problemStatement)
        showNotification('Datos guardados exitosamente', 'success')
    }

    const handleAddCause = (text: string, category: string) => {
        if (!text.trim()) {
            showNotification('Por favor ingresa una descripción de la causa', 'error')
            return false
        }

        ishikawaStore.addCause(text, category)
        showNotification('Causa agregada exitosamente', 'success')
        return true
    }

    const handleUpdateCause = (updatedCause: any) => {
        ishikawaStore.updateCause(updatedCause)
        showNotification('Causa actualizada', 'success')
    }

    const handleVote = (causeId: string) => {
        ishikawaStore.voteCause(causeId)
    }

    return {
        loadData,
        saveData,
        handleAddCause,
        handleUpdateCause,
        handleVote
    }
}
