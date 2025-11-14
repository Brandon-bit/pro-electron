<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal.vue'
import useFeedbackStore from '@/modules/DiagramasDeDecision/CentroDeFeedback/store/feedbackStore'
import { useFeedbackActions } from '@/modules/DiagramasDeDecision/CentroDeFeedback/composables/useFeedbackActions'

const feedbackStore = useFeedbackStore()
const { getSentimentBadgeClass } = useFeedbackActions()

const onSubmit = () => {
    feedbackStore.clearSelectedFeedback()
}

const onClose = () => {
    feedbackStore.clearSelectedFeedback()
}
</script>

<template>
    <BaseModal
        :modal-id="feedbackStore.detailsModalId"
        :on-submit="onSubmit"
        :on-close="onClose"
        :is-submitting="false"
        :show-submit="false"
    >
        <template #modalBody>
            <div v-if="feedbackStore.selectedFeedback" class="space-y-4">
                <!-- Text -->
                <div>
                    <p class="text-sm font-semibold opacity-70 mb-2">Feedback</p>
                    <p class="text-base">{{ feedbackStore.selectedFeedback.text }}</p>
                </div>

                <!-- Source -->
                <div>
                    <p class="text-sm font-semibold opacity-70 mb-2">Fuente</p>
                    <div class="flex items-center gap-2">
                        <span class="material-symbols-outlined text-sm">chat</span>
                        <span>{{ feedbackStore.selectedFeedback.source }}</span>
                    </div>
                </div>

                <!-- Sentiment -->
                <div>
                    <p class="text-sm font-semibold opacity-70 mb-2">Sentimiento</p>
                    <span :class="['badge badge-lg', getSentimentBadgeClass(feedbackStore.selectedFeedback.sentiment)]">
                        {{ feedbackStore.selectedFeedback.sentiment }}
                    </span>
                </div>

                <!-- Priority -->
                <div>
                    <p class="text-sm font-semibold opacity-70 mb-2">Prioridad</p>
                    <span class="badge badge-outline badge-lg">
                        {{ feedbackStore.selectedFeedback.priority }}
                    </span>
                </div>

                <!-- Tags -->
                <div>
                    <p class="text-sm font-semibold opacity-70 mb-2">Etiquetas</p>
                    <div class="flex gap-2 flex-wrap">
                        <span
                            v-for="tag in feedbackStore.selectedFeedback.tags"
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
    </BaseModal>
</template>
