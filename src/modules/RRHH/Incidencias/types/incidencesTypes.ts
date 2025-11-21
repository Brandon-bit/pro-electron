// ============================================
// ENUMS Y TIPOS BASE
// ============================================

// Categorías de incidencias
export type IncidenceCategory = 'ASISTENCIA' | 'INCAPACIDAD' | 'TIEMPO_EXTRA'

// Tipos de incidencias agrupados por categoría
export type IncidenceType =
    // ASISTENCIA
    | 'FALTA'
    | 'RETARDO'
    | 'SALIDA_ANTICIPADA'
    | 'PERMISO_CON_GOCE'
    | 'PERMISO_SIN_GOCE'
    // INCAPACIDAD
    | 'INCAPACIDAD_ENFERMEDAD_GENERAL'
    | 'INCAPACIDAD_RIESGO_TRABAJO'
    | 'INCAPACIDAD_MATERNIDAD_PATERNIDAD'
    // TIEMPO_EXTRA
    | 'HORAS_EXTRA'
    | 'TRABAJO_DIA_FESTIVO'

// Estados de la incidencia
export type IncidenceStatus = 'PENDIENTE' | 'APROBADA' | 'RECHAZADA' | 'APLICADA_NOMINA'

// ============================================
// TIPOS PARA CATÁLOGOS
// ============================================

export type IncidenceCategoryInfo = {
    id: IncidenceCategory
    label: string
}

export type IncidenceTypeInfo = {
    id: IncidenceType
    label: string
    category: IncidenceCategory
    requiresDateRange: boolean
    requiresHours: boolean
    requiresJustification: boolean
}

export type IncidenceStatusInfo = {
    id: IncidenceStatus
    label: string
    badgeClass: string
}

// ============================================
// BACKEND TYPES (Spanish keys)
// ============================================

export type Incidence = {
    id: number
    empleadoId: number
    empleadoNombre: string
    categoria: IncidenceCategory
    tipo: IncidenceType
    fechaInicio: string
    fechaFin?: string
    horas?: number
    justificada?: boolean
    comentarios?: string
    evidencia?: string
    estado: IncidenceStatus
    creadoPor: string
    creadoEn: string
    aprobadoPor?: string
    aprobadoEn?: string
}

// ============================================
// FRONTEND DTO TYPES (English keys)
// ============================================

export type IncidenceDTO = {
    id: number
    employeeId: number
    employeeName: string
    category: IncidenceCategory
    categoryLabel: string
    type: IncidenceType
    typeLabel: string
    startDate: string
    endDate?: string
    hours?: number
    justified?: boolean
    comments?: string
    evidence?: string
    status: IncidenceStatus
    statusLabel: string
    createdBy: string
    createdAt: string
    approvedBy?: string
    approvedAt?: string
}

// ============================================
// FORM TYPES
// ============================================

export type IncidenceFormDTO = {
    id?: number
    employeeId: number
    employeeName: string
    category: IncidenceCategory
    type: IncidenceType
    startDate: string
    endDate?: string
    hours?: number
    justified?: boolean
    comments?: string
    evidence?: FileList | null
}

// ============================================
// REQUEST TYPES (for backend)
// ============================================

export type IncidenceRequest = {
    empleadoId: number
    categoria: IncidenceCategory
    tipo: IncidenceType
    fechaInicio: string
    fechaFin?: string
    horas?: number
    justificada?: boolean
    comentarios?: string
    evidencia?: string
}

// ============================================
// UTILITY TYPES
// ============================================

export type SelectOptionDTO = {
    id: number | string
    label: string
}
