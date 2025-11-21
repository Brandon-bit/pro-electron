<script setup lang="ts">
import { ref } from 'vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import BaseTable from '@/shared/components/BaseTable.vue'
import TypeModal from '@/modules/RRHH/TipoIncidencias/components/TypeModal.vue'
import useIncidenceTypeStore from '@/modules/RRHH/TipoIncidencias/store/incidenceTypeStore'
import { useModalStore } from '@/shared/stores/modal.store'
import { useIncidenceType } from '@/modules/RRHH/TipoIncidencias/composables/useIncidenceType'
import { useIncidenceTypeActions } from '@/modules/RRHH/TipoIncidencias/composables/useIncidenceTypeActions'

const tablaRef = ref()

const { getIncidenceTypeTableColumns } = useIncidenceType()
const { getIncidenceTypes } = useIncidenceTypeActions()

const incidenceTypeStore = useIncidenceTypeStore()
const modalStore = useModalStore()

const openCreateModal = () => {
    incidenceTypeStore.setData()
    modalStore.open(incidenceTypeStore.modalId, {
        type: 'CREATE',
        title: 'Crear tipo de incidencia'
    })
}
</script>

<template>
    <BaseTitle title="Tipos de Incidencias" subtitle="Gestión de tipos de incidencias" />

    <div class="mb-10 text-right">
        <BaseButton text="Nuevo tipo" @click="openCreateModal()" icon="add" />
    </div>

    <BaseTable
        ref="tablaRef"
        :headers="getIncidenceTypeTableColumns()"
        :fetch-callback="getIncidenceTypes"
    />
    <TypeModal :onRefresh="tablaRef?.fetchData" />
</template>
