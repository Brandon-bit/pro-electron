// Backend types (Spanish keys)
export type AccountReceivable = {
    id: number
    clienteId: number
    nombreCliente?: string
    numeroDocumento: string
    tipoDocumento: string
    fechaEmision: string
    fechaVencimiento: string
    monto: number
    saldoPendiente: number
    estado: 'PENDIENTE' | 'PARCIAL' | 'PAGADO' | 'VENCIDO'
    notas?: string
}

// DTO types (English keys for form)
export type AccountReceivableDTO = {
    id: number
    clientId: number
    clientName?: string
    documentNumber: string
    documentType: string
    issueDate: string
    dueDate: string
    amount: number
    pendingBalance: number
    status: 'PENDIENTE' | 'PARCIAL' | 'PAGADO' | 'VENCIDO'
    notes?: string
}

// Payment types
export type Payment = {
    id: number
    cuentaPorCobrarId: number
    fechaPago: string
    monto: number
    metodoPago: string
    referencia?: string
    notas?: string
}

export type PaymentDTO = {
    id: number
    accountReceivableId: number
    paymentDate: string
    amount: number
    paymentMethod: string
    reference?: string
    notes?: string
}

// Form types
export type AccountReceivableForm = {
    id?: number
    clientId: number
    documentNumber: string
    documentType: string
    issueDate: string
    dueDate: string
    amount: number
    pendingBalance: number
    status: 'PENDIENTE' | 'PARCIAL' | 'PAGADO' | 'VENCIDO'
    notes?: string
}

export type PaymentForm = {
    id?: number
    accountReceivableId: number
    paymentDate: string
    amount: number
    paymentMethod: string
    reference?: string
    notes?: string
}

// Request types
export type AccountReceivableRequest = {
    clientId: number
    documentNumber: string
    documentType: string
    issueDate: string
    dueDate: string
    amount: number
    pendingBalance: number
    status: 'PENDIENTE' | 'PARCIAL' | 'PAGADO' | 'VENCIDO'
    notes?: string
}

export type PaymentRequest = {
    accountReceivableId: number
    paymentDate: string
    amount: number
    paymentMethod: string
    reference?: string
    notes?: string
}

export type AccountReceivableRequestPayload = {
    clienteId: number
    numeroDocumento: string
    tipoDocumento: string
    fechaEmision: string
    fechaVencimiento: string
    monto: number
    saldoPendiente: number
    estado: 'PENDIENTE' | 'PARCIAL' | 'PAGADO' | 'VENCIDO'
    notas?: string
}

export type PaymentRequestPayload = {
    cuentaPorCobrarId: number
    fechaPago: string
    monto: number
    metodoPago: string
    referencia?: string
    notas?: string
}

export type SelectOptionDTO = {
    id: number
    label: string
}
