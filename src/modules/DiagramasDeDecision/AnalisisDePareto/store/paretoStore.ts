import { defineStore } from 'pinia'
import type { ParetoDataType, RawParetoDataType } from '@/modules/DiagramasDeDecision/AnalisisDePareto/types/paretoTypes'

const useParetoStore = defineStore('pareto-store', {
    state: () => ({
        data: [
            { category: 'Retraso por Aprobaciones', frequency: 45, cost: 125000, percentage: 35.7, cumulativePercentage: 35.7 },
            { category: 'Falta de Recursos', frequency: 32, cost: 85000, percentage: 25.4, cumulativePercentage: 61.1 },
            { category: 'Cambios de Alcance', frequency: 28, cost: 70000, percentage: 22.2, cumulativePercentage: 83.3 },
            { category: 'Problemas Técnicos', frequency: 15, cost: 35000, percentage: 11.9, cumulativePercentage: 95.2 },
            { category: 'Otros', frequency: 6, cost: 12000, percentage: 4.8, cumulativePercentage: 100 }
        ] as ParetoDataType[],
        selectedCategory: null as string | null
    }),
    actions: {
        setData(data: ParetoDataType[]) {
            this.data = data
        },
        calculateParetoData(rawData: RawParetoDataType[]): ParetoDataType[] {
            // Sort by frequency descending
            const sorted = [...rawData].sort((a, b) => b.frequency - a.frequency)
            const total = sorted.reduce((sum, item) => sum + item.frequency, 0)
            
            let cumulative = 0
            return sorted.map(item => {
                const percentage = (item.frequency / total) * 100
                cumulative += percentage
                return {
                    ...item,
                    percentage: parseFloat(percentage.toFixed(1)),
                    cumulativePercentage: parseFloat(cumulative.toFixed(1))
                }
            })
        },
        addData(category: string, frequency: number, cost: number) {
            const rawData: RawParetoDataType[] = [
                ...this.data.map(d => ({ category: d.category, frequency: d.frequency, cost: d.cost })),
                { category, frequency, cost }
            ]
            this.data = this.calculateParetoData(rawData)
        },
        deleteData(category: string) {
            const rawData = this.data
                .filter(d => d.category !== category)
                .map(d => ({ category: d.category, frequency: d.frequency, cost: d.cost }))
            
            this.data = this.calculateParetoData(rawData)
        },
        setSelectedCategory(category: string | null) {
            this.selectedCategory = category
        }
    }
})

export default useParetoStore
