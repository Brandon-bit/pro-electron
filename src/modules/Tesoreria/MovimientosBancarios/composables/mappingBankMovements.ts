import {
    BankMovement,
    BankMovementDTO,
    BankMovementRequest,
    BankMovementRequestPayload
} from '@/modules/Tesoreria/MovimientosBancarios/types/bankMovementTypes'

// Map from backend (Spanish) to DTO (English)
export const mapBankMovement = (data: BankMovement): BankMovementDTO => ({
    id: data.id,
    date: data.fecha,
    bankAccountId: data.cuentaBancariaId,
    bankAccountName: data.nombreCuentaBancaria,
    movementTypeId: data.tipoMovimientoId,
    movementType: data.tipoMovimiento,
    amount: data.monto,
    concept: data.concepto,
    reference: data.referencia,
    previousBalance: data.saldoAnterior,
    newBalance: data.saldoNuevo,
    active: data.activo
})

// Map from DTO (English) to backend payload (Spanish)
export const mapBankMovementRequest = (data: BankMovementRequest): BankMovementRequestPayload => ({
    fecha: data.date,
    cuentaBancariaId: data.bankAccountId,
    tipoMovimientoId: data.movementTypeId,
    monto: data.amount,
    concepto: data.concept,
    referencia: data.reference,
    activo: data.active
})
