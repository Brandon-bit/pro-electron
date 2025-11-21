// Tipos para el módulo de Beneficios

// Tipo de beneficio
export type BenefitType = 'vacation' | 'training' | 'health' | 'wellness' | 'financial' | 'other'

// Estado del beneficio
export type BenefitStatus = 'active' | 'inactive' | 'pending'

// Estado de canje
export type RedemptionStatus = 'pending' | 'approved' | 'rejected' | 'completed'

// Categoría de reconocimiento
export type RecognitionCategory = 'teamwork' | 'innovation' | 'leadership' | 'excellence' | 'values'

// Beneficio en el marketplace
export interface Benefit {
    id: number
    name: string
    description: string
    type: BenefitType
    points: number
    icon: string
    color: string
    status: BenefitStatus
    availableQuantity?: number
    eligibilityRules?: string[]
}

// Configuración de beneficio
export interface BenefitConfig {
    id: number
    benefitId: number
    benefitName: string
    minScore?: number
    maxScore?: number
    department?: string
    position?: string
    isAutomatic: boolean
    createdAt: string
}

// Reconocimiento peer-to-peer
export interface Recognition {
    id: number
    fromEmployeeId: number
    fromEmployeeName: string
    fromEmployeeAvatar?: string
    toEmployeeId: number
    toEmployeeName: string
    toEmployeeAvatar?: string
    category: RecognitionCategory
    message: string
    points: number
    createdAt: string
}

// Canje de beneficio
export interface BenefitRedemption {
    id: number
    employeeId: number
    employeeName: string
    employeePosition: string
    employeeAvatar?: string
    benefitId: number
    benefitName: string
    pointsUsed: number
    status: RedemptionStatus
    requestDate: string
    approvalDate?: string
    completionDate?: string
}

// Elegibilidad de empleado
export interface EmployeeEligibility {
    id: number
    employeeId: number
    employeeName: string
    employeePosition: string
    employeeAvatar?: string
    score: number
    performanceRank: string // 'top10', 'top25', 'above4.5', 'above4.0'
    eligibleBenefits: string[]
    totalPoints: number
}

// Matriz de equivalencias (score -> beneficios)
export interface BenefitMatrix {
    id: number
    threshold: string // 'Top 10%', 'Score ≥ 4.5', etc.
    minScore: number
    benefits: string[]
    autoPoints: number
    color: 'success' | 'primary' | 'secondary' | 'warning'
}

// Estadísticas del dashboard
export interface BenefitsStats {
    availablePoints: number
    activeBenefits: number
    participatingEmployees: number
    monthlyRecognitions: number
}

// Formulario para crear/editar beneficio
export interface BenefitFormDTO {
    name: string
    description: string
    type: BenefitType
    points: number
    availableQuantity?: number
    eligibilityRules?: string[]
}

// Formulario para dar reconocimiento
export interface RecognitionFormDTO {
    toEmployeeId: number
    category: RecognitionCategory
    message: string
    points: number
}

// Formulario para configurar beneficio
export interface BenefitConfigFormDTO {
    name: string
    description: string
    availableQuantity: number
    minScore: number
}

// Formulario para editar matriz de beneficios
export interface BenefitMatrixFormDTO {
    threshold: string
    minScore: number
    benefits: string[]
    autoPoints: number
}

// Opciones para selects
export interface SelectOptionDTO {
    id: number
    label: string
}

// Historial de puntos
export interface PointsHistory {
    id: number
    employeeId: number
    employeeName: string
    type: 'earned' | 'spent' | 'bonus'
    points: number
    reason: string
    date: string
}
