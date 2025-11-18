<script setup lang="ts">
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormCheckbox from '@/shared/components/BaseFormCheckbox.vue'
</script>

<template>
    <BaseFormInput
        name="name"
        type="text"
        label="Nombre de la Etapa"
        :required="true"
    />
    <BaseFormInput
        name="psn"
        type="number"
        label="PSN (Número de Secuencia de Prioridad)"
        :required="true"
    />
    <BaseFormCheckbox name="active" label="Activo" class="mt-4" />
</template>
