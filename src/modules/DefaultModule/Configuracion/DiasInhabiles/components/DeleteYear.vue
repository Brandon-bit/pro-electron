<script setup lang="ts">
import useHolidayStore from '@/modules/DefaultModule/Configuracion/DiasInhabiles/store/holidayStore'

const holidayStore = useHolidayStore()
</script>

<template>
    <p class="text-center">
        ¿Estás seguro que deseas eliminar el año
        <span class="!font-semibold"> "{{ holidayStore.selectedYear }}" ? </span>
    </p>
</template>

