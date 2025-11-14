<script setup lang="ts">
import { computed } from 'vue'
import useCostStore from '@/modules/GestionDeProyectos/Costos/store/costStore'

const costStore = useCostStore()

const selectedProject = computed({
    get: () => costStore.selectedProject,
    set: (value: string) => costStore.setSelectedProject(value)
})

const projects = computed(() => costStore.projects.filter(p => p.id && p.id.trim() !== ''))
</script>

<template>
    <div v-if="!selectedProject" class="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] gap-6">
        <div class="text-center space-y-4 max-w-md">
            <span class="material-symbols-outlined text-6xl text-primary mx-auto block">
                payments
            </span>
            <h1 class="text-3xl font-bold">Gestión de Costos</h1>
            <p class="opacity-70">
                Seleccione un proyecto para gestionar y visualizar sus costos
            </p>
        </div>
        <div class="card bg-base-100 shadow-xl w-full max-w-md">
            <div class="card-body">
                <h2 class="card-title">Seleccione un Proyecto</h2>
                <p class="text-sm opacity-70 mb-4">
                    Elija el proyecto del cual desea analizar los costos
                </p>
                <select 
                    v-model="selectedProject" 
                    class="select select-bordered w-full"
                >
                    <option value="" disabled>Seleccionar proyecto...</option>
                    <option 
                        v-for="project in projects" 
                        :key="project.id" 
                        :value="project.id"
                    >
                        {{ project.folio }} - {{ project.name }}
                    </option>
                </select>
            </div>
        </div>
    </div>
</template>
