import { defineStore } from 'pinia'
import type { RiskType, NewRiskType } from '@/modules/GestionDeProyectos/ControlDeRiesgos/types/riskTypes'

const useRiskStore = defineStore('risk-store', {
    state: () => ({
        risks: [
            {
                id: 'R001',
                description: 'Retraso en la entrega de componentes críticos',
                cause: 'Dependencia de proveedor único',
                effect: 'Retraso en cronograma de 2-3 semanas',
                probability: 4,
                impact: 5,
                score: 20,
                strategy: 'Mitigar',
                actions: 'Identificar proveedores alternativos',
                responsible: 'Juan Pérez',
                status: 'Activo',
                category: 'Cronograma'
            }
        ] as RiskType[],
        isModalOpen: false,
        editingRisk: null as RiskType | null
    }),
    actions: {
        setRisks(risks: RiskType[]) {
            this.risks = risks
        },
        addRisk(newRisk: NewRiskType) {
            const risk: RiskType = {
                id: `R${String(this.risks.length + 1).padStart(3, '0')}`,
                ...newRisk,
                score: newRisk.probability * newRisk.impact,
                status: 'Activo'
            }
            this.risks.push(risk)
        },
        updateRisk(id: string, updatedRisk: Partial<RiskType>) {
            const index = this.risks.findIndex(r => r.id === id)
            if (index !== -1) {
                this.risks[index] = { ...this.risks[index], ...updatedRisk }
                if (updatedRisk.probability || updatedRisk.impact) {
                    this.risks[index].score = this.risks[index].probability * this.risks[index].impact
                }
            }
        },
        deleteRisk(id: string) {
            this.risks = this.risks.filter(r => r.id !== id)
        },
        openModal() {
            this.isModalOpen = true
        },
        closeModal() {
            this.isModalOpen = false
            this.editingRisk = null
        },
        setEditingRisk(risk: RiskType | null) {
            this.editingRisk = risk
        }
    },
    getters: {
        activeRisks: (state) => state.risks.filter(r => r.status === 'Activo'),
        highRisks: (state) => state.risks.filter(r => r.score >= 15),
        risksWithStrategy: (state) => state.risks.filter(r => r.strategy),
        getRisksByCategory: (state) => (category: string) => {
            return state.risks.filter(r => r.category === category)
        }
    }
})

export default useRiskStore
