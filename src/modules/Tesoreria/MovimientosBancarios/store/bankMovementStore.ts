import { defineStore } from 'pinia'
import { BankMovementDTO } from '@/modules/Tesoreria/MovimientosBancarios/types/bankMovementTypes'

const initialBankMovement: BankMovementDTO = {
    id: 0,
    date: new Date().toISOString().split('T')[0],
    bankAccountId: 0,
    movementTypeId: 0,
    amount: 0,
    concept: '',
    reference: '',
    previousBalance: 0,
    newBalance: 0,
    active: true
}

const useBankMovementStore = defineStore('bank-movement-store', {
    state: () => ({
        bankMovements: [] as BankMovementDTO[],
        selectedBankMovement: null as BankMovementDTO | null,
        modalId: 'bank-movement-modal'
    }),
    actions: {
        setData(data: BankMovementDTO = initialBankMovement) {
            this.selectedBankMovement = { ...data }
        }
    }
})

export default useBankMovementStore
