<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal.vue'
import useOperationStore from '@/modules/MesaDeControl/PipelineDeOperaciones/store/operationStore'
import { useModalStore } from '@/shared/stores/modal.store'
import useOperation from '@/modules/MesaDeControl/PipelineDeOperaciones/composables/useOperation'
import { useOperationActions } from '@/modules/MesaDeControl/PipelineDeOperaciones/composables/useOperationActions'
import { showNotification } from '@/utils/toastNotifications'
import { ref } from 'vue'


const props = defineProps<{
    onRefresh?: () => void
}>()

const operationStore = useOperationStore()
const modalStore = useModalStore()
const { incidentTemplates } = useOperation()
const { sendIncident, moveOperationStage } = useOperationActions()

const isSubmitting = ref(false)

const handleSendIncident = async (templateId: string) => {
    isSubmitting.value = true
    try {
        const { message, status } = await sendIncident(templateId)
        showNotification(message, status)
        
        if (status === 'success' && operationStore.selectedOperation?.id) {
            await moveOperationStage(operationStore.selectedOperation.id, 'Pendiente de Corrección')
            props.onRefresh?.()
        }
        
        modalStore.close(operationStore.incidentModalId)
    } catch (error) {
        showNotification('Error al notificar incidencia', 'error')
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
        :modalId="operationStore.incidentModalId"
        :onClose="onClose"
        :showFooter="false"
    >
        <template v-slot:modalBody>
            <div class="space-y-3">
                <p class="text-sm text-base-content/60">
                    Selecciona una plantilla de mensaje para notificar al cliente:
                </p>
                
                <div 
                    v-for="template in incidentTemplates" 
                    :key="template.id"
                    class="card bg-base-100 border hover:border-primary cursor-pointer transition-colors"
                    :class="{ 'opacity-50 pointer-events-none': isSubmitting }"
                    @click="handleSendIncident(template.id)"
                >
                    <div class="card-body p-4">
                        <p class="font-medium mb-1">{{ template.title }}</p>
                        <p class="text-sm text-base-content/60">{{ template.message }}</p>
                    </div>
                </div>
            </div>
        </template>
    </BaseModal>
</template>
