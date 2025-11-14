// ============================================
// INTERFACES
// ============================================

// Cadena de Valor
export interface ICadenaValor {
    dni: number
    name: string
}

// Espacio (Proceso nivel 3)
export interface IEspacio {
    id: number
    nombre: string
    Procesos: IProceso[]
}

// CV Espacio (Proceso de Cadena de Valor)
export interface ICVEspacio {
    dni: number
    titulo: string
    CVProcesos: ICVProceso[]
}

// Proceso nivel 4 (Regular)
export interface IProceso {
    id: number
    nombre: string
    asis: boolean
    Diagramas: IDiagrama[]
}

// CV Proceso nivel 4
export interface ICVProceso {
    dni: number
    nombre: string
    asis: boolean
    Diagramas: IDiagrama[]
}

// Diagrama
export interface IDiagrama {
    dni: number
    version: number
    tobe: boolean
    nombreDiag?: string // Calculado en frontend
    Actividades: IActividad[]
}

// Actividad
export interface IActividad {
    dni: number
    descActividad: string
    responsable: string
    tEfecDias: number
    tEfecHrs: number
    tEfecMin: number
    tEspDia: number
    tEspHrs: number
    tEspMin: number
    // Calculados
    tTDia?: number
    tTHrs?: number
    tTMin?: number
}

// Proyecto
export interface IProyecto {
    dni: number
    nombre: string
}

// ============================================
// DATA MODELS
// ============================================

// Información del proyecto
export interface IInfoProyecto {
    area: string
    proyecto: string
    person: string
    strFechaIni: string
}

// Comparación de diagramas
export interface IComparacion {
    show: boolean
    CV: ICadenaValor
    area: string
    person: string
    strFechaIni: string
    Asis: IActividad[]
    Tobes: IActividad[]
}

// Tiempo total calculado
export interface ITiempoTotal {
    ttdias: number
    tthrs: number
    ttmin: number
}

// Resultado de reducción
export interface IReduccion {
    reduccionTiempo: string // Porcentaje
    reduccionActividades: string // Porcentaje
}

// ============================================
// FILTERS & SELECTS
// ============================================

// Filtros seleccionados
export interface IFiltrosSeleccionados {
    idCV: number | null
    idP: number | null
    idPr: number | null
    idA: number | null
    idT: number | null
}

// Opciones de proceso (puede ser Espacio o CVEspacio)
export type ProcesoOption = IEspacio | ICVEspacio

// Opciones de proceso nivel 4 (puede ser Proceso o CVProceso)
export type ProcesoNiv4Option = IProceso | ICVProceso

// ============================================
// RESPONSE
// ============================================

export interface IReduccionResponse {
    status: 'success' | 'error'
    message: string
    data?: any
}

// Datos iniciales
export interface IReduccionData {
    espacios: IEspacio[]
    cvEsps: ICVEspacio[]
    CV: ICadenaValor
    area: string
    person: string
    strFechaIni: string
    Asis: IActividad[]
    Tobes: IActividad[]
    show: boolean
}

// ============================================
// PAYLOAD
// ============================================

export interface ICompararPayload {
    idCV: number
    idP: number
    idPr: number
    idA: number | null
    idT: number | null
}

// ============================================
// HELPERS
// ============================================

// Tipo de diagrama
export type TipoDiagrama = 'asis' | 'tobe'

// Configuración de colores por tipo
export interface IColorConfig {
    bg: string
    border: string
    text: string
    badge: string
}
