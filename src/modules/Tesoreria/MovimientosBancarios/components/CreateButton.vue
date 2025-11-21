<script setup lang="ts">
import BaseButton from '@/shared/components/BaseButton.vue'
import useBankMovementStore from '@/modules/Tesoreria/MovimientosBancarios/store/bankMovementStore'
import { useModalStore } from '@/shared/stores/modal.store'

const bankMovementStore = useBankMovementStore()
const modalStore = useModalStore()

const openCreateModal = () => {
    bankMovementStore.setData()
    modalStore.open(bankMovementStore.modalId, {
        type: 'CREATE',
        title: 'Nuevo movimiento bancario'
    })
}
</script>

<template>
    <BaseButton text="Nuevo movimiento" icon="add" @click="openCreateModal" />
</template>
