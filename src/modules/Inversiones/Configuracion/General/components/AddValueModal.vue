<script setup lang="ts">
import { ref } from 'vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import { useModalStore } from '@/shared/stores/modal.store'

const emit = defineEmits<{
    'confirm': [value: number]
}>()

const modalStore = useModalStore()
const modalId = 'add-value-modal'
const value = ref(0)
const isSubmitting = ref(false)
const modalTitle = ref('Agregar')
const label = ref('Valor:')

const onSubmit = async () => {
    if (value.value <= 0) return
    
    isSubmitting.value = true
    try {
        emit('confirm', value.value)
        modalStore.close(modalId)
        value.value = 0
    } finally {
        isSubmitting.value = false
    }
}

const onClose = () => {
    value.value = 0
}

const openModal = (title: string = 'Agregar', inputLabel: string = 'Valor:') => {
    modalTitle.value = title
    label.value = inputLabel
    modalStore.open(modalId, title)
}

defineExpose({
    openModal
})
</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="modalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <div class="form-control">
                <label class="label">
                    <span class="label-text font-semibold">{{ label }}</span>
                </label>
                <input
                    v-model.number="value"
                    type="number"
                    class="input input-bordered w-full"
                    placeholder="0"
                    min="0"
                    step="0.01"
                    @keyup.enter="onSubmit"
                />
            </div>
        </template>
    </BaseModal>
</template>
