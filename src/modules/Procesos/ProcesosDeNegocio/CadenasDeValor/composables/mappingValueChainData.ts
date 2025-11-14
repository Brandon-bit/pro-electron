import {
    ValueChainType,
    ValueChainFormType,
    ValueChainResponseType,
    ValueChainSectionType,
    AreaType,
    Level1ProcessType,
    Level2ProcessType,
    Level3ProcessType,
    AreaResponseType,
    Level1ResponseType,
    Level2ResponseType,
    Level3ResponseType
} from '@procesos/ProcesosDeNegocio/CadenasDeValor/types/valueChainType'

// ============================================
// MAPEO DE NIVEL 3
// ============================================
export const mapLevel3Process = (model: Level3ResponseType): Level3ProcessType => {
    return {
        id: model.dni,
        title: model.titulo,
        description: model.desc || '',
        level2Id: 0, // Se asigna posteriormente
        hasRelatedProcesses: model.hasProc
    }
}

// ============================================
// MAPEO DE NIVEL 2
// ============================================
export const mapLevel2Process = (model: Level2ResponseType): Level2ProcessType => {
    return {
        id: model.dni,
        title: model.titulo,
        level1Id: 0, // Se asigna posteriormente
        hasRelatedProcesses: model.hasProc,
        showArrow: model.showarrow,
        level3Processes: model.lvls3 ? model.lvls3.map(mapLevel3Process) : []
    }
}

// ============================================
// MAPEO DE NIVEL 1
// ============================================
export const mapLevel1Process = (model: Level1ResponseType): Level1ProcessType => {
    return {
        id: model.dni,
        title: model.titulo,
        areaId: 0, // Se asigna posteriormente
        hasRelatedProcesses: model.hasProc,
        level2Processes: model.lvls2 ? model.lvls2.map(mapLevel2Process) : []
    }
}

// ============================================
// MAPEO DE ÁREA
// ============================================
export const mapArea = (model: AreaResponseType): AreaType => {
    return {
        id: model.dni,
        title: model.titulo,
        type: model.tipo as 'Planeación' | 'Cadena de valor' | 'Soporte',
        space: model.espacio as 1 | 2 | 3,
        level1Processes: model.lvls1 ? model.lvls1.map(mapLevel1Process) : [],
        hasConnections: model.connRight
    }
}

// ============================================
// MAPEO DE SECCIÓN
// ============================================
export const mapSection = (section: any): ValueChainSectionType => {
    return {
        space1: { areas: section.esp1?.areas ? section.esp1.areas.map(mapArea) : [] },
        space2: { areas: section.esp2?.areas ? section.esp2.areas.map(mapArea) : [] },
        space3: { areas: section.esp3?.areas ? section.esp3.areas.map(mapArea) : [] }
    }
}

// ============================================
// MAPEO DE CADENA DE VALOR COMPLETA
// ============================================
export const mapValueChain = (model: ValueChainResponseType): ValueChainType => {
    return {
        id: model.id,
        title: model.titulo,
        isPrimary: model.esPrincipal,
        creationDate: model.fechaCreacion,
        planning: mapSection(model.planeacion),
        value: mapSection(model.valor),
        support: mapSection(model.soporte),
        expandedLevel1: [],
        expandedLevel2: []
    }
}

// ============================================
// MAPEO DE FORMULARIO A REQUEST
// ============================================
export const mapValueChainRequest = (model: ValueChainFormType) => {
    return {
        Titulo: model.title
    }
}
