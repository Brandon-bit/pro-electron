<script setup lang="ts">
import { ref } from 'vue'
import useOperationStore from '@/modules/MesaDeControl/PipelineDeOperaciones/store/operationStore'
import { useOperationActions } from '@/modules/MesaDeControl/PipelineDeOperaciones/composables/useOperationActions'
import { showNotification } from '@/utils/toastNotifications'
import BaseTextArea from '@/shared/components/BaseTextArea.vue'

const props = defineProps<{
    onRefresh?: () => void
}>()

const operationStore = useOperationStore()
const { addComment } = useOperationActions()

const newComment = ref('')
const isSubmitting = ref(false)
 
const handleAddComment = async () => {
    if (!newComment.value.trim()) return
    
    isSubmitting.value = true
    try {
        const { message, status } = await addComment(newComment.value)
        showNotification(message, status)
        
        if (status === 'success') {
            // Add comment to local state
            const updatedOperation = {
                ...operationStore.selectedOperation!,
                comments: [
                    ...operationStore.selectedOperation!.comments,
                    {
                        author: operationStore.selectedOperation!.operator.name,
                        text: newComment.value,
                        timestamp: new Date().toLocaleString('es-MX')
                    }
                ]
            }
            operationStore.updateOperation(updatedOperation)
            newComment.value = ''
            props.onRefresh?.()
        }
    } catch (error) {
        showNotification('Error al agregar comentario', 'error')
    } finally {
        isSubmitting.value = false
    }
}
</script>

<template>
    <div class="space-y-4">
        <div class="space-y-3 max-h-[300px] overflow-y-auto">
            <div 
                v-for="(comment, idx) in operationStore.selectedOperation?.comments" 
                :key="idx"
                class="card bg-base-100 border"
            >
                <div class="card-body p-4">
                    <div class="flex items-start gap-3">
                        <span class="material-symbols-outlined text-base-content/60">chat</span>
                        <div class="flex-1">
                            <div class="flex items-center justify-between mb-1">
                                <p class="font-medium text-sm">{{ comment.author }}</p>
                                <p class="text-xs text-base-content/60">{{ comment.timestamp }}</p>
                            </div>
                            <p class="text-sm text-base-content/80">{{ comment.text }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="!operationStore.selectedOperation?.comments.length" class="text-center py-8 text-base-content/40">
                <span class="material-symbols-outlined text-4xl">chat_bubble</span>
                <p class="text-sm mt-2">Sin comentarios</p>
            </div>
        </div>

        <div class="space-y-2 pt-4 border-t">
            <BaseTextArea
                v-model="newComment"
                placeholder="Agregar comentario al expediente..."
                :rows="3"
            />
            <button 
                class="btn btn-primary btn-sm w-full"
                @click="handleAddComment"
                :disabled="!newComment.trim() || isSubmitting"
            >
                <span class="material-symbols-outlined text-base">send</span>
                {{ isSubmitting ? 'Agregando...' : 'Agregar Comentario' }}
            </button>
        </div>
    </div>
</template>
