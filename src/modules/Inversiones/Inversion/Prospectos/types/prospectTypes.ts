// Prospect Types
export type ProspectStatusType = "Nuevo" | "Contactado" | "Calificado" | "Propuesta" | "Negociación" | "Ganado" | "Perdido"
export type ProspectSectorType = "Tecnología" | "Finanzas" | "Salud" | "Educación" | "Retail" | "Manufactura" | "Servicios" | "Otro"

export interface ProspectType {
    id?: number
    firstName: string
    lastName: string
    email: string
    company?: string
    phone?: string
    cellphone?: string
    sector?: ProspectSectorType
    status: ProspectStatusType
    needs?: string
    createdAt?: Date
    updatedAt?: Date
}

export interface ProspectFilterType {
    search?: string
    status?: ProspectStatusType
    sector?: ProspectSectorType
    dateFrom?: string
    dateTo?: string
}

export interface ProspectKPIType {
    title: string
    value: string
    subtitle: string
    icon: string
    color: string
    trend?: number
}

// API Response Types
export interface ProspectResponseType {
    id: number
    nombre: string
    apellido: string
    email: string
    empresa?: string
    telefono?: string
    celular?: string
    sector?: string
    estatus: string
    necesidades?: string
    fechaCreacion?: string
    fechaActualizacion?: string
}

// Form Types
export interface ProspectFormType {
    firstName: string
    lastName: string
    email: string
    company?: string
    phone?: string
    cellphone?: string
    sector?: ProspectSectorType
    status: ProspectStatusType
    needs?: string
}

