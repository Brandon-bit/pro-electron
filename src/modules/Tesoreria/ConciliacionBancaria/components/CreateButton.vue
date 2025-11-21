<script setup lang="ts">
import BaseButton from '@/shared/components/BaseButton.vue'
import useBankReconciliationStore from '@/modules/Tesoreria/ConciliacionBancaria/store/bankReconciliationStore'
import { useModalStore } from '@/shared/stores/modal.store'

const bankReconciliationStore = useBankReconciliationStore()
const modalStore = useModalStore()

const openCreateModal = () => {
    bankReconciliationStore.setData()
    modalStore.open(bankReconciliationStore.modalId, {
        type: 'CREATE',
        title: 'Nueva conciliación bancaria'
    })
}
</script>

<template>
    <BaseButton text="Nueva conciliación" icon="add" @click="openCreateModal" />
</template>
