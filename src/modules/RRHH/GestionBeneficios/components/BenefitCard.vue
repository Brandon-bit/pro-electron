<script setup lang="ts">
import BaseButton from '@/shared/components/BaseButton.vue'
import type { Benefit } from '@/modules/RRHH/GestionBeneficios/types/benefitsTypes'

const props = defineProps<{
    benefit: Benefit
}>()

const emit = defineEmits<{
    redeem: [benefitId: number]
}>()

const handleRedeem = () => {
    emit('redeem', props.benefit.id)
}
</script>

<template>
    <div class="benefit-card group">
        <div class="benefit-card-content">
            <div class="flex items-center justify-between mb-4">
                <div :class="['benefit-icon-wrapper', `bg-${benefit.color}/10`]">
                    <span :class="['material-symbols-outlined', `text-${benefit.color}`, 'text-2xl']">
                        {{ benefit.icon }}
                    </span>
                </div>
                <div class="badge badge-secondary gap-1">
                    <span class="material-symbols-outlined text-xs">stars</span>
                    {{ benefit.points }}
                </div>
            </div>
            
            <div class="mb-4">
                <h3 class="benefit-title">{{ benefit.name }}</h3>
                <p class="benefit-description">{{ benefit.description }}</p>
            </div>

            <div v-if="benefit.availableQuantity !== undefined" class="mb-3">
                <p class="text-xs text-base-content/60">
                    Disponibles: <span class="font-semibold">{{ benefit.availableQuantity }}</span>
                </p>
            </div>

            <BaseButton
                text="Canjear"
                icon="redeem"
                variant="outline"
                size="sm"
                class="w-full"
                @click="handleRedeem"
                :disabled="benefit.status !== 'active'"
            />
        </div>
    </div>
</template>

<style scoped>
.benefit-card {
    position: relative;
    background: hsl(var(--b1));
    border-radius: 0.75rem;
    border: 1px solid hsl(var(--bc) / 0.12);
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px -1px rgb(0 0 0 / 0.04);
    overflow: hidden;
}

.benefit-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px -4px rgb(0 0 0 / 0.12);
    border-color: hsl(var(--p) / 0.3);
}

.benefit-card-content {
    padding: 1.5rem;
    position: relative;
    z-index: 10;
}

.benefit-icon-wrapper {
    width: 3rem;
    height: 3rem;
    border-radius: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s ease;
}

.benefit-card:hover .benefit-icon-wrapper {
    transform: scale(1.1) rotate(5deg);
}

.benefit-title {
    font-size: 1.125rem;
    font-weight: 700;
    color: hsl(var(--bc));
    margin-bottom: 0.5rem;
}

.benefit-description {
    font-size: 0.875rem;
    color: hsl(var(--bc) / 0.6);
    line-height: 1.4;
}

.benefit-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, hsl(var(--p) / 0.05), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.benefit-card:hover::before {
    opacity: 1;
}
</style>
