// Tipos para Gestión de Talentos

// Niveles de potencial y desempeño
export type PotentialLevel = 'high' | 'medium' | 'low'
export type PerformanceLevel = 'high' | 'medium' | 'low'

// Empleado en la Matriz 9-Box
export interface NineBoxEmployee {
    id: number
    name: string
    position: string
    department: string
    score: number
    potential: PotentialLevel
    performance: PerformanceLevel
    avatar?: string
}

// Estructura de la Matriz 9-Box
export interface NineBoxGrid {
    highPotential: {
        low: NineBoxEmployee[]
        medium: NineBoxEmployee[]
        high: NineBoxEmployee[]
    }
    mediumPotential: {
        low: NineBoxEmployee[]
        medium: NineBoxEmployee[]
        high: NineBoxEmployee[]
    }
    lowPotential: {
        low: NineBoxEmployee[]
        medium: NineBoxEmployee[]
        high: NineBoxEmployee[]
    }
}

// Sucesor para un rol
export interface Successor {
    id: number
    name: string
    position: string
    score: number
    readiness: 'ready' | 'development' // Listo ahora o en 1-2 años
    isHighPotential: boolean
    avatar?: string
}

// Plan de Sucesión
export interface SuccessionPlan {
    id: number
    role: string
    currentHolder: string
    currentHolderAvatar?: string
    isCritical: boolean
    readyNow: Successor[]
    inDevelopment: Successor[]
}

// Tipo de movimiento de carrera
export type CareerMoveType = 'vertical' | 'lateral'

// Siguiente rol en el mapa de carrera
export interface NextRole {
    id: number
    name: string
    type: CareerMoveType
    skillGaps: string[]
    estimatedTime: string // Ej: "6-12 meses"
}

// Mapa de Carrera
export interface CareerPath {
    id: number
    currentRole: string
    currentDepartment: string
    nextRoles: NextRole[]
}

// Nivel de habilidad
export type SkillLevel = 'critical' | 'warning' | 'good' | 'excellent'

// Brecha de Habilidad
export interface SkillGap {
    id: number
    skill: string
    coverage: number // Porcentaje 0-100
    level: SkillLevel
    employeesWithSkill: number
    totalEmployees: number
}

// Plan de Desarrollo Individual (PDI)
export interface PDI {
    id: number
    employeeId: number
    employeeName: string
    employeePosition: string
    competency: string
    action: string
    startDate: string
    endDate: string
    progress: number // Porcentaje 0-100
    status: 'active' | 'completed' | 'paused'
    avatar?: string
}

// Formulario para crear/editar PDI
export interface PDIFormDTO {
    employeeId: number
    competency: string
    action: string
    startDate: string
    endDate: string
}

// Estadísticas del Dashboard
export interface TalentStats {
    highPotentials: number
    inDevelopment: number
    criticalRoles: number
    criticalSkillGaps: number
}

// Opciones para selects
export interface SelectOptionDTO {
    id: number
    label: string
}
