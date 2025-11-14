<script setup lang="ts">
import { ref } from 'vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import useReceivedInvoiceStore from '@/modules/Fiscal/FacturasRecibidas/store/receivedInvoiceStore'
import { useModalStore } from '@/shared/stores/modal.store'
import { useReceivedInvoiceActions } from '@/modules/Fiscal/FacturasRecibidas/composables/useReceivedInvoiceActions'
import { showNotification } from '@/utils/toastNotifications'

const props = defineProps<{
    onRefresh?: () => void
}>()

const receivedInvoiceStore = useReceivedInvoiceStore()
const modalStore = useModalStore()
const { rejectInvoice } = useReceivedInvoiceActions()

const rejectReason = ref('')
const isSubmitting = ref(false)

const handleReject = async () => {
    if (!rejectReason.value.trim() || rejectReason.value.length < 10) {
        showNotification('El motivo debe tener al menos 10 caracteres', 'error')
        return
    }

    isSubmitting.value = true
    try {
        const { message, status } = await rejectInvoice(rejectReason.value)
        showNotification(message, status)
        
        if (status === 'success') {
            props.onRefresh?.()
            modalStore.close(receivedInvoiceStore.rejectModalId)
            modalStore.close(receivedInvoiceStore.detailModalId)
            rejectReason.value = ''
        }
    } catch (error) {
        showNotification('Error al rechazar la factura', 'error')
    } finally {
        isSubmitting.value = false
    }
}

const onClose = () => {
    rejectReason.value = ''
}
</script>

<template>
    <BaseModal
        :modalId="receivedInvoiceStore.rejectModalId"
        :onClose="onClose"
        :onSubmit="handleReject"
        :isSubmitting="isSubmitting"
        :showFooter="false"
    >
        <template v-slot:modalBody>
            <div class="space-y-4">
                <div class="alert alert-warning">
                    <span class="material-symbols-outlined">warning</span>
                    <span>Esta acción marcará la factura como rechazada y no podrá ser utilizada para deducción fiscal.</span>
                </div>

                <div class="card bg-base-200">
                    <div class="card-body p-4">
                        <div class="space-y-2">
                            <div class="flex justify-between">
                                <span class="text-sm text-base-content/60">Folio:</span>
                                <span class="font-medium">{{ receivedInvoiceStore.selectedReceivedInvoice?.folio }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-sm text-base-content/60">Proveedor:</span>
                                <span class="font-medium">{{ receivedInvoiceStore.selectedReceivedInvoice?.supplierName }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Motivo del Rechazo *</span>
                    </label>
                    <textarea
                        v-model="rejectReason"
                        placeholder="Ingrese el motivo del rechazo (mínimo 10 caracteres)"
                        class="textarea textarea-bordered"
                        rows="4"
                    ></textarea>
                    <label class="label">
                        <span class="label-text-alt text-base-content/60">
                            {{ rejectReason.length }} / 500 caracteres
                        </span>
                    </label>
                </div>

                <div class="flex gap-2">
                    <button 
                        class="btn btn-outline btn-sm flex-1"
                        @click="modalStore.close(receivedInvoiceStore.rejectModalId)"
                        :disabled="isSubmitting"
                    >
                        Cancelar
                    </button>
                    <button 
                        class="btn btn-error btn-sm flex-1"
                        @click="handleReject"
                        :disabled="isSubmitting || !rejectReason.trim() || rejectReason.length < 10"
                    >
                        <span class="material-symbols-outlined text-base">cancel</span>
                        {{ isSubmitting ? 'Rechazando...' : 'Confirmar Rechazo' }}
                    </button>
                </div>
            </div>
        </template>
    </BaseModal>
</template>
