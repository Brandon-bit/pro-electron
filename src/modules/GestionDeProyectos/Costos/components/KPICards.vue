<script setup lang="ts">
import { computed } from 'vue'
import useCostStore from '@/modules/GestionDeProyectos/Costos/store/costStore'
import { useCostActions } from '@/modules/GestionDeProyectos/Costos/composables/useCostActions'

const costStore = useCostStore()
const { saveCosts, calculateTotals } = useCostActions()

const totals = computed(() => calculateTotals.value)

const updateAuthorizedBudget = (value: string) => {
    const budget = parseFloat(value) || 0
    saveCosts({
        ...costStore.costs,
        authorizedBudget: budget
    })
}
</script>

<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <!-- Ejecución del Gasto -->
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body p-4">
                <h3 class="text-sm font-medium opacity-70">Ejecución del Gasto</h3>
                <div class="text-2xl font-bold mt-2">
                    {{ totals.executionPercentage.toFixed(1) }}%
                </div>
                <progress 
                    class="progress progress-primary w-full mt-2" 
                    :value="totals.executionPercentage" 
                    max="100"
                ></progress>
                <p class="text-xs opacity-70 mt-2">
                    ${{ totals.totalActual.toLocaleString() }} / ${{ totals.totalPlanned.toLocaleString() }}
                </p>
            </div>
        </div>

        <!-- Presupuesto al Finalizar -->
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body p-4">
                <h3 class="text-sm font-medium opacity-70">Presupuesto al Finalizar</h3>
                <div class="flex items-center gap-2 mt-2">
                    <span class="material-symbols-outlined text-info">trending_up</span>
                    <span class="text-2xl font-bold">
                        ${{ totals.forecast.toLocaleString() }}
                    </span>
                </div>
                <p class="text-xs opacity-70 mt-2">
                    Proyección basada en tendencias
                </p>
            </div>
        </div>

        <!-- Desviación Presupuestal -->
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body p-4">
                <h3 class="text-sm font-medium opacity-70">Desviación Presupuestal</h3>
                <div class="flex items-center gap-2 mt-2">
                    <span 
                        v-if="totals.variance >= 0"
                        class="material-symbols-outlined text-success"
                    >
                        trending_down
                    </span>
                    <span 
                        v-else
                        class="material-symbols-outlined text-error"
                    >
                        error
                    </span>
                    <span 
                        :class="[
                            'text-2xl font-bold',
                            totals.variance >= 0 ? 'text-success' : 'text-error'
                        ]"
                    >
                        {{ totals.variance >= 0 ? '+' : '' }}${{ totals.variance.toLocaleString() }}
                    </span>
                </div>
                <p class="text-xs opacity-70 mt-2">
                    vs. Presupuesto Autorizado
                </p>
            </div>
        </div>

        <!-- Presupuesto Estimado -->
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body p-4">
                <h3 class="text-sm font-medium opacity-70">Presupuesto Estimado</h3>
                <div class="flex items-center gap-2 mt-2">
                    <span class="material-symbols-outlined opacity-70">flag</span>
                    <span class="text-2xl font-bold">
                        ${{ costStore.costs.estimatedBudget.toLocaleString() }}
                    </span>
                </div>
                <p class="text-xs opacity-70 mt-2">
                    Desde registro del proyecto
                </p>
            </div>
        </div>

        <!-- Presupuesto Autorizado -->
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body p-4">
                <h3 class="text-sm font-medium opacity-70">Presupuesto Autorizado</h3>
                <input
                    type="number"
                    :value="costStore.costs.authorizedBudget || ''"
                    @input="(e) => updateAuthorizedBudget((e.target as HTMLInputElement).value)"
                    class="input input-bordered w-full text-xl font-bold mt-2"
                    placeholder="$0.00"
                />
                <p class="text-xs opacity-70 mt-2">
                    Presupuesto oficial aprobado
                </p>
            </div>
        </div>
    </div>
</template>
