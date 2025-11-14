import useSupportStore from '@/navbar/Soporte/store/supportStore'
import { showNotification } from '@/utils/toastNotifications'

export const useSupportActions = () => {
    
    const supportStore = useSupportStore()

    const handleSubmitTicket = async (
        name: string,
        email: string,
        description: string,
        attachments: File[]
    ): Promise<boolean> => {
        // Validaciones
        if (!name.trim()) {
            showNotification('El nombre es requerido', 'error')
            return false
        }

        if (!email.trim()) {
            showNotification('El email es requerido', 'error')
            return false
        }

        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            showNotification('El email no tiene un formato válido', 'error')
            return false
        }

        if (!description.trim()) {
            showNotification('La descripción del problema es requerida', 'error')
            return false
        }

        if (description.trim().length < 10) {
            showNotification('La descripción debe tener al menos 10 caracteres', 'error')
            return false
        }

        try {
            supportStore.setSubmitting(true)
            
            // Aquí iría la llamada al API
            // await supportService.createTicket(...)
            
            // Por ahora solo guardamos en el store
            supportStore.addTicket(name, email, description, attachments)
            
            showNotification('Tu solicitud ha sido enviada exitosamente. Te contactaremos pronto.', 'success')
            return true
        } catch (error) {
            showNotification('Error al enviar la solicitud. Por favor intenta nuevamente.', 'error')
            return false
        } finally {
            supportStore.setSubmitting(false)
        }
    }

    return {
        handleSubmitTicket
    }
}
