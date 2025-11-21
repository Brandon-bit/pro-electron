import { defineStore } from 'pinia'
import { BankReconciliationDTO } from '@/modules/Tesoreria/ConciliacionBancaria/types/bankReconciliationTypes'

const initialBankReconciliation: BankReconciliationDTO = {
    id: 0,
    bankAccountId: 0,
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    initialBookBalance: 0,
    finalBookBalance: 0,
    initialBankBalance: 0,
    finalBankBalance: 0,
    difference: 0,
    status: 1,
    notes: '',
    active: true
}

const useBankReconciliationStore = defineStore('bank-reconciliation-store', {
    state: () => ({
        bankReconciliations: [] as BankReconciliationDTO[],
        selectedBankReconciliation: null as BankReconciliationDTO | null,
        modalId: 'bank-reconciliation-modal'
    }),
    actions: {
        setData(data: BankReconciliationDTO = initialBankReconciliation) {
            this.selectedBankReconciliation = { ...data }
        }
    }
})

export default useBankReconciliationStore
