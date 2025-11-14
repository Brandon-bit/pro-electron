import type { SupportFormType, SupportTicketType } from '@/navbar/Soporte/types/supportTypes'

// Servicio para futuras integraciones con el backend
export const supportService = {
    /**
     * Envía un ticket de soporte al backend
     * @param formData - Datos del formulario de soporte
     * @returns Promise con el ticket creado
     */
    async createTicket(formData: SupportFormType): Promise<SupportTicketType> {
        // TODO: Implementar llamada al API
        // const response = await axiosInstance.post('/api/support/tickets', formData)
        // return response.data
        
        // Por ahora retornamos un mock
        return {
            id: Date.now().toString(),
            name: formData.name,
            email: formData.email,
            description: formData.description,
            attachments: formData.attachments,
            status: 'pending',
            createdAt: new Date().toISOString()
        }
    },

    /**
     * Obtiene todos los tickets de soporte
     * @returns Promise con la lista de tickets
     */
    async getTickets(): Promise<SupportTicketType[]> {
        // TODO: Implementar llamada al API
        // const response = await axiosInstance.get('/api/support/tickets')
        // return response.data
        
        return []
    },

    /**
     * Obtiene un ticket específico por ID
     * @param ticketId - ID del ticket
     * @returns Promise con el ticket
     */
    async getTicketById(ticketId: string): Promise<SupportTicketType | null> {
        // TODO: Implementar llamada al API
        // const response = await axiosInstance.get(`/api/support/tickets/${ticketId}`)
        // return response.data
        
        return null
    }
}
