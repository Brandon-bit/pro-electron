<script setup lang="ts">
import useEDTStore from '@/modules/GestionDeProyectos/Operacion/EDTDelProyecto/store/edtStore'

const edtStore = useEDTStore()
</script>

<template>
    <p class="text-center">
        ¿Estás seguro de que deseas eliminar la sub-actividad
        <span class="!font-semibold"> "{{ edtStore.selectedSubActivity?.name }}" ? </span>
    </p>
</template>
