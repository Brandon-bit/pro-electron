<script setup lang="ts">
import { ref } from 'vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import { useModalStore } from '@/shared/stores/modal.store'

const emit = defineEmits<{
    'confirm': [data: { añoId: string | number, mes: string, clientes: number, inversion: number }]
}>()

const modalStore = useModalStore()
const modalId = 'new-month-modal'
const mes = ref('')
const clientes = ref(0)
const inversion = ref(0)
const currentAñoId = ref<string | number | null>(null)
const isSubmitting = ref(false)

const onSubmit = async () => {
    if (!mes.value || !currentAñoId.value) return
    
    isSubmitting.value = true
    try {
        emit('confirm', {
            añoId: currentAñoId.value,
            mes: mes.value,
            clientes: clientes.value,
            inversion: inversion.value
        })
        modalStore.close(modalId)
        resetForm()
    } finally {
        isSubmitting.value = false
    }
}

const onClose = () => {
    resetForm()
}

const resetForm = () => {
    mes.value = ''
    clientes.value = 0
    inversion.value = 0
    currentAñoId.value = null
}

const openModal = (añoId: string | number) => {
    currentAñoId.value = añoId
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
            <div class="space-y-4">
                <!-- Mes -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text font-semibold">Mes</span>
                    </label>
                    <input
                        v-model="mes"
                        type="month"
                        class="input input-bordered w-full"
                    />
                </div>

                <!-- Clientes meta -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text font-semibold">Clientes meta</span>
                    </label>
                    <input
                        v-model.number="clientes"
                        type="number"
                        class="input input-bordered w-full"
                        placeholder="0"
                        min="0"
                    />
                </div>

                <!-- Inversión meta -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text font-semibold">Inversión meta</span>
                    </label>
                    <input
                        v-model.number="inversion"
                        type="number"
                        class="input input-bordered w-full"
                        placeholder="0"
                        min="0"
                        step="0.01"
                    />
                </div>
            </div>
        </template>
    </BaseModal>
</template>
