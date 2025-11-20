export type ActionStatus = 'Pendiente' | 'En Progreso' | 'Completada'

export type ActionItemType = {
    id: string
    description: string
    responsible: string
    dueDate: string
    status: ActionStatus
}

export type MinuteType = {
    id: string
    projectId: number
    title: string
    date: string
    time: string
    attendees: string[]
    absentees: string[]
    agenda: string
    discussion: string
    decisions: string
    actionItems: ActionItemType[]
    distributed: boolean
}

export type NewMinuteType = {
    projectId: number
    title: string
    date: string
    time: string
    attendees: string[]
    absentees: string[]
    agenda: string
    discussion: string
    decisions: string
    actionItems: ActionItemType[]
    distributed: boolean
}

export type ProjectOptionType = {
    dni: number
    label: string
}

export type ActionItemWithMinute = ActionItemType & {
    minuteId: string
    minuteTitle: string
}
