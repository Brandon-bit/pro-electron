// ============================================
// API Response Types
// ============================================

export type AttendeeResponseType = {
    dni: string
    nombre: string
    correo: string
}

export type LessonCategoryResponseType = {
    dni: number
    nombre: string
    descripcion: string
    activo: boolean
}

export type LessonLearnedResponseType = {
    dni: string
    dniProyecto: string
    categoria: LessonCategoryResponseType
    faseProyecto: string
    descripcion: string
    causas: string
    impacto: string
    leccionAprendida: string
    recomendacion: string
    tipo: string
    autor: string
    etiquetas: string[]
    asistentes: AttendeeResponseType[]
    activo: boolean
}

export type ProjectOptionResponseType = {
    dni: string
    label: string
}

export type CategoryOptionResponseType = {
    dni: number
    label: string
}

// ============================================
// API Request Types
// ============================================

export type LessonLearnedRequestType = {
    dni?: string
    dniProyecto: string
    dniCategoria: number
    faseProyecto: string
    descripcion: string
    causas: string
    impacto: string
    leccionAprendida: string
    recomendacion: string
    tipo: string
    etiquetas: string[]
    autor: string
    activo: boolean
}

export type AttendeeRequestType = {
    dniLeccionAprendida: string
    dniUsuario: string
}

// ============================================
// Internal/Store Types
// ============================================

export type AttendeeType = {
    dni: string
    name: string
    email: string
}

export type LessonCategoryType = {
    dni: number
    name: string
    description: string
    active: boolean
}

export type LessonLearnedType = {
    dni: string
    projectDni: string
    category: LessonCategoryType
    projectPhase: string
    description: string
    causes: string
    impact: string
    lessonLearned: string
    recommendation: string
    type: string
    author: string
    tags: string[]
    attendees: AttendeeType[]
    active: boolean
}

export type ProjectOptionType = {
    dni: string
    label: string
}

export type CategoryOptionType = {
    dni: number
    label: string
}

// Form types
export type LessonLearnedFormType = {
    dniCategoria: number
    faseProyecto: string
    descripcion: string
    causas: string
    impacto: string
    leccionAprendida: string
    recomendacion: string
    tipo: string
    etiquetas: string[]
    autor: string
}
