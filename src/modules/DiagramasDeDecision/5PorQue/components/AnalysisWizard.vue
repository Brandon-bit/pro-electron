<script setup lang="ts">
import useFiveWhysStore from '@/modules/DiagramasDeDecision/5PorQue/store/fiveWhysStore'
import { useFiveWhysActions } from '@/modules/DiagramasDeDecision/5PorQue/composables/useFiveWhysActions'

const fiveWhysStore = useFiveWhysStore()
const { handleAnswerSubmit, handleMarkAsRootCause } = useFiveWhysActions()

const submitAnswer = () => {
    handleAnswerSubmit()
}

const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
        submitAnswer()
    }
}
</script>

<template>
    <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
            <h2 class="card-title">Proceso de Análisis - Paso {{ fiveWhysStore.currentStep.id }} de 5</h2>
            <p class="text-sm opacity-70">Responde cada pregunta para profundizar en la causa raíz</p>

            <div class="space-y-6 mt-4">
                <!-- Current Question -->
                <div class="p-6 bg-primary/10 rounded-lg border-2 border-primary">
                    <label class="text-lg font-semibold text-primary mb-3 block">
                        {{ fiveWhysStore.currentStep.question }}
                    </label>
                    
                    <!-- Input for unanswered question -->
                    <div v-if="!fiveWhysStore.currentStep.answer" class="space-y-3">
                        <input
                            v-model="fiveWhysStore.currentAnswer"
                            type="text"
                            class="input input-bordered w-full text-lg"
                            placeholder="Escribe tu respuesta aquí..."
                            @keydown="handleKeyPress"
                        />
                        <button @click="submitAnswer" class="btn btn-primary btn-lg gap-2">
                            Siguiente
                            <span class="material-symbols-outlined">arrow_forward</span>
                        </button>
                    </div>

                    <!-- Display answered question -->
                    <div v-else class="space-y-3">
                        <p class="text-lg">{{ fiveWhysStore.currentStep.answer }}</p>
                        <button
                            v-if="fiveWhysStore.currentStep.id === fiveWhysStore.whySteps.length"
                            @click="handleMarkAsRootCause(fiveWhysStore.currentStep.id)"
                            :class="[
                                'btn gap-2',
                                fiveWhysStore.currentStep.isRootCause ? 'btn-primary' : 'btn-outline'
                            ]"
                        >
                            <span class="material-symbols-outlined">check_circle</span>
                            {{ fiveWhysStore.currentStep.isRootCause ? 'Marcada como Causa Raíz' : 'Marcar como Causa Raíz' }}
                        </button>
                    </div>
                </div>

                <!-- Progress Indicator -->
                <div class="pt-4">
                    <div class="flex items-center gap-2 mb-2">
                        <span class="text-sm font-medium">Progreso:</span>
                        <span class="text-sm opacity-70">
                            {{ fiveWhysStore.completedSteps }} de 5 respuestas completadas
                        </span>
                    </div>
                    <div class="w-full bg-base-300 rounded-full h-2 overflow-hidden">
                        <div 
                            class="bg-primary h-full transition-all duration-500"
                            :style="{ width: `${fiveWhysStore.progressPercentage}%` }"
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
