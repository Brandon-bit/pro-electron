import { defineStore } from 'pinia'
import type { StakeholderType, QuadrantType } from '@/modules/DiagramasDeDecision/MapaDeStakeholders/types/stakeholderTypes'

const useStakeholderStore = defineStore('stakeholder-store', {
    state: () => ({
        stakeholders: [
            { id: '1', name: 'CEO', role: 'Executive', power: 'high' as const, interest: 'high' as const, engagement: 'Champion' },
            { id: '2', name: 'Director TI', role: 'Leadership', power: 'high' as const, interest: 'high' as const, engagement: 'Supporter' },
            { id: '3', name: 'Manager RH', role: 'Management', power: 'low' as const, interest: 'high' as const, engagement: 'Neutral' }
        ] as StakeholderType[],
        quadrants: [
            {
                id: 'high-high',
                title: 'Gestión Cercana',
                description: 'Alto Poder / Alto Interés',
                color: 'bg-error/10',
                borderColor: 'border-error'
            },
            {
                id: 'high-low',
                title: 'Mantener Satisfecho',
                description: 'Alto Poder / Bajo Interés',
                color: 'bg-warning/10',
                borderColor: 'border-warning'
            },
            {
                id: 'low-high',
                title: 'Mantener Informado',
                description: 'Bajo Poder / Alto Interés',
                color: 'bg-info/10',
                borderColor: 'border-info'
            },
            {
                id: 'low-low',
                title: 'Monitorear',
                description: 'Bajo Poder / Bajo Interés',
                color: 'bg-base-300',
                borderColor: 'border-base-300'
            }
        ] as QuadrantType[],
        createModalId: 'create-stakeholder-modal'
    }),
    actions: {
        addStakeholder(name: string, role: string, power: 'high' | 'low', interest: 'high' | 'low', engagement: string) {
            const newStakeholder: StakeholderType = {
                id: Date.now().toString(),
                name,
                role,
                power,
                interest,
                engagement
            }
            this.stakeholders.push(newStakeholder)
        },
        updateStakeholder(id: string, power: 'high' | 'low', interest: 'high' | 'low') {
            const stakeholder = this.stakeholders.find(s => s.id === id)
            if (stakeholder) {
                stakeholder.power = power
                stakeholder.interest = interest
            }
        }
    },
    getters: {
        getStakeholdersByQuadrant: (state) => (power: 'high' | 'low', interest: 'high' | 'low') => {
            return state.stakeholders.filter(s => s.power === power && s.interest === interest)
        }
    }
})

export default useStakeholderStore
