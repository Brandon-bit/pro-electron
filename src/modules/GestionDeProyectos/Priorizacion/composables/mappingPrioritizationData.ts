import type { 
    PrioritizedProjectResponseType,
    PrioritizedProjectFormType, 
    PrioritizedProjectType 
} from '@/modules/GestionDeProyectos/Priorizacion/types/prioritizationTypes'

export const mapPrioritizedProject = (model: PrioritizedProjectResponseType): PrioritizedProjectType => {
    return {
        id: model.id,
        name: model.nombre,
        classification: model.clasificacion,
        strategicAlignment: model.alineacionEstrategica,
        roi: model.roi,
        risks: model.riesgos,
        resources: model.recursos,
        priority: model.prioridad,
        creationDate: model.fechaCreacion,
        active: model.activo
    }
}

export const mapPrioritizedProjectRequest = (model: PrioritizedProjectFormType): any => {
    return {
        Nombre: model.name,
        Clasificacion: model.classification,
        AlineacionEstrategica: model.strategicAlignment,
        Roi: model.roi,
        Riesgos: model.risks,
        Recursos: model.resources,
        Prioridad: model.priority,
        Activo: model.active,
        Eliminado: false
    }
}
