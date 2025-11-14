import useBrainstormingStore from '@/modules/DiagramasDeDecision/LluviaDeIdeas/store/brainstormingStore'
import { showNotification } from '@/utils/toastNotifications'

export const useBrainstormingActions = () => {
    
    const brainstormingStore = useBrainstormingStore()

    const handleAddNote = (text: string, color: string) => {
        if (!text.trim()) {
            showNotification('Escribe una idea antes de agregar', 'error')
            return false
        }

        brainstormingStore.addNote(text, color)
        showNotification('Idea agregada al canvas', 'success')
        return true
    }

    const handleDeleteNote = (noteId: string) => {
        brainstormingStore.deleteNote(noteId)
        showNotification('Idea eliminada', 'success')
    }

    const handleVote = (noteId: string) => {
        if (brainstormingStore.userVotesLeft <= 0) {
            showNotification(`Solo tienes ${brainstormingStore.votesPerPerson} votos disponibles`, 'error')
            return
        }

        brainstormingStore.voteNote(noteId)
        showNotification('Voto registrado', 'success')
    }

    const handleCategoryAssign = (noteId: string, categoryId: string) => {
        brainstormingStore.assignCategory(noteId, categoryId)
        showNotification('Categoría asignada', 'success')
    }

    const getMatrixQuadrant = (impact: number, effort: number): string => {
        if (impact >= 3 && effort <= 2) return 'Alta Prioridad (Quick Wins)'
        if (impact >= 3 && effort >= 3) return 'Proyectos Estratégicos'
        if (impact <= 2 && effort <= 2) return 'Mejoras Incrementales'
        return 'Baja Prioridad'
    }

    const getQuadrantColor = (quadrant: string): string => {
        switch (quadrant) {
            case 'Alta Prioridad (Quick Wins)': return 'bg-green-100 border-green-500'
            case 'Proyectos Estratégicos': return 'bg-blue-100 border-blue-500'
            case 'Mejoras Incrementales': return 'bg-yellow-100 border-yellow-500'
            default: return 'bg-base-300 border-base-300'
        }
    }

    const handleExportReport = () => {
        showNotification('Reporte generado exitosamente', 'success')
    }

    const handleConvertToTask = (noteId: string) => {
        const note = brainstormingStore.notes.find(n => n.id === noteId)
        if (note) {
            showNotification(`"${note.text}" convertida en tarea del proyecto`, 'success')
        }
    }

    return {
        handleAddNote,
        handleDeleteNote,
        handleVote,
        handleCategoryAssign,
        getMatrixQuadrant,
        getQuadrantColor,
        handleExportReport,
        handleConvertToTask
    }
}
