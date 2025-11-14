import useChangeStore from '@/modules/GestionDeProyectos/ControlDeCambios/store/changeStore'
import { showNotification } from '@/utils/toastNotifications'

export const useChangeActions = () => {
    
    const changeStore = useChangeStore()

    const getStatusColor = (status: string): string => {
        switch (status) {
            case 'Abierta': return 'badge-info'
            case 'En Análisis': return 'badge-warning'
            case 'Pendiente Aprobación': return 'badge-accent'
            case 'Aprobada': return 'badge-success'
            case 'Rechazada': return 'badge-error'
            case 'Implementada': return 'badge-primary'
            default: return 'badge-ghost'
        }
    }

    const loadChangeRequests = () => {
        const stored = localStorage.getItem('changeRequests')
        if (stored) {
            changeStore.setChangeRequests(JSON.parse(stored))
        }
    }

    const saveChangeRequests = () => {
        localStorage.setItem('changeRequests', JSON.stringify(changeStore.changeRequests))
        showNotification('Solicitudes guardadas exitosamente', 'success')
    }

    const handleApprove = (id: string) => {
        changeStore.approveChangeRequest(id)
        showNotification('Solicitud aprobada', 'success')
    }

    const handleReject = (id: string) => {
        changeStore.rejectChangeRequest(id)
        showNotification('Solicitud rechazada', 'info')
    }

    return {
        getStatusColor,
        loadChangeRequests,
        saveChangeRequests,
        handleApprove,
        handleReject
    }
}
