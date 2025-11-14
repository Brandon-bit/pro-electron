<script setup lang="ts">
import { ref } from 'vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import useBrainstormingStore from '@/modules/DiagramasDeDecision/LluviaDeIdeas/store/brainstormingStore'
import { useBrainstormingActions } from '@/modules/DiagramasDeDecision/LluviaDeIdeas/composables/useBrainstormingActions'

const modalStore = useModalStore()
const brainstormingStore = useBrainstormingStore()
const { handleAddNote } = useBrainstormingActions()

const newNoteText = ref('')
const newNoteColor = ref('bg-yellow-200')

const noteColors = [
    { value: 'bg-yellow-200', label: 'Amarillo' },
    { value: 'bg-blue-200', label: 'Azul' },
    { value: 'bg-green-200', label: 'Verde' },
    { value: 'bg-pink-200', label: 'Rosa' },
    { value: 'bg-purple-200', label: 'Morado' },
    { value: 'bg-orange-200', label: 'Naranja' }
]

const onSubmit = () => {
    const success = handleAddNote(newNoteText.value, newNoteColor.value)
    if (success) {
        newNoteText.value = ''
        newNoteColor.value = 'bg-yellow-200'
        modalStore.close(brainstormingStore.modalId)
    }
}

const onClose = () => {
    newNoteText.value = ''
    newNoteColor.value = 'bg-yellow-200'
}
</script>

<template>
    <BaseModal
        :modal-id="brainstormingStore.modalId"
        :on-submit="onSubmit"
        :on-close="onClose"
        :is-submitting="false"
    >
        <template #modalBody>
            <div class="space-y-4">
                <!-- Idea Text -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text font-semibold">Idea</span>
                    </label>
                    <textarea
                        v-model="newNoteText"
                        class="textarea textarea-bordered h-32"
                        placeholder="Escribe tu idea aquí..."
                    ></textarea>
                </div>

                <!-- Color Selection -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text font-semibold">Color de la Nota</span>
                    </label>
                    <div class="flex gap-2">
                        <button
                            v-for="color in noteColors"
                            :key="color.value"
                            type="button"
                            :class="[
                                'w-12 h-12 rounded-lg border-2',
                                color.value,
                                newNoteColor === color.value ? 'border-primary ring-2 ring-primary' : 'border-base-300'
                            ]"
                            @click="newNoteColor = color.value"
                        ></button>
                    </div>
                </div>
            </div>
        </template>
    </BaseModal>
</template>
