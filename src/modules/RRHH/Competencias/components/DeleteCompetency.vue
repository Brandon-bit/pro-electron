<script setup lang="ts">
import useCompetencyStore from '@/modules/RRHH/Competencias/store/competencyStore'

const competencyStore = useCompetencyStore()
</script>

<template>
    <p>
        ¿Estás seguro que deseas eliminar la competencia
        <span class="!font-semibold">
            "{{ competencyStore.selectedCompetency?.name }}"
        </span>
        ?
    </p>
    <p class="text-sm text-gray-500 mt-2">
        Esta acción no se puede deshacer.
    </p>
</template>
