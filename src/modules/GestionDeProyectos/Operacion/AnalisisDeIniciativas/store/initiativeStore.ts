import { defineStore } from 'pinia'
import type { InitiativeType, MatrixCriteriaType } from '@/modules/GestionDeProyectos/Operacion/AnalisisDeIniciativas/types/initiativeTypes'

const initialInitiative: InitiativeType = {
    id: undefined,
    classification: '',
    name: '',
    investment: 'Medio',
    scope: 'Medio',
    timeHorizon: 'Medio',
    savings: 'Medio',
    benefits: 'Medio',
    satisfaction: 'Medio',
    selected: false,
    effortScore: 0,
    impactScore: 0,
    strategicAlignment: 0,
    active: true
}

const defaultCriteria: MatrixCriteriaType = {
    effort: {
        investment: 40,
        scope: 30,
        timeHorizon: 30
    },
    impact: {
        savings: 40,
        benefits: 35,
        satisfaction: 25
    }
}

const useInitiativeStore = defineStore('initiative-store', {
    state: () => ({
        selectedInitiative: initialInitiative as InitiativeType,
        modalId: 'initiative-modal',
        matrixCriteria: defaultCriteria as MatrixCriteriaType,
        selectedInitiatives: [] as InitiativeType[]
    }),
    actions: {
        setData(data: InitiativeType = initialInitiative) {
            this.selectedInitiative = data
        },
        toggleSelection(id: number) {
            const index = this.selectedInitiatives.findIndex(init => init.id === id)
            if (index > -1) {
                this.selectedInitiatives.splice(index, 1)
            } else {
                const initiative = this.selectedInitiatives.find(init => init.id === id)
                if (initiative) {
                    this.selectedInitiatives.push(initiative)
                }
            }
        },
        updateCriteria(criteria: MatrixCriteriaType) {
            this.matrixCriteria = criteria
        }
    }
})

export default useInitiativeStore
