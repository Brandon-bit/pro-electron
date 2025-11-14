<script setup lang="ts">
// Componente simple para mostrar la leyenda RASCI
</script>

<template>
    <div class="alert alert-info shadow-sm">
        <span class="material-symbols-outlined">info</span>
        <div class="flex flex-col gap-1">
            <p class="font-semibold">Leyenda RASCI:</p>
            <div class="grid grid-cols-2 md:grid-cols-5 gap-2 text-sm">
                <div class="flex items-center gap-1">
                    <span class="badge badge-primary badge-sm">R</span>
                    <span>Responsable</span>
                </div>
                <div class="flex items-center gap-1">
                    <span class="badge badge-secondary badge-sm">A</span>
                    <span>Accountable</span>
                </div>
                <div class="flex items-center gap-1">
                    <span class="badge badge-accent badge-sm">S</span>
                    <span>Soporte</span>
                </div>
                <div class="flex items-center gap-1">
                    <span class="badge badge-info badge-sm">C</span>
                    <span>Consultado</span>
                </div>
                <div class="flex items-center gap-1">
                    <span class="badge badge-neutral badge-sm">I</span>
                    <span>Informado</span>
                </div>
            </div>
        </div>
    </div>
</template>
