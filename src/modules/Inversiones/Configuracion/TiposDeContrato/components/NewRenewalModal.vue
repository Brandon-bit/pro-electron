<script setup lang="ts">
import { ref } from 'vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import { useModalStore } from '@/shared/stores/modal.store'

const emit = defineEmits<{
    'confirm': [data: { contratoId: string | number, contrato: string }]
}>()

const modalStore = useModalStore()
const modalId = 'new-renewal-modal'
const contrato = ref('')
const currentContratoId = ref<string | number | null>(null)
const isSubmitting = ref(false)

const onSubmit = async () => {
    if (!contrato.value.trim() || !currentContratoId.value) return
    
    isSubmitting.value = true
    try {
        emit('confirm', {
            contratoId: currentContratoId.value,
            contrato: contrato.value
        })
        modalStore.close(modalId)
        contrato.value = ''
        currentContratoId.value = null
    } finally {
        isSubmitting.value = false
    }
}

const onClose = () => {
    contrato.value = ''
    currentContratoId.value = null
}

const openModal = (contratoId: string | number) => {
    currentContratoId.value = contratoId
    modalStore.open(modalId, 'Nuevo tipo de renovación')
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
                    <span class="label-text font-semibold">Nombre de renovación:</span>
                </label>
                <input
                    v-model="contrato"
                    type="text"
                    class="input input-bordered w-full"
                    placeholder="Ingrese el nombre de la renovación"
                    @keyup.enter="onSubmit"
                />
            </div>
        </template>
    </BaseModal>
</template>
