import { defineStore } from 'pinia'
import type { InformativeDeclarationTabType } from '@/modules/Fiscal/Informativas/types/informativeDeclarationTypes'

interface InformativeDeclarationState {
    activeTab: InformativeDeclarationTabType
    selectedYear: number
    selectedMonth: number
}

const useInformativeDeclarationStore = defineStore('informativeDeclaration', {
    state: (): InformativeDeclarationState => ({
        activeTab: 'diot',
        selectedYear: new Date().getFullYear(),
        selectedMonth: new Date().getMonth() + 1
    }),

    getters: {
        getActiveTab: (state) => state.activeTab,
        getSelectedYear: (state) => state.selectedYear,
        getSelectedMonth: (state) => state.selectedMonth
    },

    actions: {
        setActiveTab(tab: InformativeDeclarationTabType) {
            this.activeTab = tab
        },

        setSelectedYear(year: number) {
            this.selectedYear = year
        },

        setSelectedMonth(month: number) {
            this.selectedMonth = month
        }
    }
})

export default useInformativeDeclarationStore
