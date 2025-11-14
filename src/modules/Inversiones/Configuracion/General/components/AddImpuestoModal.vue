<script setup lang="ts">
import { ref } from 'vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import { useModalStore } from '@/shared/stores/modal.store'

const emit = defineEmits<{
    'confirm': [data: { impuesto: number, año: number }]
}>()

const modalStore = useModalStore()
const modalId = 'add-impuesto-modal'
const impuesto = ref(0)
const año = ref(new Date().getFullYear())
const isSubmitting = ref(false)

const onSubmit = async () => {
    if (impuesto.value <= 0 || año.value < 2000) return
    
    isSubmitting.value = true
    try {
        emit('confirm', { impuesto: impuesto.value, año: año.value })
        modalStore.close(modalId)
        impuesto.value = 0
        año.value = new Date().getFullYear()
    } finally {
        isSubmitting.value = false
    }
}

const onClose = () => {
    impuesto.value = 0
    año.value = new Date().getFullYear()
}

const openModal = () => {
    modalStore.open(modalId, 'Agregar Impuesto')
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
            <div class="space-y-4">
                <!-- Impuesto -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text font-semibold">Impuesto:</span>
                    </label>
                    <input
                        v-model.number="impuesto"
                        type="number"
                        class="input input-bordered w-full"
                        placeholder="0"
                        min="0"
                        step="0.01"
                    />
                </div>

                <!-- Año -->
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
            </div>
        </template>
    </BaseModal>
</template>
