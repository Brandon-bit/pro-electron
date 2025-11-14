<script setup lang="ts">
import { computed } from 'vue'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormCheckbox from '@/shared/components/BaseFormCheckbox.vue'
import useHolidayStore from '@/modules/DefaultModule/Configuracion/DiasInhabiles/store/holidayStore'

const holidayStore = useHolidayStore()

const minDate = computed(() => {
    const year = holidayStore.selectedYear
    return year ? `${year}-01-01` : undefined
})

const maxDate = computed(() => {
    const year = holidayStore.selectedYear
    return year ? `${year}-12-31` : undefined
})

</script>

<template>
    <BaseFormInput
        name="date"
        type="date"
        label="Fecha"
        :required="true"
        :min="minDate"
        :max="maxDate"
    />
    <BaseFormInput name="description" type="text" label="Descripción" :required="true" />
    <BaseFormCheckbox class="mt-4" name="active" label="Activo" />
</template>