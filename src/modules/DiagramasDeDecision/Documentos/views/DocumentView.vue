<script setup lang="ts">
import BaseTitle from '@/shared/components/BaseTitle.vue'
import DocumentCard from '@/modules/DiagramasDeDecision/Documentos/components/DocumentCard.vue'
import CreateDocumentModal from '@/modules/DiagramasDeDecision/Documentos/components/CreateDocumentModal.vue'
import ApprovalFlowModal from '@/modules/DiagramasDeDecision/Documentos/components/ApprovalFlowModal.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import useDocumentStore from '@/modules/DiagramasDeDecision/Documentos/store/documentStore'
import { showNotification } from '@/utils/toastNotifications'

const modalStore = useModalStore()
const documentStore = useDocumentStore()

const openCreateModal = () => {
    modalStore.open(documentStore.createModalId, {
        title: 'Crear Nuevo Documento',
        type: 'CREATE'
    })
}

const handleUpload = () => {
    showNotification('Funcionalidad de carga en desarrollo', 'info')
}
</script>

<template>
    <div class="space-y-6">
        <!-- Header -->
        <div class="flex items-center justify-between">
            <BaseTitle 
                title="Gestión de Documentos" 
                subtitle="Biblioteca de documentos de cambio con control de versiones y flujos de aprobación"
            >
                <template #icon>
                    <span class="material-symbols-outlined text-4xl">folder_open</span>
                </template>
            </BaseTitle>
            <div class="flex gap-2">
                <button @click="handleUpload" class="btn btn-outline btn-lg gap-2">
                    <span class="material-symbols-outlined">upload</span>
                    Cargar Documento
                </button>
                <button @click="openCreateModal" class="btn btn-primary btn-lg gap-2">
                    <span class="material-symbols-outlined">add</span>
                    Nuevo Documento
                </button>
            </div>
        </div>

        <!-- Documents List -->
        <div class="grid gap-4">
            <DocumentCard
                v-for="document in documentStore.documents"
                :key="document.id"
                :document="document"
            />
        </div>

        <!-- Modals -->
        <CreateDocumentModal />
        <ApprovalFlowModal />
    </div>
</template>
