// Backend response type (español)
export type Competency = {
    id?: number
    nombre: string
    descripcion?: string
    categoria: 'tecnica' | 'conductual' | 'liderazgo'
    activo: boolean
}

// Frontend DTO type (inglés)
export type CompetencyDTO = {
    id?: number
    name: string
    description?: string
    category: 'technical' | 'behavioral' | 'leadership'
    active: boolean
}

// Form type for create/update
export type CompetencyFormDTO = {
    id?: number
    name: string
    description?: string
    category: 'technical' | 'behavioral' | 'leadership'
    active: boolean
}

// Request type to backend
export type CompetencyRequest = {
    id?: number
    nombre: string
    descripcion?: string
    categoria: 'tecnica' | 'conductual' | 'liderazgo'
    activo: boolean
}

// Select option type for dropdowns
export type SelectOptionDTO = {
    id: number
    label: string
}
