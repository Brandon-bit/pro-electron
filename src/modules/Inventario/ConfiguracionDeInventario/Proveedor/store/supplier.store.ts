import { SupplierType } from '../types/supplierTypes';
import { defineStore } from 'pinia'

const initialSupplier: SupplierType = {
    id: undefined,
    IdDireccion: undefined,
    socialReason: '',
    comercialName: '',
    rfc: '',
    email: '',
    contact: '',
    phone: '',
    webSite: '',
    payConditions: '',
    idUser: '',
    active: true,
    creationDate: undefined,
    updateDate: undefined
}

const useSupplierStore = defineStore('supplier-store', {
    state: () => ({
        selectedSupplier: initialSupplier as SupplierType,
        modalId: 'supplier-modal'
    }),
    actions: {
        setSupplier(data: SupplierType = initialSupplier) {
            this.selectedSupplier = data
        },
        clearSupplier() {
            this.selectedSupplier = initialSupplier
        }
    }
})

export default useSupplierStore
