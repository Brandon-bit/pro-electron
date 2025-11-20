import useMinuteStore from '@/modules/GestionDeProyectos/Operacion/Minutas/store/minuteStore'
import { minuteService } from '@/modules/GestionDeProyectos/Operacion/Minutas/services/minuteService'
import { showNotification } from '@/utils/toastNotifications'
import type { 
    AgreedActionRequestType, 
    AgreedActionResponseType,
    AgreedActionType,
    ParticipantType
} from '@/modules/GestionDeProyectos/Operacion/Minutas/types/minuteTypes'

const transformAgreedActionResponse = (response: AgreedActionResponseType): AgreedActionType => ({
    dni: response.dni,
    minuteDni: response.dniMinuta,
    minuteOrigin: response.minutaOrigen,
    description: response.descripcion,
    responsible: {
        dni: response.responsable.dni,
        name: response.responsable.nombre,
        email: response.responsable.correo
    },
    status: {
        dni: response.estatus.dni,
        name: response.estatus.nombre,
        color: response.estatus.color
    },
    dueDate: response.fechaLimite
})

export const useAgreedActionActions = () => {
    const minuteStore = useMinuteStore()

    /**
     * Create a new agreed action
     */
    const createAgreedAction = async (data: AgreedActionRequestType) => {
        try {
            minuteStore.setLoading(true)
            const response = await minuteService.createAgreedActionService(data)
            
            if (response.success && response.data) {
                // Reload the minute to get complete data
                const minuteResponse = await minuteService.getMinutesService(
                    minuteStore.selectedProject?.dni || ''
                )
                
                if (minuteResponse.success && minuteResponse.data) {
                    const updatedMinute = minuteResponse.data.find(m => m.dni === data.dniMinuta)
                    if (updatedMinute) {
                        const transformedMinute = {
                            projectDni: updatedMinute.dniProyecto,
                            name: updatedMinute.nombre,
                            date: updatedMinute.fecha,
                            agenda: updatedMinute.agenda,
                            discussedPoints: updatedMinute.puntosDiscutidos,
                            decisionsMade: updatedMinute.decisionesTomadas,
                            attendees: updatedMinute.asistentes.map(a => ({
                                dni: a.dni,
                                name: a.nombre,
                                email: a.correo
                            })),
                            agreedActions: updatedMinute.accionesAcordadas.map(a => ({
                                dni: a.dni,
                                minuteDni: a.dniMinuta,
                                minuteOrigin: a.minutaOrigen,
                                description: a.descripcion,
                                responsible: {
                                    dni: a.responsable.dni,
                                    name: a.responsable.nombre,
                                    email: a.responsable.correo
                                },
                                status: {
                                    dni: a.estatus.dni,
                                    name: a.estatus.nombre,
                                    color: a.estatus.color
                                },
                                dueDate: a.fechaLimite
                            }))
                        }
                        minuteStore.updateMinute(updatedMinute.dni, transformedMinute)
                    }
                }
                
                showNotification('Acción acordada creada exitosamente', 'success')
                return true
            }
            return false
        } catch (error) {
            console.error('Error creating agreed action:', error)
            showNotification('Error al crear la acción acordada', 'error')
            return false
        } finally {
            minuteStore.setLoading(false)
        }
    }

    /**
     * Update an existing agreed action
     */
    const updateAgreedAction = async (data: AgreedActionRequestType) => {
        try {
            minuteStore.setLoading(true)
            const response = await minuteService.updateAgreedActionService(data)
            
            if (response.success && data.dni) {
                // Reload the minute to get updated data including new responsible
                const minuteResponse = await minuteService.getMinutesService(
                    minuteStore.selectedProject?.dni || ''
                )
                
                if (minuteResponse.success && minuteResponse.data) {
                    // Find and update the specific minute
                    const updatedMinute = minuteResponse.data.find(m => m.dni === data.dniMinuta)
                    if (updatedMinute) {
                        // Transform and update in store
                        const transformedMinute = {
                            projectDni: updatedMinute.dniProyecto,
                            name: updatedMinute.nombre,
                            date: updatedMinute.fecha,
                            agenda: updatedMinute.agenda,
                            discussedPoints: updatedMinute.puntosDiscutidos,
                            decisionsMade: updatedMinute.decisionesTomadas,
                            attendees: updatedMinute.asistentes.map(a => ({
                                dni: a.dni,
                                name: a.nombre,
                                email: a.correo
                            })),
                            agreedActions: updatedMinute.accionesAcordadas.map(a => ({
                                dni: a.dni,
                                minuteDni: a.dniMinuta,
                                minuteOrigin: a.minutaOrigen,
                                description: a.descripcion,
                                responsible: {
                                    dni: a.responsable.dni,
                                    name: a.responsable.nombre,
                                    email: a.responsable.correo
                                },
                                status: {
                                    dni: a.estatus.dni,
                                    name: a.estatus.nombre,
                                    color: a.estatus.color
                                },
                                dueDate: a.fechaLimite
                            }))
                        }
                        minuteStore.updateMinute(updatedMinute.dni, transformedMinute)
                    }
                }
                
                showNotification('Acción acordada actualizada exitosamente', 'success')
                return true
            }
            return false
        } catch (error) {
            console.error('Error updating agreed action:', error)
            showNotification('Error al actualizar la acción acordada', 'error')
            return false
        } finally {
            minuteStore.setLoading(false)
        }
    }

    /**
     * Delete an agreed action
     */
    const deleteAgreedAction = async (minuteDni: string, actionDni: number) => {
        try {
            minuteStore.setLoading(true)
            const response = await minuteService.deleteAgreedActionService(actionDni)
            
            if (response.success) {
                minuteStore.deleteAgreedActionFromMinute(minuteDni, actionDni)
                showNotification('Acción acordada eliminada exitosamente', 'success')
                return true
            }
            return false
        } catch (error) {
            console.error('Error deleting agreed action:', error)
            showNotification('Error al eliminar la acción acordada', 'error')
            return false
        } finally {
            minuteStore.setLoading(false)
        }
    }

    return {
        createAgreedAction,
        updateAgreedAction,
        deleteAgreedAction
    }
}
