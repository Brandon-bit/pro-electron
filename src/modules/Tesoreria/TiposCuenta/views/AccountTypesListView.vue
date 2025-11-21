<script setup lang="ts">
import { ref } from 'vue'
import BaseTable from '@/shared/components/BaseTable.vue'
import { useAccountTypes } from '@/modules/Tesoreria/TiposCuenta/composables/useAccountTypes'
import CreateButton from '@/modules/Tesoreria/TiposCuenta/components/CreateButton.vue'
import { useAccountTypeActions } from '@/modules/Tesoreria/TiposCuenta/composables/useAccountTypeActions'
import AccountTypeModal from '@/modules/Tesoreria/TiposCuenta/components/AccountTypeModal.vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'

const { getAccountTypes } = useAccountTypeActions()
const tableRef = ref()

const handleRefresh = () => {
    tableRef.value?.fetchData()
}
</script>

<template>
    <BaseTitle 
        title="Tipos de cuenta" 
        subtitle="Gestión de tipos de cuenta bancaria"
    />
    <div class="mb-10 text-right">
        <CreateButton />
    </div>
    <BaseTable ref="tableRef" :fetchCallback="getAccountTypes" :headers="useAccountTypes()" />
    <AccountTypeModal :onRefresh="handleRefresh" />
</template>
