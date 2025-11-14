<script setup lang="ts">
import { ref } from 'vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import { useModalStore } from '@/shared/stores/modal.store'

const emit = defineEmits<{
    'confirm': [año: number]
}>()

const modalStore = useModalStore()
const modalId = 'new-year-modal'
const año = ref(new Date().getFullYear())
const isSubmitting = ref(false)

const onSubmit = async () => {
    if (!año.value || año.value < 2000) return
    
    isSubmitting.value = true
    try {
        emit('confirm', año.value)
        modalStore.close(modalId)
        año.value = new Date().getFullYear()
    } finally {
        isSubmitting.value = false
    }
}

const onClose = () => {
    año.value = new Date().getFullYear()
}

const openModal = () => {
    modalStore.open(modalId, 'Nueva fecha meta')
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
                    <span class="label-text font-semibold">Año:</span>
                </label>
                <input
                    v-model.number="año"
                    type="number"
                    class="input input-bordered w-full"
                    placeholder="2025"
                    min="2000"
                    max="2100"
                />
            </div>
        </template>
    </BaseModal>
</template>
