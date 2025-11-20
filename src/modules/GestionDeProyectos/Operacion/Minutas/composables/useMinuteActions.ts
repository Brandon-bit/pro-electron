import useMinuteStore from '@/modules/GestionDeProyectos/Operacion/Minutas/store/minuteStore'
import { minuteService } from '@/modules/GestionDeProyectos/Operacion/Minutas/services/minuteService'
import { showNotification } from '@/utils/toastNotifications'
import type { 
    MinuteRequestType,
    MinuteResponseType,
    ParticipantResponseType,
    ProjectOptionResponseType,
    MinuteType,
    ParticipantType,
    ProjectOptionType
} from '@/modules/GestionDeProyectos/Operacion/Minutas/types/minuteTypes'

// Helper to transform API response to internal type
const transformMinuteResponse = (response: MinuteResponseType): MinuteType => ({
    dni: response.dni,
    projectDni: response.dniProyecto,
    name: response.nombre,
    date: response.fecha,
    agenda: response.agenda,
    discussionPoints: response.puntosDiscutidos,
    decisionsMade: response.decisionesTomadas,
    attendees: response.asistentes.map(transformParticipantResponse),
    agreedActions: response.accionesAcordadas.map(action => ({
        dni: action.dni,
        minuteDni: action.dniMinuta,
        minuteOrigin: action.minutaOrigen,
        description: action.descripcion,
        responsible: transformParticipantResponse(action.responsable),
        status: {
            dni: action.estatus.dni,
            name: action.estatus.nombre,
            color: action.estatus.color
        },
        dueDate: action.fechaLimite
    })),
    active: response.activo
})

const transformParticipantResponse = (response: ParticipantResponseType): ParticipantType => ({
    dni: response.dni,
    name: response.nombre,
    email: response.correo
})

const transformProjectOptionResponse = (response: ProjectOptionResponseType): ProjectOptionType => ({
    dni: response.dni,
    label: response.label
})

export const useMinuteActions = () => {
    const minuteStore = useMinuteStore()

    /**
     * Load project options from API
     */
    const loadProjects = async () => {
        try {
            minuteStore.setLoading(true)
            const response = await minuteService.getProjectOptionsService()
            
            if (response.success && response.data) {
                const projects = response.data.map(transformProjectOptionResponse)
                minuteStore.setProjectsOptions(projects)
            }
        } catch (error) {
            console.error('Error loading projects:', error)
            showNotification('Error al cargar los proyectos', 'error')
            minuteStore.setError('Error loading projects')
        } finally {
            minuteStore.setLoading(false)
        }
    }

    /**
     * Load minutes for selected project
     */
    const loadMinutes = async (projectDni: string) => {
        try {
            minuteStore.setLoading(true)
            const response = await minuteService.getMinutesService(projectDni)
            
            if (response.success && response.data) {
                const minutes = response.data.map(transformMinuteResponse)
                minuteStore.setMinutes(minutes)
            }
        } catch (error) {
            console.error('Error loading minutes:', error)
            showNotification('Error al cargar las minutas', 'error')
            minuteStore.setError('Error loading minutes')
        } finally {
            minuteStore.setLoading(false)
        }
    }

    /**
     * Load participants (users) for selects
     */
    const loadParticipants = async () => {
        try {
            const response = await minuteService.getParticipantsService()
            
            if (response.success && response.data) {
                const participants = response.data.map(transformParticipantResponse)
                minuteStore.setParticipants(participants)
            }
        } catch (error) {
            console.error('Error loading participants:', error)
            showNotification('Error al cargar los participantes', 'error')
        }
    }

    /**
     * Create a new minute
     */
    const createMinute = async (data: MinuteRequestType) => {
        try {
            minuteStore.setLoading(true)
            const response = await minuteService.createMinuteService(data)
            
            if (response.success && response.data) {
                const minute = transformMinuteResponse(response.data)
                minuteStore.addMinute(minute)
                showNotification('Minuta creada exitosamente', 'success')
                return true
            }
            return false
        } catch (error) {
            console.error('Error creating minute:', error)
            showNotification('Error al crear la minuta', 'error')
            return false
        } finally {
            minuteStore.setLoading(false)
        }
    }

    /**
     * Update an existing minute
     */
    const updateMinute = async (data: MinuteRequestType) => {
        try {
            minuteStore.setLoading(true)
            const response = await minuteService.updateMinuteService(data)
            
            if (response.success) {
                // Reload minutes to get updated data
                if (minuteStore.selectedProject) {
                    await loadMinutes(minuteStore.selectedProject.dni)
                }
                showNotification('Minuta actualizada exitosamente', 'success')
                return true
            }
            return false
        } catch (error) {
            console.error('Error updating minute:', error)
            showNotification('Error al actualizar la minuta', 'error')
            return false
        } finally {
            minuteStore.setLoading(false)
        }
    }

    /**
     * Delete a minute
     */
    const deleteMinute = async (dni: string) => {
        try {
            minuteStore.setLoading(true)
            const response = await minuteService.deleteMinuteService(dni)
            
            if (response.success) {
                minuteStore.deleteMinute(dni)
                showNotification('Minuta eliminada exitosamente', 'success')
                return true
            }
            return false
        } catch (error) {
            console.error('Error deleting minute:', error)
            showNotification('Error al eliminar la minuta', 'error')
            return false
        } finally {
            minuteStore.setLoading(false)
        }
    }

    return {
        loadProjects,
        loadMinutes,
        loadParticipants,
        createMinute,
        updateMinute,
        deleteMinute
    }
}
