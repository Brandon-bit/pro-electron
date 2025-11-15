import type { 
    InitiativeResponseType,
    InitiativeFormType, 
    InitiativeType 
} from '@/modules/GestionDeProyectos/Operacion/AnalisisDeIniciativas/types/initiativeTypes'

export const mapInitiative = (model: InitiativeResponseType): InitiativeType => {
    return {
        id: model.id,
        classification: model.clasificacion,
        name: model.nombre,
        investment: model.inversion,
        scope: model.alcance,
        timeHorizon: model.horizonteTiempo,
        savings: model.ahorro,
        benefits: model.beneficios,
        satisfaction: model.satisfaccion,
        selected: model.seleccionado,
        effortScore: model.puntajeEsfuerzo,
        impactScore: model.puntajeImpacto,
        strategicAlignment: model.alineacionEstrategica,
        creationDate: model.fechaCreacion,
        active: model.activo
    }
}

export const mapInitiativeRequest = (model: InitiativeFormType): any => {
    return {
        Clasificacion: model.classification,
        Nombre: model.name,
        Inversion: model.investment,
        Alcance: model.scope,
        HorizonteTiempo: model.timeHorizon,
        Ahorro: model.savings,
        Beneficios: model.benefits,
        Satisfaccion: model.satisfaction,
        Activo: model.active,
        Eliminado: false
    }
}
