<script setup lang="ts">
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormCheckbox from '@/shared/components/BaseFormCheckbox.vue'
</script>

<template>
  <div class="space-y-4">
    <BaseFormInput
      name="name"
      type="text"
      label="Nombre del área"
      :required="true"
    />
    <BaseFormInput
      name="description"
      type="text"
      label="Descripción"
      :required="false"
    />
    <BaseFormCheckbox name="active" label="Activa" class="mt-2" />
  </div>
</template>
