import { defineStore } from 'pinia'
import { AccountReceivableDTO, PaymentDTO } from '@/modules/Tesoreria/CuentasPorCobrar/types/accountReceivableTypes'

const initialAccountReceivable: AccountReceivableDTO = {
    id: 0,
    clientId: 0,
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
    accountReceivableId: 0,
    paymentDate: '',
    amount: 0,
    paymentMethod: 'TRANSFERENCIA',
    reference: '',
    notes: ''
}

const useAccountReceivableStore = defineStore('account-receivable-store', {
    state: () => ({
        accountsReceivable: [] as AccountReceivableDTO[],
        selectedAccountReceivable: null as AccountReceivableDTO | null,
        currentPayment: initialPayment as PaymentDTO,
        payments: [] as PaymentDTO[],
        indexPayment: 0 as number,
        modalId: 'account-receivable-modal',
        paymentModalId: 'payment-modal'
    }),
    actions: {
        setData(data: AccountReceivableDTO = initialAccountReceivable) {
            this.selectedAccountReceivable = { ...data }
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

export default useAccountReceivableStore
