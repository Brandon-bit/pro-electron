<script setup lang="ts">
import { useModalStore } from '@/shared/stores/modal.store'
import useDocumentStore from '@/modules/DiagramasDeDecision/Documentos/store/documentStore'
import { useDocumentActions } from '@/modules/DiagramasDeDecision/Documentos/composables/useDocumentActions'
import type { DocumentType } from '@/modules/DiagramasDeDecision/Documentos/types/documentTypes'

const props = defineProps<{
    document: DocumentType
}>()

const modalStore = useModalStore()
const documentStore = useDocumentStore()
const { getStatusBadgeClass, getStatusLabel, getStatusIcon, getStatusIconColor, getInitials } = useDocumentActions()

const openApprovalFlow = () => {
    documentStore.selectDocument(props.document)
    modalStore.open(documentStore.approvalModalId, {
        title: `Flujo de Aprobación: ${props.document.name}`,
        type: 'VIEW'
    })
}
</script>

<template>
    <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
        <div class="card-body">
            <!-- Header -->
            <div class="flex justify-between items-start mb-4">
                <div class="flex-1 space-y-2">
                    <div class="flex items-center gap-3">
                        <span class="material-symbols-outlined text-primary">description</span>
                        <h3 class="card-title">{{ document.name }}</h3>
                    </div>
                    <div class="flex gap-2">
                        <span :class="['badge', getStatusBadgeClass(document.status)]">
                            {{ getStatusLabel(document.status) }}
                        </span>
                        <span class="badge badge-outline">v{{ document.version }}</span>
                        <span class="badge badge-outline">{{ document.type }}</span>
                    </div>
                    <div class="flex items-center gap-4 text-sm opacity-70">
                        <span>Autor: {{ document.author }}</span>
                        <span>•</span>
                        <span>Creado: {{ document.created }}</span>
                    </div>
                </div>
                <div class="flex gap-2">
                    <button class="btn btn-outline btn-sm gap-2">
                        <span class="material-symbols-outlined text-sm">visibility</span>
                        Ver
                    </button>
                    <button class="btn btn-outline btn-sm gap-2">
                        <span class="material-symbols-outlined text-sm">edit</span>
                        Editar
                    </button>
                    <button @click="openApprovalFlow" class="btn btn-outline btn-sm gap-2">
                        <span class="material-symbols-outlined text-sm">history</span>
                        Aprobación
                    </button>
                </div>
            </div>

            <!-- Approval Flow -->
            <div class="space-y-3">
                <div class="flex items-center justify-between text-sm">
                    <span class="font-medium">Flujo de Aprobación</span>
                    <span class="opacity-70">
                        {{ document.approvalFlow.filter(s => s.status === 'approved').length }} /
                        {{ document.approvalFlow.length }} aprobados
                    </span>
                </div>
                <div class="flex items-center gap-2 overflow-x-auto">
                    <template v-for="(step, index) in document.approvalFlow" :key="step.id">
                        <div class="flex items-center gap-2 px-3 py-2 bg-base-200 rounded-lg min-w-fit">
                            <span :class="['material-symbols-outlined text-sm', getStatusIconColor(step.status)]">
                                {{ getStatusIcon(step.status) }}
                            </span>
                            <div class="avatar placeholder">
                                <div class="bg-neutral text-neutral-content rounded-full w-6">
                                    <span class="text-xs">{{ getInitials(step.approver) }}</span>
                                </div>
                            </div>
                            <div>
                                <div class="text-xs font-medium">{{ step.approver }}</div>
                                <div class="text-xs opacity-70">{{ step.role }}</div>
                            </div>
                        </div>
                        <div v-if="index < document.approvalFlow.length - 1" class="h-px w-6 bg-base-300"></div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
