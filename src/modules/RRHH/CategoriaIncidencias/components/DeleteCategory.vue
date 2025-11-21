<script setup lang="ts">
import useIncidenceCategoryStore from '@/modules/RRHH/CategoriaIncidencias/store/incidenceCategoryStore'

const incidenceCategoryStore = useIncidenceCategoryStore()
</script>

<template>
    <p class="text-base">
        ¿Está seguro de eliminar la categoría
        <span class="!font-semibold">
            {{ incidenceCategoryStore.selectedIncidenceCategory.name }} </span
        >?
    </p>
</template>
