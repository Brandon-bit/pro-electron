<script setup lang="ts">
import BaseButton from '@/shared/components/BaseButton.vue'
import useAccountPayableStore from '@/modules/Tesoreria/CuentasPorPagar/store/accountPayableStore'
import { useModalStore } from '@/shared/stores/modal.store'

const accountPayableStore = useAccountPayableStore()
const modalStore = useModalStore()

const openPaymentModal = () => {
    accountPayableStore.setCurrentPaymentByIndex(null)
    modalStore.open(accountPayableStore.paymentModalId, {
        type: 'CREATE',
        title: 'Registrar pago'
    })
}
</script>

<template>
    <BaseButton text="Registrar pago" icon="add" @click="openPaymentModal" />
</template>
