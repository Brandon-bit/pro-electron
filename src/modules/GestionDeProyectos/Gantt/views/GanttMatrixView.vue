<script setup lang="ts">
import { onMounted } from 'vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import BaseTable from '@/shared/components/BaseTable.vue'
import StatusLegend from '@/modules/GestionDeProyectos/Gantt/components/StatusLegend.vue'
import { useGanttActions } from '@/modules/GestionDeProyectos/Gantt/composables/useGanttActions'
import useGanttTable from '@/modules/GestionDeProyectos/Gantt/composables/useGanttTable'

const { loadProjects, getProjects } = useGanttActions()
const { getTableColumns } = useGanttTable()

onMounted(() => {
    loadProjects()
})
</script>

<template>
    <div class="space-y-6">
        <BaseTitle 
            title="Gantt - Matriz de Proyectos" 
            subtitle="Visualiza y gestiona el estado de todos los proyectos"
        />

        <!-- Status Legend -->
        <StatusLegend />

        <!-- Projects Matrix Table -->
        <BaseTable
            :headers="getTableColumns()"
            :fetch-callback="getProjects"
        />
    </div>
</template>
