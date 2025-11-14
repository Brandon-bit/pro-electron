import { defineStore } from 'pinia'
import type { BenefitType } from '@/modules/DiagramasDeDecision/SeguimientoDeBeneficios/types/benefitTypes'

const useBenefitStore = defineStore('benefit-store', {
    state: () => ({
        benefits: [
            {
                id: '1',
                name: 'Reducción Tiempo Proceso Aprobación',
                baseline: 48,
                target: 24,
                current: 32,
                unit: 'horas'
            },
            {
                id: '2',
                name: 'Aumento Satisfacción Usuario',
                baseline: 6.2,
                target: 8.5,
                current: 7.8,
                unit: '/10'
            }
        ] as BenefitType[],
        createModalId: 'create-benefit-modal'
    }),
    actions: {
        addBenefit(name: string, baseline: number, target: number, current: number, unit: string) {
            const newBenefit: BenefitType = {
                id: Date.now().toString(),
                name,
                baseline,
                target,
                current,
                unit
            }
            this.benefits.push(newBenefit)
        }
    },
    getters: {
        calculateProgress: () => (benefit: BenefitType) => {
            return ((benefit.current - benefit.baseline) / (benefit.target - benefit.baseline)) * 100
        }
    }
})

export default useBenefitStore
