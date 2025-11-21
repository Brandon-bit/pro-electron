<script setup lang="ts">
import { computed } from 'vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import useAccountingMovementsStore from '@/modules/Contabilidad/Contabilidad/OperacionDeMovimientos/store/accountingMovementsStore'
import { useAccountingMovementsActions } from '@/modules/Contabilidad/Contabilidad/OperacionDeMovimientos/composables/useAccountingMovementsActions'
import { showNotification } from '@/utils/toastNotifications'

const accountingMovementsStore = useAccountingMovementsStore()
const { exportToPDF, exportToExcel } = useAccountingMovementsActions()

const totalDebit = computed(() => accountingMovementsStore.totalDebit)
const totalCredit = computed(() => accountingMovementsStore.totalCredit)
const movementsCount = computed(() => accountingMovementsStore.movementsCount)

const handleExportPDF = async () => {
    try {
        await exportToPDF(accountingMovementsStore.movements)
        showNotification('Exportando a PDF...', 'info')
    } catch (error) {
        console.error(error)
        showNotification('Error al exportar a PDF', 'error')
    }
}

const handleExportExcel = async () => {
    try {
        await exportToExcel(accountingMovementsStore.movements)
        showNotification('Exportando a Excel...', 'info')
    } catch (error) {
        console.error(error)
        showNotification('Error al exportar a Excel', 'error')
    }
}

const formatCurrency = (amount: number) => {
    return amount.toLocaleString('es-MX', { minimumFractionDigits: 2 })
}
</script>

<template>
    <div v-if="accountingMovementsStore.showResults" class="card bg-base-100 border border-base-content/10">
        <div class="card-body">
            <div class="flex items-center justify-between mb-4">
                <div>
                    <h3 class="card-title text-lg">Resultados de Búsqueda</h3>
                    <p class="text-sm text-gray-500">
                        {{ movementsCount }} movimientos encontrados
                    </p>
                </div>
                <div class="flex gap-2">
                    <BaseButton 
                        text="Exportar PDF"
                        icon="download"
                        variant="outline"
                        size="sm"
                        @click="handleExportPDF"
                    />
                    <BaseButton 
                        text="Exportar Excel"
                        icon="description"
                        variant="outline"
                        size="sm"
                        @click="handleExportExcel"
                    />
                </div>
            </div>

            <!-- Tabla de movimientos -->
            <div class="overflow-x-auto">
                <table class="table table-sm">
                    <thead class="bg-base-200">
                        <tr>
                            <th>Fecha</th>
                            <th>Póliza</th>
                            <th>Cuenta</th>
                            <th>Descripción</th>
                            <th class="text-right">Debe</th>
                            <th class="text-right">Haber</th>
                            <th class="text-right">Saldo</th>
                            <th>Documento</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="accountingMovementsStore.movements.length === 0">
                            <td colspan="8" class="text-center py-8 text-gray-500">
                                No se encontraron movimientos con los filtros aplicados
                            </td>
                        </tr>
                        <tr v-for="(movement, index) in accountingMovementsStore.movements" :key="index">
                            <td>
                                {{ new Date(movement.date).toLocaleDateString('es-MX') }}
                            </td>
                            <td>
                                <span class="badge badge-outline">{{ movement.policy }}</span>
                            </td>
                            <td class="font-medium">{{ movement.account }}</td>
                            <td>{{ movement.description }}</td>
                            <td class="text-right">
                                <span v-if="movement.debit > 0">
                                    ${{ formatCurrency(movement.debit) }}
                                </span>
                                <span v-else class="text-gray-400">-</span>
                            </td>
                            <td class="text-right">
                                <span v-if="movement.credit > 0">
                                    ${{ formatCurrency(movement.credit) }}
                                </span>
                                <span v-else class="text-gray-400">-</span>
                            </td>
                            <td class="text-right font-semibold">
                                ${{ formatCurrency(movement.balance) }}
                            </td>
                            <td>
                                <span v-if="movement.document" class="badge badge-secondary">
                                    {{ movement.document }}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Totales -->
            <div class="mt-4 p-4 border rounded-lg bg-base-200">
                <div class="flex justify-end gap-8">
                    <div class="text-right">
                        <div class="text-sm text-gray-500">Total Debe</div>
                        <div class="text-lg font-bold">
                            ${{ formatCurrency(totalDebit) }}
                        </div>
                    </div>
                    <div class="text-right">
                        <div class="text-sm text-gray-500">Total Haber</div>
                        <div class="text-lg font-bold">
                            ${{ formatCurrency(totalCredit) }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
