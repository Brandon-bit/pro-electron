import { defineStore } from 'pinia'
import type { MetricType } from '@/modules/DiagramasDeDecision/MonitoreoDeAdopcion/types/adoptionTypes'

const useAdoptionStore = defineStore('adoption-store', {
    state: () => ({
        metrics: [
            {
                id: '1',
                title: 'Tasa de Adopción',
                value: '68%',
                progress: 68
            },
            {
                id: '2',
                title: 'Usuarios Activos',
                value: 342,
                trend: '+15% vs semana anterior',
                trendType: 'positive' as const
            },
            {
                id: '3',
                title: 'Casos de Resistencia',
                value: 8,
                description: '5 en seguimiento',
                trendType: 'neutral' as const
            },
            {
                id: '4',
                title: 'Satisfacción General',
                value: 7.8,
                description: 'Sobre 10',
                trendType: 'positive' as const
            }
        ] as MetricType[]
    })
})

export default useAdoptionStore
