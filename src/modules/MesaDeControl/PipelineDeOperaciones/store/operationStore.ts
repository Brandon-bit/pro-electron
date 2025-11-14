import { defineStore } from 'pinia'
import type { OperationType } from '@/modules/MesaDeControl/PipelineDeOperaciones/types/operationTypes'

const initialOperation: OperationType = {
    id: undefined,
    clientName: '',
    type: 'Inversión',
    amount: 0,
    operator: {
        name: '',
        initials: ''
    },
    priority: 'Media',
    stage: 'Recepción',
    timeInStage: 0,
    slaLimit: 120,
    documents: [],
    validations: [],
    comments: [],
    creationDate: new Date()
}


const useOperationStore = defineStore('operation-store', {
    state: () => ({
        selectedOperation: initialOperation as OperationType,
        operations: [] as OperationType[],
        modalId: 'operation-modal',
        detailModalId: 'operation-detail-modal',
        incidentModalId: 'operation-incident-modal',
        approvalModalId: 'operation-approval-modal'
    }),
    actions: {
        setData(data: OperationType = initialOperation) {
            this.selectedOperation = data
        },
        setOperations(operations: OperationType[]) {
            this.operations = operations
        },
        updateOperation(operation: OperationType) {
            const index = this.operations.findIndex(op => op.id === operation.id)
            if (index !== -1) {
                this.operations[index] = operation
            }
            if (this.selectedOperation?.id === operation.id) {
                this.selectedOperation = operation
            }
        },
        moveOperation(operationId: string, newStage: string) {
            const operation = this.operations.find(op => op.id === operationId)
            if (operation) {
                operation.stage = newStage
                operation.timeInStage = 0
                this.updateOperation(operation)
            }
        }
    }
})

export default useOperationStore
