import type { 
    EDTResponseType,
    EDTFormType, 
    EDTNodeType 
} from '@/modules/GestionDeProyectos/EDTDelProyecto/types/edtTypes'

export const mapEDTNode = (model: EDTResponseType): EDTNodeType => {
    return {
        id: model.id.toString(),
        name: model.nombre,
        level: model.nivel,
        children: [],
        parentId: model.padreId ? model.padreId.toString() : null
    }
}

export const mapEDTNodeRequest = (model: EDTFormType): any => {
    return {
        Nombre: model.name,
        Nivel: model.level,
        PadreId: model.parentId ? parseInt(model.parentId) : null,
        ProyectoId: model.projectId,
        Activo: true,
        Eliminado: false
    }
}
