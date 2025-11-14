import useBenefitStore from '@/modules/DiagramasDeDecision/SeguimientoDeBeneficios/store/benefitStore'
import { showNotification } from '@/utils/toastNotifications'

export const useBenefitActions = () => {
    
    const benefitStore = useBenefitStore()

    const handleCreateBenefit = (
        name: string,
        baseline: number,
        target: number,
        current: number,
        unit: string
    ) => {
        if (!name.trim()) {
            showNotification('El nombre del beneficio es requerido', 'error')
            return false
        }

        if (!unit.trim()) {
            showNotification('La unidad es requerida', 'error')
            return false
        }

        benefitStore.addBenefit(name, baseline, target, current, unit)
        showNotification('Beneficio agregado exitosamente', 'success')
        return true
    }

    return {
        handleCreateBenefit
    }
}
