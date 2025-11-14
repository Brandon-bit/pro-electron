import useSurveyStore from '@/modules/DiagramasDeDecision/GestionDeEncuestas/store/surveyStore'
import { showNotification } from '@/utils/toastNotifications'

export const useSurveyActions = () => {
    
    const surveyStore = useSurveyStore()

    const handleCreateSurvey = (name: string, type: string) => {
        if (!name.trim()) {
            showNotification('El nombre de la encuesta es requerido', 'error')
            return false
        }

        if (!type) {
            showNotification('Selecciona un tipo de encuesta', 'error')
            return false
        }

        surveyStore.addSurvey(name, type)
        showNotification('Encuesta creada exitosamente', 'success')
        return true
    }

    const getStatusBadgeClass = (status: string): string => {
        switch (status) {
            case 'active': return 'badge-primary'
            case 'completed': return 'badge-success'
            case 'draft': return 'badge-ghost'
            default: return 'badge-ghost'
        }
    }

    const getStatusLabel = (status: string): string => {
        switch (status) {
            case 'active': return 'Activa'
            case 'completed': return 'Completada'
            case 'draft': return 'Borrador'
            default: return status
        }
    }

    return {
        handleCreateSurvey,
        getStatusBadgeClass,
        getStatusLabel
    }
}
