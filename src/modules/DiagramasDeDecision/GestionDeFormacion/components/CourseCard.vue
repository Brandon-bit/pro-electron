<script setup lang="ts">
import { useTrainingActions } from '@/modules/DiagramasDeDecision/GestionDeFormacion/composables/useTrainingActions'
import type { CourseType } from '@/modules/DiagramasDeDecision/GestionDeFormacion/types/trainingTypes'

const props = defineProps<{
    course: CourseType
}>()

const { handleEnroll } = useTrainingActions()
</script>

<template>
    <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
            <!-- Header -->
            <div class="flex items-start justify-between mb-2">
                <div>
                    <h3 class="card-title">{{ course.title }}</h3>
                    <p class="text-sm opacity-70">{{ course.duration }}</p>
                </div>
                <span v-if="course.type === 'video'" class="material-symbols-outlined text-primary">
                    play_circle
                </span>
                <span v-else class="material-symbols-outlined text-primary">
                    group
                </span>
            </div>

            <!-- Enrolled Info -->
            <div class="flex items-center justify-between text-sm mb-4">
                <span class="opacity-70">Inscritos</span>
                <span class="badge badge-outline">
                    {{ course.enrolled }} / {{ course.capacity }}
                </span>
            </div>

            <!-- Enroll Button -->
            <button 
                @click="handleEnroll(course.id)"
                class="btn btn-primary w-full"
                :disabled="course.enrolled >= course.capacity"
            >
                {{ course.enrolled >= course.capacity ? 'Cupos Agotados' : 'Inscribirse' }}
            </button>
        </div>
    </div>
</template>
