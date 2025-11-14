// ============================================
// INTERFACES
// ============================================

// Actividad dentro de una fase
export interface IActividad {
    dni: number
    nombre: string
    finalizada: boolean
    fechaFinalizacion?: string
}

// Fase de metodología
export interface IFase {
    dni: number
    nombre: string
    descripcion?: string
    activa: boolean
    finalizada: boolean
    Start?: string // ISO string
    End?: string // ISO string
    Actividades: IActividad[]
    orden: number
}

// Proceso
export interface IProceso {
    id: number
    nombre: string
    codigo?: string
    descripcion?: string
}

// Tiempo calculado del cronómetro
export interface ITimeDiff {
    months: number
    days: number
    hours: number
    minutes: number
    seconds: number
}

// ============================================
// PAYLOADS
// ============================================

// Crear actividad
export interface ICreateActividadPayload {
    dniFase: number
    nombre: string
    dniProc: number
}

// Finalizar actividad (marcar checkbox)
export interface IFinalizarActividadPayload {
    dniFase: number
    dni: number // dni de la actividad
    dniProc: number
}

// Eliminar actividad
export interface IDeleteActividadPayload {
    dniFase: number
    dni: number // dni de la actividad
    dniProc: number
}

// ============================================
// RESPONSE
// ============================================

export interface IMetodologiaResponse {
    status: 'success' | 'error'
    message: string
    data?: any
}

// Datos iniciales
export interface IMetodologiaData {
    Proceso: IProceso
    Metodologias: IFase[]
}

// ============================================
// HELPERS
// ============================================

// Estado visual de una fase
export type FaseEstado = 'no-iniciada' | 'activa' | 'finalizada'

// Configuración de colores por estado
export interface IFaseColorConfig {
    bg: string
    border: string
    text: string
    badge: string
}
