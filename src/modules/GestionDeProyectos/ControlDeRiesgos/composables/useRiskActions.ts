import useRiskStore from '@/modules/GestionDeProyectos/ControlDeRiesgos/store/riskStore'
import type { RiskLevel } from '@/modules/GestionDeProyectos/ControlDeRiesgos/types/riskTypes'
import { showNotification } from '@/utils/toastNotifications'

export const useRiskActions = () => {
    
    const riskStore = useRiskStore()

    const getRiskColor = (score: number): string => {
        if (score >= 15) return 'badge-error'
        if (score >= 8) return 'badge-warning'
        return 'badge-success'
    }

    const getRiskLevel = (score: number): RiskLevel => {
        if (score >= 15) return 'Alto'
        if (score >= 8) return 'Medio'
        return 'Bajo'
    }

    const getCellColor = (prob: number, imp: number): string => {
        const score = prob * imp
        if (score >= 15) return 'bg-error/20 hover:bg-error/30'
        if (score >= 8) return 'bg-warning/20 hover:bg-warning/30'
        return 'bg-success/20 hover:bg-success/30'
    }

    const getRisksInCell = (prob: number, imp: number) => {
        return riskStore.risks.filter(r => r.probability === prob && r.impact === imp)
    }

    const loadRisks = () => {
        const stored = localStorage.getItem('risks')
        if (stored) {
            riskStore.setRisks(JSON.parse(stored))
        }
    }

    const saveRisks = () => {
        localStorage.setItem('risks', JSON.stringify(riskStore.risks))
        showNotification('Riesgos guardados exitosamente', 'success')
    }

    return {
        getRiskColor,
        getRiskLevel,
        getCellColor,
        getRisksInCell,
        loadRisks,
        saveRisks
    }
}
