// ============================================
// PARTIDA CONTABLE (ACCOUNTING ENTRY)
// ============================================

// Backend response type (español)
export type AccountingEntry = {
    id: string
    cuenta: string
    descripcion: string
    debe: number
    haber: number
    referencia: string
}

// Frontend DTO type (inglés)
export type AccountingEntryDTO = {
    id: string
    account: string
    description: string
    debit: number
    credit: number
    reference: string
}

// ============================================
// PÓLIZA CONTABLE (ACCOUNTING POLICY)
// ============================================

// Backend response type (español)
export type AccountingPolicy = {
    id: number
    folio: string
    fecha: string
    tipoId: number
    tipo: string
    concepto: string
    total: number
    estatus: 'Cuadrada' | 'Descuadrada'
    partidas: AccountingEntry[]
}

// Frontend DTO type (inglés)
export type AccountingPolicyDTO = {
    id?: number
    folio: string
    date: string
    typeId: number
    type: string
    concept: string
    total: number
    status: 'Cuadrada' | 'Descuadrada'
    entries: AccountingEntryDTO[]
}

// Form type for create/update
export type AccountingPolicyFormDTO = {
    id?: number
    folio: string
    date: string
    typeId: number
    concept: string
    total: number
    status: 'Cuadrada' | 'Descuadrada'
    entries: AccountingEntryDTO[]
}

// Request type to backend
export type AccountingPolicyRequest = {
    id?: number
    folio: string
    fecha: string
    tipoId: number
    tipo: string
    concepto: string
    partidas: AccountingEntry[]
}

// Select option type for dropdowns
export type SelectOptionDTO = {
    id: number | string
    label: string
}

