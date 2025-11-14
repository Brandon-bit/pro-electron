import type { SOWResponseType, SOWFormType, SOWType } from '@/modules/GestionDeProyectos/SOWDelProyecto/types/sowTypes'
import useSOWStore from '@/modules/GestionDeProyectos/SOWDelProyecto/store/sowStore'
import { createSOWService, deleteSOWService, updateSOWService, getSOWsService, exportSOWService } from '@/modules/GestionDeProyectos/SOWDelProyecto/services/sowService'
import { mapSOW, mapSOWRequest } from '@/modules/GestionDeProyectos/SOWDelProyecto/composables/mappingSOWData'

export const useSOWActions = () => {
    
    const sowStore = useSOWStore()

    const getSOWs = async (page: number, pageSize: number): Promise<{ items: SOWType[], total: number }> => {
        const response = await getSOWsService(page, pageSize)
        return {
            items: response.data.items.map(mapSOW),
            total: response.data.totalItems
        }
    }

    const createSOW = async (data: SOWFormType): Promise<{ message: string, status: string, data: SOWResponseType }> => {
        const model = mapSOWRequest(data)
        const response = await createSOWService(model)
        return {
            message: response.message,
            status: response.success ? "success" : "error",
            data: response.data
        }
    }

    const editSOW = async (data: SOWFormType): Promise<{ message: string, status: string, data: SOWResponseType }> => {
        const model = mapSOWRequest(data)
        const id = sowStore.selectedSOW.id ?? 0
        const response = await updateSOWService(id, model)
        return {
            message: response.message,
            status: response.success ? "success" : "error",
            data: response.data
        }
    }

    const deleteSOW = async (): Promise<{ message: string, status: string, data: SOWResponseType }> => {
        let id = sowStore.selectedSOW?.id
        if (id == undefined) id = 0
        const response = await deleteSOWService(id)
        return {
            message: response.message,
            status: response.success ? "success" : "error",
            data: response.data
        }
    }

    const exportSOW = async (id: number): Promise<Blob> => {
        return await exportSOWService(id)
    }

    return { 
        createSOW, 
        editSOW, 
        deleteSOW, 
        getSOWs,
        exportSOW
    }
}
