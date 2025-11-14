<script setup lang="ts">
import { computed } from 'vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import DepreciationPolicyDetail from '@/modules/Contabilidad/Contabilidad/Depreciacion/components/DepreciationPolicyDetail.vue'
import useDepreciationStore from '@/modules/Contabilidad/Contabilidad/Depreciacion/store/depreciationStore'
import { useDepreciationActions } from '@/modules/Contabilidad/Contabilidad/Depreciacion/composables/useDepreciationActions'
import { showNotification } from '@/utils/toastNotifications'

const depreciationStore = useDepreciationStore()
const { generateDepreciationPolicy } = useDepreciationActions()

const totalMonthlyDepreciation = computed(() => depreciationStore.totalMonthlyDepreciation)
const totalAssets = computed(() => depreciationStore.totalAssets)
const periodLabel = computed(() => depreciationStore.periodLabel)

const handleGeneratePolicy = async () => {
    try {
        const result = await generateDepreciationPolicy(
            depreciationStore.selectedMonth,
            depreciationStore.selectedYear,
            depreciationStore.depreciableAssets
        )
        depreciationStore.setPolicyGenerated(true, result.folio)
        showNotification(result.message, 'success')
    } catch (error) {
        console.error(error)
        showNotification('Error al generar la póliza', 'error')
    }
}

const formatCurrency = (amount: number) => {
    return amount.toLocaleString('es-MX', { minimumFractionDigits: 2 })
}
</script>

<template>
    <div v-if="depreciationStore.calculationPerformed" class="card bg-base-100 border border-base-content/10">
        <div class="card-body">
            <div class="flex items-center justify-between mb-4">
                <div>
                    <h3 class="card-title text-lg">Vista Previa del Cálculo - {{ periodLabel }}</h3>
                    <p class="text-sm text-gray-500">
                        Revise los activos que serán depreciados y sus montos
                    </p>
                </div>
                <BaseButton
                    v-if="!depreciationStore.policyGenerated"
                    text="Generar póliza automática"
                    icon="receipt"
                    @click="handleGeneratePolicy"
                />
            </div>

            <!-- Alert de estado -->
            <div
                v-if="!depreciationStore.policyGenerated"
                class="alert alert-warning mb-4"
            >
                <span class="material-symbols-outlined">warning</span>
                <span>Cálculo completado - Revisar antes de generar póliza</span>
            </div>
            <div
                v-else
                class="alert alert-success mb-4"
            >
                <span class="material-symbols-outlined">check_circle</span>
                <span>Póliza de depreciación {{ depreciationStore.generatedPolicyFolio }} generada exitosamente</span>
            </div>

            <!-- Tabla de activos depreciables -->
            <div class="overflow-x-auto">
                <table class="table table-sm">
                    <thead class="bg-base-200">
                        <tr>
                            <th>ID Activo</th>
                            <th>Descripción</th>
                            <th class="text-right">Valor Original</th>
                            <th class="text-right">Deprec. Acumulada</th>
                            <th class="text-center">Vida Útil</th>
                            <th class="text-center">Meses Deprec.</th>
                            <th class="text-right">Deprec. Mensual</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="asset in depreciationStore.depreciableAssets" :key="asset.id">
                            <td>
                                <span class="badge badge-outline">{{ asset.id }}</span>
                            </td>
                            <td class="font-medium">{{ asset.description }}</td>
                            <td class="text-right">
                                ${{ formatCurrency(asset.originalValue) }}
                            </td>
                            <td class="text-right">
                                ${{ formatCurrency(asset.accumulatedDepreciation) }}
                            </td>
                            <td class="text-center">{{ asset.usefulLife }} meses</td>
                            <td class="text-center">{{ asset.depreciatedMonths }} meses</td>
                            <td class="text-right font-semibold">
                                ${{ formatCurrency(asset.monthlyDepreciation) }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Totales -->
            <div class="mt-4 p-4 border rounded-lg bg-base-200">
                <div class="flex justify-between items-center">
                    <div>
                        <div class="text-sm text-gray-500">Total de activos a depreciar</div>
                        <div class="text-lg font-bold">{{ totalAssets }}</div>
                    </div>
                    <div class="text-right">
                        <div class="text-sm text-gray-500">Depreciación total del mes</div>
                        <div class="text-2xl font-bold">
                            ${{ formatCurrency(totalMonthlyDepreciation) }}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Detalle de la póliza generada -->
            <DepreciationPolicyDetail v-if="depreciationStore.policyGenerated" />
        </div>
    </div>
</template>
