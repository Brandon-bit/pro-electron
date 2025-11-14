<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import useUserStore from '@/modules/DefaultModule/Usuarios/Lista/store/userStore'

const modalStore = useModalStore()
const userStore = useUserStore()

const onSubmit = async () => {
    // Simulación - no hace nada por ahora
    console.log('Eliminar usuario:', userStore.selectedUser)
    modalStore.close(userStore.deleteModalId)
    userStore.clearData()
}

const onClose = () => {
    userStore.clearData()
}
</script>

<template>
    <BaseModal
        :modal-id="userStore.deleteModalId"
        :on-submit="onSubmit"
        :on-close="onClose"
        :is-submitting="userStore.isSubmitting"
    >
        <template #modalBody>
            <div v-if="userStore.selectedUser" class="space-y-4">
                <div class="alert alert-warning">
                    <span class="material-symbols-outlined">warning</span>
                    <span>Esta acción no se puede deshacer</span>
                </div>
                
                <p class="text-base">
                    ¿Estás seguro de que deseas eliminar al usuario 
                    <strong>{{ userStore.selectedUser.name }}</strong>?
                </p>
                
                <div class="bg-base-200 p-4 rounded-lg space-y-2">
                    <div class="flex justify-between text-sm">
                        <span class="opacity-70">Email:</span>
                        <span class="font-medium">{{ userStore.selectedUser.email }}</span>
                    </div>
                    <div class="flex justify-between text-sm">
                        <span class="opacity-70">Área:</span>
                        <span class="font-medium">{{ userStore.selectedUser.area }}</span>
                    </div>
                    <div class="flex justify-between text-sm">
                        <span class="opacity-70">Puesto:</span>
                        <span class="font-medium">{{ userStore.selectedUser.position }}</span>
                    </div>
                </div>
            </div>
        </template>
    </BaseModal>
</template>
