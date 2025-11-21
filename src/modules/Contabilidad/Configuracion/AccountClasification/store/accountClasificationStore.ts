import { defineStore } from 'pinia'
import type { AccountClasificationFormDTO } from '@contabilidad/Configuracion/AccountClasification/types/accountClasificationTypes'

const initialAccountClasification: AccountClasificationFormDTO = {
    id: undefined,
    name: '',
    description: '',
    active: true
}

const useAccountClasificationStore = defineStore('account-clasification-store', {
    state: () => ({
        currentAccountClasification: { ...initialAccountClasification } as AccountClasificationFormDTO,
        modalId: 'account-clasification-modal',
        isEditMode: false
    }),

    actions: {
        setAccountClasification(accountClasification: AccountClasificationFormDTO = initialAccountClasification) {
            this.currentAccountClasification = JSON.parse(JSON.stringify(accountClasification))
        },

        resetAccountClasification() {
            this.currentAccountClasification = { ...initialAccountClasification }
        },

        setEditMode(value: boolean) {
            this.isEditMode = value
        }
    }
})

export default useAccountClasificationStore
