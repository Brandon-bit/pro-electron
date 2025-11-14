<script setup lang="ts">
</script>

<template>
    <div class="card bg-base-100 shadow">
        <div class="card-body p-4">
            <h3 class="card-title text-base mb-3">Método de Cálculo</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                    <p class="text-base-content/60">Base del cálculo:</p>
                    <p class="font-medium">Ingresos - Deducciones = Utilidad Fiscal</p>
                </div>
                <div>
                    <p class="text-base-content/60">Coeficiente de utilidad:</p>
                    <p class="font-medium">0.3425 (del ejercicio anterior)</p>
                </div>
                <div>
                    <p class="text-base-content/60">Tasa ISR provisional:</p>
                    <p class="font-medium">30% sobre utilidad fiscal</p>
                </div>
                <div>
                    <p class="text-base-content/60">Tasa IVA:</p>
                    <p class="font-medium">16% (IVA cobrado - IVA acreditable)</p>
                </div>
            </div>
        </div>
    </div>
</template>
