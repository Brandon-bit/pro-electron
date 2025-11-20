import useMinuteStore from '@/modules/GestionDeProyectos/Operacion/Minutas/store/minuteStore'
import { showNotification } from '@/utils/toastNotifications'
import type { ProjectOptionType } from '@/modules/GestionDeProyectos/Operacion/Minutas/types/minuteTypes'

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

    const loadProjects = async () => {
        try {
            // TODO: Implementar llamada al servicio real cuando esté disponible
            // Por ahora usamos datos de prueba
            const mockProjects: ProjectOptionType[] = [
                { dni: 1, label: 'Proyecto ERP - Sistema de Gestión' },
                { dni: 2, label: 'Proyecto CRM - Customer Relations' },
                { dni: 3, label: 'Proyecto Mobile - App iOS/Android' }
            ]
            
            minuteStore.setProjectsOptions(mockProjects)
        } catch (error) {
            console.error('Error al cargar proyectos:', error)
            showNotification('Error al cargar los proyectos', 'error')
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
        loadProjects,
        loadMinutes,
        saveMinutes,
        handleDistribute
    }
}
