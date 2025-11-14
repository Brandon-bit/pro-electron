import { defineStore } from 'pinia'
import type { SupportTicketType } from '@/navbar/Soporte/types/supportTypes'

const useSupportStore = defineStore('support-store', {
    state: () => ({
        tickets: [] as SupportTicketType[],
        isSubmitting: false
    }),
    actions: {
        addTicket(name: string, email: string, description: string, attachments: File[]) {
            const newTicket: SupportTicketType = {
                id: Date.now().toString(),
                name,
                email,
                description,
                attachments,
                status: 'pending',
                createdAt: new Date().toISOString()
            }
            this.tickets.push(newTicket)
        },
        setSubmitting(value: boolean) {
            this.isSubmitting = value
        }
    }
})

export default useSupportStore
