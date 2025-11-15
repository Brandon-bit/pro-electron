export type LessonType = 'Positiva' | 'Negativa'

export type LessonCategory = 'Alcance' | 'Cronograma' | 'Costo' | 'Calidad' | 'Recursos' | 'Comunicación' | 'Riesgos' | 'Stakeholders' | 'Integración'

export type ProjectPhase = 'Inicio' | 'Planificación' | 'Ejecución' | 'Monitoreo y Control' | 'Cierre'

export type LessonLearnedType = {
    id: string
    project: string
    phase: ProjectPhase
    situation: string
    cause: string
    impact: string
    lesson: string
    recommendation: string
    category: LessonCategory
    type: LessonType
    tags: string[]
    author: string
    date: string
}

export type NewLessonType = {
    project: string
    phase: ProjectPhase
    situation: string
    cause: string
    impact: string
    lesson: string
    recommendation: string
    category: LessonCategory
    type: LessonType
    tags: string[]
    author: string
}
