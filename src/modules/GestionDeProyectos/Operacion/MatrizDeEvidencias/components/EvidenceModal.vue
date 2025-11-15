<script setup lang="ts">
import { watch } from 'vue'
import type { ProjectEvidenceType, EvidenceType } from '@/modules/GestionDeProyectos/Operacion/MatrizDeEvidencias/types/evidenceTypes'
import BaseModal from '@/shared/components/BaseModal.vue'
import BaseTable from '@/shared/components/BaseTable.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { useEvidenceModalTable } from '@/modules/GestionDeProyectos/Operacion/MatrizDeEvidencias/composables/useEvidenceModalTable'

const props = defineProps<{
    isOpen: boolean
    project: ProjectEvidenceType | null
    evidences: EvidenceType[]
}>()

const emit = defineEmits<{
    close: []
}>()

const modalStore = useModalStore()
const { getEvidenceColumns } = useEvidenceModalTable()

const MODAL_ID = 'evidence-modal'

// Watch para abrir/cerrar el modal
watch(() => props.isOpen, (isOpen) => {
    if (isOpen && props.project) {
        modalStore.open(MODAL_ID, {
            title: `Evidencias - ${props.project.name}`
        })
    } else {
        if (modalStore.modals[MODAL_ID]) {
            modalStore.close(MODAL_ID)
        }
    }
})

const handleClose = () => {
    emit('close')
}

const handleSubmit = () => {
    handleClose()
}

// Función para obtener evidencias con paginación (requerida por BaseTable)
const getEvidences = async () => {
    // Simular delay
    await new Promise(resolve => setTimeout(resolve, 100))
    
    return {
        items: props.evidences,
        total: props.evidences.length
    }
}
</script>

<template>
    <BaseModal
        :modal-id="MODAL_ID"
        :on-submit="handleSubmit"
        :on-close="handleClose"
        :is-submitting="false"
    >
        <template #modalBody>
            <div v-if="evidences.length === 0" class="text-center py-12">
                <span class="material-symbols-outlined text-6xl opacity-30 mb-4 block">
                    folder_off
                </span>
                <p class="text-lg font-medium opacity-70">
                    No hay evidencias registradas
                </p>
                <p class="text-sm opacity-50 mt-2">
                    Este proyecto aún no tiene evidencias cargadas
                </p>
            </div>
            
            <div v-else>
                <BaseTable
                    :headers="getEvidenceColumns()"
                    :fetch-callback="getEvidences"
                    :paged-table="false"
                />
            </div>
        </template>
    </BaseModal>
</template>
