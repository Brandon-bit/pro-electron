<script setup lang="ts">
import { ref } from 'vue'
import type { PrioritizedProjectType } from '@/modules/GestionDeProyectos/Operacion/Priorizacion/types/prioritizationTypes'
import usePrioritizationStore from '@/modules/GestionDeProyectos/Operacion/Priorizacion/store/prioritizationStore'

const props = defineProps<{
    projects: PrioritizedProjectType[]
    onUpdateField: (dni: number, field: keyof PrioritizedProjectType, value: any) => void
    onReorder: () => Promise<void>
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

const handleDragEnd = async () => {
    if (draggedIndex.value !== null) {
        // Llamar a la función de reordenamiento
        await props.onReorder()
    }
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
                    <th>ROI (%)</th>
                    <th>Riesgos</th>
                    <th>Recursos (personas)</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="(project, index) in projects"
                    :key="project.dni"
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
                            <input
                                type="number"
                                class="input input-sm input-bordered w-20"
                                placeholder="0"
                                min="0"
                                max="100"
                                :value="project.roi"
                                @input="(e) => onUpdateField(project.dni, 'roi', Number((e.target as HTMLInputElement).value))"
                            />
                            <span class="text-sm">%</span>
                        </div>
                    </td>
                    <td>
                        <select
                            class="select select-sm select-bordered w-full max-w-[120px]"
                            :value="project.risk"
                            @change="(e) => onUpdateField(project.dni, 'risk', (e.target as HTMLSelectElement).value)"
                        >
                            <option value="Bajo">Bajo</option>
                            <option value="Medio">Medio</option>
                            <option value="Alto">Alto</option>
                        </select>
                    </td>
                    <td>
                        <div class="flex items-center gap-2">
                            <input
                                type="number"
                                class="input input-sm input-bordered w-20"
                                placeholder="0"
                                min="0"
                                :value="project.resources"
                                @input="(e) => onUpdateField(project.dni, 'resources', Number((e.target as HTMLInputElement).value))"
                            />
                            <span class="text-sm">personas</span>
                        </div>
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
