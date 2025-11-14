<script setup lang="ts">
import BaseTitle from '@/shared/components/BaseTitle.vue'
import CourseCard from '@/modules/DiagramasDeDecision/GestionDeFormacion/components/CourseCard.vue'
import CreateCourseModal from '@/modules/DiagramasDeDecision/GestionDeFormacion/components/CreateCourseModal.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import useTrainingStore from '@/modules/DiagramasDeDecision/GestionDeFormacion/store/trainingStore'

const modalStore = useModalStore()
const trainingStore = useTrainingStore()

const openCreateModal = () => {
    modalStore.open(trainingStore.createModalId, {
        title: 'Crear Nuevo Curso',
        type: 'CREATE'
    })
}
</script>

<template>
    <div class="space-y-6">
        <!-- Header -->
        <div class="flex items-center justify-between">
            <BaseTitle 
                title="Gestión de Formación" 
                subtitle="Catálogo de cursos y calendario de sesiones de capacitación"
            >
                <template #icon>
                    <span class="material-symbols-outlined text-4xl">school</span>
                </template>
            </BaseTitle>
            <button @click="openCreateModal" class="btn btn-primary btn-lg gap-2">
                <span class="material-symbols-outlined">add</span>
                Nuevo Curso
            </button>
        </div>

        <!-- Courses Grid -->
        <div class="grid md:grid-cols-2 gap-4">
            <CourseCard
                v-for="course in trainingStore.courses"
                :key="course.id"
                :course="course"
            />
        </div>

        <!-- Modal -->
        <CreateCourseModal />
    </div>
</template>
