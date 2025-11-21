<script setup lang="ts">
import { ref } from 'vue'
import BaseTable from '@/shared/components/BaseTable.vue'
import { useBankReconciliations } from '@/modules/Tesoreria/ConciliacionBancaria/composables/useBankReconciliations'
import CreateButton from '@/modules/Tesoreria/ConciliacionBancaria/components/CreateButton.vue'
import { useBankReconciliationActions } from '@/modules/Tesoreria/ConciliacionBancaria/composables/useBankReconciliationActions'
import BankReconciliationModal from '@/modules/Tesoreria/ConciliacionBancaria/components/BankReconciliationModal.vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'

const { getBankReconciliations } = useBankReconciliationActions()
const { columns } = useBankReconciliations()
const tableRef = ref()

const handleRefresh = () => {
    tableRef.value?.fetchData()
}
</script>

<template>
    <BaseTitle 
        title="Conciliación bancaria" 
        subtitle="Comparación de saldos entre libros y banco"
    />
    <div class="mb-10 text-right">
        <CreateButton />
    </div>
    <BaseTable ref="tableRef" :fetchCallback="getBankReconciliations" :headers="columns" />
    <BankReconciliationModal :onRefresh="handleRefresh" />
</template>
