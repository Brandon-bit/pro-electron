<script setup lang="ts">
</script>

<template>
    <div class="space-y-4">
        <div class="card bg-base-100 shadow">
            <div class="card-body">
                <h2 class="card-title">ISR Anual</h2>
                <p class="text-sm text-base-content/70">
                    Declaración anual del Impuesto Sobre la Renta
                </p>
                <div class="divider"></div>
                <div class="alert alert-warning">
                    <span class="material-symbols-outlined">warning</span>
                    <div class="text-sm">
                        <p class="font-semibold">Fecha Límite</p>
                        <p>
                            La declaración anual debe presentarse a más tardar el 31 de marzo 
                            del año siguiente al ejercicio fiscal que se declara.
                        </p>
                    </div>
                </div>
                <div class="card bg-base-200 mt-4">
                    <div class="card-body p-4">
                        <h3 class="font-semibold mb-2">Cálculo del ISR Anual:</h3>
                        <div class="space-y-1 text-sm">
                            <p>1. Utilidad Fiscal</p>
                            <p>2. × Tasa ISR (30%)</p>
                            <p>3. = ISR Causado</p>
                            <p>4. (-) Pagos Provisionales</p>
                            <p class="font-semibold">= ISR a Pagar o Saldo a Favor</p>
                        </div>
                    </div>
                </div>
                <p class="text-sm text-base-content/60 mt-4">
                    Contenido del módulo de ISR anual
                </p>
            </div>
        </div>
    </div>
</template>
