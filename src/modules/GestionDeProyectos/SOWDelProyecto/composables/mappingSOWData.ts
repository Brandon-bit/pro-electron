import type { 
    SOWResponseType,
    SOWFormType, 
    SOWType 
} from '@/modules/GestionDeProyectos/SOWDelProyecto/types/sowTypes'

export const mapSOW = (model: SOWResponseType): SOWType => {
    return {
        id: model.id,
        projectName: model.nombreProyecto,
        projectCode: model.codigoProyecto,
        client: model.cliente,
        startDate: model.fechaInicio,
        endDate: model.fechaFin,
        executiveSummary: model.resumenEjecutivo,
        objectives: model.objetivos,
        scope: model.alcance,
        deliverables: model.entregables,
        timeline: model.cronograma,
        resources: model.recursos,
        assumptions: model.supuestos,
        constraints: model.restricciones,
        acceptanceCriteria: model.criteriosAceptacion,
        paymentTerms: model.terminosPago,
        status: model.estado as 'draft' | 'review' | 'approved' | 'rejected',
        version: model.version,
        createdBy: model.creadoPor,
        creationDate: model.fechaCreacion,
        lastModified: model.ultimaModificacion,
        active: model.activo
    }
}

export const mapSOWRequest = (model: SOWFormType): any => {
    return {
        NombreProyecto: model.projectName,
        CodigoProyecto: model.projectCode,
        Cliente: model.client,
        FechaInicio: model.startDate,
        FechaFin: model.endDate,
        ResumenEjecutivo: model.executiveSummary,
        Objetivos: model.objectives,
        Alcance: model.scope,
        Entregables: model.deliverables,
        Cronograma: model.timeline,
        Recursos: model.resources,
        Supuestos: model.assumptions,
        Restricciones: model.constraints,
        CriteriosAceptacion: model.acceptanceCriteria,
        TerminosPago: model.paymentTerms,
        Estado: model.status,
        Version: model.version,
        CreadoPor: model.createdBy,
        Activo: model.active,
        Eliminado: false
    }
}
