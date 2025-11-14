import { defineStore } from 'pinia'
import type { ProvisionalPaymentType, VATDeclarationType } from '@/modules/Fiscal/Provisionales/types/provisionalPaymentTypes'

interface ProvisionalPaymentState {
    provisionalPayments: ProvisionalPaymentType[]
    vatDeclarations: VATDeclarationType[]
    selectedProvisionalPayment: ProvisionalPaymentType | null
    selectedVATDeclaration: VATDeclarationType | null
    activeTab: 'isr' | 'iva'
    modalId: string
    detailModalId: string
    generateModalId: string
}

const useProvisionalPaymentStore = defineStore('provisionalPayment', {
    state: (): ProvisionalPaymentState => ({
        provisionalPayments: [],
        vatDeclarations: [],
        selectedProvisionalPayment: null,
        selectedVATDeclaration: null,
        activeTab: 'isr',
        modalId: 'provisionalPaymentModal',
        detailModalId: 'provisionalPaymentDetailModal',
        generateModalId: 'generateDeclarationModal'
    }),

    getters: {
        getProvisionalPayments: (state) => state.provisionalPayments,
        getVATDeclarations: (state) => state.vatDeclarations,
        getSelectedProvisionalPayment: (state) => state.selectedProvisionalPayment,
        getSelectedVATDeclaration: (state) => state.selectedVATDeclaration,
        getActiveTab: (state) => state.activeTab
    },

    actions: {
        setProvisionalPayments(payments: ProvisionalPaymentType[]) {
            this.provisionalPayments = payments
        },

        setVATDeclarations(declarations: VATDeclarationType[]) {
            this.vatDeclarations = declarations
        },

        setSelectedProvisionalPayment(payment?: ProvisionalPaymentType) {
            this.selectedProvisionalPayment = payment || null
        },

        setSelectedVATDeclaration(declaration?: VATDeclarationType) {
            this.selectedVATDeclaration = declaration || null
        },

        setActiveTab(tab: 'isr' | 'iva') {
            this.activeTab = tab
        }
    }
})

export default useProvisionalPaymentStore
