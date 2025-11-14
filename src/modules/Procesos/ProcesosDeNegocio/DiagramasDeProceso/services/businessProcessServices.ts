// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axiosApiInstance from '@/api/axiosApiInstance' // Se usará cuando se conecte al backend real
import type { ApiResponseType } from '@/shared/types/apiResponseType'
import type {
    ValueChainType,
    SpaceType,
    ValueChainSpaceType,
    ProcessType,
    CVProcessType,
    DiagramType,
    Level2Type,
    VoBoUserType,
    CreateSpaceFormType,
    CreateProcessFormType,
    CreateCVProcessFormType,
    CreateDiagramVersionFormType
} from '@procesos/ProcesosDeNegocio/DiagramasDeProceso/types/businessProcessTypes'
import {
    mockValueChains,
    currentValueChain,
    mockSpaces,
    mockValueChainSpaces,
    mockLevel2And3,
    mockVoBoUsers,
    getAllProcesses,
    generateNewSpaceId,
    generateNewProcessId,
    generateNewDiagramId
} from '@procesos/ProcesosDeNegocio/DiagramasDeProceso/data/mockData'

// ============================================
// SERVICIOS DE CADENA DE VALOR
// ============================================
export const getValueChainsService = async (): Promise<
    ApiResponseType<ValueChainType[]>
> => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return {
        success: true,
        message: 'Cadenas de valor obtenidas',
        data: mockValueChains
    }
}

export const getCurrentValueChainService = async (): Promise<
    ApiResponseType<ValueChainType>
> => {
    await new Promise((resolve) => setTimeout(resolve, 200))
    return {
        success: true,
        message: 'Cadena de valor actual',
        data: currentValueChain
    }
}

// ============================================
// SERVICIOS DE ESPACIOS
// ============================================
export const getSpacesService = async (
    dniCV: number
): Promise<ApiResponseType<SpaceType[]>> => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return {
        success: true,
        message: 'Espacios obtenidos',
        data: mockSpaces
    }
    // API real:
    // const response = await axiosApiInstance.get(`/proceso/espacios/${dniCV}`)
    // return response.data
}

export const createSpaceService = async (
    data: CreateSpaceFormType,
    dniCV: number
): Promise<ApiResponseType<SpaceType>> => {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const newSpace: SpaceType = {
        id: generateNewSpaceId(),
        nombre: data.nombre,
        edit: false,
        Procesos: []
    }

    mockSpaces.push(newSpace)

    return {
        success: true,
        message: `Espacio "${data.nombre}" creado exitosamente`,
        data: newSpace
    }
    // API real:
    // const response = await axiosApiInstance.post('/proceso/agregarespacio', { nombre: data.nombre, dni: dniCV })
    // return response.data
}

export const updateSpaceService = async (
    space: SpaceType
): Promise<ApiResponseType<SpaceType>> => {
    await new Promise((resolve) => setTimeout(resolve, 400))

    const index = mockSpaces.findIndex((s) => s.id === space.id)
    if (index !== -1) {
        mockSpaces[index] = space
    }

    return {
        success: true,
        message: 'Espacio actualizado exitosamente',
        data: space
    }
    // API real:
    // const response = await axiosApiInstance.post('/proceso/modificarespacio', { nm: space })
    // return response.data
}

// ============================================
// SERVICIOS DE ESPACIOS DE CADENA DE VALOR
// ============================================
export const getValueChainSpacesService = async (
    dniCV: number
): Promise<ApiResponseType<ValueChainSpaceType[]>> => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return {
        success: true,
        message: 'Espacios de cadena de valor obtenidos',
        data: mockValueChainSpaces
    }
    // API real:
    // const response = await axiosApiInstance.get(`/proceso/espacioscv/${dniCV}`)
    // return response.data
}

// ============================================
// SERVICIOS DE PROCESOS
// ============================================
export const createProcessService = async (
    data: CreateProcessFormType
): Promise<ApiResponseType<ProcessType>> => {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const newProcess: ProcessType = {
        id: generateNewProcessId(),
        nombre: data.nombre,
        asis: data.asis,
        dniEspacio: data.dniEspacio,
        Diagramas: [
            {
                dni: generateNewDiagramId(),
                version: 1,
                final: true,
                hasVoBo: false
            }
        ]
    }

    // Agregar proceso al espacio correspondiente
    const space = mockSpaces.find((s) => s.id === data.dniEspacio)
    if (space) {
        space.Procesos.push(newProcess)
    }

    return {
        success: true,
        message: `Proceso "${data.nombre}" creado exitosamente`,
        data: newProcess
    }
    // API real:
    // const response = await axiosApiInstance.post('/proceso/agregarproceso', data)
    // return response.data
}

