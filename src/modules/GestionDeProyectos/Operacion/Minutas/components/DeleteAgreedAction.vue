<script setup lang="ts">
import type { AgreedActionType } from '@/modules/GestionDeProyectos/Operacion/Minutas/types/minuteTypes'

defineProps<{
    selectedAction?: AgreedActionType | null
}>()
</script>

<template>
    <div class="space-y-4">
        <div class="alert alert-warning">
            <span class="material-symbols-outlined">warning</span>
            <div>
                <h3 class="font-bold">¿Estás seguro?</h3>
                <div class="text-sm">
                    Esta acción eliminará permanentemente la acción acordada:
                    <span class="font-semibold block mt-2">"{{ selectedAction?.description }}"</span>
                </div>
            </div>
        </div>
    </div>
</template>
