<script setup lang="ts">
import BaseButton from '@/shared/components/BaseButton.vue'
import useAccountTypeStore from '@/modules/Tesoreria/TiposCuenta/store/accountTypeStore'
import { useModalStore } from '@/shared/stores/modal.store'

const accountTypeStore = useAccountTypeStore()
const modalStore = useModalStore()

const openCreateModal = () => {
    accountTypeStore.setData()
    modalStore.open(accountTypeStore.modalId, {
        type: 'CREATE',
        title: 'Nuevo tipo de cuenta'
    })
}
</script>

<template>
    <BaseButton text="Nuevo tipo de cuenta" icon="add" @click="openCreateModal" />
</template>
