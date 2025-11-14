// Tipos para Configuración de Prospectos

export interface Sector {
    id: string | number
    descripcion: string
}

export interface EstatusSeguimiento {
    id: string | number
    descripcion: string
}

export interface NewItemData {
    descripcion: string
}

export type ConfigType = 'sector' | 'estatus'
