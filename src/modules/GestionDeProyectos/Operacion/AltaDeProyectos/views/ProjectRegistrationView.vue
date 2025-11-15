<script setup lang="ts">
import { ref } from 'vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import ProjectForm from '@/modules/GestionDeProyectos/Operacion/AltaDeProyectos/components/ProjectForm.vue'
import TemplateModal from '@/modules/GestionDeProyectos/Operacion/AltaDeProyectos/components/TemplateModal.vue'
import ImportModal from '@/modules/GestionDeProyectos/Operacion/AltaDeProyectos/components/ImportModal.vue'
import useProjectStore from '@/modules/GestionDeProyectos/Operacion/AltaDeProyectos/store/projectStore'
import { showNotification } from '@/utils/toastNotifications'

const projectStore = useProjectStore()

const showTemplateModal = ref(false)
const showImportModal = ref(false)

const handleApplyTemplate = (templateData: any) => {
    Object.keys(templateData).forEach(key => {
        projectStore.updateField(key as any, templateData[key])
    })
    showTemplateModal.value = false
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
                    @click="showTemplateModal = true"
                >
                    <span class="material-symbols-outlined text-sm">description</span>
                    Utilizar Plantilla
                </button>
                <button
                    class="btn btn-outline"
                    @click="showImportModal = true"
                >
                    <span class="material-symbols-outlined text-sm">upload_file</span>
                    Importar Layout
                </button>
            </div>
        </div>

        <!-- Main Form -->
        <ProjectForm />

        <!-- Modals -->
        <TemplateModal
            :show="showTemplateModal"
            @close="showTemplateModal = false"
            @apply="handleApplyTemplate"
        />

        <ImportModal
            :show="showImportModal"
            @close="showImportModal = false"
            @import="handleImportData"
        />
    </div>
</template>
