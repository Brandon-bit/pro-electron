<script setup lang="ts">
import BaseCard from '@/shared/components/BaseCard.vue'

defineProps<{
    totalAssets: number
    totalValue: number | string
    areasCount: number
    inactiveAssets: number
}>()
</script>

<template>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <!-- Total Activos -->
        <BaseCard
            :title="'Total Activos'"
            :number="totalAssets"
            :subtitle="`${inactiveAssets} dados de baja`"
            :icon="'business'"
            :icon-subtitle="'arrow_downward'"
            bg-color="bg-base-100"
        />

        <!-- Valor Total -->
        <BaseCard
            :title="'Valor Total'"
            :number="totalValue"
            :subtitle="'Valor original de activos'"
            :icon="'payments'"
            :icon-subtitle="'attach_money'"
            bg-color="bg-base-100"
        />

        <!-- Por Área -->
        <BaseCard
            :title="'Por Área'"
            :number="areasCount"
            :subtitle="'Áreas con activos asignados'"
            :icon="'apartment'"
            :icon-subtitle="'check_circle'"
            bg-color="bg-base-100"
        />
    </div>
</template>
