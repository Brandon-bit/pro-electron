<script setup lang="ts">
import { onMounted, computed } from 'vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import EmptyState from '@/modules/GestionDeProyectos/Priorizacion/components/EmptyState.vue'
import PrioritizationTable from '@/modules/GestionDeProyectos/Priorizacion/components/PrioritizationTable.vue'
import TopPriorityCard from '@/modules/GestionDeProyectos/Priorizacion/components/TopPriorityCard.vue'
import usePrioritizationStore from '@/modules/GestionDeProyectos/Priorizacion/store/prioritizationStore'
import type { PrioritizedProjectType } from '@/modules/GestionDeProyectos/Priorizacion/types/prioritizationTypes'

const prioritizationStore = usePrioritizationStore()

const projects = computed(() => prioritizationStore.projects)
const topProject = computed(() => prioritizationStore.topPriorityProject)

const handleUpdateField = (id: number, field: keyof PrioritizedProjectType, value: string) => {
    prioritizationStore.updateProject(id, field, value)
}

onMounted(() => {
    // Cargar proyectos desde localStorage
    prioritizationStore.loadFromLocalStorage()
})
</script>

<template>
    <div class="space-y-6">
        <BaseTitle 
            title="Priorización de Proyectos" 
            subtitle="Organiza y prioriza proyectos seleccionados. Arrastra para reordenar."
        />

        <!-- Estado vacío -->
        <EmptyState v-if="projects.length === 0" />

        <!-- Tabla de priorización -->
        <div v-else>
            <div class="card bg-base-100 shadow-xl">
                <div class="card-body">
                    <h2 class="card-title">Matriz de Priorización</h2>
                    
                    <PrioritizationTable 
                        :projects="projects"
                        :onUpdateField="handleUpdateField"
                    />

                    <TopPriorityCard :project="topProject" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Estilos adicionales si son necesarios */
</style>
