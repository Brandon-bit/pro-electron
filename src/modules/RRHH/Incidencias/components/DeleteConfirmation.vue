<script setup lang="ts">
import useIncidencesStore from '@/modules/RRHH/Incidencias/store/incidencesStore'

const incidencesStore = useIncidencesStore()
</script>

<template>
    <div class="text-center py-4">
        <p class="!font-semibold mb-4">¿Está seguro de eliminar esta incidencia?</p>
        <p class="text-sm mb-2">
            <strong>Empleado:</strong> {{ incidencesStore.selectedIncidence?.employeeName }}
        </p>
        <p class="text-sm mb-2">
            <strong>Tipo:</strong> {{ incidencesStore.selectedIncidence?.typeLabel }}
        </p>
        <p class="text-sm mb-2">
            <strong>Fecha:</strong> {{ incidencesStore.selectedIncidence?.startDate }}
        </p>
        <p class="text-sm">
            <strong>Estado:</strong> {{ incidencesStore.selectedIncidence?.statusLabel }}
        </p>
    </div>
</template>
