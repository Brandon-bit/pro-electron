import { defineStore } from 'pinia'
import { AccountPayableDTO, PaymentDTO } from '@/modules/Tesoreria/CuentasPorPagar/types/accountPayableTypes'

const initialAccountPayable: AccountPayableDTO = {
    id: 0,
    supplierId: 0,
    supplierName: '',
    documentNumber: '',
    documentType: 'FACTURA',
    issueDate: '',
    dueDate: '',
    amount: 0,
    pendingBalance: 0,
    status: 'PENDIENTE',
    notes: ''
}

const initialPayment: PaymentDTO = {
    id: 0,
    accountPayableId: 0,
    paymentDate: '',
    amount: 0,
    paymentMethod: 'TRANSFERENCIA',
    reference: '',
    notes: ''
}

const useAccountPayableStore = defineStore('account-payable-store', {
    state: () => ({
        accountsPayable: [] as AccountPayableDTO[],
        selectedAccountPayable: null as AccountPayableDTO | null,
        currentPayment: initialPayment as PaymentDTO,
        payments: [] as PaymentDTO[],
        indexPayment: 0 as number,
        modalId: 'account-payable-modal',
        paymentModalId: 'payment-modal'
    }),
    actions: {
        setData(data: AccountPayableDTO = initialAccountPayable) {
            this.selectedAccountPayable = { ...data }
        },
        setCurrentPaymentByIndex(index: number | null = null) {
            this.currentPayment = index === null ? initialPayment : this.payments[index]
        },
        setIndexPayment(index: number) {
            this.indexPayment = index
        },
        removeItemPayment() {
            this.payments.splice(this.indexPayment, 1)
            return 'El pago se eliminó correctamente'
        },
        addPayment(data: PaymentDTO) {
            this.payments = [...this.payments, data]
            return 'El pago se añadió correctamente'
        },
        updatePayment(data: PaymentDTO) {
            this.payments[this.indexPayment] = data
            return 'El pago se actualizó correctamente'
        },
        clearPayments() {
            this.payments = []
        }
    }
})

export default useAccountPayableStore
