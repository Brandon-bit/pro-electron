<script setup lang="ts">
import BaseTitle from '@/shared/components/BaseTitle.vue'
import DepreciationCalculator from '@/modules/Contabilidad/Contabilidad/Depreciacion/components/DepreciationCalculator.vue'
import DepreciationPreview from '@/modules/Contabilidad/Contabilidad/Depreciacion/components/DepreciationPreview.vue'
import DepreciationReports from '@/modules/Contabilidad/Contabilidad/Depreciacion/components/DepreciationReports.vue'
</script>

<template>
    <div class="space-y-6">
        <!-- Header -->
        <BaseTitle 
            title="Depreciación de Activos" 
            subtitle="Cálculo automático de depreciación y generación de pólizas contables" 
        />

        <!-- Motor de Cálculo -->
        <DepreciationCalculator />

        <!-- Vista Previa del Cálculo -->
        <DepreciationPreview />

        <!-- Reportes -->
        <DepreciationReports />
    </div>
</template>
