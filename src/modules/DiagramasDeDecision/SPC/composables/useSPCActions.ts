import useSPCStore from '@/modules/DiagramasDeDecision/SPC/store/spcStore'
import { showNotification } from '@/utils/toastNotifications'

export const useSPCActions = () => {
    
    const spcStore = useSPCStore()

    const loadData = () => {
        const stored = localStorage.getItem('spcData')
        if (stored) {
            spcStore.setDataPoints(JSON.parse(stored))
            spcStore.calculateControlLimits()
        }
    }

    const saveData = () => {
        localStorage.setItem('spcData', JSON.stringify(spcStore.dataPoints))
        showNotification('Datos guardados exitosamente', 'success')
    }

    const handleAddDataPoint = (value: string) => {
        if (!value) {
            showNotification('Por favor ingresa un valor', 'error')
            return false
        }

        const numValue = parseFloat(value)
        if (isNaN(numValue)) {
            showNotification('Por favor ingresa un número válido', 'error')
            return false
        }

        spcStore.addDataPoint(numValue)
        showNotification('Punto agregado', 'success')
        return true
    }

    return {
        loadData,
        saveData,
        handleAddDataPoint
    }
}
