<script setup lang="ts">
import { computed } from 'vue'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import BaseFormCheckbox from '@/shared/components/BaseFormCheckbox.vue'
import useGeneralConfigStore from '@/modules/GestionDeProyectos/Configuracion/General/store/generalConfigStore'

const configStore = useGeneralConfigStore()

const areaOptions = computed(() =>
  configStore.areas.map((area) => ({ id: area.id, label: area.name }))
)
</script>

<template>
  <div class="space-y-4">
    <BaseFormSelect
      name="areaId"
      label="Área"
      :options="areaOptions"
      :required="true"
    />
    <BaseFormInput
      name="name"
      type="text"
      label="Nombre de la categoría"
      :required="true"
    />
    <BaseFormCheckbox name="active" label="Activa" class="mt-2" />
  </div>
</template>
