    <script setup lang="ts">
import BaseButton from '@/shared/components/BaseButton.vue'
import useBankStore from '@/modules/Tesoreria/Bancos/store/bankStore'
import { useModalStore } from '@/shared/stores/modal.store'

const bankStore = useBankStore()
const modalStore = useModalStore()

const openCreateModal = () => {
    bankStore.setData()
    modalStore.open(bankStore.modalId, {
        type: 'CREATE',
        title: 'Nuevo banco'
    })
}
</script>

<template>
    <BaseButton text="Nuevo banco" icon="add" @click="openCreateModal" />
</template>
