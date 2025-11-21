<script setup lang="ts">
import { ref } from 'vue'
import useSupplier from '../composables/useSupplier'
import { useModalStore } from '@/shared/stores/modal.store'
import useSupplierStore from '../store/supplier.store'
import BaseTable from '@/shared/components/BaseTable.vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import SupplierModal from '@inventario/ConfiguracionDeInventario/Proveedor/components/SupplierModal.vue'
import { useSupplierActions } from '@inventario/ConfiguracionDeInventario/Proveedor/composables/useSupplierActions'
import BaseTitle from '@/shared/components/BaseTitle.vue'

const tablaRef = ref()

const { getSupplierTableColumns } = useSupplier()
const { getSuppliers } = useSupplierActions()

const supplierStore = useSupplierStore()
const modalStore = useModalStore()

const openCreateModal = () => {
    supplierStore.setSupplier()
    modalStore.open(supplierStore.modalId, { type: 'CREATE', title: 'Agregar proveedor' })
}
</script>

<template>
    <BaseTitle 
        title="Proveedores" 
        subtitle="Gestión de proveedores"
    />

    <div class="mb-10 text-right">
        <BaseButton 
            text="Nuevo proveedor" 
            @click="openCreateModal()" 
            icon="add" 
        />
    </div>

    <BaseTable
        ref="tablaRef"
        :headers="getSupplierTableColumns()"
        :fetch-callback="getSuppliers"
    />

    <!-- Corrección del onRefresh -->
    <SupplierModal :onRefresh="() => tablaRef?.fetchData()" />
</template>
