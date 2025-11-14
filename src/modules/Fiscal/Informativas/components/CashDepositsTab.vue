<script setup lang="ts">
</script>

<template>
    <div class="space-y-4">
        <div class="card bg-base-100 shadow">
            <div class="card-body">
                <h2 class="card-title">Informativa de Depósitos en Efectivo</h2>
                <p class="text-sm text-base-content/70">
                    Declaración de operaciones en efectivo mayores a $15,000 MXN
                </p>
                <div class="divider"></div>
                <div class="alert alert-warning">
                    <span class="material-symbols-outlined">warning</span>
                    <div class="text-sm">
                        <p class="font-semibold">Importante</p>
                        <p>
                            Se deben reportar todos los depósitos en efectivo que en lo individual 
                            o en conjunto superen los $15,000 pesos en un mes.
                        </p>
                    </div>
                </div>
                <div class="card bg-base-200 mt-4">
                    <div class="card-body p-4">
                        <h3 class="font-semibold mb-2">Información a reportar:</h3>
                        <ul class="list-disc list-inside text-sm space-y-1">
                            <li>Fecha del depósito</li>
                            <li>Institución bancaria</li>
                            <li>Número de cuenta</li>
                            <li>Monto del depósito</li>
                            <li>Descripción de la operación</li>
                        </ul>
                    </div>
                </div>
                <p class="text-sm text-base-content/60 mt-4">
                    Contenido del módulo de depósitos en efectivo
                </p>
            </div>
        </div>
    </div>
</template>
