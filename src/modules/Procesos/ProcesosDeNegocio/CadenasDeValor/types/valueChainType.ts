// ============================================
// TIPOS PRINCIPALES DE CADENA DE VALOR
// ============================================

export type ValueChainType = {
    id?: number
    title: string
    isPrimary: boolean
    creationDate: Date
    // Estructura de 3 secciones
    planning: ValueChainSectionType
    value: ValueChainSectionType
    support: ValueChainSectionType
    // Niveles expandidos temporales
    expandedLevel1: Level1ProcessType[]
    expandedLevel2: Level2ProcessType[]
}

// Sección (Planeación, Cadena de Valor, Soporte)
export type ValueChainSectionType = {
    space1: ValueChainSpaceType
    space2: ValueChainSpaceType
    space3: ValueChainSpaceType
}

// Espacio dentro de una sección
export type ValueChainSpaceType = {
    areas: AreaType[]
}

// Área (contenedor de procesos nivel 1)
export type AreaType = {
    id?: number
    title: string
    type: 'Planeación' | 'Cadena de valor' | 'Soporte'
    space: 1 | 2 | 3
    level1Processes: Level1ProcessType[]
    hasConnections?: boolean
}

// Proceso Nivel 1
export type Level1ProcessType = {
    id?: number
    title: string
    areaId: number
    hasRelatedProcesses: boolean
    level2Processes: Level2ProcessType[]
}

// Proceso Nivel 2
export type Level2ProcessType = {
    id?: number
    title: string
    level1Id: number
    hasRelatedProcesses: boolean
    showArrow?: boolean
    level3Processes: Level3ProcessType[]
}

// Proceso Nivel 3
export type Level3ProcessType = {
    id?: number
    title: string
    description: string
    level2Id: number
    hasRelatedProcesses: boolean
}

// ============================================
// TIPOS DE FORMULARIOS
// ============================================

export type ValueChainFormType = {
    title: string
}

export type AreaFormType = {
    title: string
}

export type ProcessLevel1FormType = {
    title: string
}

export type ProcessLevel2FormType = {
    title: string
}

export type ProcessLevel3FormType = {
    title: string
    description: string
}

// ============================================
// TIPOS DE RESPUESTA DEL BACKEND
// ============================================

export type ValueChainResponseType = {
    id: number
    titulo: string
    esPrincipal: boolean
    fechaCreacion: Date
    planeacion: ValueChainSectionResponseType
    valor: ValueChainSectionResponseType
    soporte: ValueChainSectionResponseType
}

export type ValueChainSectionResponseType = {
    esp1: { areas: AreaResponseType[] }
    esp2: { areas: AreaResponseType[] }
    esp3: { areas: AreaResponseType[] }
}

export type AreaResponseType = {
    dni: number
    titulo: string
    tipo: string
    espacio: number
    connRight?: boolean
    lvls1: Level1ResponseType[]
}

export type Level1ResponseType = {
    dni: number
    titulo: string
    hasProc: boolean
    lvls2: Level2ResponseType[]
}

export type Level2ResponseType = {
    dni: number
    titulo: string
    hasProc: boolean
    showarrow?: boolean
    lvls3: Level3ResponseType[]
}

export type Level3ResponseType = {
    dni: number
    titulo: string
    desc: string
    hasProc: boolean
}
