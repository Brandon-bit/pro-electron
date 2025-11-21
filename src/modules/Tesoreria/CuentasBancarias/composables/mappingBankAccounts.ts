import {
    BankAccount,
    BankAccountDTO,
    BankAccountRequest,
    BankAccountRequestPayload,
    SelectOptionDTO
} from '@/modules/Tesoreria/CuentasBancarias/types/bankAccountTypes'

// Map from backend (Spanish) to DTO (English)
export const mapBankAccount = (data: BankAccount): BankAccountDTO => ({
    id: data.id,
    name: data.nombre,
    bankId: data.bancoId,
    bankName: data.nombreBanco,
    accountTypeId: data.tipoCuentaId,
    accountTypeName: data.nombreTipoCuenta,
    accountNumber: data.numeroCuenta,
    initialBalance: data.saldoInicial,
    currentBalance: data.saldoActual,
    currency: data.moneda,
    active: data.activo,
    notes: data.notas
})

// Map from DTO (English) to backend payload (Spanish)
export const mapBankAccountRequest = (data: BankAccountRequest): BankAccountRequestPayload => ({
    nombre: data.name,
    bancoId: data.bankId,
    tipoCuentaId: data.accountTypeId,
    numeroCuenta: data.accountNumber,
    saldoInicial: data.initialBalance,
    saldoActual: data.currentBalance,
    moneda: data.currency,
    activo: data.active,
    notas: data.notes
})

export const mapBankAccountToSelectOption = (bankAccount: BankAccountDTO): SelectOptionDTO => {
    return {
        id: bankAccount.id!,
        label: bankAccount.name
    }
}
