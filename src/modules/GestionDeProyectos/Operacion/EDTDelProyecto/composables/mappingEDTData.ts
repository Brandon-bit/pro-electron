import type { 
    EDTResponseType,
    EDTNodeType,
    StageResponseType,
    ActivityResponseType,
    SubActivityResponseType
} from '@/modules/GestionDeProyectos/Operacion/EDTDelProyecto/types/edtTypes'

/**
 * Helper function to extract DNI from node ID
 * Format: "tipo-dni" -> dni
 */
export const extractDniFromId = (id: string): number => {
    const parts = id.split('-')
    return parseInt(parts[1])
}

/**
 * Convert API EDT response to tree structure for visualization
 */
export const convertirEDTResponseAArbol = (data: EDTResponseType): EDTNodeType => {
    const root: EDTNodeType = {
        id: `iniciativa-${data.dniIniciativa}`,
        name: data.nombre,
        level: 0,
        parentId: null,
        children: [],
        active: true,
        childrenCount: data.etapas.length
    }

    // Convert etapas (stages)
    root.children = data.etapas.map((etapa: StageResponseType) => {
        const etapaNode: EDTNodeType = {
            id: `etapa-${etapa.dni}`,
            name: etapa.nombre,
            level: 1,
            parentId: root.id,
            psn: etapa.psn,
            active: etapa.activo,
            children: [],
            childrenCount: etapa.actividades.length
        }

        // Convert actividades (activities)
        etapaNode.children = etapa.actividades.map((actividad: ActivityResponseType) => {
            const actividadNode: EDTNodeType = {
                id: `actividad-${actividad.dni}`,
                name: actividad.nombre,
                level: 2,
                parentId: etapaNode.id,
                psn: actividad.psn,
                days: actividad.dias,
                active: actividad.activo,
                children: [],
                childrenCount: actividad.subActividades.length
            }

            // Convert sub-actividades (sub-activities)
            actividadNode.children = actividad.subActividades.map((subActividad: SubActivityResponseType) => ({
                id: `subactividad-${subActividad.dni}`,
                name: subActividad.nombre,
                level: 3,
                parentId: actividadNode.id,
                active: subActividad.activo,
                children: [],
                childrenCount: 0
            }))

            return actividadNode
        })

        return etapaNode
    })

    return root
}
