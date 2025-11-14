<script setup lang="ts">
import { useModalStore } from '@/shared/stores/modal.store'
import useIshikawaStore from '@/modules/DiagramasDeDecision/MatrizCausaYEfecto/store/ishikawaStore'
import { useIshikawaActions } from '@/modules/DiagramasDeDecision/MatrizCausaYEfecto/composables/useIshikawaActions'
import { CATEGORIES } from '@/modules/DiagramasDeDecision/MatrizCausaYEfecto/types/ishikawaTypes'

const modalStore = useModalStore()
const ishikawaStore = useIshikawaStore()
const { handleVote } = useIshikawaActions()

const handleCauseClick = (cause: any) => {
    ishikawaStore.selectCause(cause)
    modalStore.open(ishikawaStore.modalId, {
        title: 'Detalle de Causa',
        type: 'DETAIL'
    })
}

const handleVoteClick = (e: Event, causeId: string) => {
    e.stopPropagation()
    handleVote(causeId)
}
</script>

<template>
    <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
            <h2 class="card-title">Diagrama de Espina de Pescado</h2>
            <p class="text-sm opacity-70">Haz clic en una causa para ver detalles o agregar evidencia</p>

            <div class="grid grid-cols-2 gap-8 mt-6">
                <div v-for="category in CATEGORIES" :key="category.id" class="space-y-3">
                    <!-- Categoría Header -->
                    <div 
                        class="font-bold text-lg p-3 rounded-lg text-center"
                        :style="{ 
                            backgroundColor: `${category.color}20`, 
                            color: category.color 
                        }"
                    >
                        {{ category.name }}
                    </div>

                    <!-- Causas de la Categoría -->
                    <div 
                        class="space-y-2 pl-4 border-l-4"
                        :style="{ borderColor: category.color }"
                    >
                        <div
                            v-for="cause in ishikawaStore.getCausesByCategory(category.id)"
                            :key="cause.id"
                            class="p-3 bg-base-100 border-2 rounded-lg cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02]"
                            @click="handleCauseClick(cause)"
                        >
                            <p class="text-sm font-medium">{{ cause.text }}</p>
                            <div class="flex items-center gap-4 mt-2 text-xs opacity-70">
                                <span class="flex items-center gap-1">
                                    <span class="material-symbols-outlined text-sm">speed</span>
                                    Peso: {{ cause.weight }}/10
                                </span>
                                <span class="flex items-center gap-1">
                                    <span class="material-symbols-outlined text-sm">how_to_vote</span>
                                    Votos: {{ cause.votes }}
                                </span>
                                <button
                                    @click="handleVoteClick($event, cause.id)"
                                    class="btn btn-xs btn-outline gap-1"
                                >
                                    👍
                                </button>
                            </div>
                        </div>

                        <!-- Empty State -->
                        <div 
                            v-if="ishikawaStore.getCausesByCategory(category.id).length === 0"
                            class="p-3 text-center text-sm opacity-50 italic"
                        >
                            Sin causas registradas
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
