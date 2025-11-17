import type { InitiativeResponseType, InitiativeFormType, InitiativeType, CriteriaRequestType } from '@/modules/GestionDeProyectos/Operacion/AnalisisDeIniciativas/types/initiativeTypes'
import useInitiativeStore from '@/modules/GestionDeProyectos/Operacion/AnalisisDeIniciativas/store/initiativeStore'
import { 
    createInitiativeService, 
    deleteInitiativeService, 
    updateInitiativeService, 
    getInitiativesService,
    getCriteriaService,
    createCriteriaService,
    updateCriteriaService,
    sendToPrioritizationService
} from '@/modules/GestionDeProyectos/Operacion/AnalisisDeIniciativas/services/initiativeService'
import { mapInitiative, mapInitiativeRequest, mapInitiativeUpdateRequest, mapPrioritizationRequest } from '@/modules/GestionDeProyectos/Operacion/AnalisisDeIniciativas/composables/mappingInitiativeData'

export const useInitiativeActions = () => {
    
    const initiativeStore = useInitiativeStore()

    // Criterios de Evaluación
    const getCriteria = async (): Promise<void> => {
        const response = await getCriteriaService()
        if (response.data.criteriosExisten) {
            initiativeStore.updateCriteria({
                alcance: response.data.alcance,
                inversion: response.data.inversion,
                horizonteDeTiempo: response.data.horizonteDeTiempo,
                ahorroIngresos: response.data.ahorroIngresos,
                beneficios: response.data.beneficios,
                satisfaccionAlCliente: response.data.satisfaccionAlCliente
            })
            initiativeStore.setCriteriaExist(true)
        } else {
            initiativeStore.setCriteriaExist(false)
        }
    }

    const createCriteria = async (): Promise<{ message: string, status: string }> => {
        const data: CriteriaRequestType = {
            alcance: 50,
            inversion: 50,
            horizonteDeTiempo: 50,
            ahorroIngresos: 50,
            beneficios: 50,
            satisfaccionAlCliente: 50
        }
        const response = await createCriteriaService(data)
        if (response.success) {
            initiativeStore.updateCriteria(data)
            initiativeStore.setCriteriaExist(true)
        }
        return {
            message: response.message,
            status: response.success ? "success" : "error"
        }
    }

    const updateCriteria = async (data: CriteriaRequestType): Promise<{ message: string, status: string }> => {
        const response = await updateCriteriaService(data)
        if (response.success) {
            initiativeStore.updateCriteria(data)
        }
        return {
            message: response.message,
            status: response.success ? "success" : "error"
        }
    }

    const calculateStrategicAlignment = (effort: number, impact: number): number => {
        const alignment = (impact * 10) - (effort * 5)
        return Math.max(0, Math.min(100, alignment))
    }

    const calculateEffortScore = (initiative: InitiativeType): number => {
        const criteria = initiativeStore.matrixCriteria
        
        // Valores base: Bajo=3, Medio=6, Alto=9 (escala 0-10)
        const impactValues = {
            'Bajo': 3,
            'Medio': 6,
            'Alto': 9
        }
        
        const timeValues = {
            'Corto': 3,
            'Medio': 6,
            'Largo': 9
        }
        
        // Obtener valores ponderados por los criterios
        const investmentValue = impactValues[initiative.investment]
        const scopeValue = impactValues[initiative.scope]
        const timeValue = timeValues[initiative.timeHorizon]
        
        // Calcular peso total de los criterios de esfuerzo
        const totalWeight = criteria.inversion + criteria.alcance + criteria.horizonteDeTiempo
        
        // Si no hay pesos configurados, usar promedio simple
        if (totalWeight === 0) {
            return (investmentValue + scopeValue + timeValue) / 3
        }
        
        // Calcular score ponderado
        const weightedScore = (
            (investmentValue * criteria.inversion) +
            (scopeValue * criteria.alcance) +
            (timeValue * criteria.horizonteDeTiempo)
        ) / totalWeight
        
        // Asegurar que esté en rango 0-10
        return Math.max(0, Math.min(10, weightedScore))
    }

    const calculateImpactScore = (initiative: InitiativeType): number => {
        const criteria = initiativeStore.matrixCriteria
        
        // Valores base: Bajo=3, Medio=6, Alto=9 (escala 0-10)
        const impactValues = {
            'Bajo': 3,
            'Medio': 6,
            'Alto': 9
        }
        
        // Obtener valores ponderados por los criterios
        const savingsValue = impactValues[initiative.savings]
        const benefitsValue = impactValues[initiative.benefits]
        const satisfactionValue = impactValues[initiative.satisfaction]
        
        // Calcular peso total de los criterios de impacto
        const totalWeight = criteria.ahorroIngresos + criteria.beneficios + criteria.satisfaccionAlCliente
        
        // Si no hay pesos configurados, usar promedio simple
        if (totalWeight === 0) {
            return (savingsValue + benefitsValue + satisfactionValue) / 3
        }
        
        // Calcular score ponderado
        const weightedScore = (
            (savingsValue * criteria.ahorroIngresos) +
            (benefitsValue * criteria.beneficios) +
            (satisfactionValue * criteria.satisfaccionAlCliente)
        ) / totalWeight
        
        // Asegurar que esté en rango 0-10
        return Math.max(0, Math.min(10, weightedScore))
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

    const editInitiative = async (data: InitiativeFormType): Promise<{ message: string, status: string }> => {
        const updatedInitiative = {
            ...initiativeStore.selectedInitiative,
            classification: data.classification,
            name: data.name,
            investment: data.investment,
            scope: data.scope,
            timeHorizon: data.timeHorizon,
            savings: data.savings,
            benefits: data.benefits,
            satisfaction: data.satisfaction,
            active: data.active
        }
        const model = mapInitiativeUpdateRequest(updatedInitiative)
        const response = await updateInitiativeService(model)
        return {
            message: response.message,
            status: response.success ? "success" : "error"
        }
    }

    const deleteInitiative = async (): Promise<{ message: string, status: string }> => {
        let dni = initiativeStore.selectedInitiative?.dni
        if (dni == undefined) dni = 0
        const response = await deleteInitiativeService(dni)
        return {
            message: response.message,
            status: response.success ? "success" : "error"
        }
    }

    const sendToPrioritization = async (initiatives: InitiativeType[]): Promise<{ message: string, status: string }> => {
        try {
            // Enviar cada iniciativa al endpoint de priorización
            for (const initiative of initiatives) {
                const model = mapPrioritizationRequest(initiative)
                await sendToPrioritizationService(model)
            }
            return {
                message: `${initiatives.length} iniciativa(s) enviada(s) a priorización exitosamente`,
                status: 'success'
            }
        } catch (error) {
            console.error('Error al enviar iniciativas a priorización:', error)
            return {
                message: 'Error al enviar iniciativas a priorización',
                status: 'error'
            }
        }
    }

    return { 
        getCriteria,
        createCriteria,
        updateCriteria,
        createInitiative, 
        editInitiative, 
        deleteInitiative, 
        getInitiatives,
        sendToPrioritization,
        calculateStrategicAlignment,
        calculateEffortScore,
        calculateImpactScore
    }
}
