<script setup lang="ts">
import useIncidenceTypeStore from '@/modules/RRHH/TipoIncidencias/store/incidenceTypeStore'

const incidenceTypeStore = useIncidenceTypeStore()
</script>

<template>
    <p class="text-base">
        ¿Estás seguro de eliminar el tipo de incidencia
        <span class="!font-semibold">
            {{ incidenceTypeStore.selectedIncidenceType.name }} </span
        >?
    </p>
</template>
