<script setup lang="ts">
import { ref } from 'vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import BaseTable from '@/shared/components/BaseTable.vue'
import CategoryModal from '@/modules/RRHH/CategoriaIncidencias/components/CategoryModal.vue'
import useIncidenceCategoryStore from '@/modules/RRHH/CategoriaIncidencias/store/incidenceCategoryStore'
import { useModalStore } from '@/shared/stores/modal.store'
import useIncidenceCategory from '@/modules/RRHH/CategoriaIncidencias/composables/useIncidenceCategory'
import { useIncidenceCategoryActions } from '@/modules/RRHH/CategoriaIncidencias/composables/useIncidenceCategoryActions'

const tablaRef = ref()

const { getTableColumns } = useIncidenceCategory()
const { getIncidenceCategories } = useIncidenceCategoryActions()

const categoryStore = useIncidenceCategoryStore()
const modalStore = useModalStore()

const openCreateModal = () => {
    categoryStore.setData()
    modalStore.open(categoryStore.modalId, { type: 'CREATE', title: 'Crear categoría' })
}
</script>

<template>
    <BaseTitle title="Categorías de Incidencias" subtitle="Gestión de categorías" />

    <div class="mb-10 text-right">
        <BaseButton text="Nueva categoría" @click="openCreateModal()" icon="add" />
    </div>

    <BaseTable
        ref="tablaRef"
        :headers="getTableColumns()"
        :fetch-callback="getIncidenceCategories"
    />
    <CategoryModal :onRefresh="tablaRef?.fetchData" />
</template>
