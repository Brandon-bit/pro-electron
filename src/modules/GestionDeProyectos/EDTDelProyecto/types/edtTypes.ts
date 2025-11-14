export type EDTNodeType = {
    id: string
    name: string
    level: number
    children: EDTNodeType[]
    parentId: string | null
}

export type ProjectDataType = {
    id: string | number
    name: string
    classification: string
}

export type EDTResponseType = {
    id: number
    nombre: string
    nivel: number
    padreId: number | null
    proyectoId: number
    fechaCreacion: Date
    activo: boolean
    eliminado: boolean
}

export type EDTFormType = {
    name: string
    level: number
    parentId: string | null
    projectId: number
}

export type GanttTaskType = {
    id: number
    name: string
    level: number
    parentId: number | null
    startDate: Date | null
    endDate: Date | null
    duration: number
    dependencies: number[]
    responsible: string
}
