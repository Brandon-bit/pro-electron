<script setup lang="ts">
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormCheckbox from '@/shared/components/BaseFormCheckbox.vue'
</script>

<template>
    <BaseFormInput
        name="nombre"
        type="text"
        label="Nombre de la Actividad"
        :required="true"
    />
    <BaseFormInput
        name="psn"
        type="number"
        label="PSN (Número de Secuencia de Prioridad)"
        :required="true"
    />
    <BaseFormInput
        name="dias"
        type="number"
        label="Días de Duración"
        :required="true"
    />
    <BaseFormCheckbox name="activo" label="Activo" class="mt-4" />
</template>
