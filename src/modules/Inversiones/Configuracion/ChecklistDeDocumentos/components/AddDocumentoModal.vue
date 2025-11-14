<script setup lang="ts">
import { ref } from 'vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import { useModalStore } from '@/shared/stores/modal.store'

const emit = defineEmits<{
    'confirm': [nombreDelDocumento: string]
}>()

const modalStore = useModalStore()
const modalId = 'add-documento-modal'
const nombreDelDocumento = ref('')
const isSubmitting = ref(false)

const onSubmit = async () => {
    if (!nombreDelDocumento.value.trim()) return
    
    isSubmitting.value = true
    try {
        emit('confirm', nombreDelDocumento.value)
        modalStore.close(modalId)
        nombreDelDocumento.value = ''
    } finally {
        isSubmitting.value = false
    }
}

const onClose = () => {
    nombreDelDocumento.value = ''
}

const openModal = () => {
    modalStore.open(modalId, 'Nuevo Documento Requerido')
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
            <BaseFormInput
                v-model="nombreDelDocumento"
                name="nombreDelDocumento"
                label="Nombre del Documento"
                placeholder="Nombre del documento requerido"
                @keyup.enter="onSubmit"
            />
        </template>
    </BaseModal>
</template>
