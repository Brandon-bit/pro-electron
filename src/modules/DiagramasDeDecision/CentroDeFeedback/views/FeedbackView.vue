<script setup lang="ts">
import BaseTitle from '@/shared/components/BaseTitle.vue'
import FeedbackCard from '@/modules/DiagramasDeDecision/CentroDeFeedback/components/FeedbackCard.vue'
import CreateFeedbackModal from '@/modules/DiagramasDeDecision/CentroDeFeedback/components/CreateFeedbackModal.vue'
import DetailsModal from '@/modules/DiagramasDeDecision/CentroDeFeedback/components/DetailsModal.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import useFeedbackStore from '@/modules/DiagramasDeDecision/CentroDeFeedback/store/feedbackStore'

const modalStore = useModalStore()
const feedbackStore = useFeedbackStore()

const openCreateModal = () => {
    modalStore.open(feedbackStore.createModalId, {
        title: 'Agregar Feedback',
        type: 'CREATE'
    })
}
</script>

<template>
    <div class="space-y-6">
        <!-- Header -->
        <div class="flex items-center justify-between">
            <BaseTitle 
                title="Centro de Feedback" 
                subtitle="Bandeja unificada de retroalimentación con etiquetado y priorización"
            >
                <template #icon>
                    <span class="material-symbols-outlined text-4xl">feedback</span>
                </template>
            </BaseTitle>
            <button @click="openCreateModal" class="btn btn-primary btn-lg gap-2">
                <span class="material-symbols-outlined">add</span>
                Agregar Feedback
            </button>
        </div>

        <!-- Feedback Grid -->
        <div class="grid gap-4">
            <FeedbackCard
                v-for="feedback in feedbackStore.feedbackItems"
                :key="feedback.id"
                :feedback="feedback"
            />
        </div>

        <!-- Modals -->
        <CreateFeedbackModal />
        <DetailsModal />
    </div>
</template>
