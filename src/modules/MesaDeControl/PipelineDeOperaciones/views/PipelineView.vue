<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import KanbanColumn from '@/modules/MesaDeControl/PipelineDeOperaciones/components/KanbanColumn.vue'
import OperationDetailModal from '@/modules/MesaDeControl/PipelineDeOperaciones/components/OperationDetailModal.vue'
import IncidentModal from '@/modules/MesaDeControl/PipelineDeOperaciones/components/IncidentModal.vue'
import ApprovalModal from '@/modules/MesaDeControl/PipelineDeOperaciones/components/ApprovalModal.vue'
import useOperationStore from '@/modules/MesaDeControl/PipelineDeOperaciones/store/operationStore'
import { useModalStore } from '@/shared/stores/modal.store'
import useOperation from '@/modules/MesaDeControl/PipelineDeOperaciones/composables/useOperation'
import { useOperationActions } from '@/modules/MesaDeControl/PipelineDeOperaciones/composables/useOperationActions'
import type { OperationType } from '@/modules/MesaDeControl/PipelineDeOperaciones/types/operationTypes'

const operationStore = useOperationStore()
const modalStore = useModalStore()
const { stages } = useOperation()
const { getOperations } = useOperationActions()


const isLoading = ref(false)

// Mock data for development - Remove when API is ready
const mockOperations: OperationType[] = [
    {
        id: "OP-2024-001",
        clientName: "María González Pérez",
        type: "Inversión",
        amount: 50000,
        operator: { name: "Carlos Ruiz", initials: "CR" },
        priority: "Alta",
        stage: "Recepción",
        timeInStage: 15,
        slaLimit: 120,
        documents: [
            { name: "INE", status: "verified" },
            { name: "Comprobante de Domicilio", status: "pending" }
        ],
        validations: [
            { name: "Listas de Riesgo", status: "pending" }
        ],
        comments: []
    },
    {
        id: "OP-2024-002",
        clientName: "Juan Martínez López",
        type: "Crédito",
        amount: 120000,
        operator: { name: "Ana Torres", initials: "AT" },
        priority: "Media",
        stage: "Validación Automática",
        timeInStage: 45,
        slaLimit: 60,
        documents: [
            { name: "INE", status: "verified" },
            { name: "Comprobante de Domicilio", status: "verified" },
            { name: "Comprobante de Ingresos", status: "verified" }
        ],
        validations: [
            { name: "OCR de Documentos", status: "passed" },
            { name: "Buró de Crédito", status: "pending" }
        ],
        comments: []
    },
    {
        id: "OP-2024-003",
        clientName: "Laura Sánchez Díaz",
        type: "Inversión",
        amount: 85000,
        operator: { name: "Pedro Gómez", initials: "PG" },
        priority: "Alta",
        stage: "Revisión Manual",
        timeInStage: 180,
        slaLimit: 240,
        documents: [
            { name: "INE", status: "rejected", issues: ["Documento vencido"] },
            { name: "Comprobante de Domicilio", status: "verified" }
        ],
        validations: [
            { name: "Listas de Riesgo", status: "passed" },
            { name: "Validación de Identidad", status: "failed", details: "INE vencida desde hace 3 meses" }
        ],
        comments: [
            { author: "Pedro Gómez", text: "INE vencida, notificar al cliente", timestamp: "2024-10-11 10:30" }
        ]
    },
    {
        id: "OP-2024-004",
        clientName: "Roberto Fernández Cruz",
        type: "Crédito",
        amount: 200000,
        operator: { name: "Carlos Ruiz", initials: "CR" },
        priority: "Baja",
        stage: "Pendiente de Aprobación",
        timeInStage: 30,
        slaLimit: 180,
        documents: [
            { name: "INE", status: "verified" },
            { name: "Comprobante de Domicilio", status: "verified" },
            { name: "Comprobante de Ingresos", status: "verified" },
            { name: "Referencias Personales", status: "verified" }
        ],
        validations: [
            { name: "Buró de Crédito", status: "passed", details: "Score: 750/850" },
            { name: "Listas de Riesgo", status: "passed" },
            { name: "Capacidad de Pago", status: "passed" }
        ],
        comments: [
            { author: "Carlos Ruiz", text: "Todo en orden, listo para aprobación", timestamp: "2024-10-11 11:45" }
        ]
    }
]

const loadOperations = async () => {
    isLoading.value = true
    try {
        // Try to fetch from API, fallback to mock data
        // await getOperations(1, 100)
        
        // Using mock data for now
        operationStore.setOperations(mockOperations)
    } catch (error) {
        console.error('Error loading operations:', error)
        // Fallback to mock data
        operationStore.setOperations(mockOperations)
    } finally {
        isLoading.value = false
    }
}

const getOperationsByStage = (stageId: string) => {
    return operationStore.operations.filter(op => op.stage === stageId)
}

const handleSelectOperation = (operation: OperationType) => {
    operationStore.setData(operation)
    modalStore.open(operationStore.detailModalId, { 
        type: 'DETAIL', 
        title: 'Expediente Digital' 
    })
}

onMounted(() => {
    loadOperations()
})
</script>

<template>
    <div class="p-6 space-y-6">
        <!-- Header -->
        <BaseTitle 
            title="Pipeline de Operación" 
            subtitle="Centro de comando para onboarding de clientes"
        />

        <!-- Loading State -->
        <div v-if="isLoading" class="flex justify-center items-center py-20">
            <span class="loading loading-spinner loading-lg text-primary"></span>
        </div>

        <!-- Kanban Board -->
        <div v-else class="flex gap-4 overflow-x-auto pb-4">
            <KanbanColumn
                v-for="stage in stages"
                :key="stage.id"
                :stage="stage"
                :operations="getOperationsByStage(stage.id)"
                @selectOperation="handleSelectOperation"
            />
        </div>

        <!-- Modals -->
        <OperationDetailModal :onRefresh="loadOperations" />
        <IncidentModal :onRefresh="loadOperations" />
        <ApprovalModal :onRefresh="loadOperations" />
    </div>
</template>

<style scoped>
/* Custom scrollbar for horizontal scroll */
.overflow-x-auto::-webkit-scrollbar {
    height: 8px;
}

.overflow-x-auto::-webkit-scrollbar-track {
    background: hsl(var(--b2));
    border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
    background: hsl(var(--bc) / 0.3);
    border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
    background: hsl(var(--bc) / 0.5);
}
</style>
