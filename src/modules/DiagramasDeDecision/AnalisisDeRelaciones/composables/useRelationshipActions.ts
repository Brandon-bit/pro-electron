import useRelationshipStore from '@/modules/DiagramasDeDecision/AnalisisDeRelaciones/store/relationshipStore'
import { showNotification } from '@/utils/toastNotifications'

export const useRelationshipActions = () => {
    
    const relationshipStore = useRelationshipStore()

    const handleAnalyze = () => {
        if (relationshipStore.selectedMetrics.length < 2) {
            showNotification('Selecciona al menos 2 métricas para analizar', 'error')
            return false
        }

        relationshipStore.analyzeCorrelations()
        showNotification('Análisis de correlación completado', 'success')
        return true
    }

    const getCorrelationColor = (correlation: number): string => {
        const absCorr = Math.abs(correlation)
        if (absCorr > 0.7) return correlation > 0 ? 'bg-accent' : 'bg-error'
        if (absCorr > 0.4) return correlation > 0 ? 'bg-info' : 'bg-warning'
        return 'bg-base-300'
    }

    const getCorrelationLabel = (correlation: number): string => {
        const absCorr = Math.abs(correlation)
        if (absCorr > 0.7) return 'Fuerte'
        if (absCorr > 0.4) return 'Moderada'
        return 'Débil'
    }

    return {
        handleAnalyze,
        getCorrelationColor,
        getCorrelationLabel
    }
}
