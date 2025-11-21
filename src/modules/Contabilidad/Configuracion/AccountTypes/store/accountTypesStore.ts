import { defineStore } from 'pinia'
import type { AccountTypeFormDTO } from '@contabilidad/Configuracion/AccountTypes/types/accountTypesTypes'

const initialAccountType: AccountTypeFormDTO = {
    id: undefined,
    name: '',
    description: '',
    active: true
}

const useAccountTypesStore = defineStore('account-types-store', {
    state: () => ({
        currentAccountType: { ...initialAccountType } as AccountTypeFormDTO,
        modalId: 'account-type-modal',
        isEditMode: false
    }),
    
    actions: {
        setAccountType(accountType: AccountTypeFormDTO = initialAccountType) {
            this.currentAccountType = JSON.parse(JSON.stringify(accountType))
        },
        
        resetAccountType() {
            this.currentAccountType = { ...initialAccountType }
        },
        
        setEditMode(value: boolean) {
            this.isEditMode = value
        }
    }
})

export default useAccountTypesStore
