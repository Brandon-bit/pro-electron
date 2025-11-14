export type ProjectType = {
    id?: number
    folio?: string
    name: string
    startDate: Date | null
    endDate: Date | null
    budget: string
    projectId: string
    objective: string
    scope: string
    leader: string
    sponsor: string
    projectManager: string
    processManager: string
    area: string
    category: string
    additionalAdmins: string[]
    isSubproject: boolean
    parentProject: string
    includeSaturday: boolean
    includeSunday: boolean
    projectType: 'expense' | 'investment' | ''
    classification: string
    creationDate?: Date
    active: boolean
}

export type ProjectResponseType = {
    id: number
    folio: string
    nombre: string
    fechaInicio: Date
    fechaFin: Date
    presupuesto: string
    idProyecto: string
    objetivo: string
    alcance: string
    lider: string
    sponsor: string
    projectManager: string
    gestorProcesos: string
    area: string
    categoria: string
    administradoresAdicionales: string[]
    esSubproyecto: boolean
    proyectoPadre: string
    incluirSabados: boolean
    incluirDomingos: boolean
    tipoProyecto: string
    clasificacion: string
    fechaCreacion: Date
    activo: boolean
    eliminado: boolean
}

export type ProjectFormType = {
    name: string
    startDate: Date | null
    endDate: Date | null
    budget: string
    projectId: string
    objective: string
    scope: string
    leader: string
    sponsor: string
    projectManager: string
    processManager: string
    area: string
    category: string
    additionalAdmins: string[]
    isSubproject: boolean
    parentProject: string
    includeSaturday: boolean
    includeSunday: boolean
    projectType: 'expense' | 'investment' | ''
    classification: string
    active: boolean
}

export type UserType = {
    id: string
    name: string
}

export type AreaType = {
    id: string
    name: string
    categories: string[]
}
