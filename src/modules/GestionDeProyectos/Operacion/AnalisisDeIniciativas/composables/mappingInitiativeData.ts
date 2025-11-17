import type { 
    InitiativeResponseType,
    InitiativeFormType, 
    InitiativeType 
} from '@/modules/GestionDeProyectos/Operacion/AnalisisDeIniciativas/types/initiativeTypes'

export const mapInitiative = (model: InitiativeResponseType): InitiativeType => {
    return {
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

export const mapInitiativeRequest = (model: InitiativeFormType): any => {
    return {
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

export const mapInitiativeUpdateRequest = (model: InitiativeType): any => {
    return {
        dni: model.dni,
        clasificacion: model.classification,
        nombre: model.name,
        impactoInversion: model.investment,
        impactoAlcance: model.scope,
        impactoHorizonteDeTiempo: model.timeHorizon,
        impactoAhorroIngresos: model.savings,
        impactoBeneficios: model.benefits,
        impactoSatisfaccionCliente: model.satisfaction,
        enPriorizacion: model.inPrioritization,
        activo: model.active
    }
}

export const mapPrioritizationRequest = (model: InitiativeType): any => {
    return {
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
