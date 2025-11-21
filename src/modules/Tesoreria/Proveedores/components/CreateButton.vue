<script setup lang="ts">
import BaseButton from '@/shared/components/BaseButton.vue'
import useSupplierStore from '@/modules/Tesoreria/Proveedores/store/supplierStore'
import { useModalStore } from '@/shared/stores/modal.store'

const supplierStore = useSupplierStore()
const modalStore = useModalStore()

const openCreateModal = () => {
    supplierStore.setData()
    modalStore.open(supplierStore.modalId, {
        type: 'CREATE',
        title: 'Nuevo proveedor'
    })
}
</script>

<template>
    <BaseButton text="Nuevo proveedor" icon="add" @click="openCreateModal" />
</template>
