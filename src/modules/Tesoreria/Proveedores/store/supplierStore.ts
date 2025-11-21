import { defineStore } from 'pinia'
import { SupplierDTO } from '@/modules/Tesoreria/Proveedores/types/supplierTypes'

const initialSupplier: SupplierDTO = {
    id: 0,
    name: '',
    rfc: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    creditDays: 0,
    active: true,
    notes: ''
}

const useSupplierStore = defineStore('supplier-store', {
    state: () => ({
        suppliers: [] as SupplierDTO[],
        selectedSupplier: null as SupplierDTO | null,
        modalId: 'supplier-modal'
    }),
    actions: {
        setData(data: SupplierDTO = initialSupplier) {
            this.selectedSupplier = { ...data }
        }
    }
})

export default useSupplierStore
