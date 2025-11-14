<script setup lang="ts">
import useFiveWhysStore from '@/modules/DiagramasDeDecision/5PorQue/store/fiveWhysStore'
import { useFiveWhysActions } from '@/modules/DiagramasDeDecision/5PorQue/composables/useFiveWhysActions'

const fiveWhysStore = useFiveWhysStore()
const { handleMarkAsRootCause } = useFiveWhysActions()
</script>

<template>
    <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
            <h3 class="font-semibold text-lg mb-4">Árbol de Análisis</h3>
            
            <div class="space-y-3">
                <div
                    v-for="(step, index) in fiveWhysStore.whySteps"
                    :key="step.id"
                    v-show="step.answer"
                    class="relative"
                    :style="{ marginLeft: `${index * 2}rem` }"
                >
                    <!-- Connecting line -->
                    <div 
                        v-if="index > 0"
                        class="absolute -left-6 top-0 bottom-0 w-0.5 bg-base-300"
                    ></div>

                    <!-- Step Card -->
                    <div 
                        :class="[
                            'card bg-base-100 shadow-md',
                            step.isRootCause ? 'border-2 border-accent' : 'border border-base-300'
                        ]"
                    >
                        <div class="card-body p-4">
                            <div class="flex items-start justify-between gap-4">
                                <div class="flex-1">
                                    <p class="text-sm font-medium opacity-70 mb-1">
                                        Por qué #{{ step.id }}
                                    </p>
                                    <p class="text-base">{{ step.answer }}</p>
                                </div>
                                <div class="flex gap-2 items-center">
                                    <span 
                                        v-if="step.isRootCause"
                                        class="badge badge-accent gap-1"
                                    >
                                        <span class="material-symbols-outlined text-xs">verified</span>
                                        Causa Raíz
                                    </span>
                                    <button
                                        v-if="step.id === fiveWhysStore.whySteps.length && step.answer"
                                        @click="handleMarkAsRootCause(step.id)"
                                        class="btn btn-sm btn-circle btn-outline"
                                    >
                                        <span class="material-symbols-outlined text-sm">check_circle</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
