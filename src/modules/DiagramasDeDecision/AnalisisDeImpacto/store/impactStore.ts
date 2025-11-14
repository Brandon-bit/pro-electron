import { defineStore } from 'pinia'
import type { ImpactItemType } from '@/modules/DiagramasDeDecision/AnalisisDeImpacto/types/impactTypes'

const useImpactStore = defineStore('impact-store', {
    state: () => ({
        impactItems: [
            { id: '1', role: 'Gerente Finanzas', process: 'Aprobación Compras', impact: 'alto' as const },
            { id: '2', role: 'Analista RH', process: 'Gestión Nómina', impact: 'medio' as const },
            { id: '3', role: 'Coordinador TI', process: 'Soporte Técnico', impact: 'bajo' as const }
        ] as ImpactItemType[],
        createModalId: 'create-impact-modal'
    }),
    actions: {
        addImpactItem(role: string, process: string, impact: 'alto' | 'medio' | 'bajo') {
            const newItem: ImpactItemType = {
                id: Date.now().toString(),
                role,
                process,
                impact
            }
            this.impactItems.push(newItem)
        }
    }
})

export default useImpactStore
