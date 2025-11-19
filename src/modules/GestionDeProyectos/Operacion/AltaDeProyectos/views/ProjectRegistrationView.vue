<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useModalStore } from '@/shared/stores/modal.store'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import ProjectForm from '@/modules/GestionDeProyectos/Operacion/AltaDeProyectos/components/ProjectForm.vue'
import TemplateModal from '@/modules/GestionDeProyectos/Operacion/AltaDeProyectos/components/TemplateModal.vue'
import ImportModal from '@/modules/GestionDeProyectos/Operacion/AltaDeProyectos/components/ImportModal.vue'
import useProjectStore from '@/modules/GestionDeProyectos/Operacion/AltaDeProyectos/store/projectStore'

const route = useRoute()
const modalStore = useModalStore()
const projectStore = useProjectStore()

const showImportModal = ref(false)

// Detectar si viene desde una iniciativa (EDT)
const isFromInitiative = computed(() => !!route.query.fromInitiative)

const openTemplateModal = () => {
    modalStore.open(projectStore.templateModalId, {
        title: 'Selecciona una plantilla',
        type: 'CREATE'
    })
}

const handleApplyTemplate = (template: { dni: number | string; label: string }) => {
    // Guardar la plantilla seleccionada en el store
    projectStore.setSelectedTemplate(template)
}

const handleImportData = (data: any) => {
    Object.keys(data).forEach(key => {
        projectStore.updateField(key as any, data[key])
    })
    showImportModal.value = false
}
</script>

<template>
    <div class="space-y-6">
        <!-- Header -->
        <div class="flex justify-between items-start flex-wrap gap-4">
            <BaseTitle 
                title="Alta de Proyecto" 
                subtitle="Registra un nuevo proyecto en el sistema"
            />
            
            <div class="flex gap-3">
                <button
                    class="btn btn-outline"
                    :disabled="isFromInitiative"
                    :class="{ 'btn-disabled': isFromInitiative }"
                    @click="openTemplateModal"
                    :title="isFromInitiative ? 'No disponible para proyectos desde iniciativas' : 'Utilizar una plantilla predefinida'"
                >
                    <span class="material-symbols-outlined text-sm">description</span>
                    Utilizar Plantilla
                </button>
                <button
                    class="btn btn-outline"
                    @click="showImportModal = true"
                    title="Importar datos desde un archivo"
                >
                    <span class="material-symbols-outlined text-sm">upload_file</span>
                    Importar Layout
                </button>
            </div>
        </div>

        <!-- Main Form -->
        <ProjectForm />

        <!-- Modals -->
        <TemplateModal @apply="handleApplyTemplate" />

        <ImportModal
            :show="showImportModal"
            @close="showImportModal = false"
            @import="handleImportData"
        />
    </div>
</template>
