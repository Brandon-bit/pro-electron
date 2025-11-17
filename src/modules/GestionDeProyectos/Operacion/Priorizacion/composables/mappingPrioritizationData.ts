import type { 
    PrioritizedProjectResponseType,
    PrioritizedProjectType,
    PrioritizedProjectUpdateType
} from '@/modules/GestionDeProyectos/Operacion/Priorizacion/types/prioritizationTypes'

export const mapPrioritizedProject = (model: PrioritizedProjectResponseType): PrioritizedProjectType => {
    return {
        priority: model.prioridad,
        roi: model.roi,
        risk: model.riesgo,
        resources: model.recursos,
        dni: model.dni,
        classification: model.clasificacion,
        name: model.nombre,
        investment: model.impactoInversion,
        scope: model.impactoAlcance,
        timeHorizon: model.impactoHorizonteDeTiempo,
        savings: model.impactoAhorroIngresos,
        benefits: model.impactoBeneficios,
        satisfaction: model.impactoSatisfaccionCliente,
        inPrioritization: model.enPriorizacion,
        active: model.activo
    }
}

export const mapPrioritizedProjectUpdateRequest = (model: PrioritizedProjectType): PrioritizedProjectUpdateType => {
    return {
        prioridad: model.priority,
        roi: model.roi,
        riesgo: model.risk,
        recursos: model.resources,
        dni: model.dni,
        clasificacion: model.classification,
        nombre: model.name,
        impactoInversion: model.investment,
        impactoAlcance: model.scope,
        impactoHorizonteDeTiempo: model.timeHorizon,
        impactoAhorroIngresos: model.savings,
        impactoBeneficios: model.benefits,
        impactoSatisfaccionCliente: model.satisfaction,
        activo: model.active
    }
}
