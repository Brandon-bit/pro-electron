<script setup lang="ts">
import { onMounted, watch, computed } from 'vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import ProjectSelector from '@/modules/GestionDeProyectos/Costos/components/ProjectSelector.vue'
import KPICards from '@/modules/GestionDeProyectos/Costos/components/KPICards.vue'
import CostTable from '@/modules/GestionDeProyectos/Costos/components/CostTable.vue'
import useCostStore from '@/modules/GestionDeProyectos/Costos/store/costStore'
import { useCostActions } from '@/modules/GestionDeProyectos/Costos/composables/useCostActions'

const costStore = useCostStore()
const { loadProjects, loadCosts, addOtherCost } = useCostActions()

const selectedProject = computed({
    get: () => costStore.selectedProject,
    set: (value: string) => costStore.setSelectedProject(value)
})

const projects = computed(() => costStore.projects.filter(p => p.id && p.id.trim() !== ''))
const selectedProjectData = computed(() => costStore.selectedProjectData)

onMounted(() => {
    loadProjects()
})

watch(() => costStore.selectedProject, (newProjectId) => {
    if (newProjectId) {
        loadCosts(newProjectId)
    }
})
</script>

<template>
    <div class="flex flex-col h-full space-y-6">
        <!-- Project Selector (when no project selected) -->
        <ProjectSelector v-if="!selectedProject" />

        <!-- Main Content (when project is selected) -->
        <template v-else>
            <!-- Header with Project Selector -->
            <div class="flex items-center justify-between gap-4 flex-wrap">
                <div>
                    <BaseTitle 
                        title="Gestión de Costos" 
                        :subtitle="`${selectedProjectData?.folio} - ${selectedProjectData?.name}`"
                    />
                </div>
                <select 
                    v-model="selectedProject" 
                    class="select select-bordered w-full max-w-xs"
                >
                    <option value="" disabled>Cambiar proyecto...</option>
                    <option 
                        v-for="project in projects" 
                        :key="project.id" 
                        :value="project.id"
                    >
                        {{ project.folio }} - {{ project.name }}
                    </option>
                </select>
            </div>

            <!-- KPIs Panel -->
            <KPICards />

            <!-- Tabs Section -->
            <div class="card bg-base-100 shadow-xl flex-1">
                <div class="card-body">
                    <div role="tablist" class="tabs tabs-boxed">
                        <input 
                            type="radio" 
                            name="cost_tabs" 
                            role="tab" 
                            class="tab" 
                            aria-label="Costos del Proyecto"
                            checked 
                        />
                        <div role="tabpanel" class="tab-content p-6">
                            <div class="space-y-4">
                                <div>
                                    <h3 class="text-lg font-semibold">Costos del Proyecto</h3>
                                    <p class="text-sm opacity-70">
                                        Costos asociados a las etapas y actividades del Gantt
                                    </p>
                                </div>
                                <CostTable 
                                    :items="costStore.costs.projectCosts"
                                    category="projectCosts"
                                    :editable="false"
                                />
                            </div>
                        </div>

                        <input 
                            type="radio" 
                            name="cost_tabs" 
                            role="tab" 
                            class="tab" 
                            aria-label="Costos de Usuarios" 
                        />
                        <div role="tabpanel" class="tab-content p-6">
                            <div class="space-y-4">
                                <div>
                                    <h3 class="text-lg font-semibold">Costos de Usuarios</h3>
                                    <p class="text-sm opacity-70">
                                        Costos del equipo del proyecto basados en horas y tarifas
                                    </p>
                                </div>
                                <CostTable 
                                    :items="costStore.costs.userCosts"
                                    category="userCosts"
                                    :editable="true"
                                />
                            </div>
                        </div>

                        <input 
                            type="radio" 
                            name="cost_tabs" 
                            role="tab" 
                            class="tab" 
                            aria-label="Otros Costos" 
                        />
                        <div role="tabpanel" class="tab-content p-6">
                            <div class="space-y-4">
                                <div class="flex items-center justify-between">
                                    <div>
                                        <h3 class="text-lg font-semibold">Otros Costos</h3>
                                        <p class="text-sm opacity-70">
                                            Costos misceláneos no asociados a actividades o usuarios
                                        </p>
                                    </div>
                                    <button @click="addOtherCost" class="btn btn-primary gap-2">
                                        <span class="material-symbols-outlined">add</span>
                                        Agregar Nuevo Costo
                                    </button>
                                </div>
                                <CostTable 
                                    :items="costStore.costs.otherCosts"
                                    category="otherCosts"
                                    :editable="true"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>
