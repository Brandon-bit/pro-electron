<script setup lang="ts">
import { computed } from 'vue'
import useEDTStore from '@/modules/GestionDeProyectos/Operacion/EDTDelProyecto/store/edtStore'
import { showNotification } from '@/utils/toastNotifications'

const edtStore = useEDTStore()

const selectedProjectId = computed({
    get: () => edtStore.selectedProject?.id?.toString() || '',
    set: (value: string) => {
        const project = edtStore.availableProjects.find(p => p.id.toString() === value)
        if (project) {
            edtStore.setSelectedProject(project)
            showNotification(`Proyecto "${project.name}" cargado`, 'success')
        }
    }
})
</script>

<template>
    <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
            <h2 class="card-title flex items-center gap-2">
                <span class="material-symbols-outlined">description</span>
                Seleccionar Proyecto
            </h2>
            
            <select 
                v-model="selectedProjectId"
                class="select select-bordered w-full max-w-md"
            >
                <option value="" disabled>Selecciona un proyecto para comenzar</option>
                <option 
                    v-for="project in edtStore.availableProjects" 
                    :key="project.id"
                    :value="project.id.toString()"
                >
                    {{ project.name }} - {{ project.classification }}
                </option>
            </select>
        </div>
    </div>
</template>
