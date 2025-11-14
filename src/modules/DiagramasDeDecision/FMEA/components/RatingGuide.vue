<script setup lang="ts">
</script>

<template>
    <div class="card bg-base-100 shadow-xl border-2 border-info">
        <div class="card-body">
            <h2 class="card-title gap-2">
                <span class="material-symbols-outlined">warning</span>
                Guía de Calificación
            </h2>
            
            <div class="grid md:grid-cols-3 gap-4 text-sm mt-2">
                <div>
                    <p class="font-semibold mb-1">Severidad (S)</p>
                    <p class="opacity-70">10 = Catastrófico, 1 = Insignificante</p>
                </div>
                <div>
                    <p class="font-semibold mb-1">Ocurrencia (O)</p>
                    <p class="opacity-70">10 = Muy frecuente, 1 = Muy raro</p>
                </div>
                <div>
                    <p class="font-semibold mb-1">Detección (D)</p>
                    <p class="opacity-70">10 = No detectable, 1 = Muy detectable</p>
                </div>
            </div>
        </div>
    </div>
</template>
