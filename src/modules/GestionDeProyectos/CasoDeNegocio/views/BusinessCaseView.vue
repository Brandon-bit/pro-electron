<script setup lang="ts">
import { onMounted, watch } from 'vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import ProjectSelector from '@/modules/GestionDeProyectos/CasoDeNegocio/components/ProjectSelector.vue'
import KPICards from '@/modules/GestionDeProyectos/CasoDeNegocio/components/KPICards.vue'
import useBusinessCaseStore from '@/modules/GestionDeProyectos/CasoDeNegocio/store/businessCaseStore'
import { useBusinessCalculations } from '@/modules/GestionDeProyectos/CasoDeNegocio/composables/useBusinessCalculations'
import { useBusinessActions } from '@/modules/GestionDeProyectos/CasoDeNegocio/composables/useBusinessActions'
import { YEARS } from '@/modules/GestionDeProyectos/CasoDeNegocio/types/businessCaseTypes'

const businessStore = useBusinessCaseStore()
const { 
    lastYearWithDistribution, 
    yearlyTotals, 
    kpis, 
    formatCurrency, 
    formatPercent,
    getRealBenefitById
} = useBusinessCalculations()
const { loadProjects, updateBenefitDistribution, saveBusinessCase, loadBusinessCase } = useBusinessActions()

onMounted(() => {
    loadProjects()
})

watch(() => businessStore.selectedProject, (newProject) => {
    if (newProject) {
        loadBusinessCase(newProject)
    }
})
</script>

