import {
    AccountReceivable,
    AccountReceivableDTO,
    AccountReceivableRequest,
    AccountReceivableRequestPayload,
    Payment,
    PaymentDTO,
    PaymentRequest,
    PaymentRequestPayload,
    SelectOptionDTO
} from '@/modules/Tesoreria/CuentasPorCobrar/types/accountReceivableTypes'

// Map from backend (Spanish) to DTO (English)
export const mapAccountReceivable = (data: AccountReceivable): AccountReceivableDTO => ({
    id: data.id,
    clientId: data.clienteId,
    clientName: data.nombreCliente,
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
export const mapAccountReceivableRequest = (data: AccountReceivableRequest): AccountReceivableRequestPayload => ({
    clienteId: data.clientId,
    numeroDocumento: data.documentNumber,
    tipoDocumento: data.documentType,
    fechaEmision: data.issueDate,
    fechaVencimiento: data.dueDate,
    monto: data.amount,
    saldoPendiente: data.pendingBalance,
    estado: data.status,
    notas: data.notes
})

// Payment mappings
export const mapPayment = (data: Payment): PaymentDTO => ({
    id: data.id,
    accountReceivableId: data.cuentaPorCobrarId,
    paymentDate: data.fechaPago,
    amount: data.monto,
    paymentMethod: data.metodoPago,
    reference: data.referencia,
    notes: data.notas
})

export const mapPaymentRequest = (data: PaymentRequest): PaymentRequestPayload => ({
    cuentaPorCobrarId: data.accountReceivableId,
    fechaPago: data.paymentDate,
    monto: data.amount,
    metodoPago: data.paymentMethod,
    referencia: data.reference,
    notas: data.notes
})

export const mapAccountReceivableToSelectOption = (ar: AccountReceivableDTO): SelectOptionDTO => {
    return {
        id: ar.id!,
        label: `${ar.documentNumber} - ${ar.clientName}`
    }
}
