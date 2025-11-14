import { ref } from 'vue'
import type { YearGoal, MonthGoal } from '../types/goalTypes'

export const useGoals = () => {
    const yearGoals = ref<YearGoal[]>([])
    const loading = ref(false)

    // Función para obtener metas (mock data)
    const fetchGoals = async () => {
        loading.value = true
        
        // Simular delay de API
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // Mock data
        const mockData: YearGoal[] = [
            {
                id: 1,
                año: 2025,
                meses: [
                    {
                        id: 1,
                        mes: 'junio',
                        clientes: 10,
                        inversion: 100000
                    },
                    {
                        id: 2,
                        mes: 'julio',
                        clientes: 20,
                        inversion: 1000000
                    },
                    {
                        id: 3,
                        mes: 'agosto',
                        clientes: 20,
                        inversion: 1000000
                    }
                ]
            },
            {
                id: 2,
                año: 2026,
                meses: [
                    {
                        id: 4,
                        mes: 'enero',
                        clientes: 10,
                        inversion: 2000000
                    }
                ]
            }
        ]
        
        yearGoals.value = mockData
        loading.value = false
    }

    // Crear nuevo año
    const createYear = async (año: number) => {
        await new Promise(resolve => setTimeout(resolve, 300))
        console.log('Crear año:', año)
        
        // Agregar año a la lista
        yearGoals.value.push({
            id: Date.now(),
            año,
            meses: []
        })
    }

    // Crear nuevo mes
    const createMonth = async (añoId: string | number, mes: string, clientes: number, inversion: number) => {
        await new Promise(resolve => setTimeout(resolve, 300))
        console.log('Crear mes:', { añoId, mes, clientes, inversion })
        
        // Agregar mes al año correspondiente
        const year = yearGoals.value.find(y => y.id === añoId)
        if (year) {
            year.meses.push({
                id: Date.now(),
                mes,
                clientes,
                inversion
            })
        }
    }

    // Eliminar mes
    const deleteMonth = async (añoId: string | number, mesId: string | number) => {
        await new Promise(resolve => setTimeout(resolve, 300))
        console.log('Eliminar mes:', { añoId, mesId })
        
        // Eliminar mes del año correspondiente
        const year = yearGoals.value.find(y => y.id === añoId)
        if (year) {
            year.meses = year.meses.filter(m => m.id !== mesId)
        }
    }

    return {
        yearGoals,
        loading,
        fetchGoals,
        createYear,
        createMonth,
        deleteMonth
    }
}
