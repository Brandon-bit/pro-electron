import type { OperationType, OperationFormType, CommentFormType } from '@/modules/MesaDeControl/PipelineDeOperaciones/types/operationTypes'
import useOperationStore from '@/modules/MesaDeControl/PipelineDeOperaciones/store/operationStore'
import { 
    getOperationsService, 
    createOperationService, 
    updateOperationService, 
    deleteOperationService,
    addCommentService,
    sendIncidentNotificationService,
    approveOperationService,
    updateOperationStageService
} from '@/modules/MesaDeControl/PipelineDeOperaciones/services/operationService'
import { mapOperation, mapOperationRequest } from '@/modules/MesaDeControl/PipelineDeOperaciones/composables/mappingOperationData'


export const useOperationActions = () => {
    
    const operationStore = useOperationStore()

    const getOperations = async (page: number, pageSize: number): Promise<{ items: OperationType[], total: number }> => {
        const response = await getOperationsService(page, pageSize)
        const operations = response.data.items.map(mapOperation)
        operationStore.setOperations(operations)
        return {
            items: operations,
            total: response.data.totalItems
        }
    }

    const createOperation = async (data: OperationFormType): Promise<{ message: string, status: string }> => {
        const model = mapOperationRequest(data)
        const response = await createOperationService(model)
        return {
            message: response.message,
            status: response.success ? "success" : "error"
        }
    }

    const editOperation = async (data: OperationFormType): Promise<{ message: string, status: string }> => {
        const model = mapOperationRequest(data)
        const id = operationStore.selectedOperation.id ?? ''
        const response = await updateOperationService(id, model)
        return {
            message: response.message,
            status: response.success ? "success" : "error"
        }
    }

    const deleteOperation = async (): Promise<{ message: string, status: string }> => {
        const id = operationStore.selectedOperation?.id ?? ''
        const response = await deleteOperationService(id)
        return {
            message: response.message,
            status: response.success ? "success" : "error"
        }
    }

    const addComment = async (comment: string): Promise<{ message: string, status: string }> => {
        const id = operationStore.selectedOperation?.id ?? ''
        const response = await addCommentService(id, comment)
        return {
            message: response.message || 'Comentario agregado exitosamente',
            status: response.success ? "success" : "error"
        }
    }

    const sendIncident = async (templateId: string): Promise<{ message: string, status: string }> => {
        const id = operationStore.selectedOperation?.id ?? ''
        const response = await sendIncidentNotificationService(id, templateId)
        return {
            message: response.message || 'Incidencia notificada al cliente',
            status: response.success ? "success" : "error"
        }
    }

    const approveOperation = async (): Promise<{ message: string, status: string }> => {
        const id = operationStore.selectedOperation?.id ?? ''
        const response = await approveOperationService(id)
        return {
            message: response.message || 'Operación aprobada exitosamente',
            status: response.success ? "success" : "error"
        }
    }

    const moveOperationStage = async (operationId: string, newStage: string): Promise<{ message: string, status: string }> => {
        const response = await updateOperationStageService(operationId, newStage)
        if (response.success) {
            operationStore.moveOperation(operationId, newStage)
        }
        return {
            message: response.message || 'Etapa actualizada',
            status: response.success ? "success" : "error"
        }
    }

    return { 
        getOperations, 
        createOperation, 
        editOperation, 
        deleteOperation,
        addComment,
        sendIncident,
        approveOperation,
        moveOperationStage
    }
}
