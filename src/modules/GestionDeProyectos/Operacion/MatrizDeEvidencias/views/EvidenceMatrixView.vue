<script setup lang="ts">
import { onMounted, computed } from 'vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import BaseTable from '@/shared/components/BaseTable.vue'
import EvidenceModal from '@/modules/GestionDeProyectos/Operacion/MatrizDeEvidencias/components/EvidenceModal.vue'
import useEvidenceStore from '@/modules/GestionDeProyectos/Operacion/MatrizDeEvidencias/store/evidenceStore'
import { useEvidenceActions } from '@/modules/GestionDeProyectos/Operacion/MatrizDeEvidencias/composables/useEvidenceActions'
import { useEvidenceTable } from '@/modules/GestionDeProyectos/Operacion/MatrizDeEvidencias/composables/useEvidenceTable'

const evidenceStore = useEvidenceStore()
const { loadProjects, getProjects, getProjectEvidences } = useEvidenceActions()
const { getTableColumns } = useEvidenceTable()

const isModalOpen = computed(() => evidenceStore.selectedProject !== null)

const projectEvidences = computed(() => {
    if (!evidenceStore.selectedProject) return []
    return getProjectEvidences(evidenceStore.selectedProject.id)
})

onMounted(() => {
    loadProjects()
})

const closeModal = () => {
    evidenceStore.setSelectedProject(null)
}
</script>

<template>
    <div class="space-y-6">
        <!-- Header -->
        <BaseTitle 
            title="Matriz de Evidencias" 
            subtitle="Gestiona y descarga las evidencias de tus proyectos en curso"
        />

        <!-- Base Table -->
        <BaseTable
            :headers="getTableColumns()"
            :fetch-callback="getProjects"
            :paged-table="true"
        />

        <!-- Evidence Modal -->
        <EvidenceModal
            :is-open="isModalOpen"
            :project="evidenceStore.selectedProject"
            :evidences="projectEvidences"
            @close="closeModal"
        />
    </div>
</template>
