<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import BaseButton from '@/shared/components/BaseButton.vue'
import BaseTable from '@/shared/components/BaseTable.vue'
import FixedAssetsStats from '@/modules/Contabilidad/Contabilidad/ActivosFijos/components/FixedAssetsStats.vue'
import DeleteFixedAsset from '@/modules/Contabilidad/Contabilidad/ActivosFijos/components/DeleteFixedAsset.vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import useFixedAssets from '@/modules/Contabilidad/Contabilidad/ActivosFijos/composables/useFixedAssets'
import { useFixedAssetsActions } from '@/modules/Contabilidad/Contabilidad/ActivosFijos/composables/useFixedAssetsActions'
import BaseTitle from '@/shared/components/BaseTitle.vue'

const router = useRouter()
const { getTableColumns, handleDeleteConfirm, handleDeleteCancel, isDeleting } = useFixedAssets()
const { getFixedAssets, getFixedAssetsStats } = useFixedAssetsActions()

const tablaRef = ref()

const stats = ref({
    totalAssets: 0,
    totalValue: 0,
    areasCount: 0,
    inactiveAssets: 0
})

// Formatear el valor total como moneda USD
const formattedTotalValue = computed(() => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(stats.value.totalValue)
})

const loadStats = async () => {
    stats.value = await getFixedAssetsStats()
}

const openCreateView = () => {
    // Navegar a la vista de creación
    router.push('/contabilidad/activos-fijos/create')
}

// Función para refrescar datos después de eliminar
const refreshData = () => {
    tablaRef.value?.fetchData()
    loadStats()
}

onMounted(() => {
    loadStats()
})
</script>

<template>
    <div class="space-y-6">
        <!-- Header -->
        <BaseTitle title="Activos Fijos" subtitle="Control integral de bienes con trazabilidad contable y documental" />
        <div class="flex items-center justify-end">
            <BaseButton text="Agregar Activo" @click="openCreateView" icon="add" />
        </div>

        <!-- Stats Cards -->
        <FixedAssetsStats
            :total-assets="stats.totalAssets"
            :total-value="formattedTotalValue"
            :areas-count="stats.areasCount"
            :inactive-assets="stats.inactiveAssets"
        />

        <!-- Table -->
        <BaseTable
            ref="tablaRef"
            :headers="getTableColumns()"
            :fetch-callback="getFixedAssets"
        />
        
        <!-- Modal de confirmación de eliminación -->
        <BaseModal
            modal-id="delete-fixed-asset-modal"
            :on-submit="() => handleDeleteConfirm(refreshData)"
            :on-close="handleDeleteCancel"
            :is-submitting="isDeleting"
            submit-text="Eliminar"
            submit-class="btn-error"
        >
            <template v-slot:modalBody>
                <DeleteFixedAsset />
            </template>
        </BaseModal>
    </div>
</template>

<style></style>
