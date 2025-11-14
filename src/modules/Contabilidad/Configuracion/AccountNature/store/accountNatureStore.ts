import { defineStore } from 'pinia'
import type { AccountNatureFormDTO } from '@contabilidad/Configuracion/AccountNature/types/accountNatureTypes'

const initialAccountNature: AccountNatureFormDTO = {
    id: undefined,
    name: '',
    description: '',
    active: true
}

const useAccountNatureStore = defineStore('account-nature-store', {
    state: () => ({
        currentAccountNature: { ...initialAccountNature } as AccountNatureFormDTO,
        modalId: 'account-nature-modal',
        isEditMode: false
    }),
    
    actions: {
        setAccountNature(accountNature: AccountNatureFormDTO = initialAccountNature) {
            this.currentAccountNature = JSON.parse(JSON.stringify(accountNature))
        },
        
        resetAccountNature() {
            this.currentAccountNature = { ...initialAccountNature }
        },
        
        setEditMode(value: boolean) {
            this.isEditMode = value
        }
    }
})

export default useAccountNatureStore
