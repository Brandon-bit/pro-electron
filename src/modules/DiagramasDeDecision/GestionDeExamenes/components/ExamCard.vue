<script setup lang="ts">
import { useModalStore } from '@/shared/stores/modal.store'
import useExamStore from '@/modules/DiagramasDeDecision/GestionDeExamenes/store/examStore'
import type { ExamType } from '@/modules/DiagramasDeDecision/GestionDeExamenes/types/examTypes'

const props = defineProps<{
    exam: ExamType
}>()

const modalStore = useModalStore()
const examStore = useExamStore()

const startExam = () => {
    if (!props.exam.locked) {
        examStore.selectExam(props.exam)
        modalStore.open(examStore.examModalId, {
            title: `Preparado para iniciar: ${props.exam.name}`,
            type: 'VIEW'
        })
    }
}
</script>

<template>
    <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
        <div class="card-body">
            <!-- Header -->
            <div class="flex justify-between items-start mb-4">
                <div class="flex-1">
                    <div class="flex items-center gap-2 mb-2">
                        <span class="material-symbols-outlined text-primary">book</span>
                        <h3 class="card-title text-lg">{{ exam.name }}</h3>
                    </div>
                    <div class="flex gap-2 mb-3">
                        <span class="badge badge-outline">{{ exam.category }}</span>
                        <span v-if="exam.locked" class="badge badge-secondary gap-1">
                            <span class="material-symbols-outlined text-xs">lock</span>
                            Bloqueado
                        </span>
                    </div>
                </div>
            </div>

            <!-- Stats Grid -->
            <div class="grid grid-cols-2 gap-3 text-sm mb-4">
                <div class="flex items-center gap-2 opacity-70">
                    <span class="material-symbols-outlined text-sm">description</span>
                    <span>{{ exam.questions }} preguntas</span>
                </div>
                <div class="flex items-center gap-2 opacity-70">
                    <span class="material-symbols-outlined text-sm">schedule</span>
                    <span>{{ exam.timeLimit }} minutos</span>
                </div>
                <div class="flex items-center gap-2 opacity-70">
                    <span class="material-symbols-outlined text-sm">check_circle</span>
                    <span>{{ exam.passingScore }}% para aprobar</span>
                </div>
                <div class="flex items-center gap-2 opacity-70">
                    <span class="material-symbols-outlined text-sm">emoji_events</span>
                    <span>{{ exam.attempts }} intentos</span>
                </div>
            </div>

            <!-- Prerequisite -->
            <div v-if="exam.prerequisite" class="p-2 bg-base-200 rounded-lg text-sm mb-4">
                <span class="material-symbols-outlined text-xs">lock</span>
                Prerrequisito: {{ exam.prerequisite }}
            </div>

            <!-- Action Button -->
            <button
                @click="startExam"
                :disabled="exam.locked"
                class="btn btn-primary w-full"
            >
                {{ exam.locked ? 'Completa el Prerrequisito' : 'Iniciar Examen' }}
            </button>
        </div>
    </div>
</template>
