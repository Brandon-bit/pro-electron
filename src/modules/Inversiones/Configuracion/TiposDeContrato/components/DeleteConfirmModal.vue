<script setup lang="ts">
import { ref } from 'vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import { useModalStore } from '@/shared/stores/modal.store'

const emit = defineEmits<{
    'confirm': [id: string | number]
}>()

const modalStore = useModalStore()
const modalId = 'delete-confirm-modal'
const itemToDelete = ref<{ id: string | number, name: string } | null>(null)
const isDeleting = ref(false)

const onSubmit = async () => {
    if (!itemToDelete.value) return
    
    isDeleting.value = true
    try {
        emit('confirm', itemToDelete.value.id)
        modalStore.close(modalId)
        itemToDelete.value = null
    } finally {
        isDeleting.value = false
    }
}

const onClose = () => {
    itemToDelete.value = null
}

const openModal = (id: string | number, name: string) => {
    itemToDelete.value = { id, name }
    modalStore.open(modalId, 'Confirmar eliminación')
}

defineExpose({
    openModal
})
</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="modalId"
        :isSubmitting="isDeleting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <div class="text-center space-y-4">
                <div class="flex justify-center">
                    <span class="material-symbols-outlined text-6xl text-error">
                        warning
                    </span>
                </div>
                
                <h3 class="text-xl font-bold">
                    ¿Está seguro de eliminar este elemento?
                </h3>
                
                <div v-if="itemToDelete" class="bg-base-200 rounded-lg p-4">
                    <p class="font-semibold">{{ itemToDelete.name }}</p>
                </div>
                
                <p class="text-base-content/70">
                    Esta acción no se puede deshacer.
                </p>
            </div>
        </template>
    </BaseModal>
</template>