export const createCVProcessService = async (
    data: CreateCVProcessFormType
): Promise<ApiResponseType<CVProcessType>> => {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const newProcess: CVProcessType = {
        id: generateNewProcessId(),
        nombre: data.nombre,
        asis: data.asis,
        dniCV: data.dniCV,
        dniLvl1: data.dniLvl1,
        dniLvl2: data.dniLvl2,
        dnisLvl3: data.selectedLvl3Ids,
        Diagramas: [
            {
                dni: generateNewDiagramId(),
                version: 1,
                final: true,
                hasVoBo: false
            }
        ]
    }

    // Agregar proceso al espacio CV correspondiente
    const cvSpace = mockValueChainSpaces.find((s) => s.dni === data.dniLvl1)
    if (cvSpace) {
        cvSpace.CVProcesos.push(newProcess)
    }

    return {
        success: true,
        message: `Proceso CV "${data.nombre}" creado exitosamente`,
        data: newProcess
    }
    // API real:
    // const response = await axiosApiInstance.post('/proceso/agregarcvproceso', data)
    // return response.data
}

export const updateProcessService = async (
    process: ProcessType | CVProcessType
): Promise<ApiResponseType<ProcessType | CVProcessType>> => {
    await new Promise((resolve) => setTimeout(resolve, 400))

    // Actualizar en espacios normales
    if ('dniEspacio' in process) {
        const space = mockSpaces.find((s) => s.id === process.dniEspacio)
        if (space) {
            const index = space.Procesos.findIndex((p) => p.id === process.id)
            if (index !== -1) {
                space.Procesos[index] = process as ProcessType
            }
        }
    }
    // Actualizar en espacios CV
    else if ('dniCV' in process) {
        const cvSpace = mockValueChainSpaces.find((s) => s.dni === process.dniLvl1)
        if (cvSpace) {
            const index = cvSpace.CVProcesos.findIndex((p) => p.id === process.id)
            if (index !== -1) {
                cvSpace.CVProcesos[index] = process as CVProcessType
            }
        }
    }

    return {
        success: true,
        message: 'Proceso actualizado exitosamente',
        data: process
    }
    // API real:
    // const response = await axiosApiInstance.post('/proceso/ModificarProceso', { proceso: process })
    // return response.data
}

export const deleteProcessService = async (
    processId: number
): Promise<ApiResponseType<any>> => {
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Eliminar de espacios normales
    mockSpaces.forEach((space) => {
        const index = space.Procesos.findIndex((p) => p.id === processId)
        if (index !== -1) {
            space.Procesos.splice(index, 1)
        }
    })

    // Eliminar de espacios CV
    mockValueChainSpaces.forEach((space) => {
        const index = space.CVProcesos.findIndex((p) => p.id === processId)
        if (index !== -1) {
            space.CVProcesos.splice(index, 1)
        }
    })

    return {
        success: true,
        message: 'Proceso eliminado exitosamente',
        data: null
    }
    // API real:
    // const response = await axiosApiInstance.post('/proceso/eliminarproceso', { dni: processId })
    // return response.data
}

export const getAllProcessesService = async (): Promise<
    ApiResponseType<(ProcessType | CVProcessType)[]>
> => {
    await new Promise((resolve) => setTimeout(resolve, 200))
    return {
        success: true,
        message: 'Todos los procesos obtenidos',
        data: getAllProcesses()
    }
}

// ============================================
// SERVICIOS DE NIVELES 2 Y 3
// ============================================
export const getLevel2And3Service = async (
    dniEspCV: number
): Promise<ApiResponseType<Level2Type[]>> => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return {
        success: true,
        message: 'Niveles 2 y 3 obtenidos',
        data: mockLevel2And3
    }
    // API real:
    // const response = await axiosApiInstance.post('/proceso/niveles2', { dni: dniEspCV })
    // return response.data
}

// ============================================
// SERVICIOS DE DIAGRAMAS
// ============================================
export const createDiagramVersionService = async (
    processId: number
): Promise<ApiResponseType<any>> => {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const allProcesses = getAllProcesses()
    const process = allProcesses.find((p) => p.id === processId)

    if (process) {
        const newVersion = process.Diagramas.length + 1
        const newDiagram = {
            dni: generateNewDiagramId(),
            version: newVersion,
            final: false,
            hasVoBo: false
        }
        process.Diagramas.push(newDiagram)

        return {
            success: true,
            message: `Versión ${newVersion} creada exitosamente`,
            data: newDiagram
        }
    }

    return {
        success: false,
        message: 'Proceso no encontrado',
        data: null
    }
    // API real:
    // const response = await axiosApiInstance.post('/diagrama/nuevodiagrama', { dni: processId })
    // return response.data
}

