import useStakeholderStore from '@/modules/DiagramasDeDecision/MapaDeStakeholders/store/stakeholderStore'
import { showNotification } from '@/utils/toastNotifications'

export const useStakeholderActions = () => {
    
    const stakeholderStore = useStakeholderStore()

    const handleCreateStakeholder = (
        name: string,
        role: string,
        power: 'high' | 'low',
        interest: 'high' | 'low',
        engagement: string
    ) => {
        if (!name.trim()) {
            showNotification('El nombre del stakeholder es requerido', 'error')
            return false
        }

        if (!role.trim()) {
            showNotification('El rol es requerido', 'error')
            return false
        }

        stakeholderStore.addStakeholder(name, role, power, interest, engagement)
        showNotification('Stakeholder agregado exitosamente', 'success')
        return true
    }

    const getInitials = (name: string): string => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
    }

    return {
        handleCreateStakeholder,
        getInitials
    }
}
