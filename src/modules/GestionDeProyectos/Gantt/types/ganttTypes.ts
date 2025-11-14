export type StatusType = 
    | 'finished'
    | 'critical'
    | 'immediate'
    | 'controllable'
    | 'delayed'
    | 'ontime'

export type ProjectGanttType = {
    id: string
    folio: string
    name: string
    startDate: string
    endDate: string
    status: StatusType
    stages: number
    activities: number
}

export type GanttTaskType = {
    id: number
    name: string
    level: number
    startDate: string | null
    endDate: string | null
    duration: number
    responsible: string
    dependencies: number[]
    progress: number
    parentId: number | null
}

export type StatusConfigType = {
    label: string
    color: string
    bgColor: string
}

export const STATUS_CONFIG: Record<StatusType, StatusConfigType> = {
    finished: { 
        label: 'Proyecto finalizado', 
        color: 'text-success', 
        bgColor: 'bg-success/20' 
    },
    critical: { 
        label: 'Proyecto atrasado crítico', 
        color: 'text-error', 
        bgColor: 'bg-error/30' 
    },
    immediate: { 
        label: 'Proyecto atrasado atención inmediata', 
        color: 'text-error', 
        bgColor: 'bg-error/20' 
    },
    controllable: { 
        label: 'Proyecto atrasado controlable', 
        color: 'text-warning', 
        bgColor: 'bg-warning/20' 
    },
    delayed: { 
        label: 'Proyecto atrasado', 
        color: 'text-warning', 
        bgColor: 'bg-warning/10' 
    },
    ontime: { 
        label: 'Proyecto en tiempo', 
        color: 'text-info', 
        bgColor: 'bg-info/20' 
    }
}
