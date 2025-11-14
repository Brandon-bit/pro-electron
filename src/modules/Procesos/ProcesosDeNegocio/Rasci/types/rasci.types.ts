// ============================================
// INTERFACES PRINCIPALES
// ============================================

// Proceso
export interface IProceso {
    dni: number
    nombre: string
}

// Rol (Puesto)
export interface IRol {
    dni: number
    titulo: string
}

// Valor RASCI en una celda
export interface IValorRasci {
    rol: number // dni del rol
    valor: string // "R/A/S", "R", "A/I", etc.
}

// Actividad con sus valores RASCI
export interface IActividad {
    dni: number
    titulo: string
    acc?: number // Número de Accountables (calculado)
    Valores: IValorRasci[]
}

// Modelo principal de la matriz RASCI
export interface IMatrizRasci {
    Proceso: IProceso
    Roles: IRol[]
    Actividades: IActividad[]
}

// ============================================
// TOTALES Y CÁLCULOS
// ============================================

// Totales por tipo RASCI y rol
export interface ITotalRasci {
    name: 'R' | 'A' | 'S' | 'C' | 'I' | 'Total:'
    val: number[] // Array de totales por cada rol
}

// Estadísticas globales
export interface IEstadisticasRasci {
    totalActividades: number
    totalRoles: number
    totalAsignaciones: number
    promedioAsignacionesPorRol: number
    actividadesSinAccountable: number
    actividadesConMultiplesAccountables: number
    rolesSinAsignaciones: number
}

// ============================================
// MODALES Y EDICIÓN
// ============================================

// Checkboxes para editar valor
export interface ICheckboxesRasci {
    R: boolean
    A: boolean
    S: boolean
    C: boolean
    I: boolean
}

// Payload para modificar valor
export interface IModificarValorPayload {
    dniProc: number
    dniAct: number
    rol: number
    valor: string // "R/A/S", etc.
}

// ============================================
// COLORES Y ESTILOS
// ============================================

// Configuración de colores para accountables
export interface IColorAccountable {
    bg: string
    text: string
    badge: string
}

// Configuración de colores para totales
export interface IColorTotal {
    bg: string
    text: string
}

// ============================================
// RESPONSES
// ============================================

export interface IRasciResponse {
    status: 'success' | 'error'
    message: string
    data?: any
}

// ============================================
// EXPORTACIÓN
// ============================================

export interface IExportConfig {
    incluirTotales: boolean
    incluirEstadisticas: boolean
    formato: 'csv' | 'excel' | 'pdf'
}

// ============================================
// HELPERS
// ============================================

// Tipo de letra RASCI
export type TipoRasci = 'R' | 'A' | 'S' | 'C' | 'I'

// Estado de accountable
export type EstadoAccountable = 'optimo' | 'aceptable' | 'problema'

// Estado de total
export type EstadoTotal = 'ninguno' | 'bajo' | 'alto'
