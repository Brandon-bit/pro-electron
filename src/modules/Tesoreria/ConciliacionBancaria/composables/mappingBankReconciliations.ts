import {
    BankReconciliation,
    BankReconciliationDTO,
    BankReconciliationRequest,
    BankReconciliationRequestPayload,
    ReconciliationItem,
    ReconciliationItemDTO
} from '@/modules/Tesoreria/ConciliacionBancaria/types/bankReconciliationTypes'

// Map from backend (Spanish) to DTO (English)
export const mapBankReconciliation = (data: BankReconciliation): BankReconciliationDTO => ({
    id: data.id,
    bankAccountId: data.cuentaBancariaId,
    bankAccountName: data.nombreCuentaBancaria,
    startDate: data.fechaInicio,
    endDate: data.fechaFin,
    initialBookBalance: data.saldoInicialLibros,
    finalBookBalance: data.saldoFinalLibros,
    initialBankBalance: data.saldoInicialBanco,
    finalBankBalance: data.saldoFinalBanco,
    difference: data.diferencia,
    status: data.estado,
    statusText: data.estadoTexto,
    notes: data.notas,
    reconciliationDate: data.fechaConciliacion,
    active: data.activo
})

// Map from DTO (English) to backend payload (Spanish)
export const mapBankReconciliationRequest = (
    data: BankReconciliationRequest
): BankReconciliationRequestPayload => ({
    cuentaBancariaId: data.bankAccountId,
    fechaInicio: data.startDate,
    fechaFin: data.endDate,
    saldoInicialBanco: data.initialBankBalance,
    saldoFinalBanco: data.finalBankBalance,
    notas: data.notes,
    activo: data.active
})

// Map reconciliation items
export const mapReconciliationItem = (data: ReconciliationItem): ReconciliationItemDTO => ({
    id: data.id,
    bankMovementId: data.movimientoBancarioId,
    type: data.tipo === 'libro' ? 'book' : 'bank',
    date: data.fecha,
    concept: data.concepto,
    reference: data.referencia,
    amount: data.monto,
    reconciled: data.conciliado
})
