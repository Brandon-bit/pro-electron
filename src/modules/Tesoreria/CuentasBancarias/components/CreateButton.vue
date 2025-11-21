<script setup lang="ts">
import BaseButton from '@/shared/components/BaseButton.vue'
import useBankAccountStore from '@/modules/Tesoreria/CuentasBancarias/store/bankAccountStore'
import { useModalStore } from '@/shared/stores/modal.store'

const bankAccountStore = useBankAccountStore()
const modalStore = useModalStore()

const openCreateModal = () => {
    bankAccountStore.setData()
    modalStore.open(bankAccountStore.modalId, {
        type: 'CREATE',
        title: 'Nueva cuenta bancaria'
    })
}
</script>

<template>
    <BaseButton text="Nueva cuenta bancaria" icon="add" @click="openCreateModal" />
</template>
