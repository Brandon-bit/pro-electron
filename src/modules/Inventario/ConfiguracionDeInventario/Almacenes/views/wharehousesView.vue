<script setup lang="ts">
import { ref } from 'vue'
import useWarehouses from '../composables/useWharehouses'
import { useModalStore } from '@/shared/stores/modal.store'
import useAlmacenStore from '../store/Wharehouses.store'
import BaseTable from '@/shared/components/BaseTable.vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import WarehouseModal from '../components/WharehousesModal.vue'
import { useWarehouseActions } from '../composables/useWharehousesActions'
import BaseTitle from '@/shared/components/BaseTitle.vue'

const tablaRef = ref()

const { getWarehouseTableColumns } = useWarehouses()
const { getWarehouses } = useWarehouseActions()

const almacenStore = useAlmacenStore()
const modalStore = useModalStore()

const openCreateModal = () => {
    almacenStore.setSelectedAlmacen(undefined)
    modalStore.open(almacenStore.modalId ?? 'default-modal', { type: 'CREATE', title: 'Agregar Almacén' })
}
</script>

<template>
    <BaseTitle 
        title="Almacenes" 
        subtitle="Gestión de almacenes"
    />

    <div class="mb-10 text-right">
        <BaseButton 
            text="Nuevo Almacén" 
            @click="openCreateModal()" 
            icon="add" 
        />
    </div>

    <BaseTable
        ref="tablaRef"
        :headers="getWarehouseTableColumns()"
        :fetch-callback="getWarehouses"
    />

    <!-- Modal de almacén -->
    <WarehouseModal :onRefresh="() => tablaRef?.fetchData()" />
</template>
