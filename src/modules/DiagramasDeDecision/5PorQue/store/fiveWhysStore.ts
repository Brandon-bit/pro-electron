import { defineStore } from 'pinia'
import type { WhyStepType } from '@/modules/DiagramasDeDecision/5PorQue/types/fiveWhysTypes'

const useFiveWhysStore = defineStore('five-whys-store', {
    state: () => ({
        problemStatement: 'El proyecto se retrasó 3 semanas',
        whySteps: [
            { id: 1, question: '¿Por qué el proyecto se retrasó 3 semanas?', answer: 'Porque las aprobaciones tomaron más tiempo del esperado', isRootCause: false },
            { id: 2, question: '¿Por qué las aprobaciones tomaron más tiempo del esperado?', answer: '', isRootCause: false }
        ] as WhyStepType[],
        currentAnswer: ''
    }),
    actions: {
        setWhySteps(steps: WhyStepType[]) {
            this.whySteps = steps
        },
        setCurrentAnswer(answer: string) {
            this.currentAnswer = answer
        },
        submitAnswer() {
            const currentStep = this.whySteps.length
            const updatedSteps = [...this.whySteps]
            updatedSteps[currentStep - 1].answer = this.currentAnswer

            if (currentStep < 5) {
                const nextQuestion = `¿Por qué ${this.currentAnswer.toLowerCase()}?`
                updatedSteps.push({
                    id: currentStep + 1,
                    question: nextQuestion,
                    answer: '',
                    isRootCause: false
                })
            }

            this.whySteps = updatedSteps
            this.currentAnswer = ''
        },
        toggleRootCause(stepId: number) {
            this.whySteps = this.whySteps.map(step =>
                step.id === stepId ? { ...step, isRootCause: !step.isRootCause } : step
            )
        },
        setProblemStatement(statement: string) {
            this.problemStatement = statement
        }
    },
    getters: {
        currentStep: (state) => {
            return state.whySteps.find(step => !step.answer) || state.whySteps[state.whySteps.length - 1]
        },
        completedSteps: (state) => {
            return state.whySteps.filter(s => s.answer).length
        },
        rootCauseSteps: (state) => {
            return state.whySteps.filter(s => s.isRootCause)
        },
        progressPercentage: (state) => {
            return (state.whySteps.filter(s => s.answer).length / 5) * 100
        }
    }
})

export default useFiveWhysStore