export const markDiagramAsFinalService = async (
    processId: number,
    diagramId: number
): Promise<ApiResponseType<any>> => {
    await new Promise((resolve) => setTimeout(resolve, 400))

    const allProcesses = getAllProcesses()
    const process = allProcesses.find((p) => p.id === processId)

    if (process) {
        // Desmarcar todos
        process.Diagramas.forEach((d) => (d.final = false))
        // Marcar el seleccionado
        const diagram = process.Diagramas.find((d) => d.dni === diagramId)
        if (diagram) {
            diagram.final = true
        }

        return {
            success: true,
            message: 'Diagrama marcado como final',
            data: diagram
        }
    }

    return {
        success: false,
        message: 'Proceso o diagrama no encontrado',
        data: null
    }
    // API real:
    // const response = await axiosApiInstance.post('/diagrama/diagramafinal', { dni: processId, dniDiag: diagramId })
    // return response.data
}

// ============================================
// SERVICIOS DE VOBO
// ============================================
export const getVoBoUsersService = async (): Promise<ApiResponseType<VoBoUserType[]>> => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return {
        success: true,
        message: 'Usuarios obtenidos',
        data: mockVoBoUsers.map((u) => ({ ...u, selected: false }))
    }
    // API real:
    // const response = await axiosApiInstance.post('/usuario/getusuarios', { roles: 'Member', dif: true })
    // return response.data
}

export const sendToVoBoService = async (
    processId: number,
    correos: string[]
): Promise<ApiResponseType<any>> => {
    await new Promise((resolve) => setTimeout(resolve, 600))

    return {
        success: true,
        message: `Enviado a VoBo a ${correos.length} usuario(s)`,
        data: {
            dniProc: processId,
            correos: correos
        }
    }
    // API real:
    // const response = await axiosApiInstance.post('/diagrama/mandarvobo', { dniProc: processId, correos })
    // return response.data
}

export const getVoBoDetailsService = async (
    processId: number,
    diagramId: number
): Promise<ApiResponseType<any>> => {
    await new Promise((resolve) => setTimeout(resolve, 400))

    // Mock VoBo details
    const mockVoBoDetails = [
        {
            id: 1,
            correo: 'juan.perez@empresa.com',
            estatus: 'Aprobado',
            comentarios: 'Aprobado sin observaciones'
        },
        {
            id: 2,
            correo: 'maria.gonzalez@empresa.com',
            estatus: 'EnProceso',
            comentarios: ''
        }
    ]

    return {
        success: true,
        message: 'Detalles de VoBo obtenidos',
        data: mockVoBoDetails
    }
    // API real:
    // const response = await axiosApiInstance.post('/diagrama/getvobo', { dni: processId, dniDiag: diagramId })
    // return response.data
}

// Obtener diagramas de un proceso
export const getDiagramsByProcessService = async (
    processId: number
): Promise<ApiResponseType<DiagramType[]>> => {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const allProcesses = getAllProcesses()
    const process = allProcesses.find((p) => p.id === processId)

    if (process) {
        return {
            success: true,
            message: 'Diagramas obtenidos',
            data: process.Diagramas
        }
    }

    return {
        success: false,
        message: 'Proceso no encontrado',
        data: []
    }
    // API real:
    // const response = await axiosApiInstance.get(`/diagrama/proceso/${processId}`)
    // return response.data
}

// Eliminar versión de diagrama
export const deleteDiagramVersionService = async (
    processId: number,
    diagramId: number
): Promise<ApiResponseType<any>> => {
    await new Promise((resolve) => setTimeout(resolve, 400))

    const allProcesses = getAllProcesses()
    const process = allProcesses.find((p) => p.id === processId)

    if (!process) {
        return {
            success: false,
            message: 'Proceso no encontrado',
            data: null
        }
    }

    // Verificar si es la versión final
    const diagram = process.Diagramas.find((d) => d.dni === diagramId)
    if (diagram?.final) {
        return {
            success: false,
            message: 'No se puede eliminar la versión final',
            data: null
        }
    }

    // Eliminar el diagrama
    process.Diagramas = process.Diagramas.filter((d) => d.dni !== diagramId)

    return {
        success: true,
        message: 'Versión eliminada correctamente',
        data: { diagramId, processId }
    }
    // API real:
    // const response = await axiosApiInstance.delete(`/diagrama/${diagramId}`)
    // return response.data
}
