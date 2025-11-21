import {
    AccountPayable,
    AccountPayableDTO,
    AccountPayableRequest,
    AccountPayableRequestPayload,
    Payment,
    PaymentDTO,
    PaymentRequest,
    PaymentRequestPayload
} from '@/modules/Tesoreria/CuentasPorPagar/types/accountPayableTypes'

// Map from backend (Spanish) to DTO (English)
export const mapAccountPayable = (data: AccountPayable): AccountPayableDTO => ({
    id: data.id,
    supplierId: data.proveedorId,
    supplierName: data.proveedorNombre,
    documentNumber: data.numeroDocumento,
    documentType: data.tipoDocumento,
    issueDate: data.fechaEmision,
    dueDate: data.fechaVencimiento,
    amount: data.monto,
    pendingBalance: data.saldoPendiente,
    status: data.estado,
    notes: data.notas
})

// Map from DTO (English) to backend payload (Spanish)
export const mapAccountPayableRequest = (
    data: AccountPayableRequest
): AccountPayableRequestPayload => ({
    proveedorId: data.supplierId,
    numeroDocumento: data.documentNumber,
    tipoDocumento: data.documentType,
    fechaEmision: data.issueDate,
    fechaVencimiento: data.dueDate,
    monto: data.amount,
    saldoPendiente: data.pendingBalance,
    estado: data.status,
    notas: data.notes
})

// Map payment from backend to DTO
export const mapPayment = (data: Payment): PaymentDTO => ({
    id: data.id,
    accountPayableId: data.cuentaPorPagarId,
    paymentDate: data.fechaPago,
    amount: data.monto,
    paymentMethod: data.metodoPago as 'EFECTIVO' | 'TRANSFERENCIA' | 'CHEQUE' | 'TARJETA' | 'OTRO',
    reference: data.referencia,
    notes: data.notas
})

// Map payment request to backend payload
export const mapPaymentRequest = (data: PaymentRequest): PaymentRequestPayload => ({
    cuentaPorPagarId: data.accountPayableId,
    fechaPago: data.paymentDate,
    monto: data.amount,
    metodoPago: data.paymentMethod,
    referencia: data.reference,
    notas: data.notes
})
