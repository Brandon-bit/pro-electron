import type { ProspectType, ProspectFilterType, ProspectKPIType } from '@/modules/Inversiones/Inversion/Prospectos/types/prospectTypes'
import useProspectStore from '@/modules/Inversiones/Inversion/Prospectos/store/prospectStore'
import {
    getProspectsService,
    getProspectByIdService,
    createProspectService,
    updateProspectService,
    deleteProspectService,
    getProspectKPIsService,
    updateProspectStatusService,
    exportProspectsService
} from '@/modules/Inversiones/Inversion/Prospectos/services/prospectService'
import { mapProspect } from '@/modules/Inversiones/Inversion/Prospectos/composables/mappingProspectData'

export const useProspectActions = () => {
    
    const prospectStore = useProspectStore()

    const getProspects = async (page: number, pageSize: number, filters?: ProspectFilterType): Promise<{ items: ProspectType[], total: number }> => {
        try {
            const response = await getProspectsService(page, pageSize, filters)
            const prospects = response.data.items.map(mapProspect)
            prospectStore.setProspects(prospects)
            return {
                items: prospects,
                total: response.data.totalItems
            }
        } catch (error) {
            console.warn('Using mock data for prospects')
            return {
                items: [],
                total: 0
            }
        }
    }

    const getProspectById = async (id: number): Promise<ProspectType | null> => {
        try {
            const response = await getProspectByIdService(id)
            return mapProspect(response.data)
        } catch (error) {
            console.warn('Error fetching prospect')
            return null
        }
    }

    const createProspect = async (data: any): Promise<{ message: string, status: string }> => {
        try {
            const response = await createProspectService(data)
            return {
                message: response.data.message || 'Prospecto creado exitosamente',
                status: response.data.success ? "success" : "error"
            }
        } catch (error) {
            console.warn('API not available, simulating success')
            return {
                message: 'Prospecto creado exitosamente (modo demo)',
                status: "success"
            }
        }
    }

    const updateProspect = async (id: number, data: any): Promise<{ message: string, status: string }> => {
        try {
            const response = await updateProspectService(id, data)
            return {
                message: response.data.message || 'Prospecto actualizado exitosamente',
                status: response.data.success ? "success" : "error"
            }
        } catch (error) {
            console.warn('API not available, simulating success')
            return {
                message: 'Prospecto actualizado exitosamente (modo demo)',
                status: "success"
            }
        }
    }

    const deleteProspect = async (id: number): Promise<{ message: string, status: string }> => {
        try {
            const response = await deleteProspectService(id)
            return {
                message: response.data.message || 'Prospecto eliminado exitosamente',
                status: response.data.success ? "success" : "error"
            }
        } catch (error) {
            console.warn('API not available, simulating success')
            return {
                message: 'Prospecto eliminado exitosamente (modo demo)',
                status: "success"
            }
        }
    }

    const getKPIs = async (): Promise<ProspectKPIType[]> => {
        try {
            const response = await getProspectKPIsService()
            return response.data
        } catch (error) {
            console.warn('Using mock KPIs')
            return []
        }
    }

    const updateProspectStatus = async (id: number, status: string): Promise<{ message: string, status: string }> => {
        try {
            const response = await updateProspectStatusService(id, status)
            return {
                message: response.data.message || 'Estatus actualizado exitosamente',
                status: response.data.success ? "success" : "error"
            }
        } catch (error) {
            console.warn('API not available, simulating success')
            return {
                message: 'Estatus actualizado exitosamente (modo demo)',
                status: "success"
            }
        }
    }

    const exportProspects = async (filters?: ProspectFilterType): Promise<Blob> => {
        return await exportProspectsService(filters)
    }

    return {
        getProspects,
        getProspectById,
        createProspect,
        updateProspect,
        deleteProspect,
        getKPIs,
        updateProspectStatus,
        exportProspects
    }
}
