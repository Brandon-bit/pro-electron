import { defineStore } from 'pinia'
import type { AccountingPolicyFormDTO, AccountingEntryDTO } from '@/modules/Contabilidad/Contabilidad/PolizasContables/types/accountingPoliciesTypes'

const initialPolicy: AccountingPolicyFormDTO = {
    id: undefined,
    folio: '',
    date: new Date().toISOString().split('T')[0],
    typeId: 0,
    concept: '',
    total: 0,
    status: 'Descuadrada',
    entries: [
        {
            id: `P-${Date.now()}`,
            account: '',
            description: '',
            debit: 0,
            credit: 0,
            reference: ''
        }
    ]
}

const useAccountingPoliciesStore = defineStore('accounting-policies-store', {
    state: () => ({
        policies: [] as AccountingPolicyFormDTO[],
        selectedPolicy: null as AccountingPolicyFormDTO | null,
        modalId: 'accounting-policy-modal',
        isEditMode: false
    }),
    actions: {
        setData(data: AccountingPolicyFormDTO = initialPolicy) {
            this.selectedPolicy = JSON.parse(JSON.stringify(data))
        },
        setEditMode(value: boolean) {
            this.isEditMode = value
        },
        addEntry() {
            if (!this.selectedPolicy) return
            
            const newEntry: AccountingEntryDTO = {
                id: `P-${Date.now()}`,
                account: '',
                description: '',
                debit: 0,
                credit: 0,
                reference: ''
            }
            this.selectedPolicy.entries.push(newEntry)
        },
        removeEntry(id: string) {
            if (!this.selectedPolicy) return
            
            if (this.selectedPolicy.entries.length > 1) {
                this.selectedPolicy.entries = this.selectedPolicy.entries.filter(e => e.id !== id)
            }
        },
        updateEntry(id: string, field: keyof AccountingEntryDTO, value: any) {
            if (!this.selectedPolicy) return
            
            const entry = this.selectedPolicy.entries.find(e => e.id === id)
            if (entry) {
                (entry as any)[field] = value
            }
        }
    },
    getters: {
        totalDebit: (state) => {
            if (!state.selectedPolicy) return 0
            return state.selectedPolicy.entries.reduce((sum, entry) => sum + (entry.debit || 0), 0)
        },
        totalCredit: (state) => {
            if (!state.selectedPolicy) return 0
            return state.selectedPolicy.entries.reduce((sum, entry) => sum + (entry.credit || 0), 0)
        },
        isBalanced: (state) => {
            if (!state.selectedPolicy) return false
            const debit = state.selectedPolicy.entries.reduce((sum, entry) => sum + (entry.debit || 0), 0)
            const credit = state.selectedPolicy.entries.reduce((sum, entry) => sum + (entry.credit || 0), 0)
            return Math.abs(debit - credit) < 0.01 && debit > 0
        }
    }
})

export default useAccountingPoliciesStore
