<script setup lang="ts">
import { ref } from 'vue'
import BaseTable from '@/shared/components/BaseTable.vue'
import { useClients } from '@/modules/Tesoreria/Clientes/composables/useClients'
import CreateButton from '@/modules/Tesoreria/Clientes/components/CreateButton.vue'
import { useClientActions } from '@/modules/Tesoreria/Clientes/composables/useClientActions'
import ClientModal from '@/modules/Tesoreria/Clientes/components/ClientModal.vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'

const { getClients } = useClientActions()
const { columns } = useClients()
const tableRef = ref()

const handleRefresh = () => {
    tableRef.value?.fetchData()
}
</script>

<template>
    <BaseTitle 
        title="Clientes" 
        subtitle="Gestión de clientes y datos de contacto"
    />
    <div class="mb-10 text-right">
        <CreateButton />
    </div>
    <BaseTable ref="tableRef" :fetchCallback="getClients" :headers="columns" />
    <ClientModal :onRefresh="handleRefresh" />
</template>
