<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseTextArea from '@/shared/components/BaseTextArea.vue'
import BaseFormCheckbox from '@/shared/components/BaseFormCheckbox.vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import { useIncidenceTypeActions } from '@/modules/RRHH/TipoIncidencias/composables/useIncidenceTypeActions'

const { getParentCategories } = useIncidenceTypeActions()

const parentCategories = ref<any[]>([])

onMounted(async () => {
    parentCategories.value = await getParentCategories()
})
</script>

<template>
    <div class="space-y-4">
        <BaseFormInput
            label="Nombre"
            name="name"
            required
        />
        <BaseFormSelect
            label="Categoría Padre"
            name="parentCategoryId"
            :options="parentCategories"
            required
        />

        <BaseTextArea
            label="Descripción"
            name="description"
            rows="3"
        />

        <div class="divider">Configuración</div>

        <BaseFormCheckbox
            label="Requiere rango de fechas"
            name="requiresDateRange"
            helpText="Para incidencias que abarcan múltiples días"
        />

        <BaseFormCheckbox
            label="Requiere horas"
            name="requiresHours"
            helpText="Para registrar cantidad de horas (retardos, horas extra)"
        />

        <BaseFormCheckbox
            label="Requiere justificación"
            name="requiresJustification"
            helpText="Si el empleado debe justificar esta incidencia"
        />

        <div class="divider"></div>

        <BaseFormCheckbox label="Activo" name="status" />
    </div>
</template>
