import { defineStore } from 'pinia'
import type { ChangeRequestType, NewChangeRequestType } from '@/modules/GestionDeProyectos/ControlDeCambios/types/changeTypes'

const useChangeStore = defineStore('change-store', {
    state: () => ({
        changeRequests: [
            {
                id: 'CR001',
                title: 'Añadir módulo de reportes personalizados',
                description: 'Implementar funcionalidad para que usuarios creen reportes personalizados',
                justification: 'Solicitud del cliente principal para mejorar análisis de datos',
                requester: 'María García',
                dateRequested: '2024-01-15',
                status: 'Pendiente Aprobación' as const,
                impact: {
                    scope: 'Incremento: Nuevo módulo completo de reportes',
                    schedule: '+3 semanas al cronograma',
                    cost: '+$15,000 en desarrollo',
                    quality: 'Requiere testing extensivo',
                    risks: 'Posible conflicto con módulo existente de informes'
                }
            }
        ] as ChangeRequestType[],
        isModalOpen: false,
        currentStep: 1
    }),
    actions: {
        setChangeRequests(requests: ChangeRequestType[]) {
            this.changeRequests = requests
        },
        addChangeRequest(newCR: NewChangeRequestType) {
            const cr: ChangeRequestType = {
                id: `CR${String(this.changeRequests.length + 1).padStart(3, '0')}`,
                ...newCR,
                dateRequested: new Date().toISOString().split('T')[0],
                status: 'Abierta'
            }
            this.changeRequests.push(cr)
        },
        approveChangeRequest(id: string) {
            const index = this.changeRequests.findIndex(cr => cr.id === id)
            if (index !== -1) {
                this.changeRequests[index] = {
                    ...this.changeRequests[index],
                    status: 'Aprobada',
                    approver: 'Director PMO',
                    decision: 'Aprobada para implementación'
                }
            }
        },
        rejectChangeRequest(id: string) {
            const index = this.changeRequests.findIndex(cr => cr.id === id)
            if (index !== -1) {
                this.changeRequests[index] = {
                    ...this.changeRequests[index],
                    status: 'Rechazada',
                    approver: 'Director PMO',
                    decision: 'No alineado con objetivos actuales'
                }
            }
        },
        updateStatus(id: string, status: ChangeRequestType['status']) {
            const index = this.changeRequests.findIndex(cr => cr.id === id)
            if (index !== -1) {
                this.changeRequests[index].status = status
            }
        },
        openModal() {
            this.isModalOpen = true
            this.currentStep = 1
        },
        closeModal() {
            this.isModalOpen = false
            this.currentStep = 1
        },
        setCurrentStep(step: number) {
            this.currentStep = step
        }
    },
    getters: {
        getRequestsByStatus: (state) => (status: string) => {
            return state.changeRequests.filter(cr => cr.status === status)
        },
        pendingRequests: (state) => state.changeRequests.filter(cr => cr.status === 'Pendiente Aprobación'),
        approvedRequests: (state) => state.changeRequests.filter(cr => cr.status === 'Aprobada' || cr.status === 'Implementada'),
        rejectedRequests: (state) => state.changeRequests.filter(cr => cr.status === 'Rechazada')
    }
})

export default useChangeStore
