import { defineStore } from 'pinia'
import type { AnnualDeclarationTabType } from '@/modules/Fiscal/Anuales/types/annualDeclarationTypes'

interface AnnualDeclarationState {
    activeTab: AnnualDeclarationTabType
    selectedYear: number
}

const useAnnualDeclarationStore = defineStore('annualDeclaration', {
    state: (): AnnualDeclarationState => ({
        activeTab: 'inflation-adjustment',
        selectedYear: new Date().getFullYear()
    }),

    getters: {
        getActiveTab: (state) => state.activeTab,
        getSelectedYear: (state) => state.selectedYear
    },

    actions: {
        setActiveTab(tab: AnnualDeclarationTabType) {
            this.activeTab = tab
        },

        setSelectedYear(year: number) {
            this.selectedYear = year
        }
    }
})

export default useAnnualDeclarationStore
