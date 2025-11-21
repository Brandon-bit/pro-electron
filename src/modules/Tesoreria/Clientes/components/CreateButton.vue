<script setup lang="ts">
import BaseButton from '@/shared/components/BaseButton.vue'
import useClientStore from '@/modules/Tesoreria/Clientes/store/clientStore'
import { useModalStore } from '@/shared/stores/modal.store'

const clientStore = useClientStore()
const modalStore = useModalStore()

const openCreateModal = () => {
    clientStore.setData()
    modalStore.open(clientStore.modalId, {
        type: 'CREATE',
        title: 'Nuevo cliente'
    })
}
</script>

<template>
    <BaseButton text="Nuevo cliente" icon="add" @click="openCreateModal" />
</template>
