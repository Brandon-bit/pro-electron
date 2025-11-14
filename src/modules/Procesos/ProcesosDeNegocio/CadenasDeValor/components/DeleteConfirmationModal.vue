<script setup lang="ts">
import { ref, watch } from 'vue'
import { AlertTriangle, Trash2 } from 'lucide-vue-next'

const props = defineProps<{
    isOpen: boolean
    title: string
    message: string
    hasRelatedItems?: boolean
    relatedItemsMessage?: string
}>()

const emit = defineEmits<{
    close: []
    confirm: []
}>()

const modalRef = ref<HTMLDialogElement | null>(null)

watch(() => props.isOpen, (newValue) => {
    if (newValue) {
        modalRef.value?.showModal()
    } else {
        modalRef.value?.close()
    }
})

const handleClose = () => {
    emit('close')
}

const handleConfirm = () => {
    emit('confirm')
}
</script>

<template>
    <dialog ref="modalRef" class="modal" @close="handleClose">
        <div class="modal-box max-w-lg">
            <!-- Header con ícono -->
            <div class="flex items-start gap-4 mb-4">
                <div 
                    class="p-3 rounded-full"
                    :class="hasRelatedItems ? 'bg-warning/10' : 'bg-error/10'"
                >
                    <AlertTriangle 
                        v-if="hasRelatedItems" 
                        :size="32" 
                        class="text-warning" 
                    />
                    <Trash2 v-else :size="32" class="text-error" />
                </div>
                <div class="flex-1">
                    <h3 class="font-bold text-lg">{{ title }}</h3>
                    <p class="text-sm text-base-content/70 mt-2">{{ message }}</p>
                </div>
            </div>

            <!-- Advertencia de items relacionados -->
            <div 
                v-if="hasRelatedItems" 
                class="alert alert-warning mb-4"
            >
                <AlertTriangle :size="20" />
                <div class="text-sm">
                    <div class="font-semibold mb-1">No se puede eliminar</div>
                    <div>{{ relatedItemsMessage }}</div>
                </div>
            </div>

            <!-- Acciones -->
            <div class="modal-action">
                <button 
                    type="button" 
                    class="btn btn-ghost" 
                    @click="handleClose"
                >
                    {{ hasRelatedItems ? 'Entendido' : 'Cancelar' }}
                </button>
                <button 
                    v-if="!hasRelatedItems"
                    type="button" 
                    class="btn btn-error gap-2" 
                    @click="handleConfirm"
                >
                    <Trash2 :size="16" />
                    Eliminar
                </button>
            </div>
        </div>

        <form method="dialog" class="modal-backdrop">
            <button type="button" @click="handleClose">close</button>
        </form>
    </dialog>
</template>