<template>
    <!-- Project Selector -->
    <ProjectSelector v-if="!businessStore.selectedProject" />

    <!-- Main Content -->
    <div v-else class="space-y-6">
        <!-- Header -->
        <div class="flex items-center justify-between">
            <BaseTitle 
                title="Caso de Negocio" 
                :subtitle="`Proyecto: ${businessStore.getProjectName}`"
            />
            <div class="flex gap-2">
                <button 
                    @click="saveBusinessCase" 
                    class="btn btn-primary"
                >
                    <span class="material-symbols-outlined">save</span>
                    Guardar
                </button>
                <button 
                    @click="businessStore.setSelectedProject('')" 
                    class="btn btn-outline"
                >
                    Cambiar Proyecto
                </button>
            </div>
        </div>

        <!-- KPIs Dashboard -->
        <KPICards 
            :kpis="kpis" 
            :format-currency="formatCurrency" 
            :format-percent="formatPercent"
        />

        <!-- Supuestos -->
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
                <h3 class="card-title">Supuestos</h3>
                <div class="space-y-6">
                    <div class="grid gap-4 md:grid-cols-2">
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Tasa de Descuento (%)</span>
                            </label>
                            <input
                                v-model.number="businessStore.discountRate"
                                type="number"
                                class="input input-bordered"
                                min="0"
                                max="100"
                                step="0.1"
                            />
                        </div>
                    </div>

                    <div class="space-y-4">
                        <div class="flex items-center justify-between">
                            <label class="label-text font-medium">Distribución de Beneficios (%)</label>
                            <span :class="['text-sm font-medium', businessStore.distributionValid ? 'opacity-70' : 'text-error']">
                                Total: {{ businessStore.distributionSum }}% / 100%
                            </span>
                        </div>
                        <div class="grid grid-cols-6 gap-2">
                            <div v-for="(dist, idx) in businessStore.benefitDistribution" :key="idx" class="form-control">
                                <label class="label py-1">
                                    <span class="label-text text-xs">Año {{ idx }}</span>
                                </label>
                                <input
                                    :value="dist"
                                    @input="(e) => updateBenefitDistribution(idx, (e.target as HTMLInputElement).value)"
                                    type="number"
                                    class="input input-bordered input-sm text-center"
                                    min="0"
                                    max="100"
                                    step="1"
                                />
                            </div>
                        </div>
                        <p v-if="!businessStore.distributionValid" class="text-sm text-error">
                            La suma de la distribución no puede exceder 100%
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Tabla de Beneficios -->
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="card-title">Beneficios</h3>
                    <button @click="businessStore.addBenefit()" class="btn btn-sm btn-primary gap-2">
                        <span class="material-symbols-outlined">add</span>
                        Agregar Beneficio
                    </button>
                </div>
                <div class="overflow-x-auto">
                    <table class="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th class="font-medium">Beneficio</th>
                                <th v-for="i in YEARS" :key="i" class="text-center font-medium min-w-[100px]">
                                    Año {{ i - 1 }}
                                </th>
                                <th class="text-center font-medium min-w-[120px]">Total</th>
                                <th class="w-10"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="benefit in businessStore.benefits" :key="benefit.id" class="hover">
                                <td>
                                    <input
                                        v-model="benefit.name"
                                        @input="(e) => businessStore.updateBenefit(benefit.id, 'name', (e.target as HTMLInputElement).value)"
                                        type="text"
                                        placeholder="Nombre del beneficio"
                                        class="input input-bordered input-sm min-w-[200px]"
                                    />
                                </td>
                                <td v-for="(value, idx) in benefit.values" :key="idx">
                                    <input
                                        :value="value"
                                        @input="(e) => businessStore.updateBenefit(benefit.id, idx, (e.target as HTMLInputElement).value)"
                                        type="number"
                                        class="input input-bordered input-sm text-right"
                                        min="0"
                                        :disabled="businessStore.distributionSum >= 100 && idx > lastYearWithDistribution"
                                    />
                                </td>
                                <td class="text-right font-medium">
                                    {{ formatCurrency(getRealBenefitById(benefit.id)?.realValues.reduce((sum, val) => sum + val, 0) || 0) }}
                                </td>
                                <td>
                                    <button
                                        @click="businessStore.removeBenefit(benefit.id)"
                                        :disabled="businessStore.benefits.length === 1"
                                        class="btn btn-ghost btn-sm btn-square"
                                    >
                                        <span class="material-symbols-outlined text-error">delete</span>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Tabla de Costos No Recurrentes -->
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="card-title">Costos No Recurrentes</h3>
                    <button @click="businessStore.addNonRecurringCost()" class="btn btn-sm btn-primary gap-2">
                        <span class="material-symbols-outlined">add</span>
                        Agregar Costo
                    </button>
                </div>
                <div class="overflow-x-auto">
                    <table class="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th class="font-medium">Costo No Recurrente</th>
                                <th class="text-center font-medium min-w-[100px]">Año 0</th>
                                <th class="text-center font-medium min-w-[120px]">Total</th>
                                <th class="w-10"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="cost in businessStore.nonRecurringCosts" :key="cost.id" class="hover">
                                <td>
                                    <input
                                        v-model="cost.name"
                                        @input="(e) => businessStore.updateNonRecurringCost(cost.id, 'name', (e.target as HTMLInputElement).value)"
                                        type="text"
                                        placeholder="Nombre del costo"
                                        class="input input-bordered input-sm min-w-[200px]"
                                    />
                                </td>
                                <td>
                                    <input
                                        :value="cost.values[0]"
                                        @input="(e) => businessStore.updateNonRecurringCost(cost.id, 0, (e.target as HTMLInputElement).value)"
                                        type="number"
                                        class="input input-bordered input-sm text-right"
                                        min="0"
                                    />
                                </td>
                                <td class="text-right font-medium text-error">
                                    {{ formatCurrency(-cost.values[0]) }}
                                </td>
                                <td>
                                    <button
                                        @click="businessStore.removeNonRecurringCost(cost.id)"
                                        :disabled="businessStore.nonRecurringCosts.length === 1"
                                        class="btn btn-ghost btn-sm btn-square"
                                    >
                                        <span class="material-symbols-outlined text-error">delete</span>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Tabla de Costos Recurrentes -->
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="card-title">Costos Recurrentes</h3>
                    <button @click="businessStore.addRecurringCost()" class="btn btn-sm btn-primary gap-2">
                        <span class="material-symbols-outlined">add</span>
                        Agregar Costo
                    </button>
                </div>
                <div class="overflow-x-auto">
                    <table class="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th class="font-medium">Costo Recurrente</th>
                                <th v-for="i in YEARS" :key="i" class="text-center font-medium min-w-[100px]">
                                    Año {{ i - 1 }}
                                </th>
                                <th class="text-center font-medium min-w-[120px]">Total</th>
                                <th class="w-10"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="cost in businessStore.recurringCosts" :key="cost.id" class="hover">
                                <td>
                                    <input
                                        v-model="cost.name"
                                        @input="(e) => businessStore.updateRecurringCost(cost.id, 'name', (e.target as HTMLInputElement).value)"
                                        type="text"
                                        placeholder="Nombre del costo"
                                        class="input input-bordered input-sm min-w-[200px]"
                                    />
                                </td>
                                <td v-for="(value, idx) in cost.values" :key="idx">
                                    <input
                                        :value="value"
                                        @input="(e) => businessStore.updateRecurringCost(cost.id, idx, (e.target as HTMLInputElement).value)"
                                        type="number"
                                        class="input input-bordered input-sm text-right"
                                        min="0"
                                    />
                                </td>
                                <td class="text-right font-medium text-error">
                                    {{ formatCurrency(-cost.values.reduce((sum, val) => sum + val, 0)) }}
                                </td>
                                <td>
                                    <button
                                        @click="businessStore.removeRecurringCost(cost.id)"
                                        :disabled="businessStore.recurringCosts.length === 1"
                                        class="btn btn-ghost btn-sm btn-square"
                                    >
                                        <span class="material-symbols-outlined text-error">delete</span>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Tabla Resumen de Flujo de Efectivo -->
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
                <h3 class="card-title mb-4">Resumen de Flujo de Efectivo</h3>
                <div class="overflow-x-auto">
                    <table class="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th class="font-medium">Concepto</th>
                                <th v-for="i in YEARS" :key="i" class="text-center font-medium min-w-[120px]">
                                    Año {{ i - 1 }}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="hover">
                                <td class="font-medium">Beneficios Totales</td>
                                <td v-for="(val, idx) in yearlyTotals.benefits" :key="idx" class="text-right text-primary">
                                    {{ formatCurrency(val) }}
                                </td>
                            </tr>
                            <tr class="hover">
                                <td class="font-medium">Costos Totales</td>
                                <td v-for="(val, idx) in yearlyTotals.totalCosts" :key="idx" class="text-right text-error">
                                    {{ formatCurrency(-val) }}
                                </td>
                            </tr>
                            <tr class="hover bg-base-200">
                                <td class="font-bold">Flujo de Efectivo</td>
                                <td v-for="(val, idx) in yearlyTotals.cashFlow" :key="idx" :class="['text-right font-bold', val >= 0 ? 'text-primary' : 'text-error']">
                                    {{ formatCurrency(val) }}
                                </td>
                            </tr>
                            <tr class="hover">
                                <td class="font-medium">Flujo de Efectivo Acumulado</td>
                                <td v-for="(val, idx) in yearlyTotals.accumulatedCashFlow" :key="idx" :class="['text-right', val >= 0 ? 'text-primary' : 'text-error']">
                                    {{ formatCurrency(val) }}
                                </td>
                            </tr>
                            <tr class="hover">
                                <td class="font-medium">Descuento de Flujo de Efectivo</td>
                                <td v-for="(val, idx) in yearlyTotals.discountedCashFlow" :key="idx" :class="['text-right', val >= 0 ? 'text-primary' : 'text-error']">
                                    {{ formatCurrency(val) }}
                                </td>
                            </tr>
                            <tr class="hover">
                                <td class="font-medium">Descuento de Flujo Acumulado</td>
                                <td v-for="(val, idx) in yearlyTotals.accumulatedDiscountedCashFlow" :key="idx" :class="['text-right', val >= 0 ? 'text-primary' : 'text-error']">
                                    {{ formatCurrency(val) }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
