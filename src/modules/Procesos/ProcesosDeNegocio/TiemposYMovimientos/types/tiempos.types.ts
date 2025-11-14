// ============================================
// INTERFACES PRINCIPALES
// ============================================

// Proceso
export interface IProceso {
    id: number
    nombre: string
}

// Área
export interface IArea {
    dni: number
    nombre: string
    Puestos: IPuesto[]
}

// Puesto
export interface IPuesto {
    dni: number
    nombre: string
    horasTrabajo: string // "HH:mm"
    horaInicio: string // "HH:mm"
    horaFin: string // "HH:mm"
    tiempoMuerto: string // "HH:mm:ss"
    tiempoAcumulado?: string // Calculado "DDd:HH:mm:ss"
    strTiempoAcomulado?: string // Calculado
    operacionLaboral?: number // Calculado %
    efectividadOperacional?: number // Calculado %
    Actividades: IActividad[]
}

// Actividad
export interface IActividad {
    dni: number
    nombre: string
    dias: number // Días medidos
    strTiempoMuerto: string // "hh:mm:ss"
    frecuencia: 'diario' | 'por evento'
    personas: number // 1-10
    recomendaciones: string
    activa: boolean
    finalizada: boolean
    Start?: IDateTime // Luxon object
    End?: IDateTime
    dateDiff?: IDateDiff
    cronometro?: any // Interval ID
}

// Tiempo Movimiento (Área en el proceso)
export interface ITiempoMovimiento {
    dni: number
    nombre: string // Nombre del área
    dniArea: number
    Puestos: IPuesto[]
}

// Modelo principal
export interface ITablaMovimientos {
    Proceso: IProceso
    Areas: IArea[]
    Lista: ITiempoMovimiento[]
}

// ============================================
// DATETIME (Luxon-like)
// ============================================

export interface IDateTime {
    year: number
    month: number
    day: number
    hour: number
    minute: number
    second: number
}

export interface IDateDiff {
    months: number
    days: number
    hours: number
    minutes: number
    seconds: number
}

// ============================================
// ESTADÍSTICAS Y KPIs
// ============================================

// KPIs por puesto
export interface IKPIsPuesto {
    tiempoAcumulado: string
    tiemposMuertos: string
    horasTrabajo: string
    operacionLaboral: number
    efectividadOperacional: number
}

// KPIs globales (todas las áreas)
export interface IKPIsGlobales {
    totalAreas: number
    totalPuestos: number
    totalActividades: number
    actividadesActivas: number
    promedioEfectividad: number
    mayorEfectividad: { nombre: string; valor: number }
    menorEfectividad: { nombre: string; valor: number }
}

// Datos para gráficas
export interface IDatosGrafica {
    labels: string[]
    data: number[]
    colors?: string[]
}

// ============================================
// MODALES Y FORMS
// ============================================

// Formulario agregar área
export interface IFormAgregarArea {
    area: number
    puestos: number[] // DNIs seleccionados
}

// Formulario agregar puesto
export interface IFormAgregarPuesto {
    dniP: number
}

// Formulario agregar actividad
export interface IFormAgregarActividad {
    nombre: string
    personas: number
    recomendaciones: string
}

// Formulario editar horas trabajo
export interface IFormHorasTrabajo {
    tiempoInicio: string
    tiempoFin: string
}

// ============================================
// PAYLOADS
// ============================================

export interface INuevoAreaPayload {
    area: number
    puestos: number[]
}

export interface IAgregarPuestoPayload {
    dniTM: number
    dniP: number
}

export interface INuevaActividadPayload {
    dniTM: number
    dniP: number
    nombre: string
    personas: number
    recomendaciones: string
}

export interface IIniciarCronoPayload {
    dniTM: number
    dniP: number
    dniAct: number
}

export interface IFinalizarCronoPayload {
    dniTM: number
    dniP: number
    dniAct: number
}

export interface IEditarActividadPayload {
    dniTM: number
    dniP: number
    dniAct: number
    dias: number
    strTiempoM: string
    frecuencia: string
}

export interface IEditarHRTPayload {
    dniTM: number
    dniP: number
    tiempoInicio: string
    tiempoFin: string
}

export interface IEliminarPayload {
    dniTM?: number
    dniP?: number
    dniAct?: number
}

// Admin Áreas y Puestos
export interface INuevaAreaAdminPayload {
    nombre?: string
}

export interface INuevoPuestoAdminPayload {
    dni: number // dni del área
    nombre?: string
}

export interface IModificarAreaPayload {
    dni: number
    nombre: string
}

export interface IModificarPuestoPayload {
    dni: number // dni del área
    dniP: number
    nombre: string
}

// ============================================
// RESPONSES
// ============================================

export interface IMovimientosResponse {
    status: 'success' | 'error'
    message: string
    data?: any
}

// ============================================
// HELPERS
// ============================================

export type TipoFrecuencia = 'diario' | 'por evento'

// Estado del cronómetro
export type EstadoCronometro = 'inactivo' | 'activo' | 'finalizado'

// Configuración de colores para KPIs
export interface IColorKPI {
    bg: string
    text: string
    border: string
}
