import { defineStore } from 'pinia'
import type { SPCDataPointType, ControlLimitsType } from '@/modules/DiagramasDeDecision/SPC/types/spcTypes'

const useSPCStore = defineStore('spc-store', {
    state: () => ({
        dataPoints: [
            { id: 1, sample: 1, value: 23.5, isOutOfControl: false },
            { id: 2, sample: 2, value: 24.1, isOutOfControl: false },
            { id: 3, sample: 3, value: 23.8, isOutOfControl: false },
            { id: 4, sample: 4, value: 24.3, isOutOfControl: false },
            { id: 5, sample: 5, value: 23.9, isOutOfControl: false },
            { id: 6, sample: 6, value: 24.2, isOutOfControl: false },
            { id: 7, sample: 7, value: 23.7, isOutOfControl: false },
            { id: 8, sample: 8, value: 28.5, isOutOfControl: true, violationType: 'Fuera de UCL' },
            { id: 9, sample: 9, value: 24.0, isOutOfControl: false },
            { id: 10, sample: 10, value: 23.6, isOutOfControl: false }
        ] as SPCDataPointType[],
        controlLimits: {
            mean: 0,
            ucl: 0,
            lcl: 0,
            sigma: 0
        } as ControlLimitsType
    }),
    actions: {
        setDataPoints(points: SPCDataPointType[]) {
            this.dataPoints = points
        },
        addDataPoint(value: number) {
            const newPoint: SPCDataPointType = {
                id: this.dataPoints.length + 1,
                sample: this.dataPoints.length + 1,
                value,
                isOutOfControl: false
            }
            this.dataPoints.push(newPoint)
            this.calculateControlLimits()
        },
        calculateControlLimits() {
            if (this.dataPoints.length === 0) return

            const values = this.dataPoints.map(d => d.value)
            const mean = values.reduce((sum, v) => sum + v, 0) / values.length

            // Calculate standard deviation
            const variance = values.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / values.length
            const sigma = Math.sqrt(variance)

            const ucl = mean + (3 * sigma)
            const lcl = mean - (3 * sigma)

            this.controlLimits = { mean, ucl, lcl, sigma }

            // Check for violations
            this.checkControlViolations()
        },
        checkControlViolations() {
            const { mean, ucl, lcl } = this.controlLimits
            
            this.dataPoints = this.dataPoints.map(point => {
                // Rule 1: Point beyond 3 sigma
                if (point.value > ucl || point.value < lcl) {
                    return { ...point, isOutOfControl: true, violationType: 'Fuera de límites 3σ' }
                }
                
                return { ...point, isOutOfControl: false, violationType: undefined }
            })
        }
    },
    getters: {
        outOfControlPoints: (state) => {
            return state.dataPoints.filter(d => d.isOutOfControl)
        }
    }
})

export default useSPCStore
