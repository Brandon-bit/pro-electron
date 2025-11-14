import { defineStore } from 'pinia'
import type { ExamType, QuestionType } from '@/modules/DiagramasDeDecision/GestionDeExamenes/types/examTypes'

const useExamStore = defineStore('exam-store', {
    state: () => ({
        exams: [
            {
                id: '1',
                name: 'Certificación ERP - Módulo Finanzas',
                category: 'ERP',
                questions: 20,
                timeLimit: 30,
                passingScore: 80,
                attempts: 3,
                prerequisite: 'Doc: Manual de Usuario ERP',
                locked: false
            },
            {
                id: '2',
                name: 'Evaluación Portal de Empleados',
                category: 'Portal',
                questions: 15,
                timeLimit: 20,
                passingScore: 75,
                attempts: 2,
                prerequisite: 'Doc: Guía Portal Empleados',
                locked: true
            }
        ] as ExamType[],
        sampleQuestions: [
            {
                id: '1',
                text: '¿Cuál es el proceso correcto para crear una orden de compra en el nuevo sistema ERP?',
                type: 'multiple' as const,
                options: [
                    'Ir a Finanzas > Órdenes > Nueva',
                    'Ir a Compras > Órdenes > Crear Nueva',
                    'Ir a Inventario > Solicitudes > Nueva Orden',
                    'Ir a Proveedores > Órdenes > Crear'
                ],
                correctAnswer: 'Ir a Compras > Órdenes > Crear Nueva'
            },
            {
                id: '2',
                text: 'El sistema ERP permite aprobar órdenes de compra directamente desde el correo electrónico.',
                type: 'true_false' as const,
                options: ['Verdadero', 'Falso'],
                correctAnswer: 'Verdadero'
            }
        ] as QuestionType[],
        selectedExam: null as ExamType | null,
        isExamStarted: false,
        currentQuestion: 0,
        answers: {} as Record<string, string>,
        createModalId: 'create-exam-modal',
        examModalId: 'exam-taking-modal'
    }),
    actions: {
        addExam(name: string, category: string, timeLimit: number, passingScore: number, attempts: number) {
            const newExam: ExamType = {
                id: Date.now().toString(),
                name,
                category,
                questions: 0,
                timeLimit,
                passingScore,
                attempts,
                locked: false
            }
            this.exams.push(newExam)
        },
        selectExam(exam: ExamType) {
            this.selectedExam = exam
            this.isExamStarted = false
            this.currentQuestion = 0
            this.answers = {}
        },
        startExam() {
            this.isExamStarted = true
        },
        clearExam() {
            this.selectedExam = null
            this.isExamStarted = false
            this.currentQuestion = 0
            this.answers = {}
        },
        nextQuestion() {
            if (this.currentQuestion < this.sampleQuestions.length - 1) {
                this.currentQuestion++
            }
        },
        previousQuestion() {
            if (this.currentQuestion > 0) {
                this.currentQuestion--
            }
        },
        setAnswer(questionId: string, answer: string) {
            this.answers[questionId] = answer
        }
    },
    getters: {
        progress: (state) => {
            if (state.sampleQuestions.length === 0) return 0
            return ((state.currentQuestion + 1) / state.sampleQuestions.length) * 100
        },
        currentQuestionData: (state) => {
            return state.sampleQuestions[state.currentQuestion]
        },
        isLastQuestion: (state) => {
            return state.currentQuestion === state.sampleQuestions.length - 1
        }
    }
})

export default useExamStore
