import useMinuteStore from '@/modules/GestionDeProyectos/Operacion/Minutas/store/minuteStore'
import { minuteService } from '@/modules/GestionDeProyectos/Operacion/Minutas/services/minuteService'
import { showNotification } from '@/utils/toastNotifications'
import type { AttendeeRequestType, ParticipantResponseType, ParticipantType } from '@/modules/GestionDeProyectos/Operacion/Minutas/types/minuteTypes'

const transformParticipantResponse = (response: ParticipantResponseType): ParticipantType => ({
    dni: response.dni,
    name: response.nombre,
    email: response.correo
})

export const useAttendeeActions = () => {
    const minuteStore = useMinuteStore()

    /**
     * Add an attendee to a minute
     */
    const addAttendee = async (data: AttendeeRequestType) => {
        try {
            minuteStore.setLoading(true)
            const response = await minuteService.addAttendeeService(data)
            
            if (response.success && response.data) {
                const attendee = transformParticipantResponse(response.data)
                minuteStore.addAttendeeToMinute(data.dniMinuta, attendee)
                showNotification('Asistente agregado exitosamente', 'success')
                return true
            }
            return false
        } catch (error) {
            console.error('Error adding attendee:', error)
            showNotification('Error al agregar el asistente', 'error')
            return false
        } finally {
            minuteStore.setLoading(false)
        }
    }

    /**
     * Remove an attendee from a minute
     */
    const deleteAttendee = async (data: AttendeeRequestType) => {
        try {
            minuteStore.setLoading(true)
            const response = await minuteService.deleteAttendeeService(data)
            
            if (response.success) {
                minuteStore.removeAttendeeFromMinute(data.dniMinuta, data.dniUsuario)
                showNotification('Asistente eliminado exitosamente', 'success')
                return true
            }
            return false
        } catch (error) {
            console.error('Error deleting attendee:', error)
            showNotification('Error al eliminar el asistente', 'error')
            return false
        } finally {
            minuteStore.setLoading(false)
        }
    }

    return {
        addAttendee,
        deleteAttendee
    }
}
