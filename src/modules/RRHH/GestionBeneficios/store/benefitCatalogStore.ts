import { defineStore } from 'pinia'

export interface BenefitCatalogDTO {
    id?: number
    name: string
    description: string
    requiredScore: number
    availableStock: number
    active: boolean
}

const initialBenefit: BenefitCatalogDTO = {
    id: undefined,
    name: '',
    description: '',
    requiredScore: 0,
    availableStock: 0,
    active: true
}

const useBenefitCatalogStore = defineStore('benefit-catalog-store', {
    state: () => ({
        benefits: [] as BenefitCatalogDTO[],
        selectedBenefit: null as BenefitCatalogDTO | null,
        modalId: 'benefit-catalog-modal'
    }),
    actions: {
        setData(data: BenefitCatalogDTO = initialBenefit) {
            this.selectedBenefit = { ...data }
        },
        clearData() {
            this.selectedBenefit = null
        }
    }
})

export default useBenefitCatalogStore
