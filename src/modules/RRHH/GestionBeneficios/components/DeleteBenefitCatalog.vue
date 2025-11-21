<script setup lang="ts">
import useBenefitCatalogStore from '@/modules/RRHH/GestionBeneficios/store/benefitCatalogStore'

const benefitStore = useBenefitCatalogStore()
</script>

<template>
    <div class="space-y-4">
        <div class="alert alert-warning">
            <span class="material-symbols-outlined">warning</span>
            <div>
                <h3 class="font-bold">¿Estás seguro?</h3>
                <div class="text-xs">Esta acción no se puede deshacer</div>
            </div>
        </div>

        <div v-if="benefitStore.selectedBenefit" class="bg-base-200 p-4 rounded-lg">
            <p class="text-sm text-base-content/70 mb-2">Se eliminará el siguiente beneficio:</p>
            <p class="font-semibold text-lg">{{ benefitStore.selectedBenefit.name }}</p>
            <p class="text-sm text-base-content/60 mt-1">{{ benefitStore.selectedBenefit.description }}</p>
            <div class="flex gap-4 mt-3">
                <div class="badge badge-warning gap-1">
                    <span class="material-symbols-outlined text-xs">grade</span>
                    Score: {{ benefitStore.selectedBenefit.requiredScore }}
                </div>
                <div class="badge badge-info gap-1">
                    <span class="material-symbols-outlined text-xs">inventory</span>
                    Stock: {{ benefitStore.selectedBenefit.availableStock }}
                </div>
            </div>
        </div>
    </div>
</template>
