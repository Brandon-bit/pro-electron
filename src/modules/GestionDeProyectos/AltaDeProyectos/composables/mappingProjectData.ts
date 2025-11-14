import type { 
    ProjectResponseType,
    ProjectFormType, 
    ProjectType 
} from '@/modules/GestionDeProyectos/AltaDeProyectos/types/projectTypes'

export const mapProject = (model: ProjectResponseType): ProjectType => {
    return {
        id: model.id,
        folio: model.folio,
        name: model.nombre,
        startDate: model.fechaInicio,
        endDate: model.fechaFin,
        budget: model.presupuesto,
        projectId: model.idProyecto,
        objective: model.objetivo,
        scope: model.alcance,
        leader: model.lider,
        sponsor: model.sponsor,
        projectManager: model.projectManager,
        processManager: model.gestorProcesos,
        area: model.area,
        category: model.categoria,
        additionalAdmins: model.administradoresAdicionales,
        isSubproject: model.esSubproyecto,
        parentProject: model.proyectoPadre,
        includeSaturday: model.incluirSabados,
        includeSunday: model.incluirDomingos,
        projectType: model.tipoProyecto as 'expense' | 'investment' | '',
        classification: model.clasificacion,
        creationDate: model.fechaCreacion,
        active: model.activo
    }
}

export const mapProjectRequest = (model: ProjectFormType): any => {
    return {
        Nombre: model.name,
        FechaInicio: model.startDate,
        FechaFin: model.endDate,
        Presupuesto: model.budget,
        IdProyecto: model.projectId,
        Objetivo: model.objective,
        Alcance: model.scope,
        Lider: model.leader,
        Sponsor: model.sponsor,
        ProjectManager: model.projectManager,
        GestorProcesos: model.processManager,
        Area: model.area,
        Categoria: model.category,
        AdministradoresAdicionales: model.additionalAdmins,
        EsSubproyecto: model.isSubproject,
        ProyectoPadre: model.parentProject,
        IncluirSabados: model.includeSaturday,
        IncluirDomingos: model.includeSunday,
        TipoProyecto: model.projectType,
        Clasificacion: model.classification,
        Activo: model.active,
        Eliminado: false
    }
}
