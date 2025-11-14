import { defineStore } from 'pinia'
import type { SurveyType, QuestionTypeType, TemplateType } from '@/modules/DiagramasDeDecision/GestionDeEncuestas/types/surveyTypes'

const useSurveyStore = defineStore('survey-store', {
    state: () => ({
        surveys: [
            {
                id: '1',
                name: 'Readiness - Sistema ERP',
                type: 'readiness',
                status: 'active' as const,
                responses: 127,
                target: 200,
                readinessScore: 68
            },
            {
                id: '2',
                name: 'Satisfacción Post-GoLive',
                type: 'satisfaction',
                status: 'completed' as const,
                responses: 156,
                target: 150,
                readinessScore: 82
            }
        ] as SurveyType[],
        questionTypes: [
            { id: 'likert', type: 'likert' as const, label: 'Escala Likert', icon: '📊' },
            { id: 'nps', type: 'nps' as const, label: 'Net Promoter Score', icon: '⭐' },
            { id: 'multiple', type: 'multiple' as const, label: 'Opción Múltiple', icon: '☑️' },
            { id: 'text', type: 'text' as const, label: 'Texto Abierto', icon: '📝' }
        ] as QuestionTypeType[],
        templates: [
            { id: 'readiness', name: 'Readiness Assessment', description: 'Evaluación de preparación para el cambio' },
            { id: 'satisfaction', name: 'Post-GoLive Satisfaction', description: 'Satisfacción después del lanzamiento' },
            { id: 'adoption', name: 'Feature Adoption', description: 'Adopción de funcionalidades' }
        ] as TemplateType[],
        selectedSurvey: null as SurveyType | null,
        createModalId: 'create-survey-modal',
        resultsModalId: 'results-survey-modal'
    }),
    actions: {
        addSurvey(name: string, type: string) {
            const newSurvey: SurveyType = {
                id: Date.now().toString(),
                name,
                type,
                status: 'draft',
                responses: 0,
                target: 100,
                readinessScore: 0
            }
            this.surveys.push(newSurvey)
        },
        selectSurvey(survey: SurveyType) {
            this.selectedSurvey = survey
        },
        clearSelectedSurvey() {
            this.selectedSurvey = null
        }
    }
})

export default useSurveyStore
