// Reconciliation status constants
export const RECONCILIATION_STATUS = [
    { id: 1, label: 'Pendiente', color: 'warning' },
    { id: 2, label: 'Conciliado', color: 'success' },
    { id: 3, label: 'Discrepancia', color: 'error' }
] as const

// Backend types (Spanish keys)
export type BankReconciliation = {
    id: number
    cuentaBancariaId: number
    nombreCuentaBancaria?: string
    fechaInicio: string
    fechaFin: string
    saldoInicialLibros: number
    saldoFinalLibros: number
    saldoInicialBanco: number
    saldoFinalBanco: number
    diferencia: number
    estado: number
    estadoTexto?: string
    notas?: string
    fechaConciliacion?: string
    activo: boolean
}

// DTO types (English keys for form)
export type BankReconciliationDTO = {
    id: number
    bankAccountId: number
    bankAccountName?: string
    startDate: string
    endDate: string
    initialBookBalance: number
    finalBookBalance: number
    initialBankBalance: number
    finalBankBalance: number
    difference: number
    status: number
    statusText?: string
    notes?: string
    reconciliationDate?: string
    active: boolean
}

// Form types
export type BankReconciliationForm = {
    id?: number
    bankAccountId: number
    startDate: string
    endDate: string
    initialBankBalance: number
    finalBankBalance: number
    notes?: string
    active: boolean
}

// Request types
export type BankReconciliationRequest = {
    bankAccountId: number
    startDate: string
    endDate: string
    initialBankBalance: number
    finalBankBalance: number
    notes?: string
    active: boolean
}

export type BankReconciliationRequestPayload = {
    cuentaBancariaId: number
    fechaInicio: string
    fechaFin: string
    saldoInicialBanco: number
    saldoFinalBanco: number
    notas?: string
    activo: boolean
}

// Reconciliation item types (movimientos a conciliar)
export type ReconciliationItem = {
    id: number
    movimientoBancarioId?: number
    tipo: 'libro' | 'banco'
    fecha: string
    concepto: string
    referencia?: string
    monto: number
    conciliado: boolean
}

export type ReconciliationItemDTO = {
    id: number
    bankMovementId?: number
    type: 'book' | 'bank'
    date: string
    concept: string
    reference?: string
    amount: number
    reconciled: boolean
}

export type SelectOptionDTO = {
    id: number
    label: string
}
