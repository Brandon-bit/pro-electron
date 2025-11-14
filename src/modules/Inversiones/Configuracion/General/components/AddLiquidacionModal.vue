<script setup lang="ts">
import { ref } from 'vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import { useModalStore } from '@/shared/stores/modal.store'

const emit = defineEmits<{
    'confirm': [nombre: string]
}>()

const modalStore = useModalStore()
const modalId = 'add-liquidacion-modal'
const nombre = ref('')
const isSubmitting = ref(false)

const onSubmit = async () => {
    if (!nombre.value.trim()) return
    
    isSubmitting.value = true
    try {
        emit('confirm', nombre.value)
        modalStore.close(modalId)
        nombre.value = ''
    } finally {
        isSubmitting.value = false
    }
}

const onClose = () => {
    nombre.value = ''
}

const openModal = () => {
    modalStore.open(modalId, 'Agregar Tipo de Liquidación')
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
                v-model="nombre"
                name="nombre"
                label="Nombre:"
                placeholder="Ingrese el nombre"
                @keyup.enter="onSubmit"
            />
        </template>
    </BaseModal>
</template>
