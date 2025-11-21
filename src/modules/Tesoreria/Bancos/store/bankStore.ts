import { defineStore } from 'pinia'
import { BankDTO } from '@/modules/Tesoreria/Bancos/types/bankTypes'

const initialBank: BankDTO = {
    id: undefined,
    name: '',
    code: '',
    active: true
}

const useBankStore = defineStore('bank-store', {
    state: () => ({
        banks: [] as BankDTO[],
        selectedBank: null as BankDTO | null,
        modalId: 'bank-modal'
    }),
    actions: {
        setData(data: BankDTO = initialBank) {
            this.selectedBank = { ...data }
        }
    }
})

export default useBankStore
