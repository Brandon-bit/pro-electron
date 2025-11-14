import type {
    ProcessDiagramType,
    ProcessDiagramFormType,
    ProcessDiagramResponseType
} from '@procesos/ProcesosDeNegocio/DiagramasDeProceso/types/processDiagramType'

export const mapProcessDiagram = (model: ProcessDiagramResponseType): ProcessDiagramType => {
    return {
        id: model.id,
        code: model.codigo,
        name: model.nombre,
        description: model.descripcion,
        version: model.version,
        creationDate: model.fechaCreacion,
        lastModified: model.fechaModificacion,
        active: model.activo
    }
}

export const mapProcessDiagramRequest = (model: ProcessDiagramFormType) => {
    return {
        codigo: model.code,
        nombre: model.name,
        descripcion: model.description,
        version: model.version,
        activo: model.active
    }
}
