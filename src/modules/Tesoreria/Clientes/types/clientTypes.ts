// Backend types (Spanish keys)
export type Client = {
    id: number
    nombre: string
    rfc: string
    email: string
    telefono: string
    calle: string
    ciudad: string
    estado: string
    codigoPostal: string
    limiteCredito: number
    diasCredito: number
    activo: boolean
    notas?: string
}

// DTO types (English keys for form)
export type ClientDTO = {
    id: number
    name: string
    rfc: string
    email: string
    phone: string
    street: string
    city: string
    state: string
    postalCode: string
    creditLimit: number
    creditDays: number
    active: boolean
    notes?: string
}

// Form types
export type ClientForm = {
    id?: number
    name: string
    rfc: string
    email: string
    phone: string
    street: string
    city: string
    state: string
    postalCode: string
    creditLimit: number
    creditDays: number
    active: boolean
    notes?: string
}

// Request types
export type ClientRequest = {
    name: string
    rfc: string
    email: string
    phone: string
    street: string
    city: string
    state: string
    postalCode: string
    creditLimit: number
    creditDays: number
    active: boolean
    notes?: string
}

export type ClientRequestPayload = {
    nombre: string
    rfc: string
    email: string
    telefono: string
    calle: string
    ciudad: string
    estado: string
    codigoPostal: string
    limiteCredito: number
    diasCredito: number
    activo: boolean
    notas?: string
}

export type SelectOptionDTO = {
    id: number
    label: string
}
