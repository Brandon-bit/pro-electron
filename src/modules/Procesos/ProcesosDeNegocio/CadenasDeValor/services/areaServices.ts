import axiosApiInstance from '@/api/axiosApiInstance'
import type { ApiResponseType } from '@/shared/types/apiResponseType'
import type { AreaResponseType } from '@procesos/ProcesosDeNegocio/CadenasDeValor/types/valueChainType'

// ============================================
// SERVICIOS DE ÁREAS
// ============================================

export const addAreaService = async (
    chainId: number,
    type: string,
    space: number,
    title: string
): Promise<ApiResponseType<AreaResponseType>> => {
    // Simulación con datos mock
    await new Promise((resolve) => setTimeout(resolve, 300))

    const newArea: AreaResponseType = {
        dni: Date.now(), // Usar timestamp como ID temporal
        titulo: title,
        tipo: type,
        espacio: space,
        connRight: false,
        lvls1: []
    }

    return {
        success: true,
        message: 'Área agregada exitosamente',
        data: newArea
    }

    // Descomenta cuando tengas el endpoint real:
    // const response = await axiosApiInstance.post('/cadenavalor/addarea', {
    //     dni: chainId,
    //     tipo: type,
    //     espacio: space,
    //     titulo: title
    // })
    // return response.data
}

export const updateAreaService = async (
    areaId: number,
    title: string
): Promise<ApiResponseType<any>> => {
    // Simulación con datos mock
    await new Promise((resolve) => setTimeout(resolve, 300))

    return {
        success: true,
        message: 'Área actualizada exitosamente',
        data: null
    }

    // Descomenta cuando tengas el endpoint real:
    // const response = await axiosApiInstance.post('/cadenavalor/modificaralvls', {
    //     dni: areaId,
    //     titulo: title,
    //     dniLvl1: 0,
    //     dniLvl2: 0,
    //     dniLvl3: 0,
    //     descripcion: ''
    // })
    // return response.data
}

export const deleteAreaService = async (
    areaId: number
): Promise<ApiResponseType<any>> => {
    // Simulación con datos mock
    await new Promise((resolve) => setTimeout(resolve, 300))

    return {
        success: true,
        message: 'Área eliminada exitosamente',
        data: null
    }

    // Descomenta cuando tengas el endpoint real:
    // const response = await axiosApiInstance.post('/cadenavalor/eliminaralvls', {
    //     dni: areaId,
    //     dniLvl1: 0,
    //     dniLvl2: 0,
    //     dniLvl3: 0
    // })
    // return response.data
}
