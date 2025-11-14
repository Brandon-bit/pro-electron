<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import useOperationStore from '@/modules/MesaDeControl/PipelineDeOperaciones/store/operationStore'
import { useModalStore } from '@/shared/stores/modal.store'
import useOperation from '@/modules/MesaDeControl/PipelineDeOperaciones/composables/useOperation'
import OperationSummaryTab from './tabs/OperationSummaryTab.vue'
import OperationDocumentsTab from './tabs/OperationDocumentsTab.vue'
import OperationValidationsTab from './tabs/OperationValidationsTab.vue'
import OperationHistoryTab from './tabs/OperationHistoryTab.vue'


const props = defineProps<{
    onRefresh?: () => void
}>()

const operationStore = useOperationStore()
const modalStore = useModalStore()
const { getPriorityColor } = useOperation()

const activeTab = ref('resumen')

const onClose = () => {
    operationStore.setData()
    activeTab.value = 'resumen'
}

const tabs = [
    { id: 'resumen', label: 'Resumen', icon: 'summarize' },
    { id: 'documentos', label: 'Documentos', icon: 'description' },
    { id: 'validaciones', label: 'Validaciones', icon: 'verified' },
    { id: 'historial', label: 'Historial', icon: 'history' }
]
</script>

<template>
    <BaseModal
        :modalId="operationStore.detailModalId"
        :onClose="onClose"
        :showFooter="false"
        size="large"
    >
        <template v-slot:modalBody>
            <div v-if="operationStore.selectedOperation" class="space-y-4">
                <!-- Header -->
                <div class="flex items-center justify-between border-b pb-4">
                    <div>
                        <h2 class="text-xl font-bold">{{ operationStore.selectedOperation.clientName }}</h2>
                        <p class="text-sm text-base-content/60">{{ operationStore.selectedOperation.id }}</p>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="badge" :class="getPriorityColor(operationStore.selectedOperation.priority)">
                            {{ operationStore.selectedOperation.priority }}
                        </span>
                        <span class="badge badge-outline">
                            {{ operationStore.selectedOperation.stage }}
                        </span>
                    </div>
                </div>

                <!-- Tabs -->
                <div class="tabs tabs-boxed bg-base-200">
                    <button 
                        v-for="tab in tabs" 
                        :key="tab.id"
                        class="tab gap-2"
                        :class="{ 'tab-active': activeTab === tab.id }"
                        @click="activeTab = tab.id"
                    >
                        <span class="material-symbols-outlined text-base">{{ tab.icon }}</span>
                        {{ tab.label }}
                    </button>
                </div>

                <!-- Tab Content -->
                <div class="min-h-[400px]">
                    <OperationSummaryTab v-if="activeTab === 'resumen'" :onRefresh="onRefresh" />
                    <OperationDocumentsTab v-if="activeTab === 'documentos'" />
                    <OperationValidationsTab v-if="activeTab === 'validaciones'" />
                    <OperationHistoryTab v-if="activeTab === 'historial'" :onRefresh="onRefresh" />
                </div>
            </div>
        </template>
    </BaseModal>
</template>
