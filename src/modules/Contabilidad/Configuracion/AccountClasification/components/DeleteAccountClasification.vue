<script setup lang="ts">
import BaseButton from '@/shared/components/BaseButton.vue'

interface Props {
    show: boolean
    accountClasificationName: string
}

defineProps<Props>()
const emit = defineEmits(['confirm', 'cancel'])

const handleConfirm = () => {
    emit('confirm')
}

const handleCancel = () => {
    emit('cancel')
}
</script>

<template>
    <div v-if="show" class="modal modal-open">
        <div class="modal-box">
            <h3 class="font-bold text-lg mb-4">
                <span class="material-symbols-outlined text-warning align-middle mr-2">
                    warning
                </span>
                Confirmar Eliminación
            </h3>
            
            <p class="py-4">
                ¿Estás seguro que deseas eliminar la clasificación de cuenta 
                <span class="font-bold">"{{ accountClasificationName }}"</span>?
            </p>
            
            <p class="text-sm text-warning mb-6">
                Esta acción no se puede deshacer.
            </p>

            <div class="modal-action">
                <BaseButton
                    text="Cancelar"
                    variant="secondary"
                    @click="handleCancel"
                />
                <BaseButton
                    text="Eliminar"
                    variant="danger"
                    icon="delete"
                    @click="handleConfirm"
                />
            </div>
        </div>
        <div class="modal-backdrop" @click="handleCancel"></div>
    </div>
</template>
