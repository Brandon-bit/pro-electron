<script setup lang="ts">
import { ref } from 'vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import useOperationStore from '@/modules/MesaDeControl/PipelineDeOperaciones/store/operationStore'
import { useModalStore } from '@/shared/stores/modal.store'
import { useOperationActions } from '@/modules/MesaDeControl/PipelineDeOperaciones/composables/useOperationActions'
import { showNotification } from '@/utils/toastNotifications'


const props = defineProps<{
    onRefresh?: () => void
}>()

const operationStore = useOperationStore()
const modalStore = useModalStore()
const { approveOperation, moveOperationStage } = useOperationActions()

const isSubmitting = ref(false)

const handleApprove = async () => {
    isSubmitting.value = true
    try {
        const { message, status } = await approveOperation()
        showNotification(message, status)
        
        if (status === 'success' && operationStore.selectedOperation?.id) {
            await moveOperationStage(operationStore.selectedOperation.id, 'Aprobado')
            props.onRefresh?.()
            modalStore.close(operationStore.approvalModalId)
            modalStore.close(operationStore.detailModalId)
        }
    } catch (error) {
        showNotification('Error al aprobar operación', 'error')
    } finally {
        isSubmitting.value = false
    }
}

const onClose = () => {
    // Reset if needed
}
</script>

<template>
    <BaseModal
        :modalId="operationStore.approvalModalId"
        :onClose="onClose"
        :showFooter="false"
    >
        <template v-slot:modalBody>
            <div class="space-y-4">
                <p class="text-sm text-base-content/60">
                    Estás a punto de aprobar la operación 
                    <strong>{{ operationStore.selectedOperation?.id }}</strong> para
                    <strong>{{ operationStore.selectedOperation?.clientName }}</strong>.
                </p>
                
                <div class="card bg-base-200">
                    <div class="card-body p-4 space-y-2">
                        <div class="flex items-center justify-between">
                            <span class="text-sm">Tipo:</span>
                            <span class="font-medium">{{ operationStore.selectedOperation?.type }}</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="text-sm">Monto:</span>
                            <span class="font-medium">
                                ${{ operationStore.selectedOperation?.amount.toLocaleString('es-MX') }}
                            </span>
                        </div>
                    </div>
                </div>
                
                <p class="text-sm text-base-content/60">
                    Al aprobar, la operación se integrará automáticamente al módulo de
                    <strong>{{ operationStore.selectedOperation?.type }}es</strong> y se notificará al cliente.
                </p>
                
                <div class="flex gap-2 pt-2">
                    <button 
                        class="btn btn-outline btn-sm flex-1" 
                        @click="modalStore.close(operationStore.approvalModalId)"
                        :disabled="isSubmitting"
                    >
                        Cancelar
                    </button>
                    <button 
                        class="btn btn-primary btn-sm flex-1" 
                        @click="handleApprove"
                        :disabled="isSubmitting"
                    >
                        <span class="material-symbols-outlined text-base">arrow_forward</span>
                        {{ isSubmitting ? 'Aprobando...' : 'Confirmar Aprobación' }}
                    </button>
                </div>
            </div>
        </template>
    </BaseModal>
</template>
