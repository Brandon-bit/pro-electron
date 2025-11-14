<script setup lang="ts">
import { computed } from 'vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import useHolidayStore from '@/modules/DefaultModule/Configuracion/DiasInhabiles/store/holidayStore'

const holidayStore = useHolidayStore()

const yearOptions = computed((): { id: number; label: string }[] => {
    const currentYear = new Date().getFullYear()
    const usedYears = new Set(holidayStore.yearHolidays.map((y) => y.year))

    const years: { id: number; label: string }[] = []

    for (let i = 0; i <= 5; i++) {
        const year = currentYear + i
        if (!usedYears.has(year)) {
            years.push({
                id: year,
                label: year.toString(),
            })
        }
    }

    return years
})

</script>

<template>
    <BaseFormSelect
        label="Año"
        name="year"
        :options="yearOptions"
    />
</template>
