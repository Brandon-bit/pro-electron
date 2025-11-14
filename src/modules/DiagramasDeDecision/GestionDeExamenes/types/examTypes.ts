export type QuestionType = {
    id: string
    text: string
    type: 'multiple' | 'true_false' | 'open'
    options?: string[]
    correctAnswer?: string
}

export type ExamType = {
    id: string
    name: string
    category: string
    questions: number
    timeLimit: number
    passingScore: number
    attempts: number
    prerequisite?: string
    locked: boolean
}
