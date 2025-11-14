<script setup lang="ts">
</script>

<template>
    <div class="space-y-4">
        <div class="card bg-base-100 shadow">
            <div class="card-body">
                <h2 class="card-title">DIOT - Declaración Informativa de Operaciones con Terceros</h2>
                <p class="text-sm text-base-content/70">
                    Generación y presentación de la DIOT mensual
                </p>
                <div class="divider"></div>
                <div class="alert alert-info">
                    <span class="material-symbols-outlined">info</span>
                    <div class="text-sm">
                        <p class="font-semibold">Sobre la DIOT</p>
                        <p>
                            La DIOT es una declaración informativa donde se reportan las operaciones 
                            con proveedores, incluyendo el IVA trasladado y retenido.
                        </p>
                    </div>
                </div>
                <div class="card bg-base-200 mt-4">
                    <div class="card-body p-4">
                        <h3 class="font-semibold mb-2">Información a reportar:</h3>
                        <ul class="list-disc list-inside text-sm space-y-1">
                            <li>RFC del proveedor</li>
                            <li>Tipo de operación</li>
                            <li>Base gravable</li>
                            <li>IVA trasladado</li>
                            <li>IVA retenido</li>
                        </ul>
                    </div>
                </div>
                <p class="text-sm text-base-content/60 mt-4">
                    Contenido del módulo de DIOT
                </p>
            </div>
        </div>
    </div>
</template>
