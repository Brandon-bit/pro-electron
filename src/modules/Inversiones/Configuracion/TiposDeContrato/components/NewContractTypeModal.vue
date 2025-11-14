<script setup lang="ts">
import { ref } from 'vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import { useModalStore } from '@/shared/stores/modal.store'

const emit = defineEmits<{
    'confirm': [tipo: string]
}>()

const modalStore = useModalStore()
const modalId = 'new-contract-type-modal'
const tipo = ref('')
const isSubmitting = ref(false)

const onSubmit = async () => {
    if (!tipo.value.trim()) return
    
    isSubmitting.value = true
    try {
        emit('confirm', tipo.value)
        modalStore.close(modalId)
        tipo.value = ''
    } finally {
        isSubmitting.value = false
    }
}

const onClose = () => {
    tipo.value = ''
}

const openModal = () => {
    modalStore.open(modalId, 'Nuevo tipo de contrato')
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
                    <span class="label-text font-semibold">Tipo de contrato:</span>
                </label>
                <input
                    v-model="tipo"
                    type="text"
                    class="input input-bordered w-full"
                    placeholder="Ingrese el tipo de contrato"
                    @keyup.enter="onSubmit"
                />
            </div>
        </template>
    </BaseModal>
</template>
