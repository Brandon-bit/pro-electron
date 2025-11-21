<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import BaseTable from '@/shared/components/BaseTable.vue'
import { useBenefitCatalog } from '@/modules/RRHH/GestionBeneficios/composables/useBenefitCatalog'
import { useBenefitCatalogActions } from '@/modules/RRHH/GestionBeneficios/composables/useBenefitCatalogActions'
import useBenefitCatalogStore from '@/modules/RRHH/GestionBeneficios/store/benefitCatalogStore'
import { useModalStore } from '@/shared/stores/modal.store'

const { getTableColumns } = useBenefitCatalog()
const { getBenefitsCatalog } = useBenefitCatalogActions()
const benefitStore = useBenefitCatalogStore()
const modalStore = useModalStore()
const tablaRef = ref()

const handleNewBenefit = () => {
    benefitStore.setData()
    modalStore.open(benefitStore.modalId, {
        type: 'CREATE',
        title: 'Nuevo Beneficio'
    })
}

defineExpose({ tablaRef })
</script>

<template>
    <div>
        <div class="flex items-center justify-between mb-4">
            <div>
                <h2 class="text-2xl font-bold flex items-center gap-2">
                    <span class="material-symbols-outlined">inventory_2</span>
                    Catálogo de Beneficios
                </h2>
                <p class="text-base-content/70 mt-1">
                    Administra los beneficios disponibles para los empleados
                </p>
            </div>
            <BaseButton text="Nuevo Beneficio" icon="add" @click="handleNewBenefit" />
        </div>

        <BaseTable
            ref="tablaRef"
            :headers="getTableColumns()"
            :fetch-callback="getBenefitsCatalog"
        />
    </div>
</template>
