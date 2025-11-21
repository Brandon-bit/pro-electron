import {
    BankAccount,
    BankAccountDTO,
    BankAccountRequest,
    SelectOptionDTO
} from '@/modules/Tesoreria/CuentasBancarias/types/bankAccountTypes'
import useBankAccountStore from '@/modules/Tesoreria/CuentasBancarias/store/bankAccountStore'
import { mapBankAccount, mapBankAccountRequest, mapBankAccountToSelectOption } from '@/modules/Tesoreria/CuentasBancarias/composables/mappingBankAccounts'

export const useBankAccountActions = () => {
    const bankAccountStore = useBankAccountStore()

    // Mock data from backend (en español)
    const mockBankAccountsBackend: BankAccount[] = [
        { 
            id: 1, 
            nombre: 'Cuenta Principal BBVA', 
            bancoId: 1,
            nombreBanco: 'BBVA México',
            tipoCuentaId: 1,
            nombreTipoCuenta: 'Cuenta de Cheques',
            numeroCuenta: '012180001234567890', 
            saldoInicial: 100000, 
            saldoActual: 125000, 
            moneda: 'MXN', 
            activo: true,
            notas: 'Cuenta principal para operaciones diarias'
        },
        { 
            id: 2, 
            nombre: 'Cuenta Nómina Santander', 
            bancoId: 2,
            nombreBanco: 'Santander',
            tipoCuentaId: 4,
            nombreTipoCuenta: 'Cuenta de Nómina',
            numeroCuenta: '014180009876543210', 
            saldoInicial: 50000, 
            saldoActual: 48500, 
            moneda: 'MXN', 
            activo: true,
            notas: 'Cuenta exclusiva para pago de nómina'
        },
        { 
            id: 3, 
            nombre: 'Cuenta Ahorro Banorte', 
            bancoId: 3,
            nombreBanco: 'Banorte',
            tipoCuentaId: 2,
            nombreTipoCuenta: 'Cuenta de Ahorro',
            numeroCuenta: '072180001111222233', 
            saldoInicial: 200000, 
            saldoActual: 215000, 
            moneda: 'MXN', 
            activo: true
        },
        { 
            id: 4, 
            nombre: 'Cuenta Inversión HSBC', 
            bancoId: 4,
            nombreBanco: 'HSBC',
            tipoCuentaId: 3,
            nombreTipoCuenta: 'Cuenta de Inversión',
            numeroCuenta: '021180005555666677', 
            saldoInicial: -5000, 
            saldoActual: -3000, 
            moneda: 'MXN', 
            activo: false,
            notas: 'Cuenta con sobregiro temporal'
        }
    ]
    
    // Map to DTO (English)
    const mockBankAccounts: BankAccountDTO[] = mockBankAccountsBackend.map(mapBankAccount)

    const getBankAccounts = async (
        page: number,
        pageSize: number
    ): Promise<{ items: BankAccountDTO[]; total: number }> => {
        await new Promise((resolve) => setTimeout(resolve, 300))

        const startIndex = (page - 1) * pageSize
        const endIndex = startIndex + pageSize
        const paginatedData = mockBankAccounts.slice(startIndex, endIndex)

        return {
            items: paginatedData,
            total: mockBankAccounts.length
        }
    }

    const getBankAccountsForSelect = async (): Promise<SelectOptionDTO[]> => {
        await new Promise((resolve) => setTimeout(resolve, 200))

        return mockBankAccounts
            .filter((account) => account.active)
            .map(mapBankAccountToSelectOption)
    }

    const createBankAccount = async (
        data: BankAccountRequest
    ): Promise<{ message: string; status: string; data: any }> => {
        const payload = mapBankAccountRequest(data)
        console.log('📤 CREATE Bank Account - Payload:', payload)

        return {
            message: 'Cuenta bancaria creada exitosamente',
            status: 'success',
            data: null
        }
    }

    const updateBankAccount = async (
        data: BankAccountRequest
    ): Promise<{ message: string; status: string; data: any }> => {
        const payload = mapBankAccountRequest(data)
        console.log('📤 UPDATE Bank Account - Payload:', payload)

        return {
            message: 'Cuenta bancaria actualizada exitosamente',
            status: 'success',
            data: null
        }
    }

    const deleteBankAccount = async (): Promise<{ message: string; status: string; data: any }> => {
        const id = bankAccountStore.selectedBankAccount?.id
        console.log('📤 DELETE Bank Account - ID:', id)

        return {
            message: 'Cuenta bancaria eliminada exitosamente',
            status: 'success',
            data: null
        }
    }

    return {
        getBankAccounts,
        getBankAccountsForSelect,
        createBankAccount,
        updateBankAccount,
        deleteBankAccount
    }
}
