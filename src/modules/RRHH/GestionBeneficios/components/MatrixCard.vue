<script setup lang="ts">
import BaseButton from '@/shared/components/BaseButton.vue'
import type { BenefitMatrix } from '@/modules/RRHH/GestionBeneficios/types/benefitsTypes'

defineProps<{
    matrix: BenefitMatrix
}>()

const emit = defineEmits<{
    edit: [matrixId: number]
}>()
</script>

<template>
    <div class="matrix-card">
        <div class="flex items-center justify-between">
            <div class="flex-1">
                <div class="flex items-center gap-2 mb-2">
                    <h3 class="matrix-title">{{ matrix.threshold }}</h3>
                    <div :class="`badge badge-${matrix.color}`">
                        {{ matrix.autoPoints }} puntos
                    </div>
                </div>
                <div class="flex items-center gap-2 text-sm text-base-content/70">
                    <span class="material-symbols-outlined text-base">card_giftcard</span>
                    <span>{{ matrix.benefits.join(' + ') }}</span>
                </div>
            </div>
            <BaseButton
                text="Editar"
                icon="edit"
                variant="outline"
                size="sm"
                @click="emit('edit', matrix.id)"
            />
        </div>
    </div>
</template>

<style scoped>
.matrix-card {
    background: hsl(var(--b1));
    border-radius: 0.75rem;
    border: 1px solid hsl(var(--bc) / 0.12);
    padding: 1.5rem;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px -1px rgb(0 0 0 / 0.04);
}

.matrix-card:hover {
    box-shadow: 0 8px 16px -4px rgb(0 0 0 / 0.12);
    transform: translateY(-2px);
}

.matrix-title {
    font-size: 1.125rem;
    font-weight: 700;
    color: hsl(var(--bc));
}
</style>
