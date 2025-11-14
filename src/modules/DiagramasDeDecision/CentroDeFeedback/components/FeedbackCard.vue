<script setup lang="ts">
import { useModalStore } from '@/shared/stores/modal.store'
import useFeedbackStore from '@/modules/DiagramasDeDecision/CentroDeFeedback/store/feedbackStore'
import { useFeedbackActions } from '@/modules/DiagramasDeDecision/CentroDeFeedback/composables/useFeedbackActions'
import type { FeedbackItemType } from '@/modules/DiagramasDeDecision/CentroDeFeedback/types/feedbackTypes'

const props = defineProps<{
    feedback: FeedbackItemType
}>()

const modalStore = useModalStore()
const feedbackStore = useFeedbackStore()
const { getSentimentBadgeClass } = useFeedbackActions()

const viewDetails = () => {
    feedbackStore.selectFeedback(props.feedback)
    modalStore.open(feedbackStore.detailsModalId, {
        title: 'Detalles del Feedback',
        type: 'VIEW'
    })
}
</script>

<template>
    <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
            <!-- Header -->
            <div class="flex items-start justify-between mb-4">
                <div class="flex-1">
                    <p class="text-base">{{ feedback.text }}</p>
                    <p class="text-sm opacity-70 mt-2 flex items-center gap-1">
                        <span class="material-symbols-outlined text-xs">chat</span>
                        {{ feedback.source }}
                    </p>
                </div>
                <button @click="viewDetails" class="btn btn-outline btn-sm">
                    Ver Detalles
                </button>
            </div>

            <!-- Badges -->
            <div class="flex gap-2 flex-wrap">
                <span :class="['badge', getSentimentBadgeClass(feedback.sentiment)]">
                    {{ feedback.sentiment }}
                </span>
                <span class="badge badge-outline">
                    Prioridad {{ feedback.priority }}
                </span>
                <span
                    v-for="tag in feedback.tags"
                    :key="tag"
                    class="badge badge-outline gap-1"
                >
                    <span class="material-symbols-outlined text-xs">label</span>
                    {{ tag }}
                </span>
            </div>
        </div>
    </div>
</template>
