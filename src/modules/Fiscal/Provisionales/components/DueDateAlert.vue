<script setup lang="ts">
const props = defineProps<{
    period: string
    dueDate: string
}>()
</script>

<template>
    <div class="alert alert-warning">
        <span class="material-symbols-outlined">error</span>
        <div>
            <h3 class="font-bold">Próximo Vencimiento</h3>
            <div class="text-sm">
                La declaración provisional de {{ period }} vence el {{ dueDate }}.
                Recuerde presentarla a tiempo para evitar recargos y multas.
            </div>
        </div>
    </div>
</template>
