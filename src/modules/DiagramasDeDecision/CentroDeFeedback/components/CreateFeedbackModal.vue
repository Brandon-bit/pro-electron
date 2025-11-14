<script setup lang="ts">
import { ref } from 'vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import useFeedbackStore from '@/modules/DiagramasDeDecision/CentroDeFeedback/store/feedbackStore'
import { useFeedbackActions } from '@/modules/DiagramasDeDecision/CentroDeFeedback/composables/useFeedbackActions'

const modalStore = useModalStore()
const feedbackStore = useFeedbackStore()
const { handleCreateFeedback } = useFeedbackActions()

const text = ref('')
const source = ref('')
const sentiment = ref<'positivo' | 'neutral' | 'negativo'>('neutral')
const priority = ref<'alta' | 'media' | 'baja'>('media')
const tagsInput = ref('')

const onSubmit = () => {
    const tags = tagsInput.value.split(',').map(t => t.trim()).filter(t => t)
    const success = handleCreateFeedback(
        text.value,
        source.value,
        sentiment.value,
        priority.value,
        tags
    )
    if (success) {
        text.value = ''
        source.value = ''
        sentiment.value = 'neutral'
        priority.value = 'media'
        tagsInput.value = ''
        modalStore.close(feedbackStore.createModalId)
    }
}

const onClose = () => {
    text.value = ''
    source.value = ''
    sentiment.value = 'neutral'
    priority.value = 'media'
    tagsInput.value = ''
}
</script>

<template>
    <BaseModal
        :modal-id="feedbackStore.createModalId"
        :on-submit="onSubmit"
        :on-close="onClose"
        :is-submitting="false"
    >
        <template #modalBody>
            <div class="space-y-4">
                <!-- Text -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text font-semibold">Texto del Feedback</span>
                    </label>
                    <textarea
                        v-model="text"
                        class="textarea textarea-bordered h-24"
                        placeholder="Describe el feedback recibido..."
                    ></textarea>
                </div>

                <!-- Source -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text font-semibold">Fuente</span>
                    </label>
                    <input
                        v-model="source"
                        type="text"
                        class="input input-bordered"
                        placeholder="Ej. Encuesta, Correo, Reunión"
                    />
                </div>

                <!-- Sentiment -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text font-semibold">Sentimiento</span>
                    </label>
                    <select v-model="sentiment" class="select select-bordered">
                        <option value="positivo">Positivo</option>
                        <option value="neutral">Neutral</option>
                        <option value="negativo">Negativo</option>
                    </select>
                </div>

                <!-- Priority -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text font-semibold">Prioridad</span>
                    </label>
                    <select v-model="priority" class="select select-bordered">
                        <option value="alta">Alta</option>
                        <option value="media">Media</option>
                        <option value="baja">Baja</option>
                    </select>
                </div>

                <!-- Tags -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text font-semibold">Etiquetas</span>
                    </label>
                    <input
                        v-model="tagsInput"
                        type="text"
                        class="input input-bordered"
                        placeholder="Separadas por comas: proceso, eficiencia"
                    />
                </div>
            </div>
        </template>
    </BaseModal>
</template>
