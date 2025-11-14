// ============================================
// TYPES - AUDITORÍAS DE MANUALES Y POLÍTICAS
// ============================================

// Formulario de auditoría
export interface IFormulario {
    dni: number
    titulo: string
}

// Subdominio
export interface ISubdominio {
    dni: number
    titulo: string
    peso?: number              // Solo en modo "mejor opción"
    evaluacion: number         // 0-100 (modo normal)
    seleccionado: boolean      // Solo en modo "mejor opción"
    observaciones: string
}

// Dominio
export interface IDominio {
    dni: number
    titulo: string
    peso: number               // 0-100
    calificacion: number       // Calculada automáticamente
    Subdominios: ISubdominio[]
}

// Auditoría (Propuesta)
export interface IAuditoria {
    dni: number
    descripcion: string
    calificacion: number       // Calculada automáticamente
    mejor: boolean             // Si es la mejor calificación
    fechaFin: string | null    // Fecha finalización ISO
    strFechaFin: string | null // Fecha formateada
    show: boolean              // Accordion abierto/cerrado
    Dominios: IDominio[]
}

// Parámetros de URL
export interface IAuditoriaParams {
    idProc: number             // ID del proceso/manual
    idForm: number             // ID del formulario
    idAu?: number | null       // ID de auditoría específica (opcional)
}

// Payload para nueva auditoría
export interface INuevaAuditoriaPayload {
    dni: number                // ID del formulario
    dniProc: number            // ID del proceso
    descripcion: string        // Descripción de la auditoría
}

// Payload para terminar auditoría
export interface ITerminarAuditoriaPayload {
    dni: number                // ID de la auditoría
}

// Payload para modificar respuesta
export interface IModificarRespuestaPayload {
    dni: number                // ID del formulario
    dniProp: number            // ID de la auditoría
    dniDom: number             // ID del dominio
    dniSub: number             // ID del subdominio
    evaluacion: number         // Evaluación (0-100)
    observaciones: string      // Observaciones
    lista: IAuditoriaCalificacion[]  // Lista de calificaciones
}

// Calificación de auditoría (para lista)
export interface IAuditoriaCalificacion {
    dni: number
    calificacion: number
    mejor: boolean
}

// Payload para modificar subdominio (mejor opción)
export interface IModificarSubdominioPayload {
    dniPropuesta: number
    dniDominio: number
    dniSubdominio: number
    opcion: boolean            // Seleccionado o no
}

// Response genérico
export interface IResponse<T = any> {
    tipo: 'success' | 'error' | 'warning'
    titulo: string
    mensaje?: string
    m?: T
}

// State del Store
export interface IAuditoriasState {
    dniProc: number | null
    dniForm: number | null
    dniAu: number | null
    formularios: IFormulario[]
    auditorias: IAuditoria[]
    mejoropcion: boolean
    isLoading: boolean
}

// Color de calificación
export interface IColorCalificacion {
    badge: string
    border: string
    text: string
    bg: string
}

// Opciones de evaluación (0-100 en incrementos de 5)
export const OPCIONES_EVALUACION = [
    0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 
    55, 60, 65, 70, 75, 80, 85, 90, 95, 100
]
