export type AccountType = {
    id?: number
    code: string
    SATCode: string
    name: string
    parentId: number
    parent: string
    typeId: number
    type: string
    natureId: number
    nature: string
    clasificationId: number
    clasification: string
    levelId: number
    level: number
    balance: number
    currencyId: number
    currency: string
    acceptsMovements: boolean
    requiresAuxiliary: boolean
    active: boolean
    subaccounts?: AccountType[]
}

export type AccountTypeForm = {
    id?: number
    code: string
    SATCode: string
    name: string
    parentId: number
    parent: string
    typeId: number
    type: string
    natureId: number
    nature: string
    clasificationId: number
    clasification: string
    levelId: number
    level: number
    currencyId: number
    currency: string
    acceptsMovements: boolean
    requiresAuxiliary: boolean
    active: boolean
}

export type AccountResponseType = {
    id: number
    codigo: string
    codigoSAT: string
    nombre: string
    padreId: number
    padre: string
    tipo: string
    tipoId: number
    naturaleza: string
    naturalezaId: number
    clasification: string
    clasificationId: number
    nivelId: number
    nivel: number
    saldo: number
    moneda: string
    monedaId: number
    aceptaMovimientos: boolean
    requiereAuxiliar: boolean
    activa: boolean
    subcuentas?: AccountResponseType[]
}

export type AccountFormType = {
    id?: number
    code: string
    SATCode: string
    name: string
    parentId: number
    parent: string
    typeId: number
    type: string
    natureId: number
    nature: string
    clasificationId: number
    clasification: string
    levelId: number
    level: number
    currencyId: number
    currency: string
    acceptsMovements: boolean
    requiresAuxiliary: boolean
    active: boolean
}

// Select option types
export type SelectOptionDTO = {
    id: string | number
    label: string
}

export type MaskSegment = {
    id: string
    name: string
    digits: number
    description: string
}

export type AccountMaskConfig = {
    id: string
    format: string
    segments: MaskSegment[]
    isActive: boolean
    createdAt: string
    updatedAt: string
}

/**
 * Account option type for dropdown selects
 * Formato estructurado con indentación según nivel jerárquico
 */
export type AccountOptionDTO = {
    id: number
    code: string
    name: string
    label: string  // Formato: "CODE - NAME" con indentación según nivel
    level: number
    acceptsMovements: boolean
}