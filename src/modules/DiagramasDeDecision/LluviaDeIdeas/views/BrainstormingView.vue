<script setup lang="ts">
import { ref } from 'vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import AddNoteModal from '@/modules/DiagramasDeDecision/LluviaDeIdeas/components/AddNoteModal.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import useBrainstormingStore from '@/modules/DiagramasDeDecision/LluviaDeIdeas/store/brainstormingStore'
import { useBrainstormingActions } from '@/modules/DiagramasDeDecision/LluviaDeIdeas/composables/useBrainstormingActions'

const modalStore = useModalStore()
const brainstormingStore = useBrainstormingStore()
const { handleDeleteNote, handleVote, handleCategoryAssign, getMatrixQuadrant, getQuadrantColor, handleExportReport, handleConvertToTask } = useBrainstormingActions()

const openAddNoteModal = () => {
    modalStore.open(brainstormingStore.modalId, {
        title: 'Agregar Nueva Idea',
        type: 'CREATE'
    })
}
</script>

<template>
    <div class="space-y-6">
        <!-- Header -->
        <div class="flex items-center justify-between">
            <BaseTitle 
                title="Lluvia de Ideas - Design Thinking" 
                subtitle="Sesión colaborativa de generación y evaluación de ideas"
            >
                <template #icon>
                    <span class="material-symbols-outlined text-4xl">lightbulb</span>
                </template>
            </BaseTitle>
            <button @click="handleExportReport" class="btn btn-outline gap-2">
                <span class="material-symbols-outlined">download</span>
                Generar Reporte
            </button>
        </div>

        <!-- Session Info Card -->
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
                <h2 class="card-title">Información de la Sesión</h2>
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                    <div>
                        <p class="text-xs opacity-70">Facilitador</p>
                        <p class="font-medium">Usuario Actual</p>
                    </div>
                    <div>
                        <p class="text-xs opacity-70">Participantes</p>
                        <div class="flex items-center gap-1 mt-1">
                            <span class="material-symbols-outlined text-sm">group</span>
                            <span class="font-medium">5 participantes</span>
                        </div>
                    </div>
                    <div>
                        <p class="text-xs opacity-70">Ideas Generadas</p>
                        <p class="font-medium text-2xl">{{ brainstormingStore.notes.length }}</p>
                    </div>
                    <div>
                        <p class="text-xs opacity-70">Modo</p>
                        <span class="badge badge-secondary">Sincrónico</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Phase Tabs -->
        <div role="tablist" class="tabs tabs-boxed">
            <a 
                role="tab" 
                :class="['tab gap-2', brainstormingStore.activePhase === 'generate' && 'tab-active']"
                @click="brainstormingStore.setActivePhase('generate')"
            >
                <span class="material-symbols-outlined text-sm">lightbulb</span>
                Fase 1: Generación
            </a>
            <a 
                role="tab" 
                :class="['tab gap-2', brainstormingStore.activePhase === 'cluster' && 'tab-active']"
                @click="brainstormingStore.setActivePhase('cluster')"
            >
                <span class="material-symbols-outlined text-sm">grid_view</span>
                Fase 2: Clasificación
            </a>
            <a 
                role="tab" 
                :class="['tab gap-2', brainstormingStore.activePhase === 'evaluate' && 'tab-active']"
                @click="brainstormingStore.setActivePhase('evaluate')"
            >
                <span class="material-symbols-outlined text-sm">bar_chart</span>
                Fase 3: Evaluación
            </a>
        </div>

        <!-- Phase 1: Generation -->
        <div v-if="brainstormingStore.activePhase === 'generate'" class="card bg-base-100 shadow-xl">
            <div class="card-body">
                <div class="flex items-center justify-between">
                    <h2 class="card-title">Canvas Colaborativo</h2>
                    <button @click="openAddNoteModal" class="btn btn-primary gap-2">
                        <span class="material-symbols-outlined">add</span>
                        Agregar Idea
                    </button>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div
                        v-for="note in brainstormingStore.notes"
                        :key="note.id"
                        :class="['card shadow-lg border-2 border-base-300', note.color]"
                    >
                        <div class="card-body p-4">
                            <div class="flex justify-between items-start mb-2">
                                <span class="badge badge-outline text-xs">{{ note.author }}</span>
                                <button
                                    @click="handleDeleteNote(note.id)"
                                    class="btn btn-ghost btn-xs btn-circle"
                                >
                                    <span class="material-symbols-outlined text-sm">delete</span>
                                </button>
                            </div>
                            <p class="text-sm font-medium">{{ note.text }}</p>
                            <div v-if="note.category" class="mt-2">
                                <span class="badge badge-secondary text-xs">
                                    {{ brainstormingStore.categories.find(c => c.id === note.category)?.name }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <p class="text-sm opacity-70 mt-4">
                    💡 Tip: Las ideas se pueden organizar y clasificar en la siguiente fase
                </p>
            </div>
        </div>

        <!-- Phase 2: Clustering -->
        <div v-if="brainstormingStore.activePhase === 'cluster'" class="space-y-4">
            <div class="card bg-base-100 shadow-xl">
                <div class="card-body">
                    <h2 class="card-title">Agrupar y Clasificar Ideas</h2>

                    <!-- Categories -->
                    <div class="space-y-2 mt-4">
                        <p class="font-semibold">Categorías Disponibles</p>
                        <div class="flex flex-wrap gap-2">
                            <span
                                v-for="category in brainstormingStore.categories"
                                :key="category.id"
                                :class="['badge badge-lg border-2', category.color]"
                            >
                                {{ category.name }}
                            </span>
                        </div>
                    </div>

                    <!-- Notes by Category -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                        <div
                            v-for="category in brainstormingStore.categories"
                            :key="category.id"
                            :class="['card border-2', category.color]"
                        >
                            <div class="card-body">
                                <h3 class="font-semibold">{{ category.name }}</h3>
                                <div class="space-y-2 mt-2">
                                    <div
                                        v-for="note in brainstormingStore.notesByCategory(category.id)"
                                        :key="note.id"
                                        :class="['p-3 rounded-lg shadow-sm border', note.color]"
                                    >
                                        <p class="text-sm">{{ note.text }}</p>
                                    </div>
                                </div>
                                <select
                                    class="select select-bordered select-sm mt-2"
                                    @change="handleCategoryAssign(($event.target as HTMLSelectElement).value, category.id)"
                                >
                                    <option value="">Asignar idea...</option>
                                    <option
                                        v-for="note in brainstormingStore.unassignedNotes"
                                        :key="note.id"
                                        :value="note.id"
                                    >
                                        {{ note.text.substring(0, 40) }}...
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Phase 3: Evaluation -->
        <div v-if="brainstormingStore.activePhase === 'evaluate'" class="space-y-4">
            <div class="card bg-base-100 shadow-xl">
                <div class="card-body">
                    <div class="flex items-center justify-between">
                        <h2 class="card-title">Métodos de Evaluación y Priorización</h2>
                        <select
                            v-model="brainstormingStore.evaluationMode"
                            class="select select-bordered"
                        >
                            <option value="voting">Votación Simple</option>
                            <option value="matrix">Matriz 2x2</option>
                            <option value="scoring">Puntuación Multi-criterio</option>
                        </select>
                    </div>

                    <!-- Voting Mode -->
                    <div v-if="brainstormingStore.evaluationMode === 'voting'" class="space-y-4 mt-4">
                        <div class="alert alert-info">
                            <span class="material-symbols-outlined">how_to_vote</span>
                            <span>
                                Votos disponibles: 
                                <strong class="text-2xl ml-2">{{ brainstormingStore.userVotesLeft }}/{{ brainstormingStore.votesPerPerson }}</strong>
                            </span>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div
                                v-for="note in brainstormingStore.notes"
                                :key="note.id"
                                class="card bg-base-100 shadow-md"
                            >
                                <div class="card-body">
                                    <div class="flex items-start justify-between">
                                        <div class="flex-1">
                                            <p class="font-medium mb-2">{{ note.text }}</p>
                                            <span class="badge badge-outline">{{ note.author }}</span>
                                        </div>
                                        <div class="flex flex-col items-center gap-2">
                                            <button
                                                @click="handleVote(note.id)"
                                                :disabled="brainstormingStore.userVotesLeft <= 0"
                                                class="btn btn-sm btn-outline gap-1"
                                            >
                                                <span class="material-symbols-outlined text-sm">how_to_vote</span>
                                                Votar
                                            </button>
                                            <div class="flex items-center gap-1">
                                                <span class="material-symbols-outlined text-sm text-yellow-500">star</span>
                                                <span class="font-bold">{{ note.votes }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Matrix Mode -->
                    <div v-if="brainstormingStore.evaluationMode === 'matrix'" class="space-y-4 mt-4">
                        <div class="alert">
                            <span class="material-symbols-outlined">grid_on</span>
                            <div>
                                <h3 class="font-semibold">Matriz de Impacto vs. Esfuerzo</h3>
                                <p class="text-sm">Posiciona las ideas según su impacto potencial y esfuerzo requerido</p>
                            </div>
                        </div>

                        <div
                            v-for="note in brainstormingStore.topVotedNotes"
                            :key="note.id"
                            :class="[
                                'card border-2',
                                getQuadrantColor(
                                    getMatrixQuadrant(
                                        brainstormingStore.prioritizationScores[note.id]?.impact || 3,
                                        brainstormingStore.prioritizationScores[note.id]?.effort || 3
                                    )
                                )
                            ]"
                        >
                            <div class="card-body">
                                <p class="font-medium mb-3">{{ note.text }}</p>
                                <div class="grid grid-cols-2 gap-4 mb-3">
                                    <div class="form-control">
                                        <label class="label">
                                            <span class="label-text">Impacto (1-5)</span>
                                        </label>
                                        <input
                                            type="number"
                                            min="1"
                                            max="5"
                                            :value="brainstormingStore.prioritizationScores[note.id]?.impact || 3"
                                            @input="brainstormingStore.setPrioritizationScore(
                                                note.id,
                                                parseInt(($event.target as HTMLInputElement).value),
                                                brainstormingStore.prioritizationScores[note.id]?.effort || 3
                                            )"
                                            class="input input-bordered"
                                        />
                                    </div>
                                    <div class="form-control">
                                        <label class="label">
                                            <span class="label-text">Esfuerzo (1-5)</span>
                                        </label>
                                        <input
                                            type="number"
                                            min="1"
                                            max="5"
                                            :value="brainstormingStore.prioritizationScores[note.id]?.effort || 3"
                                            @input="brainstormingStore.setPrioritizationScore(
                                                note.id,
                                                brainstormingStore.prioritizationScores[note.id]?.impact || 3,
                                                parseInt(($event.target as HTMLInputElement).value)
                                            )"
                                            class="input input-bordered"
                                        />
                                    </div>
                                </div>
                                <div class="flex items-center justify-between">
                                    <span class="badge badge-lg">
                                        {{
                                            getMatrixQuadrant(
                                                brainstormingStore.prioritizationScores[note.id]?.impact || 3,
                                                brainstormingStore.prioritizationScores[note.id]?.effort || 3
                                            )
                                        }}
                                    </span>
                                    <button
                                        @click="handleConvertToTask(note.id)"
                                        class="btn btn-sm btn-secondary gap-1"
                                    >
                                        🚀 Convertir en Tarea
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Scoring Mode -->
                    <div v-if="brainstormingStore.evaluationMode === 'scoring'" class="space-y-4 mt-4">
                        <div class="alert">
                            <span class="material-symbols-outlined">assessment</span>
                            <div>
                                <h3 class="font-semibold">Puntuación Multi-criterio</h3>
                                <p class="text-sm">Evalúa cada idea con múltiples criterios ponderados</p>
                            </div>
                        </div>

                        <div class="overflow-x-auto">
                            <table class="table table-zebra">
                                <thead>
                                    <tr>
                                        <th>Idea</th>
                                        <th class="text-center">Innovación (30%)</th>
                                        <th class="text-center">Factibilidad (40%)</th>
                                        <th class="text-center">Costo (30%)</th>
                                        <th class="text-center font-bold">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="note in brainstormingStore.topVotedNotes" :key="note.id">
                                        <td>{{ note.text }}</td>
                                        <td class="text-center">
                                            <input type="number" min="1" max="5" value="3" class="input input-sm input-bordered w-16" />
                                        </td>
                                        <td class="text-center">
                                            <input type="number" min="1" max="5" value="3" class="input input-sm input-bordered w-16" />
                                        </td>
                                        <td class="text-center">
                                            <input type="number" min="1" max="5" value="3" class="input input-sm input-bordered w-16" />
                                        </td>
                                        <td class="text-center font-bold">3.0</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Add Note Modal -->
        <AddNoteModal />
    </div>
</template>
