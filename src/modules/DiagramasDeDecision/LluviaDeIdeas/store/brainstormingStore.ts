import { defineStore } from 'pinia'
import type { StickyNoteType, CategoryType, PrioritizationScoreType, PhaseType, EvaluationModeType } from '@/modules/DiagramasDeDecision/LluviaDeIdeas/types/brainstormingTypes'

const useBrainstormingStore = defineStore('brainstorming-store', {
    state: () => ({
        activePhase: 'generate' as PhaseType,
        notes: [
            { id: '1', text: 'Automatizar el proceso de aprobaciones', color: 'bg-yellow-200', author: 'Usuario 1', votes: 0 },
            { id: '2', text: 'Implementar dashboard en tiempo real', color: 'bg-blue-200', author: 'Usuario 2', votes: 0 },
            { id: '3', text: 'Crear plantillas reutilizables', color: 'bg-green-200', author: 'Usuario 3', votes: 0 }
        ] as StickyNoteType[],
        categories: [
            { id: '1', name: 'Procesos', color: 'border-purple-500' },
            { id: '2', name: 'Tecnología', color: 'border-blue-500' },
            { id: '3', name: 'Recursos Humanos', color: 'border-green-500' }
        ] as CategoryType[],
        votesPerPerson: 3,
        userVotesLeft: 3,
        prioritizationScores: {} as Record<string, PrioritizationScoreType>,
        evaluationMode: 'voting' as EvaluationModeType,
        modalId: 'add-note-modal'
    }),
    actions: {
        setActivePhase(phase: PhaseType) {
            this.activePhase = phase
        },
        addNote(text: string, color: string) {
            const newNote: StickyNoteType = {
                id: Date.now().toString(),
                text,
                color,
                author: 'Usuario Actual',
                votes: 0
            }
            this.notes.push(newNote)
        },
        deleteNote(noteId: string) {
            this.notes = this.notes.filter(note => note.id !== noteId)
        },
        voteNote(noteId: string) {
            const note = this.notes.find(n => n.id === noteId)
            if (note && this.userVotesLeft > 0) {
                note.votes++
                this.userVotesLeft--
            }
        },
        assignCategory(noteId: string, categoryId: string) {
            const note = this.notes.find(n => n.id === noteId)
            if (note) {
                note.category = categoryId
            }
        },
        setPrioritizationScore(noteId: string, impact: number, effort: number) {
            this.prioritizationScores[noteId] = { impact, effort }
        },
        setEvaluationMode(mode: EvaluationModeType) {
            this.evaluationMode = mode
        }
    },
    getters: {
        topVotedNotes: (state) => {
            return [...state.notes].sort((a, b) => b.votes - a.votes).slice(0, 10)
        },
        notesByCategory: (state) => (categoryId: string) => {
            return state.notes.filter(note => note.category === categoryId)
        },
        unassignedNotes: (state) => {
            return state.notes.filter(note => !note.category)
        }
    }
})

export default useBrainstormingStore
