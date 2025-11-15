import type { InitiativeResponseType, InitiativeFormType, InitiativeType } from '@/modules/GestionDeProyectos/Operacion/AnalisisDeIniciativas/types/initiativeTypes'
import useInitiativeStore from '@/modules/GestionDeProyectos/Operacion/AnalisisDeIniciativas/store/initiativeStore'
import { createInitiativeService, deleteInitiativeService, updateInitiativeService, getInitiativesService, toggleSelectionService } from '@/modules/GestionDeProyectos/Operacion/AnalisisDeIniciativas/services/initiativeService'
import { mapInitiative, mapInitiativeRequest } from '@/modules/GestionDeProyectos/Operacion/AnalisisDeIniciativas/composables/mappingInitiativeData'

export const useInitiativeActions = () => {
    
    const initiativeStore = useInitiativeStore()

    const calculateStrategicAlignment = (effort: number, impact: number): number => {
        // Fórmula: más impacto y menos esfuerzo = mejor alineación
        const alignment = (impact * 10) - (effort * 5)
        return Math.max(0, Math.min(100, alignment))
    }

    const calculateEffortScore = (initiative: InitiativeType): number => {
        const criteria = initiativeStore.matrixCriteria.effort
        const values = {
            'Bajo': 1,
            'Medio': 2,
            'Alto': 3
        }
        
        const investmentScore = values[initiative.investment] * (criteria.investment / 100)
        const scopeScore = values[initiative.scope] * (criteria.scope / 100)
        const timeScore = values[initiative.timeHorizon === 'Corto' ? 'Bajo' : initiative.timeHorizon === 'Medio' ? 'Medio' : 'Alto'] * (criteria.timeHorizon / 100)
        
        return (investmentScore + scopeScore + timeScore) * 3.33 // Normalizar a escala 0-10
    }

    const calculateImpactScore = (initiative: InitiativeType): number => {
        const criteria = initiativeStore.matrixCriteria.impact
        const values = {
            'Bajo': 1,
            'Medio': 2,
            'Alto': 3
        }
        
        const savingsScore = values[initiative.savings] * (criteria.savings / 100)
        const benefitsScore = values[initiative.benefits] * (criteria.benefits / 100)
        const satisfactionScore = values[initiative.satisfaction] * (criteria.satisfaction / 100)
        
        return (savingsScore + benefitsScore + satisfactionScore) * 3.33 // Normalizar a escala 0-10
    }

    const getInitiatives = async (page: number, pageSize: number): Promise<{ items: InitiativeType[], total: number }> => {
        const response = await getInitiativesService(page, pageSize)
        return {
            items: response.data.items.map(mapInitiative),
            total: response.data.totalItems
        }
    }

    const createInitiative = async (data: InitiativeFormType): Promise<{ message: string, status: string, data: InitiativeResponseType }> => {
        const model = mapInitiativeRequest(data)
        const response = await createInitiativeService(model)
        return {
            message: response.message,
            status: response.success ? "success" : "error",
            data: response.data
        }
    }

    const editInitiative = async (data: InitiativeFormType): Promise<{ message: string, status: string, data: InitiativeResponseType }> => {
        const model = mapInitiativeRequest(data)
        const id = initiativeStore.selectedInitiative.id ?? 0
        const response = await updateInitiativeService(id, model)
        return {
            message: response.message,
            status: response.success ? "success" : "error",
            data: response.data
        }
    }

    const deleteInitiative = async (): Promise<{ message: string, status: string, data: InitiativeResponseType }> => {
        let id = initiativeStore.selectedInitiative?.id
        if (id == undefined) id = 0
        const response = await deleteInitiativeService(id)
        return {
            message: response.message,
            status: response.success ? "success" : "error",
            data: response.data
        }
    }

    const toggleSelection = async (id: number, selected: boolean): Promise<void> => {
        await toggleSelectionService(id, selected)
    }

    return { 
        createInitiative, 
        editInitiative, 
        deleteInitiative, 
        getInitiatives,
        toggleSelection,
        calculateStrategicAlignment,
        calculateEffortScore,
        calculateImpactScore
    }
}
