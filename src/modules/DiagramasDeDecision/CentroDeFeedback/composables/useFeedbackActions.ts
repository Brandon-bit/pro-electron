import useFeedbackStore from '@/modules/DiagramasDeDecision/CentroDeFeedback/store/feedbackStore'
import { showNotification } from '@/utils/toastNotifications'

export const useFeedbackActions = () => {
    
    const feedbackStore = useFeedbackStore()

    const handleCreateFeedback = (
        text: string,
        source: string,
        sentiment: 'positivo' | 'neutral' | 'negativo',
        priority: 'alta' | 'media' | 'baja',
        tags: string[]
    ) => {
        if (!text.trim()) {
            showNotification('El texto del feedback es requerido', 'error')
            return false
        }

        if (!source.trim()) {
            showNotification('La fuente es requerida', 'error')
            return false
        }

        feedbackStore.addFeedback(text, source, sentiment, priority, tags)
        showNotification('Feedback agregado exitosamente', 'success')
        return true
    }

    const getSentimentBadgeClass = (sentiment: string): string => {
        switch (sentiment) {
            case 'positivo': return 'badge-success'
            case 'neutral': return 'badge-ghost'
            case 'negativo': return 'badge-error'
            default: return 'badge-ghost'
        }
    }

    return {
        handleCreateFeedback,
        getSentimentBadgeClass
    }
}
