// Tipos para opciones de select (dni + label)
export type OptionType = {
    dni: number | string
    label: string
}

// Tipo para la respuesta del endpoint GET /gestion-de-proyectos/alta-de-proyecto
export type ProjectFormDataResponseType = {
    clasificaciones: OptionType[]
    areas: OptionType[]
    lideres: OptionType[]
    sponsors: OptionType[]
    projectManagers: OptionType[]
    procesos: OptionType[]
    administradores: OptionType[]
}

// Tipo para la respuesta del endpoint GET /gestion-de-proyectos/configuracion-general/categoria/opciones
export type CategoryOptionResponseType = OptionType

// Tipo para la respuesta del endpoint GET /gestion-de-proyectos/alta-de-proyecto/proyectos-opciones
export type ParentProjectOptionResponseType = OptionType

// Tipo para la respuesta del endpoint GET /gestion-de-proyectos/alta-de-proyecto/plantillas-opciones
export type TemplateOptionResponseType = OptionType

// Tipo para el request del POST /gestion-de-proyectos/alta-de-proyecto
export type ProjectRequestType = {
    nombre: string
    dniPersonalizado: string
    fechaInicio: string 
    fechaFin: string
    presupuestoEstimado: number
    dniClasificacion: number
    objetivo: string
    alcance: string
    dniLider: string
    dniSponsor: string
    dniProjectManager?: string
    dniGestorDeProcesos?: string
    dniArea: number
    dniCategoria: number
    dniAdministradores: string[]
    esSubProyecto: boolean
    dniProyectoPadre?: number | null
    incluirSabados: boolean
    incluirDomingos: boolean
    esTipoInversion: boolean
    usarPlantilla: boolean
    dniPlantilla?: number | null
    usarIniciativa: boolean
    dniIniciativa?: number | null
    activo: boolean
}

// Tipo para la respuesta del POST /gestion-de-proyectos/alta-de-proyecto
export type ProjectResponseType = {
    nombre: string
    dniPersonalizado: string
    fechaInicio: string
    fechaFin: string
    presupuestoEstimado: number
    dniClasificacion: number
    objetivo: string
    alcance: string
    dniLider: string
    dniSponsor: string
    dniProjectManager?: string
    dniGestorDeProcesos?: string
    dniArea: number
    dniCategoria: number
    dniAdministradores: string[]
    esSubProyecto: boolean
    dniProyectoPadre?: number | null
    incluirSabados: boolean
    incluirDomingos: boolean
    esTipoInversion: boolean
    usarPlantilla: boolean
    dniPlantilla?: number | null
    usarIniciativa: boolean
    dniIniciativa?: number | null
    activo: boolean
}

// Tipo para el formulario (usado en el componente)
export type ProjectFormType = {
    name: string
    customId: string
    startDate: string // String del input type="date"
    endDate: string // String del input type="date"
    estimatedBudget: number
    classificationId: number
    objective: string
    scope: string
    leaderId: string
    sponsorId: string
    projectManagerId?: string
    processManagerId?: string
    areaId: number
    categoryId: number
    adminIds: string[]
    isSubproject: boolean
    parentProjectId: number | null
    includeSaturday: boolean
    includeSunday: boolean
    isInvestmentType: boolean
    useTemplate: boolean
    templateId: number | null
    useInitiative: boolean
    initiativeId: number | null
    active: boolean
}

// Tipo para el proyecto en el store (representación interna)
export type ProjectType = {
    name: string
    customId: string
    startDate: string
    endDate: string
    estimatedBudget: number
    classificationId: number
    objective: string
    scope: string
    leaderId: string
    sponsorId: string
    projectManagerId?: string
    processManagerId?: string
    areaId: number
    categoryId: number
    adminIds: string[]
    isSubproject: boolean
    parentProjectId: number | null
    includeSaturday: boolean
    includeSunday: boolean
    isInvestmentType: boolean
    useTemplate: boolean
    templateId: number | null
    useInitiative: boolean
    initiativeId: number | null
    active: boolean
}
