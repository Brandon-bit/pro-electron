<script setup lang="ts">
import { computed } from 'vue'
import useBenefitStore from '@/modules/DiagramasDeDecision/SeguimientoDeBeneficios/store/benefitStore'
import type { BenefitType } from '@/modules/DiagramasDeDecision/SeguimientoDeBeneficios/types/benefitTypes'

const props = defineProps<{
    benefit: BenefitType
}>()

const benefitStore = useBenefitStore()

const progress = computed(() => {
    return Math.round(benefitStore.calculateProgress(props.benefit))
})
</script>

<template>
    <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
            <!-- Title -->
            <h3 class="card-title text-lg">{{ benefit.name }}</h3>
            <p class="text-sm opacity-70">Línea base → Objetivo</p>

            <!-- Metrics -->
            <div class="flex items-center justify-between mt-4">
                <div class="text-sm">
                    <div class="opacity-70">Baseline</div>
                    <div class="text-2xl font-bold">
                        {{ benefit.baseline }} {{ benefit.unit }}
                    </div>
                </div>
                <div class="text-sm text-center">
                    <div class="opacity-70">Actual</div>
                    <div class="text-2xl font-bold text-primary">
                        {{ benefit.current }} {{ benefit.unit }}
                    </div>
                </div>
                <div class="text-sm text-right">
                    <div class="opacity-70">Objetivo</div>
                    <div class="text-2xl font-bold">
                        {{ benefit.target }} {{ benefit.unit }}
                    </div>
                </div>
            </div>

            <!-- Progress -->
            <div class="mt-4">
                <div class="flex justify-between text-sm mb-2">
                    <span class="opacity-70">Progreso</span>
                    <span class="font-medium">{{ progress }}%</span>
                </div>
                <progress 
                    class="progress progress-primary w-full" 
                    :value="progress" 
                    max="100"
                ></progress>
            </div>
        </div>
    </div>
</template>
