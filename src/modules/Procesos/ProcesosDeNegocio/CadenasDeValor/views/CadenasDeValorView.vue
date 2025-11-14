<script setup lang="ts">
import { ref } from 'vue'
import BaseTable from '@/shared/components/BaseTable.vue'
import useValueChain from '@procesos/ProcesosDeNegocio/CadenasDeValor/composables/useValueChain'
import { useModalStore } from '@/shared/stores/modal.store'
import BaseButton from '@/shared/components/BaseButton.vue'
import useValueChainStore from '@/modules/Procesos/ProcesosDeNegocio/CadenasDeValor/store/valueChainStore'
import ValueChainModal from '@procesos/ProcesosDeNegocio/CadenasDeValor/components/ValueChainModal.vue'
import { useValueChainActions } from '@procesos/ProcesosDeNegocio/CadenasDeValor/composables/useValueChainActions'
import BaseTitle from '@/shared/components/BaseTitle.vue'

const { getValueChainsTableColumns } = useValueChain()
const { getValueChains } = useValueChainActions()

const modalStore = useModalStore()
const valueChainStore = useValueChainStore()

const tablaRef = ref()

const openCreateModal = () => {
    valueChainStore.setData()
    modalStore.open(valueChainStore.modalId, { type: 'CREATE', title: 'Agregar cadena de valor' })
}
</script>

<template>
    <BaseTitle title="Cadenas de Valor" subtitle="Gestión de cadenas de valor" />

    <div class="mb-10 text-right">
        <BaseButton text="Nueva cadena de valor" @click="openCreateModal()" icon="add" />
    </div>

    <BaseTable
        ref="tablaRef"
        :headers="getValueChainsTableColumns()"
        :fetch-callback="getValueChains"
    />
    <ValueChainModal :onRefresh="tablaRef?.fetchData" />
</template>
