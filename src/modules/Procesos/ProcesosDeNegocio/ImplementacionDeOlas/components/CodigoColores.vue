<script setup lang="ts">
// No necesita lógica, es solo presentacional
</script>

<template>
    <div class="bg-base-200 rounded-lg p-4">
        <h4 class="text-lg font-bold text-center mb-3">Código de colores</h4>
        <ul class="space-y-2">
            <li class="flex justify-center items-center rounded-md py-2 px-4 bg-baja text-white">
                <label class="font-semibold">Prioridad baja</label>
            </li>
            <li class="flex justify-center items-center rounded-md py-2 px-4 bg-media text-black">
                <label class="font-semibold">Prioridad media</label>
            </li>
            <li class="flex justify-center items-center rounded-md py-2 px-4 bg-alta text-white">
                <label class="font-semibold">Prioridad alta</label>
            </li>
            <li class="flex justify-center items-center rounded-md py-2 px-4 bg-muy-alta text-white">
                <label class="font-semibold">Prioridad muy alta</label>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.bg-baja {
    background-color: #65b552;
}

.bg-media {
    background-color: #ffbc37;
}

.bg-alta {
    background-color: #ef7d4a;
}

.bg-muy-alta {
    background-color: #e82754;
}
</style>
