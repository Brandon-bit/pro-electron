import useParetoStore from '@/modules/DiagramasDeDecision/AnalisisDePareto/store/paretoStore'
import { showNotification } from '@/utils/toastNotifications'

export const useParetoActions = () => {
    
    const paretoStore = useParetoStore()

    const loadData = () => {
        const stored = localStorage.getItem('paretoData')
        if (stored) {
            paretoStore.setData(JSON.parse(stored))
        }
    }

    const saveData = () => {
        localStorage.setItem('paretoData', JSON.stringify(paretoStore.data))
        showNotification('Datos guardados exitosamente', 'success')
    }

    const handleAddData = (category: string, frequency: string, cost: string) => {
        if (!category || !frequency || !cost) {
            showNotification('Por favor completa todos los campos', 'error')
            return false
        }

        paretoStore.addData(category, parseInt(frequency), parseInt(cost))
        showNotification('Dato agregado exitosamente', 'success')
        return true
    }

    const handleDeleteData = (category: string) => {
        paretoStore.deleteData(category)
        showNotification('Dato eliminado', 'success')
    }

    const handleBarClick = (category: string) => {
        paretoStore.setSelectedCategory(category)
        showNotification(`Filtrando incidentes de: ${category}`, 'info')
    }

    return {
        loadData,
        saveData,
        handleAddData,
        handleDeleteData,
        handleBarClick
    }
}
