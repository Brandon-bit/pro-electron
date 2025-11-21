<script setup lang="ts">
import { ref } from 'vue'
import BaseTable from '@/shared/components/BaseTable.vue'
import { useBankAccounts } from '@/modules/Tesoreria/CuentasBancarias/composables/useBankAccounts'
import CreateButton from '@/modules/Tesoreria/CuentasBancarias/components/CreateButton.vue'
import { useBankAccountActions } from '@/modules/Tesoreria/CuentasBancarias/composables/useBankAccountActions'
import BankAccountModal from '@/modules/Tesoreria/CuentasBancarias/components/BankAccountModal.vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'

const { getBankAccounts } = useBankAccountActions()
const { columns } = useBankAccounts()
const tableRef = ref()

const handleRefresh = () => {
    tableRef.value?.fetchData()
}
</script>

<template>
    <BaseTitle 
        title="Cuentas bancarias" 
        subtitle="Gestión de cuentas bancarias"
    />
    <div class="mb-10 text-right">
        <CreateButton />
    </div>
    <BaseTable ref="tableRef" :fetchCallback="getBankAccounts" :headers="columns" />
    <BankAccountModal :onRefresh="handleRefresh" />
</template>
