import useCharterStore from '@/modules/GestionDeProyectos/CharterDeProyectos/store/charterStore'
import { showNotification } from '@/utils/toastNotifications'

export const useCharterActions = () => {
    
    const charterStore = useCharterStore()

    const getStatusColor = (status: string): string => {
        switch (status) {
            case 'Borrador': return 'badge-ghost'
            case 'En Revisión': return 'badge-warning'
            case 'Aprobado': return 'badge-success'
            default: return 'badge-ghost'
        }
    }

    const loadCharters = () => {
        const stored = localStorage.getItem('charters')
        if (stored) {
            charterStore.setCharters(JSON.parse(stored))
        }
    }

    const saveCharters = () => {
        localStorage.setItem('charters', JSON.stringify(charterStore.charters))
        showNotification('Charters guardados exitosamente', 'success')
    }

    const handleApprove = (id: string) => {
        charterStore.approveCharter(id)
        showNotification('Charter aprobado exitosamente', 'success')
    }

    const handleSendToReview = (id: string) => {
        charterStore.sendToReview(id)
        showNotification('Charter enviado a revisión', 'info')
    }

    return {
        getStatusColor,
        loadCharters,
        saveCharters,
        handleApprove,
        handleSendToReview
    }
}
