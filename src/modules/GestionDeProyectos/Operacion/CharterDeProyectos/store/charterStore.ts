import { defineStore } from 'pinia'
import type { CharterType, NewCharterType } from '@/modules/GestionDeProyectos/Operacion/CharterDeProyectos/types/charterTypes'

const useCharterStore = defineStore('charter-store', {
    state: () => ({
        charters: [
            {
                id: 'CH001',
                projectName: 'Implementación Sistema ERP',
                description: 'Proyecto para implementar un sistema ERP integrado que unifique procesos de finanzas, recursos humanos y operaciones',
                justification: 'Reducir costos operativos en un 25% y mejorar eficiencia mediante automatización',
                objectives: '1. Implementar módulos core en 6 meses\n2. Capacitar 200 usuarios\n3. Migrar datos históricos\n4. Lograr 95% de adopción',
                scope: 'Módulos: Finanzas, RH, Inventario, Compras. Incluye capacitación y migración de datos',
                exclusions: 'No incluye módulo de producción ni CRM. Mantenimiento post go-live bajo contrato separado',
                milestones: 'M1: Diseño (Mes 2)\nM2: Desarrollo (Mes 4)\nM3: Testing (Mes 5)\nM4: Go-Live (Mes 6)',
                budget: '$250,000 - $300,000',
                risks: 'R1: Resistencia al cambio\nR2: Problemas en migración de datos\nR3: Disponibilidad de recursos clave',
                stakeholders: 'CFO, Director RH, Gerente Operaciones, Equipo IT, Usuarios finales',
                projectManager: 'Juan Rodríguez',
                sponsor: 'María Fernández (CFO)',
                status: 'Aprobado' as const,
                version: '1.0',
                createdDate: '2024-01-10',
                approvedDate: '2024-01-15'
            }
        ] as CharterType[],
        isCreateModalOpen: false,
        isViewModalOpen: false,
        viewingCharter: null as CharterType | null
    }),
    actions: {
        setCharters(charters: CharterType[]) {
            this.charters = charters
        },
        addCharter(newCharter: NewCharterType) {
            const charter: CharterType = {
                id: `CH${String(this.charters.length + 1).padStart(3, '0')}`,
                ...newCharter,
                createdDate: new Date().toISOString().split('T')[0]
            }
            this.charters.push(charter)
        },
        updateCharterStatus(id: string, status: CharterType['status']) {
            const index = this.charters.findIndex(ch => ch.id === id)
            if (index !== -1) {
                this.charters[index].status = status
                if (status === 'Aprobado') {
                    this.charters[index].approvedDate = new Date().toISOString().split('T')[0]
                }
            }
        },
        approveCharter(id: string) {
            this.updateCharterStatus(id, 'Aprobado')
        },
        sendToReview(id: string) {
            this.updateCharterStatus(id, 'En Revisión')
        },
        openCreateModal() {
            this.isCreateModalOpen = true
        },
        closeCreateModal() {
            this.isCreateModalOpen = false
        },
        openViewModal(charter: CharterType) {
            this.viewingCharter = charter
            this.isViewModalOpen = true
        },
        closeViewModal() {
            this.isViewModalOpen = false
            this.viewingCharter = null
        }
    },
    getters: {
        totalCharters: (state) => state.charters.length,
        inReviewCharters: (state) => state.charters.filter(ch => ch.status === 'En Revisión'),
        approvedCharters: (state) => state.charters.filter(ch => ch.status === 'Aprobado')
    }
})

export default useCharterStore
