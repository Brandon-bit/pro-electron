<script setup lang="ts">
import BaseButton from '@/shared/components/BaseButton.vue'
import useIncidencesStore from '@/modules/RRHH/Incidencias/store/incidencesStore'
import { useModalStore } from '@/shared/stores/modal.store'

const modalStore = useModalStore()
const incidencesStore = useIncidencesStore()

const openCreateModal = () => {
    incidencesStore.setData()
    modalStore.open(incidencesStore.modalId, { type: 'CREATE', title: 'Nueva incidencia' })
}
</script>

<template>
    <BaseButton text="Nueva incidencia" @click="openCreateModal" icon="add" />
</template>
