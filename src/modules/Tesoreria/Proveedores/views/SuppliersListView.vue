<script setup lang="ts">
import { ref } from 'vue'
import BaseTable from '@/shared/components/BaseTable.vue'
import { useSuppliers } from '@/modules/Tesoreria/Proveedores/composables/useSuppliers'
import CreateButton from '@/modules/Tesoreria/Proveedores/components/CreateButton.vue'
import { useSupplierActions } from '@/modules/Tesoreria/Proveedores/composables/useSupplierActions'
import SupplierModal from '@/modules/Tesoreria/Proveedores/components/SupplierModal.vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'

const { getSuppliers } = useSupplierActions()
const { columns } = useSuppliers()
const tableRef = ref()

const handleRefresh = () => {
    tableRef.value?.fetchData()
}
</script>

<template>
    <BaseTitle 
        title="Proveedores" 
        subtitle="Gestión de proveedores y sus datos de contacto"
    />
    <div class="mb-10 text-right">
        <CreateButton />
    </div>
    <BaseTable ref="tableRef" :fetchCallback="getSuppliers" :headers="columns" />
    <SupplierModal :onRefresh="handleRefresh" />
</template>
