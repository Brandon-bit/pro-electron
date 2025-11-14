import useMinuteStore from '@/modules/GestionDeProyectos/Minutas/store/minuteStore'
import { showNotification } from '@/utils/toastNotifications'

export const useMinuteActions = () => {
    
    const minuteStore = useMinuteStore()

    const getActionStatusColor = (status: string): string => {
        switch (status) {
            case 'Pendiente': return 'badge-warning'
            case 'En Progreso': return 'badge-info'
            case 'Completada': return 'badge-success'
            default: return 'badge-ghost'
        }
    }

    const loadMinutes = () => {
        const stored = localStorage.getItem('minutes')
        if (stored) {
            minuteStore.setMinutes(JSON.parse(stored))
        }
    }

    const saveMinutes = () => {
        localStorage.setItem('minutes', JSON.stringify(minuteStore.minutes))
        showNotification('Minutas guardadas exitosamente', 'success')
    }

    const handleDistribute = (id: string) => {
        minuteStore.distributeMinute(id)
        showNotification('Minuta distribuida por email', 'success')
    }

    return {
        getActionStatusColor,
        loadMinutes,
        saveMinutes,
        handleDistribute
    }
}
