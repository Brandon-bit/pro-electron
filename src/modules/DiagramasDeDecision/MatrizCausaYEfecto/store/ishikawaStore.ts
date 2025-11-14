import { defineStore } from 'pinia'
import type { CauseType } from '@/modules/DiagramasDeDecision/MatrizCausaYEfecto/types/ishikawaTypes'

const useIshikawaStore = defineStore('ishikawa-store', {
    state: () => ({
        problemStatement: 'Retrasos en Entregas del Proyecto',
        causes: [
            { id: '1', text: 'Falta de mantenimiento preventivo', category: 'machine', weight: 8, votes: 5, evidence: '' },
            { id: '2', text: 'Proceso de aprobación ineficiente', category: 'method', weight: 9, votes: 7, evidence: '' },
            { id: '3', text: 'Personal sin capacitación adecuada', category: 'manpower', weight: 7, votes: 4, evidence: '' }
        ] as CauseType[],
        selectedCause: null as CauseType | null,
        modalId: 'cause-detail-modal'
    }),
    actions: {
        setCauses(causes: CauseType[]) {
            this.causes = causes
        },
        addCause(text: string, category: string) {
            const newCause: CauseType = {
                id: Date.now().toString(),
                text,
                category,
                weight: 5,
                votes: 0,
                evidence: ''
            }
            this.causes.push(newCause)
        },
        updateCause(updatedCause: CauseType) {
            const index = this.causes.findIndex(c => c.id === updatedCause.id)
            if (index !== -1) {
                this.causes[index] = updatedCause
            }
        },
        voteCause(causeId: string) {
            const cause = this.causes.find(c => c.id === causeId)
            if (cause) {
                cause.votes++
            }
        },
        selectCause(cause: CauseType) {
            this.selectedCause = cause
        },
        clearSelectedCause() {
            this.selectedCause = null
        },
        setProblemStatement(statement: string) {
            this.problemStatement = statement
        }
    },
    getters: {
        getCausesByCategory: (state) => (categoryId: string) => {
            return state.causes.filter(c => c.category === categoryId)
        }
    }
})

export default useIshikawaStore
