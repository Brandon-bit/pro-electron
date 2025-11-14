<script setup lang="ts">
import BaseTitle from '@/shared/components/BaseTitle.vue'
import AccountingMovementsFilters from '@/modules/Contabilidad/Contabilidad/OperacionDeMovimientos/components/AccountingMovementsFilters.vue'
import AccountingMovementsResults from '@/modules/Contabilidad/Contabilidad/OperacionDeMovimientos/components/AccountingMovementsResults.vue'
</script>

<template>
    <div class="space-y-6">
        <!-- Header -->
        <BaseTitle 
            title="Movimientos Contables" 
            subtitle="Consulta detallada de cada asiento contable y su impacto en los saldos" 
        />

        <!-- Filtros de búsqueda -->
        <AccountingMovementsFilters />

        <!-- Resultados -->
        <AccountingMovementsResults />
    </div>
</template>
