<script setup lang="ts">
import { ref } from 'vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import { useModalStore } from '@/shared/stores/modal.store'

const emit = defineEmits<{
    'confirm': [descripcion: string]
}>()

const modalStore = useModalStore()
const modalId = 'add-item-modal'
const descripcion = ref('')
const isSubmitting = ref(false)
const modalTitle = ref('Agregar')

const onSubmit = async () => {
    if (!descripcion.value.trim()) return
    
    isSubmitting.value = true
    try {
        emit('confirm', descripcion.value)
        modalStore.close(modalId)
        descripcion.value = ''
    } finally {
        isSubmitting.value = false
    }
}

const onClose = () => {
    descripcion.value = ''
}

const openModal = (title: string = 'Agregar') => {
    modalTitle.value = title
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
            <BaseFormInput
                v-model="descripcion"
                name="descripcion"
                label="Descripción:"
                placeholder="Ingrese la descripción"
                @keyup.enter="onSubmit"
            />
        </template>
    </BaseModal>
</template>
