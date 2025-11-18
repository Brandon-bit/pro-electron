import type { 
    EDTResponseType,
    EDTNodeType,
    EtapaResponseType,
    ActividadResponseType,
    SubActividadResponseType
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
        activo: true,
        childrenCount: data.etapas.length
    }

    // Convert etapas (stages)
    root.children = data.etapas.map((etapa: EtapaResponseType) => {
        const etapaNode: EDTNodeType = {
            id: `etapa-${etapa.dni}`,
            name: etapa.nombre,
            level: 1,
            parentId: root.id,
            psn: etapa.psn,
            activo: etapa.activo,
            children: [],
            childrenCount: etapa.actividades.length
        }

        // Convert actividades (activities)
        etapaNode.children = etapa.actividades.map((actividad: ActividadResponseType) => {
            const actividadNode: EDTNodeType = {
                id: `actividad-${actividad.dni}`,
                name: actividad.nombre,
                level: 2,
                parentId: etapaNode.id,
                psn: actividad.psn,
                dias: actividad.dias,
                activo: actividad.activo,
                children: [],
                childrenCount: actividad.subActividades.length
            }

            // Convert sub-actividades (sub-activities)
            actividadNode.children = actividad.subActividades.map((subActividad: SubActividadResponseType) => ({
                id: `subactividad-${subActividad.dni}`,
                name: subActividad.nombre,
                level: 3,
                parentId: actividadNode.id,
                activo: subActividad.activo,
                children: [],
                childrenCount: 0
            }))

            return actividadNode
        })

        return etapaNode
    })

    return root
}
