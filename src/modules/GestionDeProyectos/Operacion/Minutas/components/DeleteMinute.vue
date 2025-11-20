<script setup lang="ts">
import useMinuteStore from '@/modules/GestionDeProyectos/Operacion/Minutas/store/minuteStore'

const minuteStore = useMinuteStore()
</script>

<template>
    <div class="space-y-4">
        <div class="alert alert-warning">
            <span class="material-symbols-outlined">warning</span>
            <div>
                <h3 class="font-bold">¿Estás seguro?</h3>
                <div class="text-sm">
                    Esta acción eliminará permanentemente la minuta
                    <span class="font-semibold">"{{ minuteStore.selectedMinute?.name }}"</span>
                    y no se podrá recuperar.
                </div>
            </div>
        </div>
    </div>
</template>
