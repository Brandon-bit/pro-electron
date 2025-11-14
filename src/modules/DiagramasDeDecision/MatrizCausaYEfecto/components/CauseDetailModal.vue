<script setup lang="ts">
import { ref, watch } from 'vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import useIshikawaStore from '@/modules/DiagramasDeDecision/MatrizCausaYEfecto/store/ishikawaStore'
import { useIshikawaActions } from '@/modules/DiagramasDeDecision/MatrizCausaYEfecto/composables/useIshikawaActions'
import { CATEGORIES } from '@/modules/DiagramasDeDecision/MatrizCausaYEfecto/types/ishikawaTypes'

const modalStore = useModalStore()
const ishikawaStore = useIshikawaStore()
const { handleUpdateCause, handleVote } = useIshikawaActions()

const localCause = ref<any>(null)

// Watch para sincronizar causa seleccionada
watch(() => ishikawaStore.selectedCause, (newCause) => {
    if (newCause) {
        localCause.value = { ...newCause }
    }
}, { immediate: true, deep: true })

const updateWeight = (value: string) => {
    if (localCause.value) {
        localCause.value.weight = parseInt(value)
        handleUpdateCause(localCause.value)
    }
}

const updateEvidence = (value: string) => {
    if (localCause.value) {
        localCause.value.evidence = value
        handleUpdateCause(localCause.value)
    }
}

const vote = () => {
    if (localCause.value) {
        handleVote(localCause.value.id)
        localCause.value.votes++
    }
}

const getCategoryName = (categoryId: string) => {
    return CATEGORIES.find(c => c.id === categoryId)?.name || categoryId
}

const onSubmit = () => {
    modalStore.close(ishikawaStore.modalId)
}

const onClose = () => {
    ishikawaStore.clearSelectedCause()
    localCause.value = null
}
</script>

<template>
    <BaseModal
        :modal-id="ishikawaStore.modalId"
        :on-submit="onSubmit"
        :on-close="onClose"
        :is-submitting="false"
    >
        <template #modalBody>
            <div v-if="localCause" class="space-y-6">
                <!-- Categoría -->
                <div class="alert alert-info">
                    <span class="material-symbols-outlined">category</span>
                    <span>Categoría: <strong>{{ getCategoryName(localCause.category) }}</strong></span>
                </div>

                <!-- Descripción -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text font-semibold">Descripción</span>
                    </label>
                    <p class="text-sm p-3 bg-base-200 rounded-lg">{{ localCause.text }}</p>
                </div>

                <!-- Peso / Impacto -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text font-semibold">Peso / Impacto (1-10)</span>
                    </label>
                    <input
                        type="range"
                        min="1"
                        max="10"
                        :value="localCause.weight"
                        @input="updateWeight(($event.target as HTMLInputElement).value)"
                        class="range range-primary"
                        step="1"
                    />
                    <div class="flex w-full justify-between px-2 text-xs">
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>
                        <span>6</span>
                        <span>7</span>
                        <span>8</span>
                        <span>9</span>
                        <span>10</span>
                    </div>
                    <div class="text-center mt-2">
                        <span class="badge badge-primary badge-lg">{{ localCause.weight }}</span>
                    </div>
                </div>

                <!-- Evidencia / Notas -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text font-semibold">Evidencia / Notas</span>
                    </label>
                    <textarea
                        :value="localCause.evidence"
                        @input="updateEvidence(($event.target as HTMLTextAreaElement).value)"
                        class="textarea textarea-bordered h-32"
                        placeholder="Adjunta evidencia, enlaces, o notas relevantes..."
                    ></textarea>
                </div>

                <!-- Votación del Equipo -->
                <div class="card bg-base-200">
                    <div class="card-body">
                        <h3 class="font-semibold mb-2">Votación del Equipo</h3>
                        <div class="flex items-center gap-4">
                            <div class="flex items-center gap-2">
                                <span class="text-3xl font-bold text-primary">{{ localCause.votes }}</span>
                                <span class="text-sm opacity-70">votos</span>
                            </div>
                            <button type="button" @click="vote" class="btn btn-primary gap-2">
                                <span class="text-xl">👍</span>
                                Votar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </BaseModal>
</template>
