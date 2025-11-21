<script setup lang="ts">
import { ref } from 'vue'
import BaseTable from '@/shared/components/BaseTable.vue'
import { useBankMovements } from '@/modules/Tesoreria/MovimientosBancarios/composables/useBankMovements'
import CreateButton from '@/modules/Tesoreria/MovimientosBancarios/components/CreateButton.vue'
import { useBankMovementActions } from '@/modules/Tesoreria/MovimientosBancarios/composables/useBankMovementActions'
import BankMovementModal from '@/modules/Tesoreria/MovimientosBancarios/components/BankMovementModal.vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'

const { getBankMovements } = useBankMovementActions()
const { columns } = useBankMovements()
const tableRef = ref()

const handleRefresh = () => {
    tableRef.value?.fetchData()
}
</script>

<template>
    <BaseTitle 
        title="Movimientos bancarios" 
        subtitle="Gestión de ingresos, egresos y transferencias"
    />
    <div class="mb-10 text-right">
        <CreateButton />
    </div>
    <BaseTable ref="tableRef" :fetchCallback="getBankMovements" :headers="columns" />
    <BankMovementModal :onRefresh="handleRefresh" />
</template>
