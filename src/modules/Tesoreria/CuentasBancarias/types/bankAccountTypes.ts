// Backend types (Spanish keys)
export type BankAccount = {
    id: number
    nombre: string
    bancoId: number
    nombreBanco?: string
    tipoCuentaId: number
    nombreTipoCuenta?: string
    numeroCuenta: string
    saldoInicial: number
    saldoActual: number
    moneda: string
    activo: boolean
    notas?: string
}

// DTO types (English keys for form)
export type BankAccountDTO = {
    id: number
    name: string
    bankId: number
    bankName?: string
    accountTypeId: number
    accountTypeName?: string
    accountNumber: string
    initialBalance: number
    currentBalance: number
    currency: string
    active: boolean
    notes?: string
}

// Form types
export type BankAccountForm = {
    id?: number
    name: string
    bankId: number
    accountTypeId: number
    accountNumber: string
    initialBalance: number
    currentBalance: number
    currency: string
    active: boolean
    notes?: string
}

// Request types
export type BankAccountRequest = {
    name: string
    bankId: number
    accountTypeId: number
    accountNumber: string
    initialBalance: number
    currentBalance: number
    currency: string
    active: boolean
    notes?: string
}

export type BankAccountRequestPayload = {
    nombre: string
    bancoId: number
    tipoCuentaId: number
    numeroCuenta: string
    saldoInicial: number
    saldoActual: number
    moneda: string
    activo: boolean
    notas?: string
}

export type SelectOptionDTO = {
    id: number
    label: string
}
