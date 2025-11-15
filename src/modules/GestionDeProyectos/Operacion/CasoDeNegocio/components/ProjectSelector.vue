<script setup lang="ts">
import { computed } from 'vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import useBusinessCaseStore from '@/modules/GestionDeProyectos/Operacion/CasoDeNegocio/store/businessCaseStore'

const businessStore = useBusinessCaseStore()

const selectedProject = computed({
    get: () => businessStore.selectedProject,
    set: (value: string) => businessStore.setSelectedProject(value)
})
</script>

<template>
    <div class="space-y-6">
        <BaseTitle 
            title="Caso de Negocio" 
            subtitle="Seleccione un proyecto para comenzar con el análisis financiero"
        />

        <div class="card bg-base-100 shadow-xl max-w-md">
            <div class="card-body">
                <h3 class="card-title">Selección de Proyecto</h3>
                <div class="space-y-4">
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Proyecto</span>
                        </label>
                        <select 
                            v-model="selectedProject" 
                            class="select select-bordered w-full"
                        >
                            <option value="" disabled>Seleccione un proyecto</option>
                            <option 
                                v-for="project in businessStore.projects" 
                                :key="project.id" 
                                :value="project.id"
                            >
                                {{ project.name }}
                            </option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
