import useFMEAStore from '@/modules/DiagramasDeDecision/FMEA/store/fmeaStore'
import { showNotification } from '@/utils/toastNotifications'

export const useFMEAActions = () => {
    
    const fmeaStore = useFMEAStore()

    const loadData = () => {
        const stored = localStorage.getItem('fmeaData')
        if (stored) {
            fmeaStore.setFMEAData(JSON.parse(stored))
        }
    }

    const saveData = () => {
        localStorage.setItem('fmeaData', JSON.stringify(fmeaStore.fmeaData))
        showNotification('Datos guardados exitosamente', 'success')
    }

    const handleAddRow = (failureMode: string, effect: string, severity: number, occurrence: number, detection: number) => {
        if (!failureMode || !effect) {
            showNotification('Por favor completa el modo de falla y efecto', 'error')
            return false
        }

        fmeaStore.addRow(failureMode, effect, severity, occurrence, detection)
        showNotification('Modo de falla agregado', 'success')
        return true
    }

    const getRPNColor = (rpn: number): string => {
        if (rpn >= 200) return 'badge-error'
        if (rpn >= 100) return 'badge-warning'
        if (rpn >= 50) return 'badge-info'
        return 'badge-accent'
    }

    const getRPNLabel = (rpn: number): string => {
        if (rpn >= 200) return 'Crítico'
        if (rpn >= 100) return 'Alto'
        if (rpn >= 50) return 'Medio'
        return 'Bajo'
    }

    return {
        loadData,
        saveData,
        handleAddRow,
        getRPNColor,
        getRPNLabel
    }
}
