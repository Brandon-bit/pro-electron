export type StickyNoteType = {
    id: string
    text: string
    color: string
    author: string
    votes: number
    category?: string
}

export type CategoryType = {
    id: string
    name: string
    color: string
}

export type PrioritizationScoreType = {
    impact: number
    effort: number
}

export type NoteColorType = {
    value: string
    label: string
}

export type PhaseType = 'generate' | 'cluster' | 'evaluate'
export type EvaluationModeType = 'voting' | 'matrix' | 'scoring'
