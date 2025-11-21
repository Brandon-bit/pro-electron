<script setup lang="ts">
import BaseTable from '@/shared/components/BaseTable.vue'
import { useAccountsPayable } from '@/modules/Tesoreria/CuentasPorPagar/composables/useAccountsPayable'
import CreateButton from '@/modules/Tesoreria/CuentasPorPagar/components/CreateButton.vue'
import { useAccountPayableActions } from '@/modules/Tesoreria/CuentasPorPagar/composables/useAccountPayableActions'
import BaseTitle from '@/shared/components/BaseTitle.vue'

const { getAccountsPayable } = useAccountPayableActions()
const { columns } = useAccountsPayable()
</script>

<template>
    <BaseTitle 
        title="Cuentas por Pagar" 
        subtitle="Gestión de documentos y pagos por pagar"
    />
    <div class="mb-10 text-right">
        <CreateButton />
    </div>
    <BaseTable :fetchCallback="getAccountsPayable" :headers="columns" />
</template>
