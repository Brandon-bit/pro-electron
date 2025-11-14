<script setup lang="ts">
import { ref } from 'vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import type { Contract } from '../types/contractTypes'

const emit = defineEmits<{
    'confirm': [contractId: string | number]
}>()

const modalStore = useModalStore()
const modalId = 'delete-contract-modal'
const contractToDelete = ref<Contract | null>(null)
const isDeleting = ref(false)

const onSubmit = async () => {
    if (!contractToDelete.value) return
    
    isDeleting.value = true
    try {
        // Simular eliminación
        await new Promise(resolve => setTimeout(resolve, 500))
        emit('confirm', contractToDelete.value.id)
        modalStore.close(modalId)
    } catch (error) {
        console.error('Error deleting contract:', error)
    } finally {
        isDeleting.value = false
    }
}

const onClose = () => {
    contractToDelete.value = null
}

const openModal = (contract: Contract) => {
    contractToDelete.value = contract
    modalStore.open(modalId, 'Eliminar Contrato')
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
                    ¿Está seguro de eliminar este contrato?
                </h3>
                
                <div v-if="contractToDelete" class="bg-base-200 rounded-lg p-4">
                    <p class="font-semibold">{{ contractToDelete.cliente }}</p>
                    <p class="text-sm text-base-content/70">{{ contractToDelete.contrato }}</p>
                    <p class="text-sm text-base-content/70">Monto: ${{ contractToDelete.montoInicial.toLocaleString('es-MX') }}</p>
                </div>
                
                <p class="text-base-content/70">
                    Esta acción no se puede deshacer.
                </p>
            </div>
        </template>
    </BaseModal>
</template>
