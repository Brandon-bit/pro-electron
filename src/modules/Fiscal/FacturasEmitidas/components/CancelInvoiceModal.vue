<script setup lang="ts">
import { ref } from 'vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import BaseTextArea from '@/shared/components/BaseTextArea.vue'
import useInvoiceStore from '@/modules/Fiscal/FacturasEmitidas/store/invoiceStore'
import { useModalStore } from '@/shared/stores/modal.store'
import { useInvoiceActions } from '@/modules/Fiscal/FacturasEmitidas/composables/useInvoiceActions'
import { showNotification } from '@/utils/toastNotifications'

const props = defineProps<{
    onRefresh?: () => void
}>()

const invoiceStore = useInvoiceStore()
const modalStore = useModalStore()
const { cancelInvoice } = useInvoiceActions()

const cancelReason = ref('')
const isSubmitting = ref(false)

const handleCancel = async () => {
    if (!cancelReason.value.trim() || cancelReason.value.length < 10) {
        showNotification('El motivo debe tener al menos 10 caracteres', 'error')
        return
    }

    isSubmitting.value = true
    try {
        const { message, status } = await cancelInvoice(cancelReason.value)
        showNotification(message, status)
        
        if (status === 'success') {
            props.onRefresh?.()
            modalStore.close(invoiceStore.cancelModalId)
            modalStore.close(invoiceStore.detailModalId)
            cancelReason.value = ''
        }
    } catch (error) {
        showNotification('Error al cancelar la factura', 'error')
    } finally {
        isSubmitting.value = false
    }
}

const onClose = () => {
    cancelReason.value = ''
}
</script>

<template>
    <BaseModal
        :modalId="invoiceStore.cancelModalId"
        :onClose="onClose"
        :showFooter="false"
    >
        <template v-slot:modalBody>
            <div class="space-y-4">
                <div class="alert alert-warning">
                    <span class="material-symbols-outlined">warning</span>
                    <span>La cancelación de una factura es irreversible y debe ser reportada al SAT.</span>
                </div>

                <div class="card bg-base-200">
                    <div class="card-body p-4">
                        <div class="space-y-2">
                            <div class="flex justify-between">
                                <span class="text-sm text-base-content/60">Folio:</span>
                                <span class="font-medium">{{ invoiceStore.selectedInvoice?.folio }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-sm text-base-content/60">Cliente:</span>
                                <span class="font-medium">{{ invoiceStore.selectedInvoice?.clientName }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Motivo de Cancelación *</span>
                    </label>
                    <BaseTextArea
                        v-model="cancelReason"
                        placeholder="Ingrese el motivo de la cancelación (mínimo 10 caracteres)"
                        :rows="4"
                    />
                    <label class="label">
                        <span class="label-text-alt text-base-content/60">
                            {{ cancelReason.length }} / 500 caracteres
                        </span>
                    </label>
                </div>

                <div class="flex gap-2">
                    <button 
                        class="btn btn-outline btn-sm flex-1"
                        @click="modalStore.close(invoiceStore.cancelModalId)"
                        :disabled="isSubmitting"
                    >
                        Cerrar
                    </button>
                    <button 
                        class="btn btn-error btn-sm flex-1"
                        @click="handleCancel"
                        :disabled="isSubmitting || !cancelReason.trim() || cancelReason.length < 10"
                    >
                        <span class="material-symbols-outlined text-base">cancel</span>
                        {{ isSubmitting ? 'Cancelando...' : 'Confirmar Cancelación' }}
                    </button>
                </div>
            </div>
        </template>
    </BaseModal>
</template>
