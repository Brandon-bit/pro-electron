<script setup lang="ts">
import { ref } from 'vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import useDocumentStore from '@/modules/DiagramasDeDecision/Documentos/store/documentStore'
import { useDocumentActions } from '@/modules/DiagramasDeDecision/Documentos/composables/useDocumentActions'

const modalStore = useModalStore()
const documentStore = useDocumentStore()
const { handleCreateDocument } = useDocumentActions()

const activeTab = ref<'templates' | 'editor'>('templates')
const documentName = ref('')
const documentType = ref('')
const documentContent = ref('')

const onSubmit = () => {
    if (activeTab.value === 'editor') {
        const success = handleCreateDocument(documentName.value, documentType.value, documentContent.value)
        if (success) {
            documentName.value = ''
            documentType.value = ''
            documentContent.value = ''
            modalStore.close(documentStore.createModalId)
        }
    }
}

const onClose = () => {
    documentName.value = ''
    documentType.value = ''
    documentContent.value = ''
    activeTab.value = 'templates'
}

const useTemplate = (templateId: string) => {
    const template = documentStore.templates.find(t => t.id === templateId)
    if (template) {
        const success = handleCreateDocument(template.name, templateId, '')
        if (success) {
            modalStore.close(documentStore.createModalId)
        }
    }
}
</script>

<template>
    <BaseModal
        :modal-id="documentStore.createModalId"
        :on-submit="onSubmit"
        :on-close="onClose"
        :is-submitting="false"
        size="large"
    >
        <template #modalBody>
            <div class="space-y-4">
                <!-- Tabs -->
                <div role="tablist" class="tabs tabs-boxed">
                    <a 
                        role="tab" 
                        :class="['tab', activeTab === 'templates' && 'tab-active']"
                        @click="activeTab = 'templates'"
                    >
                        Plantillas
                    </a>
                    <a 
                        role="tab" 
                        :class="['tab', activeTab === 'editor' && 'tab-active']"
                        @click="activeTab = 'editor'"
                    >
                        Editor
                    </a>
                </div>

                <!-- Templates Tab -->
                <div v-if="activeTab === 'templates'" class="space-y-3">
                    <div
                        v-for="template in documentStore.templates"
                        :key="template.id"
                        class="card bg-base-100 border-2 border-base-300 hover:border-primary cursor-pointer transition-colors"
                        @click="useTemplate(template.id)"
                    >
                        <div class="card-body p-4">
                            <div class="flex items-start gap-3">
                                <span class="material-symbols-outlined text-primary">description</span>
                                <div class="flex-1">
                                    <h3 class="font-semibold">{{ template.name }}</h3>
                                    <p class="text-sm opacity-70">{{ template.description }}</p>
                                </div>
                                <button type="button" class="btn btn-outline btn-sm">Usar</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Editor Tab -->
                <div v-if="activeTab === 'editor'" class="space-y-4">
                    <!-- Document Name -->
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text font-semibold">Nombre del Documento</span>
                        </label>
                        <input
                            v-model="documentName"
                            type="text"
                            class="input input-bordered"
                            placeholder="Ej. Comunicado Go-Live Sistema X"
                        />
                    </div>

                    <!-- Document Type -->
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text font-semibold">Tipo de Documento</span>
                        </label>
                        <select v-model="documentType" class="select select-bordered">
                            <option value="">Seleccionar tipo</option>
                            <option value="golive">Comunicado Go-Live</option>
                            <option value="faq">FAQ</option>
                            <option value="policy">Política</option>
                            <option value="guide">Guía</option>
                        </select>
                    </div>

                    <!-- Document Content -->
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text font-semibold">Contenido</span>
                        </label>
                        <textarea
                            v-model="documentContent"
                            class="textarea textarea-bordered h-48"
                            placeholder="Escribe el contenido del documento..."
                        ></textarea>
                    </div>
                </div>
            </div>
        </template>
    </BaseModal>
</template>
