// Tipos para Configuración General

export interface Plazo {
    id: string | number
    plazosEnMeses: number
    isEditing?: boolean
}

export interface DiaCalculoInteres {
    id: string | number
    dias: number
    isEditing?: boolean
}

export interface Rendimiento {
    id: string | number
    interes: number
    isEditing?: boolean
}

export interface TasaInteresMoratorio {
    id: string | number
    interes: number
    isEditing?: boolean
}

export interface ImpuestoPorAño {
    id: string | number
    impuesto: number
    año: number
    isEditing?: boolean
}

export interface TipoLiquidacion {
    id: string | number
    nombre: string
    activo: boolean
}

export type ConfigSection = 
    | 'plazos' 
    | 'dias' 
    | 'rendimientos' 
    | 'tasas' 
    | 'impuestos' 
    | 'liquidacion'
