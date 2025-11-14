export type SurveyType = {
    id: string
    name: string
    type: string
    status: 'draft' | 'active' | 'completed'
    responses: number
    target: number
    readinessScore?: number
}

export type QuestionTypeType = {
    id: string
    type: 'likert' | 'nps' | 'multiple' | 'text'
    label: string
    icon: string
}

export type TemplateType = {
    id: string
    name: string
    description: string
}

export type RecommendedActionType = {
    id: string
    title: string
    description: string
}
