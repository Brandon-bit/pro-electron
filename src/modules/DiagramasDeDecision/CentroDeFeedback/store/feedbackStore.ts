import { defineStore } from 'pinia'
import type { FeedbackItemType } from '@/modules/DiagramasDeDecision/CentroDeFeedback/types/feedbackTypes'

const useFeedbackStore = defineStore('feedback-store', {
    state: () => ({
        feedbackItems: [
            {
                id: '1',
                text: 'El nuevo proceso de aprobación es mucho más rápido',
                source: 'Encuesta',
                sentiment: 'positivo' as const,
                priority: 'baja' as const,
                tags: ['proceso', 'eficiencia']
            },
            {
                id: '2',
                text: 'Necesitamos más capacitación en el módulo de reportes',
                source: 'Correo',
                sentiment: 'neutral' as const,
                priority: 'alta' as const,
                tags: ['formación', 'reportes']
            }
        ] as FeedbackItemType[],
        createModalId: 'create-feedback-modal',
        detailsModalId: 'details-feedback-modal',
        selectedFeedback: null as FeedbackItemType | null
    }),
    actions: {
        addFeedback(text: string, source: string, sentiment: 'positivo' | 'neutral' | 'negativo', priority: 'alta' | 'media' | 'baja', tags: string[]) {
            const newFeedback: FeedbackItemType = {
                id: Date.now().toString(),
                text,
                source,
                sentiment,
                priority,
                tags
            }
            this.feedbackItems.push(newFeedback)
        },
        selectFeedback(feedback: FeedbackItemType) {
            this.selectedFeedback = feedback
        },
        clearSelectedFeedback() {
            this.selectedFeedback = null
        }
    }
})

export default useFeedbackStore
