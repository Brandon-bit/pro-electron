import useImpactStore from '@/modules/DiagramasDeDecision/AnalisisDeImpacto/store/impactStore'
import { showNotification } from '@/utils/toastNotifications'

export const useImpactActions = () => {
    
    const impactStore = useImpactStore()

    const handleCreateImpact = (role: string, process: string, impact: 'alto' | 'medio' | 'bajo') => {
        if (!role.trim()) {
            showNotification('El rol es requerido', 'error')
            return false
        }

        if (!process.trim()) {
            showNotification('El proceso es requerido', 'error')
            return false
        }

        impactStore.addImpactItem(role, process, impact)
        showNotification('Análisis de impacto agregado', 'success')
        return true
    }

    const getImpactBadgeClass = (impact: string): string => {
        switch (impact) {
            case 'alto': return 'badge-error'
            case 'medio': return 'badge-primary'
            case 'bajo': return 'badge-ghost'
            default: return 'badge-ghost'
        }
    }

    const getImpactLabel = (impact: string): string => {
        return `Impacto ${impact}`
    }

    return {
        handleCreateImpact,
        getImpactBadgeClass,
        getImpactLabel
    }
}
