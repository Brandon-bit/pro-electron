<script setup lang="ts">
import BaseButton from '@/shared/components/BaseButton.vue'
import useAccountReceivableStore from '@/modules/Tesoreria/CuentasPorCobrar/store/accountReceivableStore'
import { useModalStore } from '@/shared/stores/modal.store'

const accountReceivableStore = useAccountReceivableStore()
const modalStore = useModalStore()

const openPaymentModal = () => {
    accountReceivableStore.setCurrentPaymentByIndex(null)
    modalStore.open(accountReceivableStore.paymentModalId, {
        type: 'CREATE',
        title: 'Registrar pago'
    })
}
</script>

<template>
    <BaseButton text="Registrar pago" icon="add" @click="openPaymentModal" />
</template>
