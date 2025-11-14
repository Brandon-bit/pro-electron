import { defineStore } from 'pinia'
import type { InvoiceType, InvoiceItemType, InvoiceFilterType } from '@/modules/Fiscal/FacturasEmitidas/types/invoiceTypes'

const initialInvoice: InvoiceType = {
    id: undefined,
    folio: '',
    serie: 'A',
    uuid: '',
    clientName: '',
    clientRfc: '',
    issueDate: new Date(),
    subtotal: 0,
    tax: 0,
    total: 0,
    currency: 'MXN',
    paymentMethod: 'PUE',
    paymentForm: '01',
    status: 'Borrador',
    cfdiUse: 'G03',
    items: []
}

const useInvoiceStore = defineStore('invoice-store', {
    state: () => ({
        selectedInvoice: initialInvoice as InvoiceType,
        invoices: [] as InvoiceType[],
        filters: {} as InvoiceFilterType,
        modalId: 'invoice-modal',
        detailModalId: 'invoice-detail-modal',
        cancelModalId: 'invoice-cancel-modal'
    }),
    actions: {
        setData(data: InvoiceType = initialInvoice) {
            this.selectedInvoice = data
        },
        setInvoices(invoices: InvoiceType[]) {
            this.invoices = invoices
        },
        setFilters(filters: InvoiceFilterType) {
            this.filters = filters
        },
        addItem(item: InvoiceItemType) {
            this.selectedInvoice.items.push(item)
            this.recalculateTotals()
        },
        removeItem(index: number) {
            this.selectedInvoice.items.splice(index, 1)
            this.recalculateTotals()
        },
        updateItem(index: number, item: InvoiceItemType) {
            this.selectedInvoice.items[index] = item
            this.recalculateTotals()
        },
        recalculateTotals() {
            const subtotal = this.selectedInvoice.items.reduce((sum, item) => sum + item.subtotal, 0)
            const tax = this.selectedInvoice.items.reduce((sum, item) => sum + item.tax, 0)
            
            this.selectedInvoice.subtotal = subtotal
            this.selectedInvoice.tax = tax
            this.selectedInvoice.total = subtotal + tax
        }
    }
})

export default useInvoiceStore
