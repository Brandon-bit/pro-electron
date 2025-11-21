<script setup lang="ts">
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormCheckbox from '@/shared/components/BaseFormCheckbox.vue'
</script>

<template>
  <BaseFormInput name="name" type="text" label="Nombre" :required="true" />
  <BaseFormInput name="email" type="email" label="Correo" />
  <BaseFormInput name="responsible" type="text" label="Responsable" />
  <BaseFormInput name="totalCapacity" type="number" label="Capacidad Total" />
  <BaseFormCheckbox name="isCentralWarehouse" label="Almacén Central" :default="false" />
  <BaseFormInput name="zone" type="text" label="Zona" />
  <BaseFormInput name="phone" type="text" label="Teléfono" />
  <BaseFormInput name="mobil" type="text" label="Celular" />
  <BaseFormCheckbox name="active" label="Estado" :default="true" class="mt-4" />
</template>
