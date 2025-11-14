<script setup lang="ts">
</script>

<template>
    <div class="space-y-4">
        <div class="card bg-base-100 shadow">
            <div class="card-body">
                <h2 class="card-title">Contabilidad Electrónica</h2>
                <p class="text-sm text-base-content/70">
                    Envío de la contabilidad electrónica mensual al SAT
                </p>
                <div class="divider"></div>
                <div class="alert alert-info">
                    <span class="material-symbols-outlined">info</span>
                    <div class="text-sm">
                        <p class="font-semibold">Sobre la Contabilidad Electrónica</p>
                        <p>
                            Obligación de enviar mensualmente al SAT la información contable 
                            en formato XML según el anexo 24 de la RMF.
                        </p>
                    </div>
                </div>
                <div class="card bg-base-200 mt-4">
                    <div class="card-body p-4">
                        <h3 class="font-semibold mb-2">Archivos a enviar:</h3>
                        <ul class="list-disc list-inside text-sm space-y-1">
                            <li>Catálogo de cuentas</li>
                            <li>Balanza de comprobación</li>
                            <li>Pólizas del periodo</li>
                            <li>Auxiliares de cuenta</li>
                            <li>Auxiliares de folios</li>
                        </ul>
                    </div>
                </div>
                <p class="text-sm text-base-content/60 mt-4">
                    Contenido del módulo de contabilidad electrónica
                </p>
            </div>
        </div>
    </div>
</template>
