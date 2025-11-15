<script setup lang="ts">
import { ref } from 'vue'
import type { PrioritizedProjectType } from '@/modules/GestionDeProyectos/Operacion/Priorizacion/types/prioritizationTypes'
import usePrioritizationStore from '@/modules/GestionDeProyectos/Operacion/Priorizacion/store/prioritizationStore'

defineProps<{
    projects: PrioritizedProjectType[]
    onUpdateField: (id: number, field: keyof PrioritizedProjectType, value: string) => void
}>()

const prioritizationStore = usePrioritizationStore()
const draggedIndex = ref<number | null>(null)

const handleDragStart = (index: number) => {
    draggedIndex.value = index
}

const handleDragOver = (event: DragEvent, index: number) => {
    event.preventDefault()
    if (draggedIndex.value === null || draggedIndex.value === index) return
    
    prioritizationStore.reorderProjects(draggedIndex.value, index)
    draggedIndex.value = index
}

const handleDragEnd = () => {
    draggedIndex.value = null
}
</script>

<template>
    <div class="overflow-x-auto">
        <table class="table w-full">
            <thead>
                <tr>
                    <th class="w-12"></th>
                    <th>Prioridad</th>
                    <th>Proyecto</th>
                    <th>Clasificación</th>
                    <th>Alineación Estratégica</th>
                    <th>ROI</th>
                    <th>Riesgos</th>
                    <th>Recursos</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="(project, index) in projects"
                    :key="project.id"
                    draggable="true"
                    @dragstart="handleDragStart(index)"
                    @dragover="handleDragOver($event, index)"
                    @dragend="handleDragEnd"
                    class="hover cursor-move transition-all"
                    :class="{
                        'opacity-50': draggedIndex === index,
                        'bg-accent/10': index === 0
                    }"
                >
                    <td>
                        <span class="material-symbols-outlined text-base-content/50">drag_indicator</span>
                    </td>
                    <td>
                        <span 
                            class="px-3 py-1 rounded-full font-bold"
                            :class="index === 0 ? 'bg-accent text-accent-content' : 'badge badge-ghost'"
                        >
                            #{{ project.priority }}
                        </span>
                    </td>
                    <td class="font-medium">{{ project.name }}</td>
                    <td>
                        <span class="badge badge-primary badge-sm">
                            {{ project.classification }}
                        </span>
                    </td>
                    <td>
                        <div class="flex items-center gap-2">
                            <div class="flex-1 bg-base-300 rounded-full h-2 max-w-[150px]">
                                <div 
                                    class="bg-accent h-2 rounded-full transition-all"
                                    :style="{ width: `${project.strategicAlignment}%` }"
                                />
                            </div>
                            <span class="text-sm font-medium w-12">
                                {{ project.strategicAlignment }}%
                            </span>
                        </div>
                    </td>
                    <td>
                        <input
                            type="text"
                            class="input input-sm input-bordered w-full max-w-[120px]"
                            placeholder="Ej: 25%"
                            :value="project.roi"
                            @input="(e) => onUpdateField(project.id!, 'roi', (e.target as HTMLInputElement).value)"
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            class="input input-sm input-bordered w-full max-w-[120px]"
                            placeholder="Bajo/Medio/Alto"
                            :value="project.risks"
                            @input="(e) => onUpdateField(project.id!, 'risks', (e.target as HTMLInputElement).value)"
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            class="input input-sm input-bordered w-full max-w-[120px]"
                            placeholder="Cantidad"
                            :value="project.resources"
                            @input="(e) => onUpdateField(project.id!, 'resources', (e.target as HTMLInputElement).value)"
                        />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
tr[draggable="true"] {
    transition: opacity 0.2s ease;
}

tr[draggable="true"]:active {
    cursor: grabbing;
}
</style>
