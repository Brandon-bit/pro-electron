import { defineStore } from 'pinia'
import type { ReceivedInvoiceType, ReceivedInvoiceFilterType } from '@/modules/Fiscal/FacturasRecibidas/types/receivedInvoiceTypes'

interface ReceivedInvoiceState {
    receivedInvoices: ReceivedInvoiceType[]
    selectedReceivedInvoice: ReceivedInvoiceType | null
    filters: ReceivedInvoiceFilterType
    modalId: string
    detailModalId: string
    uploadModalId: string
    validateModalId: string
    rejectModalId: string
}

const useReceivedInvoiceStore = defineStore('receivedInvoice', {
    state: (): ReceivedInvoiceState => ({
        receivedInvoices: [],
        selectedReceivedInvoice: null,
        filters: {},
        modalId: 'receivedInvoiceModal',
        detailModalId: 'receivedInvoiceDetailModal',
        uploadModalId: 'uploadXmlModal',
        validateModalId: 'validateInvoiceModal',
        rejectModalId: 'rejectInvoiceModal'
    }),

    getters: {
        getReceivedInvoices: (state) => state.receivedInvoices,
        getSelectedReceivedInvoice: (state) => state.selectedReceivedInvoice,
        getFilters: (state) => state.filters
    },

    actions: {
        setReceivedInvoices(receivedInvoices: ReceivedInvoiceType[]) {
            this.receivedInvoices = receivedInvoices
        },

        setData(receivedInvoice?: ReceivedInvoiceType) {
            this.selectedReceivedInvoice = receivedInvoice || null
        },

        setFilters(filters: ReceivedInvoiceFilterType) {
            this.filters = filters
        },

        clearFilters() {
            this.filters = {}
        }
    }
})

export default useReceivedInvoiceStore
