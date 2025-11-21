import { defineStore } from 'pinia'
import { ClientDTO } from '@/modules/Tesoreria/Clientes/types/clientTypes'

const initialClient: ClientDTO = {
    id: 0,
    name: '',
    rfc: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    creditLimit: 0,
    creditDays: 0,
    active: true,
    notes: ''
}

const useClientStore = defineStore('client-store', {
    state: () => ({
        clients: [] as ClientDTO[],
        selectedClient: null as ClientDTO | null,
        modalId: 'client-modal'
    }),
    actions: {
        setData(data: ClientDTO = initialClient) {
            this.selectedClient = { ...data }
        }
    }
})

export default useClientStore
