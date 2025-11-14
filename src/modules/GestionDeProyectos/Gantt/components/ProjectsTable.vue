<script setup lang="ts">
import { computed } from 'vue'
import useGanttStore from '@/modules/GestionDeProyectos/Gantt/store/ganttStore'
import { useGanttActions } from '@/modules/GestionDeProyectos/Gantt/composables/useGanttActions'
import { STATUS_CONFIG } from '@/modules/GestionDeProyectos/Gantt/types/ganttTypes'
import type { StatusType } from '@/modules/GestionDeProyectos/Gantt/types/ganttTypes'
import { showNotification } from '@/utils/toastNotifications'

const ganttStore = useGanttStore()
const { handleEditGantt, handleExportToExcel } = useGanttActions()

const filteredProjects = computed(() => ganttStore.filteredProjects)

const onEditGantt = (projectId: string) => {
    handleEditGantt(projectId)
}

const onExport = (project: any) => {
    try {
        handleExportToExcel(project)
        showNotification('Gantt exportado exitosamente', 'success')
    } catch (error) {
        showNotification('Error al exportar Gantt', 'error')
    }
}
</script>

<template>
    <div class="card bg-base-100 shadow-xl">
        <div class="card-body p-0">
            <div class="overflow-x-auto">
                <table class="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>ID Proyecto</th>
                            <th>Folio</th>
                            <th>Nombre del Proyecto</th>
                            <th>Fecha Inicio</th>
                            <th>Fecha Fin</th>
                            <th>Estatus</th>
                            <th class="text-center">Etapas</th>
                            <th class="text-center">Actividades</th>
                            <th class="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="filteredProjects.length === 0">
                            <td colspan="9" class="text-center py-8 opacity-70">
                                {{ ganttStore.searchQuery ? 'No se encontraron proyectos' : 'No hay proyectos registrados' }}
                            </td>
                        </tr>
                        <tr v-for="project in filteredProjects" :key="project.id" class="hover">
                            <td class="font-medium">{{ project.id }}</td>
                            <td>{{ project.folio }}</td>
                            <td>{{ project.name }}</td>
                            <td>{{ project.startDate }}</td>
                            <td>{{ project.endDate }}</td>
                            <td>
                                <span 
                                    :class="[
                                        'badge badge-sm',
                                        STATUS_CONFIG[project.status as StatusType].bgColor,
                                        STATUS_CONFIG[project.status as StatusType].color
                                    ]"
                                >
                                    {{ STATUS_CONFIG[project.status as StatusType].label }}
                                </span>
                            </td>
                            <td class="text-center">{{ project.stages }}</td>
                            <td class="text-center">{{ project.activities }}</td>
                            <td>
                                <div class="flex gap-2 justify-center">
                                    <button
                                        class="btn btn-sm btn-outline"
                                        @click="onEditGantt(project.id)"
                                    >
                                        <span class="material-symbols-outlined text-sm">edit</span>
                                        Editar Gantt
                                    </button>
                                    <button
                                        class="btn btn-sm btn-outline"
                                        @click="onExport(project)"
                                    >
                                        <span class="material-symbols-outlined text-sm">download</span>
                                        Exportar
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
