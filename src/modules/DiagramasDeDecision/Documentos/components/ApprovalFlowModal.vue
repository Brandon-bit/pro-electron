<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal.vue'
import useDocumentStore from '@/modules/DiagramasDeDecision/Documentos/store/documentStore'
import { useDocumentActions } from '@/modules/DiagramasDeDecision/Documentos/composables/useDocumentActions'
import { showNotification } from '@/utils/toastNotifications'

const documentStore = useDocumentStore()
const { getStatusIcon, getStatusIconColor, getInitials } = useDocumentActions()

const onSubmit = () => {
    documentStore.clearSelectedDocument()
}

const onClose = () => {
    documentStore.clearSelectedDocument()
}

const reviewNow = (stepId: string) => {
    showNotification('Iniciando proceso de revisión', 'info')
}
</script>

<template>
    <BaseModal
        :modal-id="documentStore.approvalModalId"
        :on-submit="onSubmit"
        :on-close="onClose"
        :is-submitting="false"
        :show-submit="false"
        size="large"
    >
        <template #modalBody>
            <div v-if="documentStore.selectedDocument" class="space-y-4">
                <div
                    v-for="step in documentStore.selectedDocument.approvalFlow"
                    :key="step.id"
                    class="card bg-base-100 shadow-md"
                >
                    <div class="card-body">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-4">
                                <span :class="['material-symbols-outlined', getStatusIconColor(step.status)]">
                                    {{ getStatusIcon(step.status) }}
                                </span>
                                <div class="avatar placeholder">
                                    <div class="bg-neutral text-neutral-content rounded-full w-10">
                                        <span class="text-sm">{{ getInitials(step.approver) }}</span>
                                    </div>
                                </div>
                                <div>
                                    <div class="font-medium">{{ step.approver }}</div>
                                    <div class="text-sm opacity-70">{{ step.role }}</div>
                                </div>
                            </div>
                            <div class="text-right">
                                <div v-if="step.date" class="text-sm opacity-70">{{ step.date }}</div>
                                <button
                                    v-if="step.status === 'pending'"
                                    @click="reviewNow(step.id)"
                                    class="btn btn-sm btn-primary mt-2"
                                >
                                    Revisar Ahora
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </BaseModal>
</template>
