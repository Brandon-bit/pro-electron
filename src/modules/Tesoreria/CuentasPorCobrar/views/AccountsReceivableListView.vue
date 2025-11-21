<script setup lang="ts">
import BaseTable from '@/shared/components/BaseTable.vue'
import { useAccountsReceivable } from '@/modules/Tesoreria/CuentasPorCobrar/composables/useAccountsReceivable'
import CreateButton from '@/modules/Tesoreria/CuentasPorCobrar/components/CreateButton.vue'
import { useAccountReceivableActions } from '@/modules/Tesoreria/CuentasPorCobrar/composables/useAccountReceivableActions'
import BaseTitle from '@/shared/components/BaseTitle.vue'

const { getAccountsReceivable } = useAccountReceivableActions()
const { columns } = useAccountsReceivable()
</script>

<template>
    <BaseTitle 
        title="Cuentas por Cobrar" 
        subtitle="Gestión de documentos y pagos por cobrar"
    />
    <div class="mb-10 text-right">
        <CreateButton />
    </div>
    <BaseTable :fetchCallback="getAccountsReceivable" :headers="columns" />
</template>
