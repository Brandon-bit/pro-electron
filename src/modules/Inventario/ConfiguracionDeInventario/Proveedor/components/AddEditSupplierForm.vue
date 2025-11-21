<script setup lang="ts">
import { useField } from 'vee-validate'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormCheckbox from '@/shared/components/BaseFormCheckbox.vue'

// Campos del formulario
const { value: razonSocial } = useField<string>('razonSocial')
const { value: nombreComercial } = useField<string>('nombreComercial')
const { value: rfc } = useField<string>('rfc')
const { value: correo } = useField<string>('correo')
const { value: contacto } = useField<string>('contacto')
const { value: telefono } = useField<string>('telefono')
const { value: sitioWeb } = useField<string>('sitioWeb')
const { value: condicionesPago } = useField<string>('condicionesPago')
const { value: Activo } = useField<boolean>('Activo')
</script>

<template>
  <BaseFormInput v-model="razonSocial" name="razonSocial" type="text" label="Razón Social" :required="true" />
  <BaseFormInput v-model="nombreComercial" name="nombreComercial" type="text" label="Nombre Comercial" :required="true" />
  <BaseFormInput v-model="rfc" name="rfc" type="text" label="RFC" />
  <BaseFormInput v-model="correo" name="correo" type="email" label="Correo electrónico" :required="true" />
  <BaseFormInput v-model="contacto" name="contacto" type="text" label="Persona de contacto" :required="true" />
  <BaseFormInput v-model="telefono" name="telefono" type="text" label="Teléfono" :required="true" />
  <BaseFormInput v-model="sitioWeb" name="sitioWeb" type="text" label="Sitio Web" />
  <BaseFormInput v-model="condicionesPago" name="condicionesPago" type="text" label="Condiciones de Pago" :required="true" />
  <BaseFormCheckbox v-model="Activo" class="mt-4" name="Activo" label="Activo" />
</template>
