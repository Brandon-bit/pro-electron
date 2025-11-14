import { ref, computed } from 'vue'
import type { InvestmentScenario, MonthlyCalculation, InvestmentResult, PaymentModality } from '../types/investmentTypes'

export const useInvestmentCalculator = () => {
    const scenario = ref<InvestmentScenario>({
        nombre: '',
        monto: 0,
        tasaInteres: 0,
        plazoMeses: 12,
        plazoDias: 360,
        modalidad: 'mensual'
    })

    const result = ref<InvestmentResult | null>(null)

    // Calcular plazo en días basado en meses
    const calculatePlazoDias = (meses: number): number => {
        return meses * 30
    }

    // Determinar si un mes es de pago según la modalidad
    const isPaymentMonth = (mes: number, modalidad: PaymentModality): boolean => {
        switch (modalidad) {
            case 'mensual':
                return true // Todos los meses
            case 'bimestral':
                return mes % 2 === 0 // Cada 2 meses
            case 'trimestral':
                return mes % 3 === 0 // Cada 3 meses
            case 'cuatrimestral':
                return mes % 4 === 0 // Cada 4 meses
            case 'semestral':
                return mes % 6 === 0 // Cada 6 meses
            case 'vencimiento':
                return mes === scenario.value.plazoMeses // Solo el último mes
            case 'reinversion':
                return mes === scenario.value.plazoMeses // Solo el último mes
            default:
                return false
        }
    }

    // Calcular interés mensual
    const calculateMonthlyInterest = (monto: number, tasaAnual: number, dias: number): number => {
        // Fórmula: (Monto * Tasa Anual * Días) / (100 * 360)
        return (monto * tasaAnual * dias) / (100 * 360)
    }

    // Realizar el cálculo completo
    const calculate = () => {
        if (scenario.value.monto <= 0 || scenario.value.tasaInteres <= 0) {
            console.warn('Validación fallida:', { 
                monto: scenario.value.monto, 
                tasaInteres: scenario.value.tasaInteres 
            })
            return
        }

        const calculations: MonthlyCalculation[] = []
        let montoAcumulado = scenario.value.monto
        let interesAcumulado = 0

        for (let mes = 1; mes <= scenario.value.plazoMeses; mes++) {
            // Calcular días del mes (30 días por mes, excepto el último que puede variar)
            const dias = mes === scenario.value.plazoMeses 
                ? scenario.value.plazoDias - ((mes - 1) * 30)
                : 30

            // Calcular interés del mes
            const interesMes = calculateMonthlyInterest(
                scenario.value.modalidad === 'reinversion' ? montoAcumulado : scenario.value.monto,
                scenario.value.tasaInteres,
                dias
            )

            interesAcumulado += interesMes

            // Si es reinversión, acumular el interés al monto
            if (scenario.value.modalidad === 'reinversion' && mes < scenario.value.plazoMeses) {
                montoAcumulado += interesMes
            }

            const rendimientoFinal = scenario.value.monto + interesAcumulado
            const mesDePago = isPaymentMonth(mes, scenario.value.modalidad)

            calculations.push({
                mes,
                dias,
                interes: interesMes,
                rendimientoFinal,
                mesDePago
            })
        }

        result.value = {
            scenario: { ...scenario.value },
            calculations,
            totalDias: scenario.value.plazoDias,
            totalInteres: interesAcumulado,
            totalRendimiento: scenario.value.monto + interesAcumulado
        }
        
        console.log('Cálculo completado:', result.value)
    }

    // Actualizar plazo en días cuando cambian los meses
    const updatePlazoDias = () => {
        scenario.value.plazoDias = calculatePlazoDias(scenario.value.plazoMeses)
    }

    // Resetear el formulario
    const reset = () => {
        scenario.value = {
            nombre: '',
            monto: 0,
            tasaInteres: 0,
            plazoMeses: 12,
            plazoDias: 360,
            modalidad: 'mensual'
        }
        result.value = null
    }

    return {
        scenario,
        result,
        calculate,
        updatePlazoDias,
        reset
    }
}
