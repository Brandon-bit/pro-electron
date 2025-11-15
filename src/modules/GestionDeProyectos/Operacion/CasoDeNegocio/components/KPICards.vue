<script setup lang="ts">
import type { KPIsType } from '@/modules/GestionDeProyectos/Operacion/CasoDeNegocio/types/businessCaseTypes'
import { YEARS } from '@/modules/GestionDeProyectos/Operacion/CasoDeNegocio/types/businessCaseTypes'

defineProps<{
    kpis: KPIsType
    formatCurrency: (value: number) => string
    formatPercent: (value: number) => string
}>()
</script>

<template>
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <!-- Valor Total del Proyecto -->
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body p-4">
                <h3 class="text-sm font-medium opacity-70 mb-2">
                    Valor Total del Proyecto
                </h3>
                <div class="text-2xl font-bold text-primary">
                    {{ formatCurrency(kpis.totalValue) }}
                </div>
            </div>
        </div>

        <!-- Costo Total del Proyecto -->
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body p-4">
                <h3 class="text-sm font-medium opacity-70 mb-2">
                    Costo Total del Proyecto
                </h3>
                <div class="text-2xl font-bold text-error">
                    {{ formatCurrency(kpis.totalCost) }}
                </div>
            </div>
        </div>

        <!-- Valor Neto -->
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body p-4">
                <h3 class="text-sm font-medium opacity-70 mb-2">
                    Valor Neto
                </h3>
                <div :class="['text-2xl font-bold', kpis.netValue >= 0 ? 'text-primary' : 'text-error']">
                    {{ formatCurrency(kpis.netValue) }}
                </div>
            </div>
        </div>

        <!-- ROI -->
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body p-4">
                <h3 class="text-sm font-medium opacity-70 mb-2">
                    ROI
                </h3>
                <div :class="['text-2xl font-bold', kpis.roi >= 0 ? 'text-primary' : 'text-error']">
                    {{ formatPercent(kpis.roi) }}
                </div>
            </div>
        </div>

        <!-- VAN -->
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body p-4">
                <h3 class="text-sm font-medium opacity-70 mb-2">
                    VAN (Valor Actual Neto)
                </h3>
                <div :class="['text-2xl font-bold', kpis.npv >= 0 ? 'text-primary' : 'text-error']">
                    {{ formatCurrency(kpis.npv) }}
                </div>
            </div>
        </div>

        <!-- TIR -->
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body p-4">
                <h3 class="text-sm font-medium opacity-70 mb-2">
                    TIR (Tasa Interna de Retorno)
                </h3>
                <div :class="['text-2xl font-bold', kpis.irr >= 0 ? 'text-primary' : 'text-error']">
                    {{ formatPercent(kpis.irr) }}
                </div>
            </div>
        </div>

        <!-- Periodo de Recuperación -->
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body p-4">
                <h3 class="text-sm font-medium opacity-70 mb-2">
                    Periodo de Recuperación
                </h3>
                <div class="text-2xl font-bold">
                    {{ kpis.paybackPeriod >= YEARS ? 'N/A' : `${kpis.paybackPeriod.toFixed(1)} años` }}
                </div>
            </div>
        </div>
    </div>
</template>
