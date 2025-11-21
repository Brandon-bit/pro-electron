<script setup lang="ts">
import { computed } from 'vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import useDepreciationStore from '@/modules/Contabilidad/Contabilidad/Depreciacion/store/depreciationStore'

const depreciationStore = useDepreciationStore()

const totalMonthlyDepreciation = computed(() => depreciationStore.totalMonthlyDepreciation)
const periodLabel = computed(() => depreciationStore.periodLabel)

const formatCurrency = (amount: number) => {
    return amount.toLocaleString('es-MX', { minimumFractionDigits: 2 })
}

const handleViewPolicy = () => {
    // TODO: Implementar navegación a vista detallada de póliza
    console.log('Ver póliza completa:', depreciationStore.generatedPolicyFolio)
}
</script>

<template>
    <div class="card bg-base-100 border border-base-content/10 mt-6">
        <div class="card-body">
            <h4 class="card-title text-base">Detalle de Póliza Generada</h4>
            <p class="text-sm text-gray-500 mb-4">
                Asientos contables de la depreciación automática
            </p>

            <div class="overflow-x-auto">
                <table class="table table-sm">
                    <thead class="bg-base-200">
                        <tr>
                            <th>Cuenta</th>
                            <th>Descripción</th>
                            <th class="text-right">Debe</th>
                            <th class="text-right">Haber</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-medium">5201-001 Depreciación</td>
                            <td>Depreciación de activos fijos - {{ periodLabel }}</td>
                            <td class="text-right">
                                ${{ formatCurrency(totalMonthlyDepreciation) }}
                            </td>
                            <td class="text-right">-</td>
                        </tr>
                        <tr>
                            <td class="font-medium">1201-002 Depreciación Acumulada</td>
                            <td>Depreciación acumulada - {{ periodLabel }}</td>
                            <td class="text-right">-</td>
                            <td class="text-right">
                                ${{ formatCurrency(totalMonthlyDepreciation) }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="flex gap-3 mt-6">
                <BaseButton
                    text="Ver póliza completa"
                    icon="description"
                    variant="outline"
                    @click="handleViewPolicy"
                />
            </div>
        </div>
    </div>
</template>
