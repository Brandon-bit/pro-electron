import { defineStore } from 'pinia'
import { BankAccountDTO } from '@/modules/Tesoreria/CuentasBancarias/types/bankAccountTypes'

const initialBankAccount: BankAccountDTO = {
    id: 0,
    name: '',
    bankId: 0,
    accountTypeId: 0,
    accountNumber: '',
    initialBalance: 0,
    currentBalance: 0,
    currency: 'MXN',
    active: true,
    notes: ''
}

const useBankAccountStore = defineStore('bank-account-store', {
    state: () => ({
        bankAccounts: [] as BankAccountDTO[],
        selectedBankAccount: null as BankAccountDTO | null,
        modalId: 'bank-account-modal'
    }),
    actions: {
        setData(data: BankAccountDTO = initialBankAccount) {
            this.selectedBankAccount = { ...data }
        }
    }
})

export default useBankAccountStore
