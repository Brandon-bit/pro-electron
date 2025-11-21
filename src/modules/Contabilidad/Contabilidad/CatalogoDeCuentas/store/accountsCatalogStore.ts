import { defineStore } from 'pinia'
import type { AccountTypeForm } from '@/modules/Contabilidad/Contabilidad/CatalogoDeCuentas/types/accountsCatalogTypes'

const initialAccount: AccountTypeForm = {
    id: undefined,
    code: '',
    name: '',
    typeId: 0,
    natureId: 0,
    levelId: 0,
    currencyId: 0,
    clasificationId: 0,
    SATCode: '',
    parentId: 0,
    acceptsMovements: false,
    requiresAuxiliary: false,
    active: false
}

const useAccountsCatalogStore = defineStore('accounts-catalog-store', {
    state: () => ({
        selectedAccount: initialAccount as AccountTypeForm,
        modalId: 'accounts-catalog-modal'
    }),
    actions: {
        setData(data: AccountTypeForm = initialAccount) {
            this.selectedAccount = data
        }
    }
})

export default useAccountsCatalogStore
