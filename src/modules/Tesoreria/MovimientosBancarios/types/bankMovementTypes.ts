// Movement types constants
export const MOVEMENT_TYPES = [
    { id: 1, label: 'Ingreso', icon: 'arrow_downward', color: 'success' },
    { id: 2, label: 'Egreso', icon: 'arrow_upward', color: 'error' },
    { id: 3, label: 'Transferencia', icon: 'swap_horiz', color: 'info' }
] as const

// Backend types (Spanish keys)
export type BankMovement = {
    id: number
    fecha: string
    cuentaBancariaId: number
    nombreCuentaBancaria?: string
    tipoMovimientoId: number
    tipoMovimiento?: string
    monto: number
    concepto: string
    referencia?: string
    saldoAnterior: number
    saldoNuevo: number
    activo: boolean
}

// DTO types (English keys for form)
export type BankMovementDTO = {
    id: number
    date: string
    bankAccountId: number
    bankAccountName?: string
    movementTypeId: number
    movementType?: string
    amount: number
    concept: string
    reference?: string
    previousBalance: number
    newBalance: number
    active: boolean
}

// Form types
export type BankMovementForm = {
    id?: number
    date: string
    bankAccountId: number
    movementTypeId: number
    amount: number
    concept: string
    reference?: string
    active: boolean
}

// Request types
export type BankMovementRequest = {
    date: string
    bankAccountId: number
    movementTypeId: number
    amount: number
    concept: string
    reference?: string
    active: boolean
}

export type BankMovementRequestPayload = {
    fecha: string
    cuentaBancariaId: number
    tipoMovimientoId: number
    monto: number
    concepto: string
    referencia?: string
    activo: boolean
}

export type SelectOptionDTO = {
    id: number
    label: string
}
