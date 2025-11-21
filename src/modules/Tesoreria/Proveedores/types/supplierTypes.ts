// Backend types (Spanish keys)
export type Supplier = {
    id: number
    nombre: string
    rfc: string
    email: string
    telefono: string
    calle: string
    ciudad: string
    estado: string
    codigoPostal: string
    diasCredito: number
    activo: boolean
    notas?: string
}

// DTO types (English keys for form)
export type SupplierDTO = {
    id: number
    name: string
    rfc: string
    email: string
    phone: string
    street: string
    city: string
    state: string
    postalCode: string
    creditDays: number
    active: boolean
    notes?: string
}

// Form types
export type SupplierForm = {
    id?: number
    name: string
    rfc: string
    email: string
    phone: string
    street: string
    city: string
    state: string
    postalCode: string
    creditDays: number
    active: boolean
    notes?: string
}

// Request types
export type SupplierRequest = {
    name: string
    rfc: string
    email: string
    phone: string
    street: string
    city: string
    state: string
    postalCode: string
    creditDays: number
    active: boolean
    notes?: string
}

export type SupplierRequestPayload = {
    nombre: string
    rfc: string
    email: string
    telefono: string
    calle: string
    ciudad: string
    estado: string
    codigoPostal: string
    diasCredito: number
    activo: boolean
    notas?: string
}

export type SelectOptionDTO = {
    id: number
    label: string
}
