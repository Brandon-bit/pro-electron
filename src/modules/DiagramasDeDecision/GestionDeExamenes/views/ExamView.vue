<script setup lang="ts">
import BaseTitle from '@/shared/components/BaseTitle.vue'
import ExamCard from '@/modules/DiagramasDeDecision/GestionDeExamenes/components/ExamCard.vue'
import CreateExamModal from '@/modules/DiagramasDeDecision/GestionDeExamenes/components/CreateExamModal.vue'
import ExamTakingModal from '@/modules/DiagramasDeDecision/GestionDeExamenes/components/ExamTakingModal.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import useExamStore from '@/modules/DiagramasDeDecision/GestionDeExamenes/store/examStore'

const modalStore = useModalStore()
const examStore = useExamStore()

const openCreateModal = () => {
    modalStore.open(examStore.createModalId, {
        title: 'Crear Nuevo Examen',
        type: 'CREATE'
    })
}
</script>

<template>
    <div class="space-y-6">
        <!-- Header -->
        <div class="flex items-center justify-between">
            <BaseTitle 
                title="Gestión de Exámenes" 
                subtitle="Sistema de evaluación y certificación para medir la comprensión del cambio"
            >
                <template #icon>
                    <span class="material-symbols-outlined text-4xl">quiz</span>
                </template>
            </BaseTitle>
            <button @click="openCreateModal" class="btn btn-primary btn-lg gap-2">
                <span class="material-symbols-outlined">add</span>
                Nuevo Examen
            </button>
        </div>

        <!-- Exams Grid -->
        <div class="grid md:grid-cols-2 gap-4">
            <ExamCard
                v-for="exam in examStore.exams"
                :key="exam.id"
                :exam="exam"
            />
        </div>

        <!-- Modals -->
        <CreateExamModal />
        <ExamTakingModal />
    </div>
</template>
