<script setup lang="ts">
import useEDTStore from '@/modules/GestionDeProyectos/Operacion/EDTDelProyecto/store/edtStore'

const edtStore = useEDTStore()
</script>

<template>
    <p class="text-center">
        ¿Estás seguro de que deseas eliminar la actividad
        <span class="!font-semibold"> "{{ edtStore.selectedActividad?.nombre }}" ? </span>
    </p>
    <p class="text-center text-xs opacity-70 mt-2">
        Esta acción también eliminará todas las sub-actividades asociadas.
    </p>
</template>
