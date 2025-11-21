// Backend types (Spanish keys)
export type AccountPayable = {
    id: number
    proveedorId: number
    proveedorNombre?: string
    numeroDocumento: string
    tipoDocumento: string
    fechaEmision: string
    fechaVencimiento: string
    monto: number
    saldoPendiente: number
    estado: 'PENDIENTE' | 'PARCIAL' | 'PAGADO' | 'VENCIDO'
    notas?: string
}

export type Payment = {
    id: number
    cuentaPorPagarId: number
    fechaPago: string
    monto: number
    metodoPago: string
    referencia?: string
    notas?: string
}

// DTO types (English keys for form)
export type AccountPayableDTO = {
    id: number
    supplierId: number
    supplierName?: string
    documentNumber: string
    documentType: string
    issueDate: string
    dueDate: string
    amount: number
    pendingBalance: number
    status: 'PENDIENTE' | 'PARCIAL' | 'PAGADO' | 'VENCIDO'
    notes?: string
}

export type PaymentDTO = {
    id: number
    accountPayableId: number
    paymentDate: string
    amount: number
    paymentMethod: 'EFECTIVO' | 'TRANSFERENCIA' | 'CHEQUE' | 'TARJETA' | 'OTRO'
    reference?: string
    notes?: string
}

// Request types
export type AccountPayableRequest = {
    supplierId: number
    documentNumber: string
    documentType: 'FACTURA' | 'NOTA_VENTA' | 'RECIBO' | 'OTRO'
    issueDate: string
    dueDate: string
    amount: number
    pendingBalance: number
    status: 'PENDIENTE' | 'PARCIAL' | 'PAGADO' | 'VENCIDO'
    notes?: string
}

export type AccountPayableRequestPayload = {
    proveedorId: number
    numeroDocumento: string
    tipoDocumento: string
    fechaEmision: string
    fechaVencimiento: string
    monto: number
    saldoPendiente: number
    estado: string
    notas?: string
}

export type PaymentRequest = {
    accountPayableId: number
    paymentDate: string
    amount: number
    paymentMethod: 'EFECTIVO' | 'TRANSFERENCIA' | 'CHEQUE' | 'TARJETA' | 'OTRO'
    reference?: string
    notes?: string
}

export type PaymentRequestPayload = {
    cuentaPorPagarId: number
    fechaPago: string
    monto: number
    metodoPago: string
    referencia?: string
    notas?: string
}
