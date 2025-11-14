import {
    getProcessDiagramsService,
    createProcessDiagramService,
    updateProcessDiagramService,
    deleteProcessDiagramService
} from '@procesos/ProcesosDeNegocio/DiagramasDeProceso/services/processDiagramServices'
import {
    mapProcessDiagram,
    mapProcessDiagramRequest
} from '@procesos/ProcesosDeNegocio/DiagramasDeProceso/composables/mappingProcessDiagramData'
import type {
    ProcessDiagramType,
    ProcessDiagramFormType,
    ProcessDiagramResponseType
} from '@procesos/ProcesosDeNegocio/DiagramasDeProceso/types/processDiagramType'
import useProcessDiagramStore from '@procesos/ProcesosDeNegocio/DiagramasDeProceso/store/processDiagramStore'

export const useProcessDiagramActions = () => {
    const processDiagramStore = useProcessDiagramStore()

    const getProcessDiagrams = async (
        page: number,
        pageSize: number
    ): Promise<{
        items: ProcessDiagramType[]
        total: number
    }> => {
        const response = await getProcessDiagramsService(page, pageSize)
        return {
            items: response.data.items.map(mapProcessDiagram),
            total: response.data.totalItems
        }
    }

    const createProcessDiagram = async (
        data: ProcessDiagramFormType
    ): Promise<{ message: string; status: string; data: ProcessDiagramResponseType }> => {
        const model = mapProcessDiagramRequest(data)
        const response = await createProcessDiagramService(model)
        return {
            message: response.message,
            status: response.success ? 'success' : 'error',
            data: response.data
        }
    }

    const editProcessDiagram = async (
        data: ProcessDiagramFormType
    ): Promise<{ message: string; status: string; data: ProcessDiagramResponseType }> => {
        const model = mapProcessDiagramRequest(data)
        const response = await updateProcessDiagramService(
            processDiagramStore.selectedProcessDiagram.id ?? 0,
            model
        )
        return {
            message: response.message,
            status: response.success ? 'success' : 'error',
            data: response.data
        }
    }

    const deleteProcessDiagram = async (
        id: number
    ): Promise<{ message: string; status: string }> => {
        const response = await deleteProcessDiagramService(id, false)
        return {
            message: response.message,
            status: response.success ? 'success' : 'error'
        }
    }

    return {
        getProcessDiagrams,
        createProcessDiagram,
        editProcessDiagram,
        deleteProcessDiagram
    }
}
