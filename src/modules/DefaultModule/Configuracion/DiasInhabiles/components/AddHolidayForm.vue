<script setup lang="ts">
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormCheckbox from '@/shared/components/BaseFormCheckbox.vue'
</script>

<template>
    <BaseFormInput name="date" type="date" label="Fecha" :required="true" />
    <BaseFormInput name="description" type="text" label="Descripción" :required="true" />
    <BaseFormCheckbox class="mt-4" name="active" label="Activo" />
</template>