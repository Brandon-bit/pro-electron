import type { OperationType, OperationResponseType, OperationFormType } from '@/modules/MesaDeControl/PipelineDeOperaciones/types/operationTypes'


export const mapOperation = (response: OperationResponseType): OperationType => {
    return {
        id: response.id,
        clientName: response.nombreCliente,
        type: response.tipo as "Inversión" | "Crédito",
        amount: response.monto,
        operator: {
            name: response.operador.nombre,
            initials: response.operador.iniciales
        },
        priority: response.prioridad as "Alta" | "Media" | "Baja",
        stage: response.etapa,
        timeInStage: response.tiempoEnEtapa,
        slaLimit: response.limitesSLA,
        documents: response.documentos || [],
        validations: response.validaciones || [],
        comments: response.comentarios || [],
        creationDate: new Date(response.fechaCreacion)
    }
}

export const mapOperationRequest = (data: OperationFormType): FormData => {
    const formData = new FormData()
    
    formData.append('nombreCliente', data.clientName)
    formData.append('tipo', data.type)
    formData.append('monto', data.amount.toString())
    formData.append('prioridad', data.priority)
    formData.append('etapa', data.stage)
    
    return formData
}
