// Backend response type (español)
export type Campaign = {
    id?: number
    nombre: string
    descripcion?: string
    tipoEvaluacion: '360' | 'desempeno' | 'competencias'
    fechaInicio: string
    fechaFin: string
    departamentos: number[]
    empleados: number[]
    competencias: number[]
    incluirTodosEmpleados: boolean
    activo: boolean
}

// Frontend DTO type (inglés)
export type CampaignDTO = {
    id?: number
    name: string
    description?: string
    evaluationType: '360' | 'performance' | 'competencies'
    startDate: string
    endDate: string
    departments?: number[]
    employees?: number[]
    competencies: number[]
    includeAllEmployees: boolean
    active: boolean
}

// Form type for create/update
export type CampaignFormDTO = {
    id?: number
    name: string
    description?: string
    evaluationType: '360' | 'performance' | 'competencies'
    startDate: string
    endDate: string
    departments?: number[]
    employees?: number[]
    competencies: number[]
    includeAllEmployees: boolean
    active: boolean
}

// Request type to backend
export type CampaignRequest = {
    id?: number
    nombre: string
    descripcion?: string
    tipoEvaluacion: '360' | 'desempeno' | 'competencias'
    fechaInicio: string
    fechaFin: string
    departamentos: number[]
    empleados: number[]
    competencias: number[]
    incluirTodosEmpleados: boolean
    activo: boolean
}

// Select option type for dropdowns
export type SelectOptionDTO = {
    id: number
    label: string
}
