// Tipos de prioridad
export type PrioridadType = 'Baja' | 'Media' | 'Alta' | 'Muy Alta'

// Tipos de implementación
export type TipoImplementacionType = 'Quick Hits' | 'Desarrollo de Sistema' | 'Proyecto de Inversión'

// Descripción de olas
export type OlaDescripcionType = 'Inmediato' | 'Corto Plazo' | 'Mediano Plazo' | 'Largo Plazo'

// Números de ola (0-3)
export type OlaNumeroType = 0 | 1 | 2 | 3

// Interfaz de Ola
export interface IOla {
    id: number
    concepto: string
    tipoImplementacion: TipoImplementacionType
    prioridad: PrioridadType
    ola_numero: OlaNumeroType
    ola_descripcion: OlaDescripcionType
    dniProceso: number
}

// Interfaz de Proceso
export interface IProceso {
    id: number
    nombre: string
    codigo?: string
    descripcion?: string
    dniEspacio: number
}

// Interfaz de Usuario para VoBo
export interface IUsuarioVoBo {
    id: number
    nombre: string
    apellidos: string
    correo: string
    selected: boolean
}

// Modelo para crear nueva Ola
export interface ICreateOlaPayload {
    concepto: string
    tipoImplementacion: TipoImplementacionType
    prioridad: PrioridadType
    ola_descripcion: OlaDescripcionType
    dniProceso: number
}

// Modelo para envío de VoBo
export interface ISendVoBoPayload {
    dniProceso: number
    correos: string[]
}

// Response del servicio
export interface IOlaResponse {
    status: 'success' | 'error'
    message: string
    data?: IOla
}

// Agrupación de olas por número
export interface IOlasGrouped {
    o1: IOla[] // Inmediato
    o2: IOla[] // Corto Plazo
    o3: IOla[] // Mediano Plazo
    o4: IOla[] // Largo Plazo
}
