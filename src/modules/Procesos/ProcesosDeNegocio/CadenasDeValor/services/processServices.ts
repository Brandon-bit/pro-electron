import axiosApiInstance from '@/api/axiosApiInstance'
import type { ApiResponseType } from '@/shared/types/apiResponseType'
import type {
    Level1ResponseType,
    Level2ResponseType,
    Level3ResponseType
} from '@procesos/ProcesosDeNegocio/CadenasDeValor/types/valueChainType'

// ============================================
// SERVICIOS DE PROCESOS NIVEL 1
// ============================================

export const addLevel1ProcessService = async (
    areaId: number,
    title: string
): Promise<ApiResponseType<Level1ResponseType>> => {
    // Simulación con datos mock
    await new Promise((resolve) => setTimeout(resolve, 300))

    const newProcess: Level1ResponseType = {
        dni: Date.now(),
        titulo: title,
        hasProc: false,
        lvls2: []
    }

    return {
        success: true,
        message: 'Proceso nivel 1 agregado exitosamente',
        data: newProcess
    }

    // Descomenta cuando tengas el endpoint real:
    // const response = await axiosApiInstance.post('/cadenavalor/addlvl1', {
    //     dni: areaId,
    //     titulo: title
    // })
    // return response.data
}

export const updateLevel1ProcessService = async (
    areaId: number,
    processId: number,
    title: string
): Promise<ApiResponseType<any>> => {
    // Simulación con datos mock
    await new Promise((resolve) => setTimeout(resolve, 300))

    return {
        success: true,
        message: 'Proceso nivel 1 actualizado exitosamente',
        data: null
    }

    // Descomenta cuando tengas el endpoint real:
    // const response = await axiosApiInstance.post('/cadenavalor/modificaralvls', {
    //     dni: areaId,
    //     dniLvl1: processId,
    //     titulo: title,
    //     dniLvl2: 0,
    //     dniLvl3: 0,
    //     descripcion: ''
    // })
    // return response.data
}

export const deleteLevel1ProcessService = async (
    areaId: number,
    processId: number
): Promise<ApiResponseType<any>> => {
    // Simulación con datos mock
    await new Promise((resolve) => setTimeout(resolve, 300))

    return {
        success: true,
        message: 'Proceso nivel 1 eliminado exitosamente',
        data: null
    }

    // Descomenta cuando tengas el endpoint real:
    // const response = await axiosApiInstance.post('/cadenavalor/eliminaralvls', {
    //     dni: areaId,
    //     dniLvl1: processId,
    //     dniLvl2: 0,
    //     dniLvl3: 0
    // })
    // return response.data
}

// ============================================
// SERVICIOS DE PROCESOS NIVEL 2
// ============================================

export const addLevel2ProcessService = async (
    areaId: number,
    level1Id: number,
    title: string
): Promise<ApiResponseType<Level2ResponseType>> => {
    // Simulación con datos mock
    await new Promise((resolve) => setTimeout(resolve, 300))

    const newProcess: Level2ResponseType = {
        dni: Date.now(),
        titulo: title,
        hasProc: false,
        showarrow: false,
        lvls3: []
    }

    return {
        success: true,
        message: 'Proceso nivel 2 agregado exitosamente',
        data: newProcess
    }

    // Descomenta cuando tengas el endpoint real:
    // const response = await axiosApiInstance.post('/cadenavalor/addlvl2', {
    //     dni: areaId,
    //     dniLvl1: level1Id,
    //     titulo: title
    // })
    // return response.data
}

export const updateLevel2ProcessService = async (
    areaId: number,
    level1Id: number,
    processId: number,
    title: string
): Promise<ApiResponseType<any>> => {
    // Simulación con datos mock
    await new Promise((resolve) => setTimeout(resolve, 300))

    return {
        success: true,
        message: 'Proceso nivel 2 actualizado exitosamente',
        data: null
    }

    // Descomenta cuando tengas el endpoint real:
    // const response = await axiosApiInstance.post('/cadenavalor/modificaralvls', {
    //     dni: areaId,
    //     dniLvl1: level1Id,
    //     dniLvl2: processId,
    //     titulo: title,
    //     dniLvl3: 0,
    //     descripcion: ''
    // })
    // return response.data
}

export const deleteLevel2ProcessService = async (
    areaId: number,
    level1Id: number,
    processId: number
): Promise<ApiResponseType<any>> => {
    // Simulación con datos mock
    await new Promise((resolve) => setTimeout(resolve, 300))

    return {
        success: true,
        message: 'Proceso nivel 2 eliminado exitosamente',
        data: null
    }

    // Descomenta cuando tengas el endpoint real:
    // const response = await axiosApiInstance.post('/cadenavalor/eliminaralvls', {
    //     dni: areaId,
    //     dniLvl1: level1Id,
    //     dniLvl2: processId,
    //     dniLvl3: 0
    // })
    // return response.data
}

// ============================================
// SERVICIOS DE PROCESOS NIVEL 3
// ============================================

export const addLevel3ProcessService = async (
    areaId: number,
    level1Id: number,
    level2Id: number,
    title: string,
    description: string
): Promise<ApiResponseType<Level3ResponseType>> => {
    // Simulación con datos mock
    await new Promise((resolve) => setTimeout(resolve, 300))

    const newProcess: Level3ResponseType = {
        dni: Date.now(),
        titulo: title,
        desc: description,
        hasProc: false
    }

    return {
        success: true,
        message: 'Proceso nivel 3 agregado exitosamente',
        data: newProcess
    }

    // Descomenta cuando tengas el endpoint real:
    // const response = await axiosApiInstance.post('/cadenavalor/addlvl3', {
    //     dni: areaId,
    //     dniLvl1: level1Id,
    //     dniLvl2: level2Id,
    //     titulo: title,
    //     descripcion: description
    // })
    // return response.data
}

export const updateLevel3ProcessService = async (
    areaId: number,
    level1Id: number,
    level2Id: number,
    processId: number,
    title: string,
    description: string
): Promise<ApiResponseType<any>> => {
    // Simulación con datos mock
    await new Promise((resolve) => setTimeout(resolve, 300))

    return {
        success: true,
        message: 'Proceso nivel 3 actualizado exitosamente',
        data: null
    }

    // Descomenta cuando tengas el endpoint real:
    // const response = await axiosApiInstance.post('/cadenavalor/modificaralvls', {
    //     dni: areaId,
    //     dniLvl1: level1Id,
    //     dniLvl2: level2Id,
    //     dniLvl3: processId,
    //     titulo: title,
    //     descripcion: description
    // })
    // return response.data
}

export const deleteLevel3ProcessService = async (
    areaId: number,
    level1Id: number,
    level2Id: number,
    processId: number
): Promise<ApiResponseType<any>> => {
    // Simulación con datos mock
    await new Promise((resolve) => setTimeout(resolve, 300))

    return {
        success: true,
        message: 'Proceso nivel 3 eliminado exitosamente',
        data: null
    }

    // Descomenta cuando tengas el endpoint real:
    // const response = await axiosApiInstance.post('/cadenavalor/eliminaralvls', {
    //     dni: areaId,
    //     dniLvl1: level1Id,
    //     dniLvl2: level2Id,
    //     dniLvl3: processId
    // })
    // return response.data
}
