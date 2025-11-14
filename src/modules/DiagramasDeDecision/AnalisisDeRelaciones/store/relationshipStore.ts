import { defineStore } from 'pinia'
import type { MetricType, CorrelationResultType, SelectedCellType } from '@/modules/DiagramasDeDecision/AnalisisDeRelaciones/types/relationshipTypes'

const availableMetrics: MetricType[] = [
    { id: 'team_size', name: 'Tamaño del Equipo', values: [5, 8, 12, 15, 20, 10, 7, 18, 6, 14] },
    { id: 'open_bugs', name: 'Bugs Abiertos', values: [12, 25, 35, 48, 65, 30, 18, 55, 15, 42] },
    { id: 'lead_time', name: 'Lead Time (días)', values: [3, 5, 7, 9, 12, 6, 4, 11, 3.5, 8] },
    { id: 'velocity', name: 'Velocidad (pts)', values: [40, 50, 60, 55, 50, 58, 45, 62, 42, 57] },
    { id: 'code_coverage', name: 'Cobertura de Código (%)', values: [75, 68, 55, 48, 35, 62, 72, 40, 78, 52] }
]

const useRelationshipStore = defineStore('relationship-store', {
    state: () => ({
        availableMetrics: availableMetrics,
        selectedMetrics: ['team_size', 'open_bugs'] as string[],
        correlationMatrix: [] as CorrelationResultType[],
        selectedCell: null as SelectedCellType | null
    }),
    actions: {
        toggleMetric(metricId: string) {
            if (this.selectedMetrics.includes(metricId)) {
                this.selectedMetrics = this.selectedMetrics.filter(id => id !== metricId)
            } else {
                this.selectedMetrics.push(metricId)
            }
        },
        calculateCorrelation(x: number[], y: number[]): number {
            const n = x.length
            const sumX = x.reduce((a, b) => a + b, 0)
            const sumY = y.reduce((a, b) => a + b, 0)
            const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0)
            const sumX2 = x.reduce((sum, xi) => sum + xi * xi, 0)
            const sumY2 = y.reduce((sum, yi) => sum + yi * yi, 0)

            const numerator = n * sumXY - sumX * sumY
            const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY))

            return denominator === 0 ? 0 : numerator / denominator
        },
        analyzeCorrelations() {
            const results: CorrelationResultType[] = []

            for (let i = 0; i < this.selectedMetrics.length; i++) {
                for (let j = 0; j < this.selectedMetrics.length; j++) {
                    const metric1 = this.availableMetrics.find(m => m.id === this.selectedMetrics[i])!
                    const metric2 = this.availableMetrics.find(m => m.id === this.selectedMetrics[j])!

                    const correlation = i === j ? 1 : this.calculateCorrelation(metric1.values, metric2.values)

                    results.push({
                        metric1: metric1.name,
                        metric2: metric2.name,
                        correlation: parseFloat(correlation.toFixed(3))
                    })
                }
            }

            this.correlationMatrix = results
        },
        selectCell(metric1Name: string, metric2Name: string) {
            if (metric1Name === metric2Name) return
            this.selectedCell = { x: metric1Name, y: metric2Name }
        },
        clearSelectedCell() {
            this.selectedCell = null
        }
    },
    getters: {
        uniqueMetrics: (state) => {
            return [...new Set(state.correlationMatrix.map(r => r.metric1))]
        },
        scatterData: (state) => {
            if (!state.selectedCell) return []

            const metric1 = state.availableMetrics.find(m => m.name === state.selectedCell!.x)
            const metric2 = state.availableMetrics.find(m => m.name === state.selectedCell!.y)

            if (!metric1 || !metric2) return []

            return metric1.values.map((val, idx) => ({
                x: val,
                y: metric2.values[idx]
            }))
        },
        selectedCorrelation: (state) => {
            if (!state.selectedCell) return null
            return state.correlationMatrix.find(
                r => r.metric1 === state.selectedCell!.x && r.metric2 === state.selectedCell!.y
            )
        }
    }
})

export default useRelationshipStore
