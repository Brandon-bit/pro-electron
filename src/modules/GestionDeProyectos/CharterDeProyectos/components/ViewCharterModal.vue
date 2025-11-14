<script setup lang="ts">
import { watch } from 'vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import useCharterStore from '@/modules/GestionDeProyectos/CharterDeProyectos/store/charterStore'
import { useCharterActions } from '@/modules/GestionDeProyectos/CharterDeProyectos/composables/useCharterActions'

const modalStore = useModalStore()
const charterStore = useCharterStore()
const { getStatusColor, handleApprove } = useCharterActions()

const MODAL_ID = 'view-charter-modal'

watch(() => charterStore.isViewModalOpen, (isOpen) => {
    if (isOpen && charterStore.viewingCharter) {
        modalStore.open(MODAL_ID, {
            title: `Charter de Proyecto: ${charterStore.viewingCharter.projectName}`
        })
    } else {
        modalStore.close(MODAL_ID)
    }
})

const handleClose = () => {
    charterStore.closeViewModal()
}

const handleApproveCharter = () => {
    if (charterStore.viewingCharter) {
        handleApprove(charterStore.viewingCharter.id)
        charterStore.closeViewModal()
    }
}
</script>

<template>
    <BaseModal
        :modal-id="MODAL_ID"
        :on-close="handleClose"
        :hide-submit="true"
    >
        <template #modalBody>
            <div v-if="charterStore.viewingCharter" class="space-y-6 max-h-[70vh] overflow-y-auto pr-4">
                <!-- Header Info -->
                <div class="border-b pb-4">
                    <div class="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <p class="font-semibold">ID Charter:</p>
                            <p class="opacity-70">{{ charterStore.viewingCharter.id }}</p>
                        </div>
                        <div>
                            <p class="font-semibold">Versión:</p>
                            <p class="opacity-70">{{ charterStore.viewingCharter.version }}</p>
                        </div>
                        <div>
                            <p class="font-semibold">Fecha Creación:</p>
                            <p class="opacity-70">{{ charterStore.viewingCharter.createdDate }}</p>
                        </div>
                        <div>
                            <p class="font-semibold">Estado:</p>
                            <span :class="['badge', getStatusColor(charterStore.viewingCharter.status)]">
                                {{ charterStore.viewingCharter.status }}
                            </span>
                        </div>
                    </div>
                </div>

                <!-- Descripción -->
                <div>
                    <h3 class="font-semibold text-lg mb-2">Descripción del Proyecto</h3>
                    <p class="opacity-70">{{ charterStore.viewingCharter.description }}</p>
                </div>

                <!-- Justificación -->
                <div>
                    <h3 class="font-semibold text-lg mb-2">Justificación del Negocio</h3>
                    <p class="opacity-70">{{ charterStore.viewingCharter.justification }}</p>
                </div>

                <!-- Objetivos -->
                <div>
                    <h3 class="font-semibold text-lg mb-2">Objetivos y Criterios de Éxito</h3>
                    <pre class="opacity-70 whitespace-pre-wrap font-sans">{{ charterStore.viewingCharter.objectives }}</pre>
                </div>

                <!-- Alcance y Exclusiones -->
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <h3 class="font-semibold text-lg mb-2">Alcance</h3>
                        <p class="opacity-70">{{ charterStore.viewingCharter.scope }}</p>
                    </div>
                    <div>
                        <h3 class="font-semibold text-lg mb-2">Exclusiones</h3>
                        <p class="opacity-70">{{ charterStore.viewingCharter.exclusions }}</p>
                    </div>
                </div>

                <!-- Hitos -->
                <div>
                    <h3 class="font-semibold text-lg mb-2">Hitos Principales</h3>
                    <pre class="opacity-70 whitespace-pre-wrap font-sans">{{ charterStore.viewingCharter.milestones }}</pre>
                </div>

                <!-- Presupuesto -->
                <div>
                    <h3 class="font-semibold text-lg mb-2">Presupuesto</h3>
                    <p class="opacity-70 text-xl font-semibold">{{ charterStore.viewingCharter.budget }}</p>
                </div>

                <!-- Riesgos -->
                <div>
                    <h3 class="font-semibold text-lg mb-2">Riesgos de Alto Nivel</h3>
                    <pre class="opacity-70 whitespace-pre-wrap font-sans">{{ charterStore.viewingCharter.risks }}</pre>
                </div>

                <!-- Stakeholders -->
                <div>
                    <h3 class="font-semibold text-lg mb-2">Stakeholders Clave</h3>
                    <p class="opacity-70">{{ charterStore.viewingCharter.stakeholders }}</p>
                </div>

                <!-- PM y Sponsor -->
                <div class="grid grid-cols-2 gap-4 border-t pt-4">
                    <div>
                        <h3 class="font-semibold mb-1">Project Manager</h3>
                        <p class="opacity-70">{{ charterStore.viewingCharter.projectManager }}</p>
                    </div>
                    <div>
                        <h3 class="font-semibold mb-1">Sponsor</h3>
                        <p class="opacity-70">{{ charterStore.viewingCharter.sponsor }}</p>
                    </div>
                </div>

                <!-- Botón Aprobar -->
                <div v-if="charterStore.viewingCharter.status === 'En Revisión'" class="border-t pt-4">
                    <button @click="handleApproveCharter" class="btn btn-success w-full gap-2">
                        <span class="material-symbols-outlined">check_circle</span>
                        Aprobar Charter (Firma Digital)
                    </button>
                </div>

                <!-- Mensaje Aprobado -->
                <div 
                    v-if="charterStore.viewingCharter.status === 'Aprobado' && charterStore.viewingCharter.approvedDate" 
                    class="border-t pt-4 bg-success/10 p-4 rounded-lg"
                >
                    <p class="font-semibold text-success">
                        ✓ Charter Aprobado el {{ charterStore.viewingCharter.approvedDate }}
                    </p>
                    <p class="text-sm opacity-70 mt-1">
                        Sponsor: {{ charterStore.viewingCharter.sponsor }}
                    </p>
                </div>
            </div>
        </template>
    </BaseModal>
</template>
