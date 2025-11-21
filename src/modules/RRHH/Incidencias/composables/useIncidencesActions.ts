import type {
    IncidenceDTO,
    IncidenceFormDTO
} from '@/modules/RRHH/Incidencias/types/incidencesTypes'
import useIncidencesStore from '@/modules/RRHH/Incidencias/store/incidencesStore'
import {
    mapIncidenceDTO,
    mapIncidenceRequest
} from '@/modules/RRHH/Incidencias/composables/mappingIncidences'
import {
    getIncidenciasService,
    getIncidenciaByIdService,
    createIncidenciaService,
    updateIncidenciaService,
    deleteIncidenciaService
} from '@/modules/RRHH/Incidencias/services/incidencesService'

export const useIncidenceActions = () => {
    const incidencesStore = useIncidencesStore()

    const getIncidences = async (
        page: number,
        pageSize: number,
        employeeId?: number
    ): Promise<{ items: IncidenceDTO[]; total: number }> => {
        const response = await getIncidenciasService(page, pageSize, employeeId)
        return {
            items: response.data.items.map(mapIncidenceDTO),
            total: response.data.totalItems
        }
    }

    const getIncidenceById = async (id: number): Promise<IncidenceDTO> => {
        const response = await getIncidenciaByIdService(id)
        if (!response.success) {
            throw new Error(response.message)
        }
        return mapIncidenceDTO(response.data)
    }

    const createIncidence = async (
        data: IncidenceFormDTO
    ): Promise<{ message: string; status: string; data: any }> => {
        const model = mapIncidenceRequest(data)
        const response = await createIncidenciaService(model)
        return {
            message: response.message,
            status: response.success ? 'success' : 'error',
            data: response.data
        }
    }

    const updateIncidence = async (
        data: IncidenceFormDTO
    ): Promise<{ message: string; status: string; data: any }> => {
        const id = incidencesStore.selectedIncidence?.id ?? 0
        const model = mapIncidenceRequest(data)
        const response = await updateIncidenciaService(id, model)
        return {
            message: response.message,
            status: response.success ? 'success' : 'error',
            data: response.data
        }
    }

    const deleteIncidence = async (): Promise<{ message: string; status: string; data: any }> => {
        const id = incidencesStore.selectedIncidence?.id
        if (id == undefined) return { message: 'ID no válido', status: 'error', data: null }
        const response = await deleteIncidenciaService(id)
        return {
            message: response.message,
            status: response.success ? 'success' : 'error',
            data: response.data
        }
    }

    return { getIncidences, getIncidenceById, createIncidence, updateIncidence, deleteIncidence }
}
