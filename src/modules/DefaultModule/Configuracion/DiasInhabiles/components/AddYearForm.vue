<script setup lang="ts">
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'

const getYearOptions = (): { id: number; label: string }[] => {
    const currentYear = new Date().getFullYear();
    const years: { id: number; label: string }[] = [];

    for (let i = 0; i <= 5; i++) {
        const year = currentYear + i;
        years.push({
            id: year,
            label: year.toString()
        });
    }

    return years;
}

</script>

<template>
    <BaseFormSelect
        label="Año"
        name="year"
        :options="getYearOptions()"
    />
</template>
