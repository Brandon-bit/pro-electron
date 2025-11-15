<script setup lang="ts">
import useInitiativeStore from '@/modules/GestionDeProyectos/Operacion/AnalisisDeIniciativas/store/initiativeStore'
const initiativeStore = useInitiativeStore()
</script>

<template>
    <p>
        ¿Estás seguro que deseas eliminar la iniciativa
        <span class="!font-semibold"> "{{ initiativeStore.selectedInitiative?.name }}" ? </span>
    </p>
    <p class="text-sm text-gray-500 mt-2">
        Esta acción no se puede deshacer.
    </p>
</template>
