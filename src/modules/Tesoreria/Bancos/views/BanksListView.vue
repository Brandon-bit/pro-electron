<script setup lang="ts">
import { ref } from 'vue'
import BaseTable from '@/shared/components/BaseTable.vue'
import { useBanks } from '@/modules/Tesoreria/Bancos/composables/useBanks'
import CreateButton from '@/modules/Tesoreria/Bancos/components/CreateButton.vue'
import { useBankActions } from '@/modules/Tesoreria/Bancos/composables/useBankActions'
import BankModal from '@/modules/Tesoreria/Bancos/components/BankModal.vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'

const { getBanks } = useBankActions()
const tableRef = ref()

const handleRefresh = () => {
    tableRef.value?.fetchData()
}
</script>

<template>
    <BaseTitle 
        title="Bancos" 
        subtitle="Gestión de bancos"
    />
    <div class="mb-10 text-right">
        <CreateButton />
    </div>
    <BaseTable ref="tableRef" :fetchCallback="getBanks" :headers="useBanks()" />
    <BankModal :onRefresh="handleRefresh" />
</template>
