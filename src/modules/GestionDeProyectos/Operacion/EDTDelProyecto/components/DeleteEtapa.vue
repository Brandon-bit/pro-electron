<script setup lang="ts">
import useEDTStore from '@/modules/GestionDeProyectos/Operacion/EDTDelProyecto/store/edtStore'

const edtStore = useEDTStore()
</script>

<template>
    <p class="text-center">
        ¿Estás seguro de que deseas eliminar la etapa
        <span class="!font-semibold"> "{{ edtStore.selectedEtapa?.nombre }}" ? </span>
    </p>
    <p class="text-center text-xs opacity-70 mt-2">
        Esta acción también eliminará todas las actividades y sub-actividades asociadas.
    </p>
</template>
