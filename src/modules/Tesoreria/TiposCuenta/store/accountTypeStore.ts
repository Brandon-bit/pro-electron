import { defineStore } from 'pinia'
import { AccountTypeDTO } from '@/modules/Tesoreria/TiposCuenta/types/accountTypeTypes'

const initialAccountType: AccountTypeDTO = {
    id: undefined,
    name: '',
    description: '',
    active: true
}

const useAccountTypeStore = defineStore('account-type-store', {
    state: () => ({
        accountTypes: [] as AccountTypeDTO[],
        selectedAccountType: null as AccountTypeDTO | null,
        modalId: 'account-type-modal'
    }),
    actions: {
        setData(data: AccountTypeDTO = initialAccountType) {
            this.selectedAccountType = { ...data }
        }
    }
})

export default useAccountTypeStore
