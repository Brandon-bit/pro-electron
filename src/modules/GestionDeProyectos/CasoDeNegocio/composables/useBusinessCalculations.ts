import { computed } from 'vue'
import useBusinessCaseStore from '@/modules/GestionDeProyectos/CasoDeNegocio/store/businessCaseStore'
import type { YearlyTotalsType, KPIsType, ChartDataType, BenefitType } from '@/modules/GestionDeProyectos/CasoDeNegocio/types/businessCaseTypes'
import { YEARS } from '@/modules/GestionDeProyectos/CasoDeNegocio/types/businessCaseTypes'

export const useBusinessCalculations = () => {
    
    const businessStore = useBusinessCaseStore()

    // Encontrar el último año con distribución
    const lastYearWithDistribution = computed(() => {
        let lastYear = -1
        let accumulated = 0
        for (let i = 0; i < businessStore.benefitDistribution.length; i++) {
            accumulated += businessStore.benefitDistribution[i]
            if (accumulated > 0) lastYear = i
            if (accumulated >= 100) return i
        }
        return lastYear
    })

    // Calcular beneficios reales aplicando distribución
    const realBenefits = computed(() => {
        return businessStore.benefits.map(benefit => ({
            ...benefit,
            realValues: benefit.values.map((val, yearIdx) => 
                (val * businessStore.benefitDistribution[yearIdx]) / 100
            )
        }))
    })

    // Calcular totales por año
    const yearlyTotals = computed((): YearlyTotalsType => {
        const totals: YearlyTotalsType = {
            benefits: Array(YEARS).fill(0),
            nonRecurringCosts: Array(YEARS).fill(0),
            recurringCosts: Array(YEARS).fill(0),
            totalCosts: Array(YEARS).fill(0),
            cashFlow: Array(YEARS).fill(0),
            accumulatedCashFlow: Array(YEARS).fill(0),
            discountedCashFlow: Array(YEARS).fill(0),
            accumulatedDiscountedCashFlow: Array(YEARS).fill(0)
        }

        // Beneficios totales por año
        realBenefits.value.forEach(benefit => {
            benefit.realValues.forEach((val, idx) => {
                totals.benefits[idx] += val
            })
        })

        // Costos no recurrentes por año
        businessStore.nonRecurringCosts.forEach(cost => {
            cost.values.forEach((val, idx) => {
                totals.nonRecurringCosts[idx] += val
            })
        })

        // Costos recurrentes por año
        businessStore.recurringCosts.forEach(cost => {
            cost.values.forEach((val, idx) => {
                totals.recurringCosts[idx] += val
            })
        })

        // Calcular totales y flujos
        for (let i = 0; i < YEARS; i++) {
            totals.totalCosts[i] = totals.nonRecurringCosts[i] + totals.recurringCosts[i]
            totals.cashFlow[i] = totals.benefits[i] - totals.totalCosts[i]
            totals.accumulatedCashFlow[i] = i === 0 
                ? totals.cashFlow[i] 
                : totals.accumulatedCashFlow[i - 1] + totals.cashFlow[i]
            
            const discountFactor = Math.pow(1 + businessStore.discountRate / 100, i)
            totals.discountedCashFlow[i] = totals.cashFlow[i] / discountFactor
            totals.accumulatedDiscountedCashFlow[i] = i === 0
                ? totals.discountedCashFlow[i]
                : totals.accumulatedDiscountedCashFlow[i - 1] + totals.discountedCashFlow[i]
        }

        return totals
    })

    // KPIs Calculados
    const kpis = computed((): KPIsType => {
        const totalValue = yearlyTotals.value.benefits.reduce((sum, val) => sum + val, 0)
        const totalCost = yearlyTotals.value.totalCosts.reduce((sum, val) => sum + val, 0)
        const netValue = totalValue - totalCost
        const roi = totalCost !== 0 ? ((totalValue - totalCost) / totalCost) * 100 : 0
        const npv = yearlyTotals.value.accumulatedDiscountedCashFlow[YEARS - 1]

        // Calcular TIR (aproximación usando búsqueda binaria)
        const calculateIRR = () => {
            let low = -0.99
            let high = 1.0
            let irr = 0
            
            for (let i = 0; i < 100; i++) {
                irr = (low + high) / 2
                let npvTest = 0
                
                for (let year = 0; year < YEARS; year++) {
                    npvTest += yearlyTotals.value.cashFlow[year] / Math.pow(1 + irr, year)
                }
                
                if (Math.abs(npvTest) < 0.01) break
                
                if (npvTest > 0) {
                    low = irr
                } else {
                    high = irr
                }
            }
            
            return irr * 100
        }

        const irr = calculateIRR()

        // Calcular periodo de recuperación
        let paybackPeriod = YEARS
        for (let i = 0; i < YEARS; i++) {
            if (yearlyTotals.value.accumulatedCashFlow[i] >= 0) {
                paybackPeriod = i
                if (i > 0 && yearlyTotals.value.accumulatedCashFlow[i - 1] < 0) {
                    const interpolation = Math.abs(yearlyTotals.value.accumulatedCashFlow[i - 1]) / 
                                         yearlyTotals.value.cashFlow[i]
                    paybackPeriod = i - 1 + interpolation
                }
                break
            }
        }

        return {
            totalValue,
            totalCost,
            netValue,
            roi,
            npv,
            irr,
            paybackPeriod
        }
    })

    // Datos para la gráfica de punto de equilibrio
    const chartData = computed((): ChartDataType[] => {
        let accumulatedBenefits = 0
        let accumulatedCosts = 0

        return Array.from({ length: YEARS }, (_, i) => {
            accumulatedBenefits += yearlyTotals.value.benefits[i]
            accumulatedCosts += yearlyTotals.value.totalCosts[i]

            return {
                year: `Año ${i}`,
                beneficios: accumulatedBenefits,
                costos: accumulatedCosts
            }
        })
    })

    const formatCurrency = (value: number): string => {
        return new Intl.NumberFormat('es-MX', { 
            style: 'currency', 
            currency: 'MXN',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value)
    }

    const formatPercent = (value: number): string => {
        return `${value.toFixed(2)}%`
    }

    const getRealBenefitById = (id: string): BenefitType & { realValues: number[] } | undefined => {
        return realBenefits.value.find(b => b.id === id)
    }

    return {
        lastYearWithDistribution,
        realBenefits,
        yearlyTotals,
        kpis,
        chartData,
        formatCurrency,
        formatPercent,
        getRealBenefitById
    }
}
